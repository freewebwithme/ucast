defmodule UCast.Repo.Migrations.CreateReview do
  use Ecto.Migration

  def change do
    create table("reviews") do
      add(:content, :text, null: false)
      add(:user_id, references(:users, on_delete: :delete_all))
      add(:influencer_profile_id, references(:influencer_profiles, on_delete: :delete_all))

      timestamps()
    end
  end
end
