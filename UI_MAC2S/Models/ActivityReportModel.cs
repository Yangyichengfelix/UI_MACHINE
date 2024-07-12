namespace UI_MAC2S.Models
{
    public class ActivityReportModel
    {
        public int StatusId { get; set; }
        public string Name { get; set; }
        public int Grp { get; set; }
        public DateTime StartTime { get; set; }
        public string Color { get; set; }
        public DateTime EndTime { get; set; }
    }
}
