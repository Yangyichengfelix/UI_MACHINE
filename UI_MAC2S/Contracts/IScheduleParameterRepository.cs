using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IScheduleParameterRepository : IBaseRepository<ScheduleParameterModel>
    {
        Task<IList<ScheduleParameterModel>> GetAllScheduleParameter(string url);
    }
}
