defmodule UCastWeb.Resolvers.Accounts do
  alias UCast.Accounts
  alias UCast.Repo


  def list_users(_, _, _) do
    {:ok, Accounts.list_users()}
  end

  def sign_up(_, args, _) do
    with {:ok, user} <- Accounts.create_user(args) do
      token = UCastWeb.AuthToken.sign(user)
      {:ok, %{user: user, token: token}}
    end
  end

  def get_user(_, %{id: id}, _) do
    {:ok, Accounts.get_user(id)}
  end

  def sign_in(_, %{username: username, password: password}, _) do
    case Accounts.authenticate(username, password) do
      {:ok, user} ->
        token = UCastWeb.AuthToken.sign(user)
        {:ok, %{user: user, token: token}}
      :error ->
        {:error, "Oops, invalid username or password!"}
    end
  end
  
  def me(_, _, %{context: %{current_user: user}}) do
    {:ok, user}
  end

  def me(_, _, _) do
    {:ok, nil}
  end

  def request_influencer(_, args, _) do
    # Change sns_type to string.
    %{sns_type: sns_type} = args
    args = %{ args | sns_type: to_string(sns_type) }

    with {:ok, user} <- Accounts.create_influencer(args) do
      token = UCastWeb.AuthToken.sign(user)
      {:ok, %{user: user, token: token}}
    end
  end

  def get_profile(user, _, _) do
    query = Ecto.assoc(user, :influencer_profile)
    {:ok, Repo.one(query)} 
  end
end
