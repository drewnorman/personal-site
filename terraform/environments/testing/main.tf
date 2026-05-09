module "cloud_run" {
  source = "../../modules/cloud_run_service"

  project_id            = var.project_id
  region                = var.region
  service_name          = "personal-site-testing"
  image                 = "us-docker.pkg.dev/cloudrun/container/hello"
  service_account_email = var.cloud_run_sa_email
  min_instances         = 0
  max_instances         = 1
  memory                = "256Mi"
}
