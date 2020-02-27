# IEx.configure colors: [enabled: true]
# IEx.configure colors: [ eval_result: [ :cyan, :bright ] ]
IO.puts(
  IO.ANSI.red_background() <>
    IO.ANSI.white() <> " ❄❄❄ No Other Name, Only Jesus ❄❄❄ " <> IO.ANSI.reset()
)

Application.put_env(:elixir, :ansi_enabled, true)

IEx.configure(
  colors: [
    eval_result: [:green, :bright],
    eval_error: [[:red, :bright, "Bug Bug ..!!"]],
    eval_info: [:yellow, :bright]
  ],
  default_prompt:
    [
      # ANSI CHA, move cursor to column 1
      "\e[G",
      :white,
      "I",
      :red,
      # plain string
      "❤",
      :green,
      "%prefix",
      :white,
      "|",
      :blue,
      "%counter",
      :white,
      "|",
      :red,
      # plain string
      "▶",
      :white,
      # plain string
      "▶▶",
      # ❤ ❤-»" ,  # plain string
      :reset
    ]
    |> IO.ANSI.format()
    |> IO.chardata_to_string()
)

alias UCast.Accounts
alias UCast.Accounts.{User, InfluencerProfile, Tag, Category, Review}
alias UCast.Casting
alias UCast.Casting.{Request}
alias UCast.Repo
alias Ecto.Changeset
alias ExAws.{S3}
import Ecto.Query
import Ecto.Changeset

saved_attrs = %{
  name: "Taehwan",
  email: "tattat@exmaple.com",
  password: "secret",
  avatar_url: "non",
  intro: "Hello this is taehwan",
  user_type: "influencer",
  follower_count: "444444",
  sns_type: "instagram",
  sns_url: "www.instagram.com/taehwan",
  phone_number: "213-505-5912",
  category: %{name: "엠씨"},
  tags: "Youtuber, MC",
  active: true,
  price: 500000,
  reviews: [%{content: "Thanks for your video"}]
}
