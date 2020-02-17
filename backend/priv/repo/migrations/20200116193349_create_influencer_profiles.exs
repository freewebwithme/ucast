defmodule UCast.Repo.Migrations.CreateInfluencerProfiles do
  use Ecto.Migration

  def change do
    create table(:influencer_profiles) do
      add(:phone_number, :string)
      add(:sns_type, :string)
      add(:follower_count, :string)
      add(:active, :boolean)
      add(:user_id, references(:users), null: false)
      add(:sns_url, :string)

      timestamps()
    end
  end
end
