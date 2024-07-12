using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface ISensorPlRepository
    {
        Task<SensorBaseModel> GetPlRealTime(string url);

    }
}
