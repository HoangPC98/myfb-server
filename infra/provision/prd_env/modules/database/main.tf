data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [var.vpc_id]
  }

  filter {
    name   = "tag:Name"
    values = ["${var.infra_name}-private-subnet-1a", "${var.infra_name}-private-subnet-1b"]
  }
}

resource "aws_db_subnet_group" "eco" {
  name       = "${var.infra_name}-db-subnet-group"
  subnet_ids = data.aws_subnets.private.ids
}

resource "aws_security_group" "db-nsg" {
#  name = "${var.infra_name}-db-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "allow access inside vpc"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr_block]
  }

  tags = {
    Name = "${var.infra_name}-db-sg"
  }
}

resource "aws_db_parameter_group" "eco" {
  name   = "${var.infra_name}-db-parameter-group"
  family = "mariadb10.5"

  #  aws rds describe-engine-default-parameters --db-parameter-group-family mysql8.0
  parameter {
    name  = "character_set_server"
    value = "utf8"
  }

  parameter {
    name  = "character_set_client"
    value = "utf8"
  }

  tags = {
    Name = "${var.infra_name}-db-parameter-group"
  }
}

resource "aws_db_option_group" "eco" {
  name                 = "${var.infra_name}-db-option-group"
  engine_name          = "mariadb"
  major_engine_version = "10.5"

  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.MySQL.Options.html
  # nothing to change

  tags = {
    Name = "${var.infra_name}-db-option-group"
  }
}

resource "aws_db_instance" "eco" {
  db_subnet_group_name = aws_db_subnet_group.eco.name
  identifier           = "${var.infra_name}-rds"
  allocated_storage    = 20
  engine               = "mariadb"

  vpc_security_group_ids = [aws_security_group.db-nsg.id]
  availability_zone      = "${var.region}a"

  instance_class = var.instance_class

  db_name  = "eco"
  username = var.rds_username
  password = var.rds_password

  parameter_group_name = aws_db_parameter_group.eco.name
  option_group_name    = aws_db_option_group.eco.name

  backup_retention_period = 7
  backup_window = "20:00-22:00"
}
