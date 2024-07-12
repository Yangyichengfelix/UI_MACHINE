using UI_MAC2S.Models;

namespace UI_MAC2S.Contracts
{
    public interface IImageRepository : IBaseRepository<ImageModel>
    {
        Task<ImageModel> GetLast();
        Task<ImageModel> GetByLastLog();

    }
}
