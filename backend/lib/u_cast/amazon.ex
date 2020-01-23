defmodule UCast.Amazon do
  @moduledoc """
  Public interface module for interacting Amazon Web Service.
  """
  alias ExAws
  alias ExAws.S3
  alias UUID

  @doc """
  Generate new s3 filename in this format
  username/current_date/randomname.extension
  ex)
  james/2019-12-03/2e075d.mp4
  """

  def create_s3_filename(filepath, username) do
    utc_today = Date.utc_today()
    random_filename = UUID.uuid4(:hex) |> String.slice(0, 6)
    extension = Path.extname(filepath)
    s3_filename = "#{username}/#{utc_today}/#{random_filename}#{extension}"
    s3_filename
  end

  @doc """
  Upload to amazon S3
  """
  def upload_video_to_s3_async(path, username) do
    s3_filename = create_s3_filename(path, username)

    Task.async(fn ->
      path
      |> S3.Upload.stream_file()
      |> S3.upload(System.get_env("S3-Bucket-Name"), s3_filename)
      |> ExAws.request()
    end)
  end
end
