defmodule UCast.CastingTest do
  use UCast.DataCase

  alias UCast.Casting

  describe "requests" do
    alias UCast.Casting.Request

    @valid_attrs %{influencer_id: "some influencer_id", instructions: "some instructions", message_from: "some message_from", message_to: "some message_to", requester: "some requester", requester_email: "some requester_email", requester_id: "some requester_id", requester_phonenumber: "some requester_phonenumber"}
    @update_attrs %{influencer_id: "some updated influencer_id", instructions: "some updated instructions", message_from: "some updated message_from", message_to: "some updated message_to", requester: "some updated requester", requester_email: "some updated requester_email", requester_id: "some updated requester_id", requester_phonenumber: "some updated requester_phonenumber"}
    @invalid_attrs %{influencer_id: nil, instructions: nil, message_from: nil, message_to: nil, requester: nil, requester_email: nil, requester_id: nil, requester_phonenumber: nil}

    def request_fixture(attrs \\ %{}) do
      {:ok, request} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Casting.create_request()

      request
    end

    test "list_requests/0 returns all requests" do
      request = request_fixture()
      assert Casting.list_requests() == [request]
    end

    test "get_request!/1 returns the request with given id" do
      request = request_fixture()
      assert Casting.get_request!(request.id) == request
    end

    test "create_request/1 with valid data creates a request" do
      assert {:ok, %Request{} = request} = Casting.create_request(@valid_attrs)
      assert request.influencer_id == "some influencer_id"
      assert request.instructions == "some instructions"
      assert request.message_from == "some message_from"
      assert request.message_to == "some message_to"
      assert request.requester == "some requester"
      assert request.requester_email == "some requester_email"
      assert request.requester_id == "some requester_id"
      assert request.requester_phonenumber == "some requester_phonenumber"
    end

    test "create_request/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Casting.create_request(@invalid_attrs)
    end

    test "update_request/2 with valid data updates the request" do
      request = request_fixture()
      assert {:ok, %Request{} = request} = Casting.update_request(request, @update_attrs)
      assert request.influencer_id == "some updated influencer_id"
      assert request.instructions == "some updated instructions"
      assert request.message_from == "some updated message_from"
      assert request.message_to == "some updated message_to"
      assert request.requester == "some updated requester"
      assert request.requester_email == "some updated requester_email"
      assert request.requester_id == "some updated requester_id"
      assert request.requester_phonenumber == "some updated requester_phonenumber"
    end

    test "update_request/2 with invalid data returns error changeset" do
      request = request_fixture()
      assert {:error, %Ecto.Changeset{}} = Casting.update_request(request, @invalid_attrs)
      assert request == Casting.get_request!(request.id)
    end

    test "delete_request/1 deletes the request" do
      request = request_fixture()
      assert {:ok, %Request{}} = Casting.delete_request(request)
      assert_raise Ecto.NoResultsError, fn -> Casting.get_request!(request.id) end
    end

    test "change_request/1 returns a request changeset" do
      request = request_fixture()
      assert %Ecto.Changeset{} = Casting.change_request(request)
    end
  end
end
