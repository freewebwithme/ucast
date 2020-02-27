defmodule UCast.Repo.Migrations.AddTagsIdInProfile do
  use Ecto.Migration

  def change do
    alter table("influencer_profiles") do
      add(:tags_id, references(:tags))
    end
  end
end
