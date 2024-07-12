using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface ISensorGlobalRepository: IBaseRepository<SensorGlobalModel>
    {
        Task<IList<SensorGlobalModel>> GetValues(string url);
    }
}
