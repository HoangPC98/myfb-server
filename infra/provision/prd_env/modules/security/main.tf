resource "aws_iam_policy" "policy" {
  name = "SssPrdS3AccessPolicy"
  path = "/"

  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Action : [
          "s3:ListAllMyBuckets",
          "s3:GetBucketLocation"
        ],
        Effect : "Allow",
        Resource : [
          "arn:aws:s3:::*"
        ]
      },
      {
        Effect : "Deny",
        Action : "s3:DeleteBucket",
        Resource : "*"
      },
      {
        Effect : "Allow",
        Action : "s3:*",
        Resource : [
          "arn:aws:s3:::${var.infra_name}-s3-bucket",
          "arn:aws:s3:::${var.infra_name}-s3-bucket/*"
        ]
      }
    ]
  })
}

resource "aws_iam_user" "s3-access" {
  name = "${var.infra_name}-s3-access"
}

resource "aws_iam_user_policy_attachment" "access-s3-only" {
  user   = aws_iam_user.s3-access.name
  policy_arn = aws_iam_policy.policy.arn
}
