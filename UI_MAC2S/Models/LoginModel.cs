using System.ComponentModel.DataAnnotations;

namespace UI_MAC2S.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email Address")]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
