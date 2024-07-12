namespace UI_MAC2S.Contracts
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> Get(string url, int id);
        Task<IList<T>> GetAll(string url);
        Task<bool> Create(string url, T obj);
        Task<bool> Update(string url, T obj, int id);
        Task<bool> Delete(string url, int id);
    }
}
