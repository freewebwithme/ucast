defmodule UCast.Repo.Migrations.CreateInfluencerProfileTagsTable do
  use Ecto.Migration

  def change do
    create table(:influencer_profile_tags) do
      add :influencer_profile_id, references(:influencer_profiles)
      add :tag_id, references(:tags)
    end
  end
end
