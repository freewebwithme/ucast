defmodule UCast.Accounts.Review do
  @moduledoc """
  This is Review for Influencer
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias UCast.Accounts.{User, InfluencerProfile, Review}

  schema "reviews" do
    field(:content, :string)

    belongs_to(:influencer_profile, InfluencerProfile)
    belongs_to(:user, User)

    timestamps()
  end

  def changeset(%Review{} = review, attrs) do
    review
    |> cast(attrs, [:content])
    |> validate_required(:content)
    |> validate_length(:content, min: 3, max: 300)
  end
end
