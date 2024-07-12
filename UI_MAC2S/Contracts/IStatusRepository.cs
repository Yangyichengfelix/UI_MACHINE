using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IStatusRepository : IBaseRepository<StatusSimpleModel>
    {
        public Task<IList<StatusSimpleModel>> GetStatusList(string url);
    }
}
