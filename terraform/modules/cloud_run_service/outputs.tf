output "service_url" {
  value = google_cloud_run_service.service.status[0].url
}

output "service_name" {
  value = google_cloud_run_service.service.name
}

output "domain_mapping_records" {
  description = "DNS records required by the Cloud Run domain mapping. Add these to Cloudflare."
  value       = var.domain != "" ? google_cloud_run_domain_mapping.domain[0].status[0].resource_records : []
}
