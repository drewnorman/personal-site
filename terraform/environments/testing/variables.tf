variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "cloud_run_sa_email" {
  type        = string
  description = "Output from shared: tofu -chdir=../../shared output -raw cloud_run_sa_email"
}
