namespace backend.Utils
{
    public enum HttpResponseCode
    {
        OK = 200,
        Created = 201,
        Deleted = 204,
        BadRequest = 400,
        Unauthorized = 401,
        NotFound = 404,
        NotAcceptable = 406,
        ServerError = 500,
    }
}
