terraform {
  required_version = ">= 1.6.0"

  backend "gcs" {
    bucket = "drew-infra-tofu-state"
    prefix = "personal-site/testing"
  }
}
