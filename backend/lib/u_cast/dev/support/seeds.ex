defmodule UCast.Seeds do

  alias UCast.Repo
  alias UCast.Accounts.{User, InfluencerProfile}

  def run() do

    # Users
    taehwan =
      %User{}
      |> User.changeset(%{
        username: "taedori",
        email: "taehwan@example.com",
        password: "secret",
        name: "taehwan",
        avatar_url: "image url",
        intro: "Hello this is the founder of Kameo",
        user_type: "customer"
      })
      |> Repo.insert!
    jihye =
      %User{}
      |> User.changeset(%{
        username: "jihye",
        email: "jihye@example.com",
        password: "secret",
        name: "jijye",
        avatar_url: "image url",
        intro: "Hello this is the taehwan's wife",
        user_type: "customer"
      })
      |> Repo.insert!
    yoonseo =
      %User{}
      |> User.changeset(%{
        username: "yoonseo",
        email: "yoonseo@example.com",
        password: "secret",
        name: "yoonseo",
        avatar_url: "image url",
        intro: "Hello this is the co-founder of Kameo",
        user_type: "customer"
      })
      |> Repo.insert!


    bruce_willis = 
     UCast.Accounts.create_influencer(
        %{name: "Bruce Willis",
          email: "bruce@example.com",
          username: "brucewillis",
          password: "secret",
          avatar_url: "image_url",
          intro: "Hello I am Bruce",
          follower_count: "1002340",
          sns_type: "instagram",
          sns_url: "www.instagram.com/brucewillis",
          phone_number: "2134445555"}
      )
    :ok
  end
end
