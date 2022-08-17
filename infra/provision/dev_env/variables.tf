variable "route53_zone_id" {
  description = "zoneid of route53 used to set subdomain"
  default = "Z0110774A0M37JIXB8AR"
}

variable "domain_name" {
  description = "domain name"
  default = "eco.dev.mirabo.tech"
}

variable "infra_name" {
  description = "Name of infrastructure"
  default = "eco-dev"
}

variable "region" {
  description = "Region of infrastructure"
  default = "ap-northeast-1"
}

variable "keyPair" {
  description = "Keypair of infrastructure"
  default = "eco-dev"
}

variable "ec2Type" {
  description = "Ec2 type"
  default = "t2.small"
}