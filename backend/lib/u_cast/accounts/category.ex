defmodule UCast.Accounts.Category do
  use Ecto.Schema
  import Ecto.Changeset
  alias UCast.Accounts.InfluencerProfile
  alias UCast.Accounts.Category

  schema "categories" do
    field(:name, :string)

    has_many(:influencer_profiles, InfluencerProfile)

    timestamps()
  end

  @doc false
  def changeset(%Category{} = category, attrs) do
    category
    |> cast(attrs, [:name])
    |> unique_constraint(:name)
    |> validate_required(:name)
  end
end
