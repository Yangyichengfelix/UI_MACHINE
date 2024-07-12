using System.ComponentModel.DataAnnotations;

namespace UI_MAC2S.Models
{
    public class ResetPasswordModel : LoginModel
    {

        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string NewPasswordConfirm { get; set; }
    }
}
