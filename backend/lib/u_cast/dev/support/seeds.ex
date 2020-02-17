defmodule UCast.Seeds do
  alias UCast.Repo
  alias UCast.Accounts.{User}

  @tags [
    "Youtuber, Mc",
    "Entertainer, Actor",
    "Comedian, MC, Entertainer",
    "Singer, Teacher",
    "Comedian, Actor, Model",
    "Entrepreneur, Real housewife"
  ]
  @category ["엠씨", "코메디언", "가수", "작곡가", "유투버", "프로게이머", "컨텐츠 크리에이터", "작사가", "운동선수", "헬스 트레이너"]
  @urls [
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/adult-beard-boy-casual-220453.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/women-s-white-and-black-button-up-collared-shirt-774909.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/close-up-photo-of-woman-1680693.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/closeup-photo-of-woman-with-brown-coat-and-gray-top-733872.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/face-facial-hair-fine-looking-guy-614810.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/man-wearing-black-zip-up-jacket-near-beach-smiling-at-the-736716.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/woman-in-black-scoop-neck-shirt-smiling-38554.jpg",
    "https://ucastprofilepic.s3-us-west-2.amazonaws.com/woman-wearing-black-eyeglasses-1239291.jpg"
  ]
  @sns_names ["intagram", "youtube", "facebook", "twitter"]

  # Create influencers
  def run() do
    for x <- 0..20 do
      attrs = %{
        name: "김구라#{x}",
        email: "user#{x}@example.com",
        password: "secret",
        avatar_url: Enum.random(@urls),
        intro: "Hello this is kimgura#{x}",
        user_type: "influencer",
        follower_count: "231231",
        sns_type: Enum.random(@sns_names),
        sns_url: "www.instagram.com/user#{x}",
        phone_number: "213-444-6666",
        category: %{name: Enum.random(@category)},
        tags: Enum.random(@tags)
      }

      UCast.Accounts.create_influencer(attrs)
    end

    # Users
    _taehwan =
      %User{}
      |> User.changeset(%{
        email: "taehwan@example.com",
        password: "secret",
        name: "taehwan",
        avatar_url: "image url",
        intro: "Hello this is the founder of Kameo",
        user_type: "customer"
      })
      |> Repo.insert!()

    _jihye =
      %User{}
      |> User.changeset(%{
        email: "jihye@example.com",
        password: "secret",
        name: "jijye",
        avatar_url: "image url",
        intro: "Hello this is the taehwan's wife",
        user_type: "customer"
      })
      |> Repo.insert!()

    _yoonseo =
      %User{}
      |> User.changeset(%{
        email: "yoonseo@example.com",
        password: "secret",
        name: "yoonseo",
        avatar_url: "image url",
        intro: "Hello this is the co-founder of Kameo",
        user_type: "customer"
      })
      |> Repo.insert!()
  end
end
