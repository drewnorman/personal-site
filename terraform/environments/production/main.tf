resource "google_firebase_hosting_site" "production" {
  provider = google-beta
  project  = var.project_id
  site_id  = var.firebase_hosting_site_id
}

locals {
  firebase_hosting_reserved_ip = "199.36.158.100"
}

resource "cloudflare_record" "production_apex" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "A"
  content = local.firebase_hosting_reserved_ip
  proxied = false
}
