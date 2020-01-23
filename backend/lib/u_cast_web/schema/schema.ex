defmodule UCastWeb.Schema.Schema do
  use Absinthe.Schema
  alias UCastWeb.Resolvers
  alias UCastWeb.Schema.Middleware
  alias UCast.Accounts
  import Absinthe.Resolution.Helpers, only: [dataloader: 1, dataloader: 3]

  def middleware(middleware, _field, %{identifier: :mutation}) do
    middleware ++ [Middleware.ChangesetErrors]
  end

  def middleware(middleware, _field, _object) do
    middleware
  end

  query do
    @desc "Get all users"
    field :users, list_of(:user) do
      resolve(&Resolvers.Accounts.list_users/3)
    end

    @desc "Get user by id"
    field :user, :user do
      arg(:id, non_null(:id))
      resolve(&Resolvers.Accounts.get_user/3)
    end

    @desc "Get the currently signed-in user"
    field :me, :user do
      resolve(&Resolvers.Accounts.me/3)
    end

    @desc "Get only influencer"
    field :influencer, list_of(:user) do
      arg(:limit, :integer)
      arg(:category, :string)
      resolve(&Resolvers.Accounts.get_influencers/3)
    end
  end

  mutation do
    @desc "Create an user account"
    field :signup, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      arg(:name, non_null(:string))
      resolve(&Resolvers.Accounts.sign_up/3)
    end

    @desc "Creat an user account through oauth(facebook, instagram, google)"
    field :signup_oauth, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      arg(:name, non_null(:string))
      arg(:provider_name, non_null(:string))
      arg(:provider_id, non_null(:string))
      arg(:avatar_url, :string)
      resolve(&Resolvers.Accounts.sign_up_oauth/3)
    end

    @desc "Create or Get a account for google sign in"
    field :google_sign_in, :session do
      arg(:id_token, non_null(:string))
      arg(:name, non_null(:string))
      arg(:avatar_url, non_null(:string))
      resolve(&Resolvers.Accounts.google_sign_in/3)
    end

    @desc "Sign in an user"
    field :signin, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      resolve(&Resolvers.Accounts.sign_in/3)
    end

    @desc "Request an account as Influencer"
    field :request_influencer, :session do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))
      arg(:name, non_null(:string))
      arg(:phone_number, non_null(:string))
      arg(:sns_type, non_null(:sns_type))
      arg(:sns_url, non_null(:string))
      arg(:follower_count, non_null(:string))

      resolve(&Resolvers.Accounts.request_influencer/3)
    end
  end

  enum :sns_type do
    value(:youtube)
    value(:instagram)
    value(:twitter)
  end

  object :session do
    field :user, non_null(:user)
    field :token, non_null(:string)
  end

  object :user do
    field :id, non_null(:id)
    field :email, non_null(:string)
    field :name, :string
    field :avatar_url, :string
    field :intro, :string
    field :user_type, non_null(:string)
    field :provider_name, :string
    field :provider_id, :string
    field :influencer_profile, :influencer_profile, resolve: dataloader(Users)
  end

  object :influencer_profile do
    field :phone_number, non_null(:string)

    field :sns_type, non_null(:sns_type) do
      # In database, sns_type is string, so when fetch it
      # we need to convert back to atom
      resolve(fn parent, _, _ ->
        sns_type = Map.get(parent, :sns_type) |> String.to_atom()
        {:ok, sns_type}
      end)
    end

    field :sns_url, non_null(:string)
    field :follower_count, non_null(:string)
    field :active, non_null(:boolean)
    field :category, non_null(:string)
    field :tags, list_of(:tags), resolve: dataloader(Users)
  end

  object :tags do
    field :name, non_null(:string)
  end

  def context(ctx) do
    loader =
      Dataloader.new()
      |> Dataloader.add_source(Users, Accounts.datasource())

    Map.put(ctx, :loader, loader)
  end

  def plugins do
    [Absinthe.Middleware.Dataloader] ++ Absinthe.Plugin.defaults()
  end
end
