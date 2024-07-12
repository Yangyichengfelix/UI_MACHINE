namespace UI_MAC2S.Endpoints
{
    public class Endpoint
    {
#if DEBUG
        public static string BaseUrl = "https://localhost:7050/";
        // #if ERMO
        //         public static string BaseUrl = "https://localhost:44321/";
        // #endif
        // #if Release
        //         public static string BaseUrl = "http://192.168.0.13:8081/";
        // #endif
#else
        public static string BaseUrl = "http://192.168.1.39:8081/";
        //public static string BaseUrl = "http://mac2s_api_server:80/";
#endif

        public static string LoginEndpoint = $"{BaseUrl}api/auth/login/";
        public static string RegisterEndpoint = $"{BaseUrl}api/auth/register/";
        public static string ResetPasswordEndpoint = $"{BaseUrl}api/auth/resetpassword/";
        public static string ForgotPasswordEndpoint = $"{BaseUrl}api/auth/forgotpassword/";
        public static string ResetForgottenPasswordEndpoint = $"{BaseUrl}api/auth/resetforgottenpassword/";
        public static string ActivityReportEndpoint = $"{BaseUrl}api/activityreport/timerange";
        public static string StatusSimpleEndpoint = $"{BaseUrl}api/status/simple";

        public static string StatusDurationEndpoint = $"{BaseUrl}api/duration/statusduration";
        public static string StatusGroupDurationEndpoint = $"{BaseUrl}api/duration/statusgroupduration";
        public static string trsEndpoint = $"{BaseUrl}api/duration/trs";
        public static string trgEndpoint = $"{BaseUrl}api/duration/trg";
        public static string MachineEndpoint = $"{BaseUrl}api/machine/";
        public static string DbSelectEndpoint = $"{BaseUrl}api/dbselect/dbselect/";


        public static string LogTimeRangeEndpoint = $"{BaseUrl}api/log/timerange";
        public static string NokAlertEndpoint = $"{BaseUrl}api/log/nokalert";
        public static string CycleTimeEndpoint = $"{BaseUrl}api/log/cycletime";
        public static string SkewingAlertEndpoint = $"{BaseUrl}api/log/skewingalert";
        public static string NokNumberEndpoint = $"{BaseUrl}api/log/noknumber";
        public static string ObjectifNumberProgressEnpoint = $"{BaseUrl}api/log/objectifnumberprogress";


        public static string GaugeParameterEnpoint = $"{BaseUrl}api/gauge";
        public static string ScheduleParameterEnpoint = $"{BaseUrl}api/schedule";

        //public static string GaugeParameterUpdateEnpoint =

        public static string Sensor1Endpoint = $"{BaseUrl}api/sensors/s1";

        public static string Sensor2Endpoint = $"{BaseUrl}api/sensors/s2";
        public static string Sensor3Endpoint = $"{BaseUrl}api/sensors/s3";
        public static string Sensor4Endpoint = $"{BaseUrl}api/sensors/s4";
        public static string Sensor5Endpoint = $"{BaseUrl}api/sensors/s5";
        public static string SensorSplEndpoint = $"{BaseUrl}api/sensors/spl";
        public static string SensorGlobalEndpoint = $"{BaseUrl}api/sensors/sgl";

        public static string Sensor1RealtimeEndpoint = $"{BaseUrl}api/sensors/s1realtime";
        public static string Sensor2RealtimeEndpoint = $"{BaseUrl}api/sensors/s2last";
        public static string Sensor3RealtimeEndpoint = $"{BaseUrl}api/sensors/s3last";
        public static string Sensor4RealtimeEndpoint = $"{BaseUrl}api/sensors/s4last";
        public static string Sensor5RealtimeEndpoint = $"{BaseUrl}api/sensors/s5last";
        public static string SensorPlRealtimeEndpoint = $"{BaseUrl}api/sensors/Pllast";


        public static string UploadImageEndpoint = $"{BaseUrl}api/image";
        public static string LastImageEndpoint = $"{BaseUrl}api/image/last";
        public static string LastLogImageEndpoint = $"{BaseUrl}api/image/lastlog";


        public static string SensorTestEnpoint = $"{BaseUrl}api/test";
        public static string MonitoringHub = $"{BaseUrl}monitoringhub";





    }
}
