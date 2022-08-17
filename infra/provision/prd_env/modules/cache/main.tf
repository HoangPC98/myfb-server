data "aws_vpc" "vpc" {
  id = var.vpc_id
}

data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [var.vpc_id]
  }

  filter {
    name   = "tag:Name"
    values = ["${var.infra_name}-private-subnet-1a", "${var.infra_name}-private-subnet-1c"]
  }
}


resource "aws_elasticache_subnet_group" "sng" {
  name       = "${var.infra_name}-redis-subnet-group"
  subnet_ids = data.aws_subnets.private.ids

  tags = {
    Name = "${var.infra_name}-redis-sng"
  }
}


resource "aws_security_group" "redis-sg" {
  name   = "${var.infra_name}-redis-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "allow access inside vpc"
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = [data.aws_vpc.vpc.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [data.aws_vpc.vpc.cidr_block]
  }

  tags = {
    Name = "${var.infra_name}-redis-sg"
  }
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "${var.infra_name}-redis"
  engine               = "redis"
  engine_version       = "6.2"
  node_type            = var.node_type
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"

  security_group_ids = [aws_security_group.redis-sg.id]
  subnet_group_name  = aws_elasticache_subnet_group.sng.name

  snapshot_retention_limit = 7
  snapshot_window          = "22:00-23:00"

  tags = {
    Name = "${var.infra_name}-redis"
  }
}
