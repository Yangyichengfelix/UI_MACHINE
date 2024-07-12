namespace UI_MAC2S.Components.CycleSensorGraphComponents
{
    using Microsoft.AspNetCore.Components;
    using Microsoft.AspNetCore.Components.Authorization;
    using Microsoft.JSInterop;
    using UI_MAC2S.Contracts;
    using UI_MAC2S.Models;
    using Endpoint = UI_MAC2S.Endpoints.Endpoint;
    public partial class CycleSensorGraph
    {

        [Inject] AuthenticationStateProvider AuthenticationStateProvider { get; set; }
        [Inject] NavigationManager _navManager { get; set; }

        [Inject] ISensorUniqueRepository _sensorUnique { get; set; }
        [Inject] ISensorGlobalRepository _sensorGlobal { get; set; }
        [Inject] IMachineRepository _machineRepo { get; set; }

        [Inject] IJSRuntime JsRuntime { get; set; }

        [Parameter] public MachineModel SelectedDatabase { get; set; }
        [Parameter] public string SelectedDatabaseName { get; set; }
        [Parameter] public EventCallback<string> DatabaseChanged { get; set; }

        public class SensorSelectModel
        {
            public int SensorValueField { get; set; }
            public string SensorTextField { get; set; }
        }


        public int selectedGroupValue { get; set; } = 1;

        protected Timer? timer;
        protected int refresh_interval { get; set; } = 40000;
        protected IEnumerable<SensorGlobalModel> SensorGlobalData;
        protected IEnumerable<SensorUniqueModel> SensorGraphData;
        protected IEnumerable<SensorUniqueModel> Sensor1Data;
        protected IEnumerable<SensorUniqueModel> Sensor2Data;
        protected IEnumerable<SensorUniqueModel> Sensor3Data;
        protected IEnumerable<SensorUniqueModel> Sensor4Data;
        protected IEnumerable<SensorUniqueModel> Sensor5Data;

        protected List<SensorBaseModel> SensorPL;
        protected List<SensorUniqueModel> Graph;
        protected List<SensorUniqueModel> Sensor1 = new List<SensorUniqueModel>();
        protected List<SensorUniqueModel> Sensor2 = new List<SensorUniqueModel>();
        protected List<SensorUniqueModel> Sensor3 = new List<SensorUniqueModel>();
        protected List<SensorUniqueModel> Sensor4 = new List<SensorUniqueModel>();
        protected List<SensorUniqueModel> Sensor5 = new List<SensorUniqueModel>();


        public bool show_cycle_datetime { get; set; } = true;
        public bool show_sensor_1 { get; set; } = true;
        public bool show_sensor_2 { get; set; } = true;
        public bool show_sensor_3 { get; set; } = false;
        public bool show_sensor_4 { get; set; } = false;
        public bool show_sensor_5 { get; set; } = false;
        public string text_cycle_datetime { get; set; } = "On";
        public string text_sensor_1 { get; set; } = "On";
        public string text_sensor_2 { get; set; } = "On";
        public string text_sensor_3 { get; set; } = "Off";
        public string text_sensor_4 { get; set; } = "Off";
        public string text_sensor_5 { get; set; } = "Off";
        public string style_cycle_datetime { get; set; } = "chart-show";
        public string style_sensor_1 { get; set; } = "chart-show";
        public string style_sensor_2 { get; set; } = "chart-show";
        public string style_sensor_3 { get; set; } = "chart-hide";
        public string style_sensor_4 { get; set; } = "chart-hide";
        public string style_sensor_5 { get; set; } = "chart-hide";

        protected IEnumerable<SensorSelection> sensorSelections = Enum.GetValues(typeof(SensorSelection)).Cast<SensorSelection>();
        protected SensorSelection sensorSelection = SensorSelection._;
        protected SensorSelection CurrentSelection;
        protected bool collapse = false;
        protected bool busy;
        protected DateTime startTime = DateTime.Now.AddDays(-7);
        protected DateTime endTime = DateTime.Now;
        protected double seconds = 0;
        protected int count = 9;
        protected string startTimeString;
        protected string endTimeString;
        protected double totalSecond;
        protected string db = "?db=mac2s15";
        protected string dbName = "";
        protected async Task OnTimeChange(DateTime? value, string name, string format)
        {
            SetCalenderValues();
        }

        protected override async Task OnInitializedAsync()
        {
            totalSecond = 0;
            seconds = (endTime - startTime).TotalSeconds;
            SetCalenderValues();
        }

        protected async Task ClickCalenderValidate()
        {
            busy = true;
            SetCalenderValues();
            totalSecond = 0;
            seconds = (endTime - startTime).TotalSeconds;
            db = "?db=" + SelectedDatabaseName;

            SensorGlobalData = await _sensorGlobal.GetValues(Endpoint.SensorGlobalEndpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor1Data= await _sensorUnique.GetValues(Endpoint.Sensor1Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor2Data= await _sensorUnique.GetValues(Endpoint.Sensor2Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor3Data= await _sensorUnique.GetValues(Endpoint.Sensor3Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor4Data= await _sensorUnique.GetValues(Endpoint.Sensor4Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor5Data= await _sensorUnique.GetValues(Endpoint.Sensor5Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            StateHasChanged();

            //Console.WriteLine(SensorGlobalData.Count());

            UpdateCycleSensorChart();

            busy = false;
            collapse = false;
        }

        protected async override Task OnParametersSetAsync()
        {
            busy = true;
            totalSecond = 0;
            seconds = (endTime - startTime).TotalSeconds;
            SensorGlobalData = await _sensorGlobal.GetValues(Endpoint.SensorGlobalEndpoint + $"{db}&{startTimeString}&{endTimeString}");
            ShouldRender();
            busy = false;
        }



        protected async Task UpdateCycleSensorChart()
        {
            JsRuntime.InvokeVoidAsync("GraphCycleDateHeure", SensorGlobalData);
            JsRuntime.InvokeVoidAsync("GraphCycleSensor", SensorGlobalData);

        }
        protected async Task UpdateRealtimeChart2()
        {
            JsRuntime.InvokeVoidAsync("update2", Sensor2Data);
        }

        protected async Task SetCalenderValues()
        {
            startTimeString = "start=" + startTime.ToUniversalTime().ToString("u");
            endTimeString = "end=" + endTime.ToUniversalTime().ToString("u");
        }

        protected async Task OnDatabaseChanged(string machine)
        {
            dbName = machine;
            StateHasChanged();
        }

        public void OnCycleDatetimeToggledChanged(bool toggled)
        {
            // Because variable is not two-way bound, we need to update it ourself
            show_cycle_datetime = toggled;
            if (show_cycle_datetime == true)
            {
                style_cycle_datetime = "chart-show";
            }
            else
            {
                style_cycle_datetime = "chart-hide";
            }
            StateHasChanged();

        }
        protected void OnSensor1VisibilityToggledChanged(bool toggled)
        {
            show_sensor_1 = toggled;
            if (show_sensor_1 == true)
            {
                style_sensor_1 = "chart-show";
            }
            else
            {
                style_sensor_1 = "chart-hide";
            }
            StateHasChanged();
        }

        protected void OnSensor2VisibilityToggledChanged(bool toggled)
        {
            show_sensor_2 = !show_sensor_2;
            if (show_sensor_2 == true)
            {
                style_sensor_2 = "chart-show";
            }
            else
            {
                style_sensor_2 = "chart-hide";
            }
            StateHasChanged();
        }
        protected void OnSensor3VisibilityToggledChanged(bool toggled)
        {
            show_sensor_3 = !show_sensor_3;
            if (show_sensor_3 == true)
            {
                style_sensor_3 = "chart-show";
            }
            else
            {
                style_sensor_3 = "chart-hide";
            }
            StateHasChanged();
        }
        protected void OnSensor4VisibilityToggledChanged(bool toggled)
        {
            show_sensor_4 = !show_sensor_4;
            if (show_sensor_4 == true)
            {
                style_sensor_4 = "chart-show";
            }
            else
            {
                style_sensor_4 = "chart-hide";
            }
            StateHasChanged();
        }
        protected void OnSensor5VisibilityToggledChanged(bool toggled)
        {
            show_sensor_5 = !show_sensor_5;
            if (show_sensor_5 == true)
            {
                style_sensor_5 = "chart-show";
            }
            else
            {
                style_sensor_5 = "chart-hide";
            }
            StateHasChanged();
        }

    }
}
