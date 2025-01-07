namespace PGMates.DTO
{
    public class ServerResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }

        public object Data { get; set; }
    }
}