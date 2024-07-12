namespace UI_MAC2S.Contracts
{
    public interface IDbSelectRepository
    {
        public Task<bool> SelectDb(string dbName);

    }
}
