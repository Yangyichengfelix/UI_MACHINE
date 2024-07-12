using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using Radzen;
using System.Security.Claims;
using UI_MAC2S.Contracts;
using UI_MAC2S.Models;

namespace UI_MAC2S.Components.DatabaseSelectComponents
{
    public partial class MachineSelectComponent
    {

        [Inject] AuthenticationStateProvider AuthenticationStateProvider { get; set; }
        [Inject] NavigationManager _navManager { get; set; }
        [Inject] NotificationService NotificationService { get; set; }
        [Inject] ISensorUniqueRepository _sensorUnique { get; set; }
        [Inject] IStatusDurationRepository _statusDuration { get; set; }
        [Inject] IStatusRepository _status { get; set; }
        [Inject] IStatusGroupDurationRepository _statusGroupDuration { get; set; }
        [Inject] IMachineRepository _machineRepo { get; set; }
        [Inject] IDbSelectRepository _dbSelectRepo { get; set; }
        [Inject] ILogDurationRepository _logDuration { get; set; }
        [Inject] IActivityReportRepository _activityReport { get; set; }
        [Inject] IGaugeParameterRepository _gaugeRepo { get; set; }
        [Inject] IImageRepository _imageRepo { get; set; }
        [Inject] IJSRuntime JsRuntime { get; set; }
        [Inject] HttpClient client { get; set; }
        public class MachineSelectModel
        {
            public int Id { get; set; }
            public string Name { get; set; }

        }
        protected IEnumerable<MachineModel> Machines;

        public int selectedDbId { get; set; } = 0;

        public string selectedDb { get; set; }="" ;

        [Parameter]
        public EventCallback<string> OnSelectDatabase { get; set; }

        #region Properties


        protected IEnumerable<Claim> _claims = Enumerable.Empty<Claim>();
        protected MachineModel MachineSelection;
        protected IEnumerable<MachineSelectModel> MachineData;
        protected IEnumerable<MachineModel> MachineRawData;
        protected string machineName;
        protected string uid;
        protected string name;
        protected bool busy;
        protected bool isSuccess = true;
        protected MachineModel selectModel;
        #endregion Properties

        public void HandleChange(ChangeEventArgs args)
        {
            Console.WriteLine(args.Value);
            selectedDb = args.Value.ToString();
            OnSelectDatabase.InvokeAsync(selectedDb);
        }

        //protected  EventCallback<string> SelectDatabase(ChangeEventArgs e)
        //{
        //    selectedDb = e.Value.ToString();

        //    OnSelectDatabase.InvokeAsync(selectedDb);
        //    StateHasChanged();
        //    return OnSelectDatabase;

        //}

        protected async override Task OnInitializedAsync()
        {
            AuthenticationState authState = await AuthenticationStateProvider.GetAuthenticationStateAsync();
            ClaimsPrincipal user = authState.User;
            if (user.Identity.IsAuthenticated)
            {
                _claims = user.Claims;
                uid = _claims.FirstOrDefault(s => s.Type == "uid")?.Value;
                MachineRawData = await _machineRepo.GetMachinesByUserId(Endpoints.Endpoint.MachineEndpoint, uid);

                StateHasChanged();
                Console.WriteLine(MachineRawData.Count());
            }
            else
            {
            }
        }
    }
}
