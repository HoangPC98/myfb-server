variable "region" {}

variable "vpc_id" {
}

variable "vpc_cidr_block" {
}

variable "infra_name" {
}

variable "instance_class" {
  default = "db.t3.small"
}

variable "rds_username" {
}

variable "rds_password" {
}
