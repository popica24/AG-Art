namespace AGART.Application.Common.Utilities;

public static class GlobalConstants
{
    public const string ApplicationName = "AGART.API";

    public static class RedisKeys
    {
        public const string Latest = "latest-added";
        public const string Recommanded = "recommanded";
    }

    public static class PaymentMethod
    {
        public const string Card = "Card";
        public const string Cash = "Cash";
    }
}