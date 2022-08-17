data "aws_route53_zone" "route53-zone" {
  name = var.route53_zone
}

resource "aws_route53_record" "domain" {
  zone_id = data.aws_route53_zone.route53-zone.id
  name    = var.domain_name
  type    = "A"
  ttl     = "300"
  records = [var.public_id]
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.route53-zone.id
  name    = "www.${aws_route53_record.domain.name}"
  type    = "CNAME"
  ttl     = "5"
  records = [aws_route53_record.domain.name]
}
