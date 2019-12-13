defmodule UCast.Accounts.InfluencerProfile do
  use Ecto.Schema
  import Ecto.Changeset

  schema "influencer_profiles" do
    field :phone_number, :string
    field :sns_type, :string
    field :sns_url, :string
    field :follower_count, :string
    field :active, :boolean, default: false 

    belongs_to :user, UCast.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    required_fields = [:phone_number, :sns_type, :follower_count, :active, :sns_url]
    # sns_type is enum type in graphql schema.
    # It comes as atom, so I need to convert to string type
    %{sns_type: sns_type} = attrs
    sns_type |> to_string() |> String.downcase()
    attrs = %{ attrs | sns_type: sns_type }  
    user
    |> cast(attrs, required_fields) 
    |> validate_required(required_fields)
  end
end
