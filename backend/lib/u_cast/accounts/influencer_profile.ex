defmodule UCast.Accounts.InfluencerProfile do
  use Ecto.Schema
  import Ecto.Changeset
  alias UCast.Accounts.{User, Tag, InfluencerProfile, Category}
  alias UCast.Repo

  import Ecto.Query, warn: false

  schema "influencer_profiles" do
    field(:phone_number, :string)
    field(:sns_type, :string)
    field(:sns_url, :string)
    field(:follower_count, :string)
    field(:active, :boolean, default: false)

    belongs_to(:user, User)
    belongs_to(:category, Category)

    many_to_many(:tags, Tag,
      join_through: "influencer_profile_tags",
      on_replace: :delete
    )

    timestamps()
  end

  @doc false
  def changeset(%InfluencerProfile{} = profile, attrs) do
    required_fields = [:phone_number, :sns_type, :follower_count, :active, :sns_url]
    # sns_type is enum type in graphql schema.
    # It comes as atom, so I need to convert to string type
    %{:sns_type => sns_type} = attrs
    sns_type |> to_string() |> String.downcase()
    attrs = Map.put(attrs, :sns_type, sns_type)

    profile
    |> cast(attrs, required_fields)
    |> put_assoc(:tags, parse_tags(attrs))
    # TODO: Create category database in admin mode.
    |> put_assoc(:category, category_insert_and_get(attrs.category))
  end

  defp parse_tags(attrs) do
    (Map.get(attrs, :tags) || "")
    |> String.split(",")
    |> Enum.map(&String.trim/1)
    |> Enum.reject(&(&1 == ""))
    |> insert_and_get_all()
  end

  # put_assoc is used when I have already an associated struct so
  # before use put_assoc, do create a database record
  defp insert_and_get_all([]), do: []

  defp insert_and_get_all(names) do
    timestamp = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
    maps = Enum.map(names, &%{name: &1, inserted_at: timestamp, updated_at: timestamp})
    Repo.insert_all(Tag, maps, on_conflict: :nothing)
    Repo.all(from(t in Tag, where: t.name in ^names))
  end

  def category_insert_and_get(category) do
    ## timestamp = NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
    ## category = Map.put(category, :inserted_at, timestamp) |> Map.put(:updated_at, timestamp)
    cat_changeset = Category.changeset(%Category{}, category)
    IO.puts("Printing category: +++++++++++++++++++++++++++++++++++++++++")
    IO.inspect(cat_changeset)
    Repo.insert!(cat_changeset, on_conflict: [set: [name: category.name]], conflict_target: :name)
  end
end
