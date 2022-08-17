resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "${var.infra_name}-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${var.infra_name}-internetgateway"
  }
}

resource "aws_route_table" "public-routable" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.infra_name}-routetable"
  }
}

resource "aws_subnet" "public-subnet-1a" {
  availability_zone = "${var.region}a"
  cidr_block        = "10.0.1.0/24"
  vpc_id            = aws_vpc.vpc.id

  tags = {
    Name = "${var.infra_name}-public-subnet-1a"
  }
}

resource "aws_route_table_association" "subnetCustomRoute1a" {
  route_table_id = aws_route_table.public-routable.id
  subnet_id      = aws_subnet.public-subnet-1a.id
}

resource "aws_subnet" "private-subnet-1a" {
  availability_zone = "${var.region}a"
  cidr_block        = "10.0.2.0/24"
  vpc_id            = aws_vpc.vpc.id

  tags = {
    Name = "${var.infra_name}-private-subnet-1a"
  }
}

resource "aws_subnet" "private-subnet-1b" {
  availability_zone = "${var.region}b"
  cidr_block        = "10.0.4.0/24"
  vpc_id            = aws_vpc.vpc.id

  tags = {
    Name = "${var.infra_name}-private-subnet-1b"
  }
}
