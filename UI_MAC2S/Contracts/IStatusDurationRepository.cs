using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IStatusDurationRepository
    {
        public Task<IList<StatusDurationModel>> GetStatusDuration(string url);

    }
}
