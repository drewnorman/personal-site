resource "github_repository" "personal_site" {
  name        = var.github_repo
  description = "Astro personal site for adre.me, deployed with Firebase Hosting."
  visibility  = "public"

  homepage_url = "https://adre.me"

  has_discussions = false
  has_issues      = true
  has_projects    = true
  has_wiki        = true

  allow_merge_commit = true
  allow_rebase_merge = true
  allow_squash_merge = true

  delete_branch_on_merge = false
}

resource "github_branch_protection" "master" {
  repository_id = github_repository.personal_site.node_id
  pattern       = "master"

  enforce_admins                  = false
  allows_deletions                = false
  allows_force_pushes             = false
  lock_branch                     = false
  require_conversation_resolution = false
  require_signed_commits          = false
  required_linear_history         = false

  required_status_checks {
    strict = true
    contexts = [
      "commitlint",
      "test",
    ]
  }

  required_pull_request_reviews {
    dismiss_stale_reviews           = false
    require_code_owner_reviews      = false
    require_last_push_approval      = false
    required_approving_review_count = 0
  }
}
