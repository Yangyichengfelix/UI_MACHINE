using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IStatusGroupDurationRepository
    {
        public Task<IList<StatusGroupDurationModel>> GetStatusGroupDuration(string url);
    }
}
