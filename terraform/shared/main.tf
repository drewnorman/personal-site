resource "google_project_service" "apis" {
  for_each = toset([
    "firebase.googleapis.com",
    "firebasehosting.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "billingbudgets.googleapis.com",
    "cloudresourcemanager.googleapis.com",
  ])
  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project_id

  depends_on = [google_project_service.apis]
}

data "google_project" "project" {
  project_id = var.project_id
}

# Keep the default Compute Engine service account from retaining the legacy
# project Editor grant. This is intentionally authoritative for roles/editor;
# only apply when the plan shows the expected removal and no human or workload
# principal should keep Editor.
resource "google_project_iam_binding" "no_project_editors" {
  project = var.project_id
  role    = "roles/editor"
  members = []
}

# ── Budget alert ─────────────────────────────────────────────────────────────

resource "google_billing_budget" "monthly_cap" {
  billing_account = var.billing_account_id
  display_name    = "${var.project_id} monthly budget"

  budget_filter {
    projects = ["projects/${data.google_project.project.number}"]
  }

  amount {
    specified_amount {
      currency_code = "USD"
      units         = tostring(var.monthly_budget_usd)
    }
  }

  threshold_rules {
    threshold_percent = 0.5
  }
  threshold_rules {
    threshold_percent = 0.9
  }
  threshold_rules {
    threshold_percent = 1.0
  }

  depends_on = [google_project_service.apis]
}
