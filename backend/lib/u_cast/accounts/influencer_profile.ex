defmodule UCast.Accounts.InfluencerProfile do
  use Ecto.Schema
  import Ecto.Changeset
  alias UCast.Accounts.{User, Tag, InfluencerProfile}
  alias UCast.Repo

  import Ecto.Query, warn: false

  schema "influencer_profiles" do
    field :phone_number, :string
    field :sns_type, :string
    field :sns_url, :string
    field :follower_count, :string
    field :active, :boolean, default: false 
    field :category, :string

    belongs_to :user, User
    many_to_many :tags, Tag,
      join_through: "influencer_profile_tags",
    on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(%InfluencerProfile{} = user, attrs) do
    required_fields = [:phone_number, :sns_type, :follower_count, :active, :sns_url, :category]
    # sns_type is enum type in graphql schema.
    # It comes as atom, so I need to convert to string type
    %{:sns_type => sns_type} = attrs
    sns_type |> to_string() |> String.downcase()
    attrs = Map.put(attrs, :sns_type, sns_type) 
    user
    |> cast(attrs, required_fields) 
    |> put_assoc(:tags, parse_tags(attrs))
  end

  defp parse_tags(attrs) do
    (Map.get(attrs, :tags)|| "")
    |> String.split(",")
    |> Enum.map(&String.trim/1)
    |> Enum.reject(& &1 == "")
    |> insert_and_get_all() 
  end

  defp insert_and_get_all([]), do: []

  defp insert_and_get_all(names) do
    timestamp = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
    maps = Enum.map(names, &%{name: &1, inserted_at: timestamp, updated_at: timestamp})
    Repo.insert_all(Tag, maps, on_conflict: :nothing)
    Repo.all(from t in Tag, where: t.name in ^names)
  end
end
