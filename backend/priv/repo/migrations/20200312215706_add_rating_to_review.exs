defmodule UCast.Repo.Migrations.AddRatingToReview do
  use Ecto.Migration

  def change do
    alter table("reviews") do
      add(:rating, :integer)
    end
  end
end
