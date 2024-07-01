namespace AGART.Application.Common.Interfaces.Persistance
{
    public interface ICacheRepository
    {
        T GetData<T>(string key);

        bool SetData<T>(string key, T value, DateTimeOffset expirationTime);

        object RemoveData(string key);
    }
}