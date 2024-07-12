using System.ComponentModel.DataAnnotations;
namespace UI_MAC2S.Models
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string UserName { get; set; }
    }
}
