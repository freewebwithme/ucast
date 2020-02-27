defmodule UCast.Accouts.InfluencerProfile.Tags do
  use Ecto.Schema
  import Ecto.Changeset

  schema "influencer_profile_tags" do
    belongs_to(:influencer_profile, UCast.Accounts.InfluencerProfile)
    belongs_to(:tag, UCast.Accounts.Tag)
    timestamps()
  end
end
