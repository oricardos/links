namespace LinksApi.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Url { get; set; } = "";
        public string Category { get; set; } = "";
    }
}