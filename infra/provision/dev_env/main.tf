terraform {
  backend "s3" {
    key = "mirabo-web/eco-dev/terraform.tfstate"
  }
}

provider "aws" {
  region = var.region
}

// internet gateway
resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "${var.infra_name}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.infra_name}"
  }
}

resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.infra_name}"
  }
}

resource "aws_subnet" "subnet" {
  availability_zone = data.aws_availability_zones.available.names[0]
  cidr_block = "10.0.1.0/24"
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.infra_name}"
  }
}

resource "aws_route_table_association" "subnetCustomRoute" {
  route_table_id = aws_route_table.rt.id
  subnet_id = aws_subnet.subnet.id
}

data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_security_group" "nsg" {
  vpc_id = aws_vpc.vpc.id

  ingress {
    description = "allow access inside vpc"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [aws_vpc.vpc.cidr_block]
  }

  ingress {
    description = "http"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ecofe"
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ecofe-test"
    from_port = 4000
    to_port = 4000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ecoapi-test"
    from_port = 3000
    to_port = 3000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ecoapi"
    from_port = 3001
    to_port = 3001
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ssh"
    from_port = 22
    to_port = 22
    protocol = "tcp"
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
    Name = "${var.infra_name}"
  }
}

resource "aws_route53_record" "domain" {
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"
  ttl     = "300"
  records = [aws_instance.ec2.public_ip]
}

resource "aws_route53_record" "www" {
  zone_id = var.route53_zone_id
  name    = "www.${var.domain_name}"
  type    = "CNAME"
  ttl     = "5"
  records = [aws_route53_record.domain.name]
}

resource "aws_instance" "ec2" {
  ami = "ami-0fe22bffdec36361c" // ubuntu 18.04LTS
  instance_type = var.ec2Type
  key_name = var.keyPair
  availability_zone = data.aws_availability_zones.available.names[0]

  subnet_id = aws_subnet.subnet.id
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.nsg.id]

  root_block_device {
    volume_size = 20
  }

  tags = {
    Name = "${var.infra_name}"
  }
}