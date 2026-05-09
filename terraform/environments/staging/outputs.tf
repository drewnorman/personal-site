output "service_url" {
  value = module.cloud_run.service_url
}

output "domain_mapping_records" {
  value = module.cloud_run.domain_mapping_records
}
