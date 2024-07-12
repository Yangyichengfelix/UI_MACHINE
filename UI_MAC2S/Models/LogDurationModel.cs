namespace UI_MAC2S.Models
{
    public class LogDurationModel
    {
        public int Id { get; set; }

        public DateTime Date_Heure { get; set; }

        public int StatusId { get; set; }
        ///public virtual Status Status { get; set; }

        public int? VersionId { get; set; }
        public int? ProductionOrderId { get; set; }

        //  public virtual ProductionOrder? ProductionOrder { get; set; }

        public int RunTime_h { get; set; }
        public int? CycleTime_s { get; set; }
        public int? Nr_Cycle { get; set; }

        public string? Nr_Moule { get; set; }

        public int? NOK { get; set; }

        public float? Abs_Val_S1_microm { get; set; }

        public float? Abs_Val_S2_microm { get; set; }

        public float? Abs_Val_S3_microm { get; set; }

        public float? Abs_Val_S4_microm { get; set; }

        public float? Abs_Val_S5_microm { get; set; }

        public float? Abs_Val_PL { get; set; }

        public float? hi_tol_s1 { get; set; }

        public float? lo_tol_s1 { get; set; }

        public float? hi_tol_s2 { get; set; }

        public float? lo_tol_s2 { get; set; }

        public float? hi_tol_s3 { get; set; }

        public float? lo_tol_s3 { get; set; }

        public float? hi_tol_s4 { get; set; }

        public float? lo_tol_s4 { get; set; }

        public float? hi_tol_s5 { get; set; }

        public float? lo_tol_s5 { get; set; }

        public string? Part_Pr { get; set; }
        public decimal Duration { get; set; }
    }
}
