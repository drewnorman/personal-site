#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="adre-me"
SA_NAME="terraform"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

read -rp "Billing account ID (gcloud billing accounts list): " BILLING_ACCOUNT

if gcloud iam service-accounts describe "$SA_EMAIL" --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "Service account ${SA_EMAIL} already exists."
else
  echo "Creating service account ${SA_EMAIL}..."
  gcloud iam service-accounts create "$SA_NAME" \
    --display-name="Terraform/OpenTofu" \
    --project="$PROJECT_ID"
fi

echo "Granting project-level roles..."
for role in \
  roles/serviceusage.serviceUsageAdmin \
  roles/serviceusage.serviceUsageConsumer \
  roles/artifactregistry.admin \
  roles/firebase.admin \
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

cat <<EOF
Done.

Authenticate local Terraform/OpenTofu runs with:
  gcloud auth application-default login --impersonate-service-account=${SA_EMAIL}
EOF
