terraform {
  backend "s3" {
    key = "mirabo-web/eco-prod/terraform.tfstate"
  }
}

locals {
  infra_name = "eco-prd"
  region = "ap-southeast-1"
  domain_name = "eco.mirabo.tech"
  route53_zone = "mirabo.tech"
}

provider "aws" {
  region = local.region
  profile = "mirabo-web"
}

module "network" {
  source = "./modules/network"

  region = local.region
  infra_name = local.infra_name
}

module "database" {
  source = "./modules/database"

  infra_name = local.infra_name
  region = local.region
  vpc_id = module.network.vpc_id
  vpc_cidr_block = module.network.vpc_cidr_block
  rds_username = var.rds_username
  rds_password = var.rds_password

  depends_on = [module.network]
}

module "redis" {
  source = "./modules/cache"

  infra_name = local.infra_name
  vpc_id = module.network.vpc_id
}

module "security" {
  source = "./modules/security"

  infra_name = local.infra_name
}

module "webapp" {
  source = "./modules/webapp"

  infra_name = local.infra_name
  vpc_id = module.network.vpc_id
}

module "routing" {
  source = "./modules/routing"

  domain_name = local.domain_name
  route53_zone = local.route53_zone
  public_id = module.webapp.webapp_ip

  depends_on = [module.webapp]
}
