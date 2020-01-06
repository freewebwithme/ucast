defmodule UCast.Accounts do
  @moduledoc """
  The Accounts context.
  """
  import Ecto.Query, warn: false
  alias UCast.Repo

  alias UCast.Accounts.{User, InfluencerProfile}

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)
  
  def get_user(id), do: Repo.get(User, id)

  @doc """
  Get influencers from all user
  criteria - map of arguments. default is %{}
  {:limit, 5}
  {:category, "Youtuber"}
  """
  def get_influencers(criteria \\ %{}) do
    query = from i in User, where: i.user_type == "influencer"

    Enum.reduce(criteria, query, fn
      {:limit, limit}, query ->
        from u in query, limit: ^limit
      {:category, category}, query ->
        from u in query,
          join: ip in InfluencerProfile,
          where: ip.user_id == u.id and ip.category == ^category
      end)
      |> Repo.all
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
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

  def authenticate(username, password) do
    user = Repo.get_by(User, username: username)

    with %{password: hashed_password} <- user,
         true <- Comeonin.Ecto.Password.valid?(password, hashed_password) do
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
      user_changeset
      |> Ecto.Changeset.put_assoc(:influencer_profile, profile_changeset)
      |> Repo.insert()
    else
      _ ->
        {:error, "Can't create a user"}
    end

  end
  
  def datasource() do
    Dataloader.Ecto.new(UCast.Repo)
  end
end
