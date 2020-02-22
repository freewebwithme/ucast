defmodule UCast.Repo.Migrations.AddPriceFieldToInfluencerProfile do
  use Ecto.Migration

  def change do
    alter table(:influencer_profiles) do
      add(:price, :integer)
    end
  end
end
