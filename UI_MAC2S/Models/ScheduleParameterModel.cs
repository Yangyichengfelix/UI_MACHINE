namespace UI_MAC2S.Models
{
    public class ScheduleParameterModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
    }
}
