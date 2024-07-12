using Microsoft.AspNetCore.Authorization;
using UI_MAC2S.Models;
using System.Globalization;
using System.Net.Http;
using Radzen;
using Radzen.Blazor;
using System.Linq.Dynamic.Core;
using UI_MAC2S.Models;
using UI_MAC2S.Endpoints;
using UI_MAC2S.Contracts;
using Microsoft.AspNetCore.Components;

namespace UI_MAC2S.Pages
{

    [Authorize]
    public partial class ChangePassword
    {
        #region Dependency injection

        [Inject] IAuthenticationRepository _authRepo { get; set; }
        [Inject] NavigationManager _navManager { get; set; }
        [Inject] NotificationService NotificationService { get; set; }
        // [Inject] IPageProgressService PageProgressService { get; set; }
        #endregion Dependency injection

        protected bool busy;
        protected bool response = true;
        ResetPasswordModel model = new ResetPasswordModel();
        protected async Task ResetPasswordHandle()
        {
            busy = true;

            response = await _authRepo.ResetPassword(model);
            if (response)
            {
                NotificationMessage success = new NotificationMessage
                {
                    Severity = NotificationSeverity.Success,
                    Summary = $"Password of {model.UserName} has been changed",
                    Detail = $"Password of {model.UserName} has been changed",
                    Duration = 4000
                };
                NotificationService.Notify(success);

                NavigateToIndexPage();
            }
            else
            {
                NotificationMessage failure = new NotificationMessage
                {
                    Severity = NotificationSeverity.Error,
                    Summary = $"Something wrong when trying to reset password of {model.UserName} ",
                    Detail = $"Something wrong when trying to reset password of {model.UserName}, please verify your old password ",
                    Duration = 4000
                };
                NotificationService.Notify(failure);
                busy = false;

            }
        }
        protected void NavigateToIndexPage()
        {
            _navManager.NavigateTo("/");
        }
        #region loading

        #endregion
    }
}
