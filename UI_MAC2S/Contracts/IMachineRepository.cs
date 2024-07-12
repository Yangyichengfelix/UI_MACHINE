using UI_MAC2S.Models;
namespace UI_MAC2S.Contracts
{
    public interface IMachineRepository : IBaseRepository<MachineModel>
    {
        Task<IList<MachineModel>> GetMachines();
        Task<IList<MachineModel>> GetMachinesByUserId(string url,string uid);
        //string BuildConnectionString(int id);

    }

}
