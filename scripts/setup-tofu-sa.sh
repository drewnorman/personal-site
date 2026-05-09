#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="adre-me"
SA_NAME="tofu-sa"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

read -rp "Billing account ID (gcloud billing accounts list): " BILLING_ACCOUNT

echo "Creating service account ${SA_EMAIL}..."
gcloud iam service-accounts create "$SA_NAME" \
  --display-name="OpenTofu" \
  --project="$PROJECT_ID"

echo "Granting project-level roles..."
for role in \
  roles/serviceusage.serviceUsageAdmin \
  roles/artifactregistry.admin \
  roles/iam.serviceAccountAdmin \
  roles/iam.workloadIdentityPoolAdmin \
  roles/resourcemanager.projectIamAdmin \
  roles/run.admin \
  roles/browser
do
  echo "  $role"
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="$role"
done

echo "Granting billing account role..."
gcloud billing accounts add-iam-policy-binding "$BILLING_ACCOUNT" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/billing.costsManager"

echo "Done. Authenticate with: gcloud auth application-default login"
