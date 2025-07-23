using AGART.Application.Common.Interfaces.Persistance;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace AGART.Services.Persistance.Repositories
{
    public class CacheRepository : ICacheRepository
    {
        private readonly IDatabase _cacheDb;

        public CacheRepository()
        {
            string connectionString = Environment.GetEnvironmentVariable("REDIS_CONNECTION")!;
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = "redis:6379"; // fallback for Docker
            }
            var redis = ConnectionMultiplexer.Connect(connectionString);
            _cacheDb = redis.GetDatabase();
        }

        public T GetData<T>(string key)
        {
            var value = _cacheDb.StringGet(key);
            if (!string.IsNullOrEmpty(value))
                return JsonConvert.DeserializeObject<T>(value);
            return default;
        }

        public object RemoveData(string key)
        {
            var _exist = _cacheDb.KeyExists(key);

            return _exist ? _cacheDb.KeyDelete(key) : false;
        }

        public bool SetData<T>(string key, T value, DateTimeOffset expirationTime)
        {
            var expiryTime = expirationTime.DateTime.Subtract(DateTime.Now);

            return _cacheDb.StringSet(key, JsonConvert.SerializeObject(value), expiryTime);
        }
    }
}
