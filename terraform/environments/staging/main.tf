module "cloud_run" {
  source = "../../modules/cloud_run_service"

  project_id            = var.project_id
  region                = var.region
  service_name          = "personal-site-staging"
  image                 = "us-docker.pkg.dev/cloudrun/container/hello"
  service_account_email = var.cloud_run_sa_email
  domain                = "staging.adre.me"
  min_instances         = 0
  max_instances         = 1
  memory                = "512Mi"
}

# DNS records for the Cloud Run domain mapping.
# proxied = false: Google handles TLS for domain-mapped Cloud Run services.
resource "cloudflare_record" "staging" {
  for_each = {
    for record in module.cloud_run.domain_mapping_records :
    "${record.type}_${replace(record.rrdata, ".", "_")}" => record
  }

  zone_id = var.cloudflare_zone_id
  name    = each.value.name == "" ? "@" : each.value.name
  type    = each.value.type
  content = each.value.rrdata
  proxied = false
}
