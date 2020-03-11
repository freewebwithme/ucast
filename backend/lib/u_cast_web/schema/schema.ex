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

    @desc "Get all categories"
    field :categories, list_of(:category) do
      resolve(&Resolvers.Accounts.get_categories/3)
    end

    @desc "Get all categories for homescreen"
    field :categories_for_home, list_of(:category_homescreen) do
      arg(:limit, non_null(:integer), default_value: 3)
      resolve(&Resolvers.Accounts.get_categories_for_homescreen/3)
    end

    @desc "Get a category"
    field :category, :category do
      arg(:id, non_null(:integer))
      resolve(&Resolvers.Accounts.get_category/3)
    end

    @desc "Get an Influencer"
    field :influencer, :influencer_profile do
      arg(:id, non_null(:id))
      resolve(&Resolvers.Accounts.get_influencer/3)
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

    @desc "Update User information"
    field :update_me, :user do
      arg(:email, :string)
      arg(:name, :string)
      arg(:intro, :string)
      arg(:avatar_url, :string)
      resolve(&Resolvers.Accounts.update_user/3)
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
    field(:user, non_null(:user))
    field(:token, non_null(:string))
  end

  object :user do
    field(:id, non_null(:id))
    field(:email, non_null(:string))
    field(:name, :string)
    field(:avatar_url, :string)
    field(:intro, :string)
    field(:user_type, non_null(:string))
    field(:provider_name, :string)
    field(:provider_id, :string)
    field(:influencer_profile, :influencer_profile, resolve: dataloader(Users))
  end

  object :influencer_profile do
    field(:id, non_null(:integer))

    field :price, non_null(:integer) do
      resolve(fn parent, _, _ ->
        money = Map.get(parent, :price) |> Money.to_string()
        {:ok, money}
      end)
    end

    field(:phone_number, non_null(:string))

    field :sns_type, non_null(:sns_type) do
      # In database, sns_type is string, so when fetch it
      # we need to convert back to atom
      resolve(fn parent, _, _ ->
        sns_type = Map.get(parent, :sns_type) |> String.to_atom()
        {:ok, sns_type}
      end)
    end

    field(:sns_url, non_null(:string))
    field(:follower_count, non_null(:string))
    field(:active, non_null(:boolean))
    field(:category, :category, resolve: dataloader(Users, :category, []))
    field(:tags, list_of(:tags), resolve: dataloader(Users))
    field(:user, :user, resolve: dataloader(Users))
    field(:reviews, list_of(:review), resolve: dataloader(Users))
  end

  object :tags do
    field(:id, non_null(:integer))
    field(:name, non_null(:string))
  end

  object :category do
    field(:id, non_null(:integer))
    field(:name, non_null(:string))

    field :influencer_profiles, list_of(:influencer_profile) do
      arg(:limit, type: :integer, default_value: 100)
      resolve(dataloader(Users, :influencer_profiles, args: %{scope: :category}))
    end
  end

  object :review do
    field(:content, non_null(:string))
    field(:user, :user, resolve: dataloader(Users))
    field(:influencer_profile, :influencer_profile, resolve: dataloader(Users))
  end

  @doc """
  Special object type for only home screen
  """

  object :category_homescreen do
    field(:id, non_null(:integer))
    field(:name, non_null(:string))
    field(:total, non_null(:integer))

    field :influencer_profiles, list_of(:influencer_profile_homescreen) do
      resolve(fn parent, _, _ ->
        {:ok, parent.influencer_profiles}
      end)
    end
  end

  @doc """
  Special influencer_profile object type for only home screen
  infer user object from its parent(influencer_profile) directly
  Because query result already has a data.
  """
  object :influencer_profile_homescreen do
    field(:id, non_null(:integer))

    field :price, non_null(:integer) do
      resolve(fn parent, _, _ ->
        money = Map.get(parent, :price) |> Money.to_string()
        {:ok, money}
      end)
    end

    field(:phone_number, non_null(:string))

    field :sns_type, non_null(:sns_type) do
      # In database, sns_type is string, so when fetch it
      # we need to convert back to atom
      resolve(fn parent, _, _ ->
        sns_type = Map.get(parent, :sns_type) |> String.to_atom()
        {:ok, sns_type}
      end)
    end

    field(:sns_url, non_null(:string))
    field(:follower_count, non_null(:string))
    field(:active, non_null(:boolean))
    field(:category, :category, resolve: dataloader(Users, :category, []))
    field(:tags, list_of(:tags), resolve: dataloader(Users))
    field(:reviews, list_of(:review), resolve: dataloader(Users))

    field :user, :user do
      resolve(fn parent, _, _ ->
        {:ok, parent.user}
      end)
    end
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
