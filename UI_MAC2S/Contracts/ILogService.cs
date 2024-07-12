using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface ILogService
    {
        Task<List<LogDurationModel>> GetLogDurations();
    }
}
