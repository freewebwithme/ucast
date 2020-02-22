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

  def sign_up_oauth(_parent, args, _resolution) do
    IO.puts("Inspecting Args")
    IO.inspect(args)

    with {:ok, user} <- Accounts.create_user_oauth(args) do
      token = UCastWeb.AuthToken.sign(user)
      {:ok, %{user: user, token: token}}
    end
  end

  def get_user(_, %{id: id}, _) do
    {:ok, Accounts.get_user(id)}
  end

  def get_influencers(_, args, _) do
    {:ok, Accounts.get_influencers(args)}
  end

  def get_categories(_, args, _) do
    {:ok, Accounts.get_categories(args)}
  end

  def get_category(_, %{id: id}, _) do
    category = Accounts.get_category(id)
    {:ok, category}
  end

  def sign_in(_, %{email: email, password: password}, _) do
    case Accounts.authenticate(email, password) do
      {:ok, user} ->
        token = UCastWeb.AuthToken.sign(user)
        {:ok, %{user: user, token: token}}

      :error ->
        {:error, "비밀번호와 계정이 일치하지 않습니다."}
    end
  end

  def google_sign_in(_, %{id_token: idToken, name: name, avatar_url: avatar_url}, _) do
    # Authenticate validity of idToken
    IO.puts("Printing idToken......")
    IO.inspect(idToken)

    case Accounts.authenticate_google_idToken(idToken, name, avatar_url) do
      {:ok, user} ->
        token = UCastWeb.AuthToken.sign(user)
        {:ok, %{user: user, token: token}}

      :error ->
        {:error, "로그인 도중에 문제가 발생했습니다.  다시 시도하세요"}
    end
  end

  def me(_, _, %{context: %{current_user: user}}) do
    IO.puts("Found a user")
    {:ok, user}
  end

  def me(_, _, _) do
    IO.puts("empty me....")
    {:ok, nil}
  end

  def request_influencer(_, args, _) do
    # Change sns_type to string.
    %{sns_type: sns_type} = args
    args = %{args | sns_type: to_string(sns_type)}

    with {:ok, user} <- Accounts.create_influencer(args) do
      token = UCastWeb.AuthToken.sign(user)
      {:ok, %{user: user, token: token}}
    end
  end

  def get_profile(user, _, _) do
    query = Ecto.assoc(user, :influencer_profile)
    {:ok, Repo.one(query)}
  end

  def get_categories_for_homescreen(_, %{limit: limit}, _) do
    categories = Accounts.get_categories_for_homescreen(limit)
    {:ok, categories}
  end
end
