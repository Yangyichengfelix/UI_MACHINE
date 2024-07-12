using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IActivityReportRepository: IBaseRepository<ActivityReportModel>
    {
        public  Task<IList<ActivityReportModel>> GetActivityReport(string url);
    }
}
