variable "infra_name" {}

variable "vpc_id" {}

variable "instance_type" {
  default = "t3.medium"
}

variable "ami" {
  default = "ami-02a6f5cea7c172e1a"
}

variable "keypair" {
  default = "eco-prod"
}

