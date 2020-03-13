defmodule UCast.Seeds do
  alias UCast.Repo
  alias UCast.Accounts
  alias UCast.Accounts.{User, InfluencerProfile, Review}
  import Ecto.Query

  @tags [
    "Youtuber, MC",
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
  @prices [35000, 55000, 60000, 100_000, 200_000, 10000, 20000, 1_000_000]
  @reviews [
    "Thanks for your video",
    "What a nice cameo!",
    "You made my day",
    "My husband was happy with your cameo"
  ]

  # Create influencers
  def create_influencer(attrs) do
    attrs = Map.put(attrs, :user_type, "influencer")
    user_changeset = User.changeset(%User{}, attrs)

    # user_changeset_with_review = Ecto.Changeset.put_assoc(user_changeset, :reviews, attrs.reviews)
    profile_changeset = InfluencerProfile.changeset(%InfluencerProfile{}, attrs)

    # profile_changeset_with_review = Ecto.Changeset.put_assoc(profile_changeset, :reviews, attrs.reviews)

    with true <- user_changeset.valid?,
         true <- profile_changeset.valid? do
      IO.puts("changesets are valid")

      user_changeset
      |> Ecto.Changeset.put_assoc(:influencer_profile, profile_changeset)
      |> Repo.insert()
    else
      _ ->
        IO.inspect(profile_changeset)
    end
  end

  def create_review(user, influencer, attrs) do
    %Review{}
    |> Review.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:influencer_profile, influencer)
    |> Ecto.Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end

  def run() do
    for x <- 0..99 do
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
        tags: Enum.random(@tags),
        active: true,
        price: Enum.random(@prices),
        reviews: [%{content: Enum.random(@reviews)}]
      }

      create_influencer(attrs)
    end

    for y <- 0..19 do
      user_attrs = %{
        name: "이경규#{y}",
        email: "customer#{y}@example.com",
        password: "secret",
        avatar_url: Enum.random(@urls),
        intro: "안녕하세요 이경규#{y} 입니다",
        user_type: "customer",
        reviews: [%{content: Enum.random(@reviews)}]
      }

      Accounts.create_user(user_attrs)
    end

    all_influencers = Repo.all(from(i in InfluencerProfile))
    all_customers = Repo.all(from(u in User, where: u.user_type == "customer"))

    for z <- 0..199 do
      create_review(Enum.random(all_customers), Enum.random(all_influencers), %{
        content: Enum.random(@reviews),
        rating: Enum.random(1..5)
      })
    end
  end
end
