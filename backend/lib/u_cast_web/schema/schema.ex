defmodule UCastWeb.Schema.Schema do
  use Absinthe.Schema
  alias UCastWeb.Resolvers
  alias UCastWeb.Schema.Middleware

  def middleware(middleware, _field, %{identifier: :mutation}) do
    middleware ++ [Middleware.ChangesetErrors]
  end

  def middleware(middleware, _field, _object) do
    middleware
  end

  query do
    @desc "Get all users"
    field :users, list_of(:user) do
      resolve &Resolvers.Accounts.list_users/3
    end

    @desc "Get user by id"
    field :user, :user do
      arg :id, non_null(:id)
      resolve &Resolvers.Accounts.get_user/3
    end

    @desc "Get the currently signed-in user"
    field :me, :user do
      resolve &Resolvers.Accounts.me/3
    end
  end

  mutation do
    @desc "Create an user account"
    field :signup, :session do
      arg :username, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      arg :name, non_null(:string)
      resolve &Resolvers.Accounts.sign_up/3
    end

    @desc "Sign in an user"
    field :signin, :session do
      arg :username, non_null(:string)
      arg :password, non_null(:string)
      resolve &Resolvers.Accounts.sign_in/3
    end

    @desc "Request an account as Influencer"
    field :request_influencer, :session do
      arg :username, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      arg :name, non_null(:string)
      arg :phone_number, non_null(:string)
      arg :sns_type, non_null(:sns_type)
      arg :sns_url, non_null(:string)
      arg :follower_count, non_null(:string)
      
      resolve &Resolvers.Accounts.request_influencer/3
    end
  end

  enum :sns_type do
    value :youtube
    value :instagram
    value :twitter
  end

  object :session do
    field :user, non_null(:user)
    field :token, non_null(:string)
  end

  object :user do
    field :id, non_null(:id)
    field :email, non_null(:string)
    field :username, non_null(:string)
    field :name, :string
    field :avatar_url, :string
    field :intro, :string
    field :user_type, non_null(:string)

    field :profile, :profile do
      resolve &Resolvers.Accounts.get_profile/3
    end
  end

  object :profile do
    field :phone_number, non_null(:string)
    field :sns_type, non_null(:sns_type) do
      # In database, sns_type is string, so when fetch it
      # we need to convert back to atom
      resolve fn parent, _, _ ->
        sns_type = Map.get(parent, :sns_type) |> String.to_atom 
        {:ok, sns_type}
      end
    end
    field :sns_url, non_null(:string)
    field :follower_count, non_null(:string)
    field :active, non_null(:boolean)
  end
end
