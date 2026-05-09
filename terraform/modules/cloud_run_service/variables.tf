variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

variable "service_name" {
  type = string
}

variable "image" {
  type        = string
  description = "Initial container image. Cloud Build will update this after first deploy."
}

variable "service_account_email" {
  type = string
}

variable "min_instances" {
  type    = number
  default = 0
}

variable "max_instances" {
  type    = number
  default = 3
}

variable "memory" {
  type    = string
  default = "512Mi"
}

variable "cpu" {
  type    = string
  default = "1000m"
}

variable "domain" {
  type        = string
  default     = ""
  description = "Custom domain for this service. Empty = use the default Cloud Run URL."
}
