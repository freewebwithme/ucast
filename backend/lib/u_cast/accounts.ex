defmodule UCast.Accounts do
  @moduledoc """
  The Accounts context.
  """
  import Ecto.Query, warn: false
  alias UCast.Repo

  alias UCast.Accounts
  alias UCast.Accounts.{User, InfluencerProfile, Category, Review}

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def get_user(id), do: Repo.get(User, id)

  def update_user(%User{} = user, args) do
    IO.puts("Inspecting user")
    IO.inspect(user)

    user
    |> Ecto.Changeset.change(args)
    |> Repo.update()
  end

  @doc """
  Get influencers from all user
  criteria - map of arguments. default is %{}
  {:limit, 5}
  {:category_id, 3} 
  """
  def get_influencers(criteria \\ %{}) do
    query = from(i in User, where: i.user_type == "influencer")

    Enum.reduce(criteria, query, fn
      {:limit, limit}, query ->
        from(u in query, limit: ^limit)

      {:category_id, category_id}, query ->
        from(u in query,
          join: ip in assoc(u, :influencer_profile),
          join: c in assoc(ip, :category),
          where: ip.user_id == u.id and ip.category_id == ^category_id,
          preload: [influencer_profile: {ip, :category}]
        )
    end)
    |> Repo.all()
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Create a user from Oauth(instagram. facebook, google) provider.
  """
  def create_user_oauth(attrs \\ %{}) do
    %User{}
    |> User.oauth_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Get or insert(Upsert) a user from oauth login(google)
  """
  def get_or_insert!(attrs \\ %{}) do
    %User{}
    |> User.oauth_changeset(attrs)
    |> Repo.insert!(
      on_conflict: [set: [provider_id: attrs[:provider_id]]],
      conflict_target: [:provider_id]
    )
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  def authenticate(email, password) do
    user = Repo.get_by(User, email: email)

    with %{password: hashed_password} when not is_nil(hashed_password) <- user,
         true <- Comeonin.Ecto.Password.valid?(password, hashed_password) do
      {:ok, user}
    else
      _ -> :error
    end
  end

  @doc """
  Verify idToken from google
  """
  def authenticate_google_idToken(idToken, name, avatar_url) do
    with {:ok, result} <- UCast.GoogleToken.verify_and_validate(idToken) do
      attrs = %{
        email: result["email"],
        name: name,
        provider_id: result["sub"],
        avatar_url: avatar_url,
        provider_name: "google"
      }

      user = Accounts.get_or_insert!(attrs)
      {:ok, user}
    else
      _ -> :error
    end
  end

  def create_influencer(attrs) do
    attrs = Map.put(attrs, :user_type, "influencer")
    user_changeset = User.changeset(%User{}, attrs)
    profile_changeset = InfluencerProfile.changeset(%InfluencerProfile{}, attrs)

    with true <- user_changeset.valid?,
         true <- profile_changeset.valid? do
      IO.puts("changesets are valid")

      user_changeset
      |> Ecto.Changeset.put_assoc(:influencer_profile, profile_changeset)
      |> Repo.insert()
    else
      _ ->
        {:error, "가입할수 없습니다. 다시 시도하세요."}
    end
  end

  def create_category(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert()
  end

  def get_categories(_arg) do
    IO.puts("Calling Repo.all categories")
    Repo.all(from(c in Category))
  end

  def get_category(id) do
    Repo.get_by(Category, id: id)
  end

  @doc """
  This function for displaying homescreen
  it returns all categories and 10 influencer profiles
  """
  def get_categories_for_homescreen(limit) do
    raw_query =
      "SELECT * FROM categories c LEFT JOIN LATERAL (SELECT i.* FROM influencer_profiles i WHERE c.id = i.category_id ORDER BY i.updated_at LIMIT #{
        limit
      }) i ON 1=1 LEFT JOIN users u ON i.user_id = u.id"

    {:ok, result} = Repo.query(raw_query)

    result
    |> load_categories_for_homescreen()
  end

  @doc """
  This function uses Repo.load() to build up Ecto Schema from
  Repo.query()
  """

  def load_categories_for_homescreen(query_result) do
    # Build categories
    category_cols = Enum.slice(query_result.columns, 0, 4)
    category_rows = Enum.map(query_result.rows, &Enum.slice(&1, 0, 4))
    categories = Enum.map(category_rows, &Repo.load(Category, {category_cols, &1})) |> Enum.uniq()

    # Build InfluencerProfile
    influencer_profile_cols = Enum.slice(query_result.columns, 4, 11)
    influencer_profile_rows = Enum.map(query_result.rows, &Enum.slice(&1, 4, 11))

    influencer_profiles =
      Enum.map(
        influencer_profile_rows,
        &Repo.load(InfluencerProfile, {influencer_profile_cols, &1})
      )

    # Build Users
    user_cols = Enum.slice(query_result.columns, 15, 11)
    user_rows = Enum.map(query_result.rows, &Enum.slice(&1, 15, 11))
    users = Enum.map(user_rows, &Repo.load(User, {user_cols, &1}))
    # put users into influencer profiles
    profiles_ready =
      Enum.zip(influencer_profiles, users)
      |> Enum.map(fn {profile, user} -> Map.put(profile, :user, user) end)

    # {categories, profiles_ready, users}

    #  put profiles_ready into categories
    grouped_profiles = profiles_ready |> Enum.group_by(& &1.category_id)

    # Total influencer profiles for each category
    total = get_influencer_total()

    categories_ready =
      categories
      |> Enum.map(&%{&1 | influencer_profiles: Map.get(grouped_profiles, &1.id)})
      |> Enum.sort_by(& &1.name)
      |> Enum.map(
        &Map.put(
          &1,
          :total,
          Map.get(Enum.find(total, fn x -> x.category_name == &1.name end), :category_total)
        )
      )

    categories_ready
  end

  def get_influencer_total() do
    query =
      from(c in Category,
        join: i in InfluencerProfile,
        on: i.category_id == c.id,
        group_by: c.name,
        select: %{category_name: c.name, category_total: count()}
      )

    Repo.all(query) |> Enum.sort_by(& &1.category_name)
  end

  def create_review(user, influencer, attrs) do
    %Review{}
    |> Review.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:influencer_profile, influencer)
    |> Ecto.Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end

  def datasource() do
    Dataloader.Ecto.new(UCast.Repo, query: &query/2)
  end

  def query(InfluencerProfile, %{scope: :category, limit: limit}) do
    IO.puts("Calling query.InfluencerProfile")

    query =
      InfluencerProfile
      |> where(active: true)
      |> order_by(asc: :updated_at)
      |> limit(^limit)

    IO.puts("Printing query")
    IO.inspect(query)
    query
  end

  def query(queryable, _) do
    IO.puts("Calling regular query")
    queryable
  end
end
