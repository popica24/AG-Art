namespace AGART.Application.Common.DTO.Product
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Material { get; set; }
        public string Description { get; set; }
        public string Dimensions { get; set; }
        public string LightSource { get; set; }
        public long Price { get; set; }
        public int PercentOff { get; set; } = 0;
        public string[] Keywords { get; set; }

        public string CategoryId { get; set; }

    }
}