defmodule UCastWeb.Schema.Query.AccountsTest do
  use UCastWeb.ConnCase, async: true

  setup do
    UCast.Seeds.run()
  end

  @query """
  {
    users {
      username
      name
      email
      userType
      avatarUrl
      intro
    }
  }
  """
  test "users returns all users" do
    conn = build_conn()
    conn = get(conn, "/api", query: @query)

    assert json_response(conn, 200) == %{
             "data" => %{
               "users" => [
                 %{
                   "avatarUrl" => nil,
                   "email" => "taehwan@example.com",
                   "intro" => nil,
                   "name" => "taehwan",
                   "userType" => "customer",
                   "username" => "taedori"
                 },
                 %{
                   "avatarUrl" => nil,
                   "email" => "jihye@example.com",
                   "intro" => nil,
                   "name" => "jijye",
                   "userType" => "customer",
                   "username" => "jihye"
                 },
                 %{
                   "avatarUrl" => nil,
                   "email" => "yoonseo@example.com",
                   "intro" => nil,
                   "name" => "yoonseo",
                   "userType" => "customer",
                   "username" => "yoonseo"
                 },
                 %{
                   "avatarUrl" => nil,
                   "email" => "bruce@example.com",
                   "intro" => nil,
                   "name" => "Bruce Willis",
                   "userType" => "influencer",
                   "username" => "brucewillis"
                 }
               ]
             }
           }
  end

  #  @query """
  #  {
  #    user(id: 2) {
  #      username
  #      name
  #      email
  #      userType
  #      avatarUrl
  #      intro
  #    }
  #  }
  #  """
  #  test "get an user by id" do
  #    conn = build_conn()
  #    conn = get(conn, "/api", query: @query)
  #    assert json_response(conn, 200) == %{
  #      "data" => %{
  #        "user" => %{
  #          "avatar_url" => nil,
  #          "email" => "taehwan@example.com",
  #          "intro" => nil,
  #          "name" => "taehwan",
  #          "user_type" => "customer",
  #          "username" => "taedori"
  #        }
  #      }
  #    }
  #  end
end
