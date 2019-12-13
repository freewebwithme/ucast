defmodule UCastWeb.Schema.Mutation.CreateInfluencer do
  use UCastWeb.ConnCase, async: true

  @query """
  mutation ($username: String!, $email: String!, $password: String!, $name: String!, $phoneNumber: String!, $snsType: SnsType!, $snsUrl: String!, $followerCount: String!) {
    requestInfluencer(username: $username, email: $email, password: $password, name: $name, phoneNumber: $phoneNumber, snsType: $snsType, snsUrl: $snsUrl, followerCount: $followerCount) {
      user {
        username
        userType
      }
    }
  }
  """
  @variables %{
    email: "taedol@example.com",
    username: "taedol",
    name: "taedol kim",
    password: "secret",
    phoneNumber: "2135055819",
    snsType: "TWITTER",
    snsUrl: "www.twitter.com",
    followerCount: "595959"
  }
  test "signing up as Influencer" do
    conn = post(build_conn(), "/api", %{
      query: @query,
      variables: @variables
    })
    assert %{"data" => %{
      "requestInfluencer" => session
    }} = json_response(conn, 200)

    assert %{
      "user" => user_data
    } = session

    assert %{"username" => "taedol", "userType" => "influencer"} == user_data
  end
end
