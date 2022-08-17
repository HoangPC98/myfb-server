data "aws_vpc" "vpc" {
  id = var.vpc_id
}

data "aws_subnets" "public" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.vpc.id]
  }

  filter {
    name   = "tag:Name"
    values = ["${var.infra_name}-public-subnet-1a"]
  }
}

resource "aws_security_group" "webapp" {
  vpc_id = data.aws_vpc.vpc.id

  ingress {
    description = "allow access inside vpc"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [data.aws_vpc.vpc.cidr_block]
  }

  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http-frontend"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "http-api"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "${var.infra_name}-web-sg"
  }
}

data "aws_ami" "ubuntu" {
  most_recent      = true
  owners           = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_instance" "ec2" {
  ami = var.ami
  instance_type = var.instance_type
  key_name = var.keypair
  availability_zone = data.aws_availability_zones.available.names[0]

  subnet_id = data.aws_subnets.public.ids[0]
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.webapp.id]

  root_block_device {
    volume_size = 30
  }

  tags = {
    Name = var.infra_name
  }
}

resource "aws_eip" "eco-prd" {
  vpc = true
  instance = aws_instance.ec2.id

  tags = {
    Name = var.infra_name
  }
}
