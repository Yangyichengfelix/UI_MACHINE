using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface ISensorUniqueRepository:IBaseRepository<SensorUniqueModel>
    {
        Task<IList<SensorUniqueModel>> GetValues(string url);

        Task<IList<SensorUniqueModel>> GetRealTimeValues(string url);


        Task<SensorUniqueModel> GetS1RealTime(string url);
        Task<SensorUniqueModel> GetS2RealTime(string url);

        Task<SensorUniqueModel> GetS3RealTime(string url);
        Task<SensorUniqueModel> GetS4RealTime(string url);
        Task<SensorUniqueModel> GetS5RealTime(string url);


        Task CallS1RealtimeEndpoint( string HubUrl);
        Task <IList<SensorUniqueModel>> CallEndpoint(string HubUrl , string url);

    }
}
