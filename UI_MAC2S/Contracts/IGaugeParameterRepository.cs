using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IGaugeParameterRepository:IBaseRepository<GaugeParameterModel>
    {
        Task<IList<GaugeParameterModel>> GetAllGaugeParameter(string url);
    }
}
