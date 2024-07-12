namespace UI_MAC2S.Components.RealtimeGlobalGraphComponents
{
    using Microsoft.AspNetCore.Components;
    using Microsoft.AspNetCore.Components.Authorization;
    using Microsoft.JSInterop;
    using UI_MAC2S.Contracts;
    using UI_MAC2S.Models;
    using Endpoint = UI_MAC2S.Endpoints.Endpoint;
    public partial class RealtimeGlobalGraph
    {


        [Inject] ISensorGlobalRepository _sensorGlobal { get; set; }

        [Inject] IJSRuntime JsRuntime { get; set; }
        [Parameter] public string SelectedDatabaseName { get; set; }
        [Parameter] public EventCallback<string> DatabaseChanged { get; set; }

        protected IEnumerable<SensorGlobalModel> SensorGlobalData;
        public bool show_cycle_datetime { get; set; } = true;
        public bool show_sensor_1 { get; set; } = true;
        public bool show_sensor_2 { get; set; } = true;
        public bool show_sensor_3 { get; set; } = false;
        public bool show_sensor_4 { get; set; } = false;
        public bool show_sensor_5 { get; set; } = false;

        public string style_cycle_datetime { get; set; } = "chart-show";
        public string style_sensor_1 { get; set; } = "chart-show";
        public string style_sensor_2 { get; set; } = "chart-show";
        public string style_sensor_3 { get; set; } = "chart-hide";
        public string style_sensor_4 { get; set; } = "chart-hide";
        public string style_sensor_5 { get; set; } = "chart-hide";
        protected bool collapse = false;
        protected bool busy;
        protected DateTime startTime = DateTime.Now.AddMinutes(-5);

        protected DateTime endTime = DateTime.Now;
        protected double seconds = 0;
        protected int count = 9;
        protected string startTimeString;
        protected string endTimeString;
        protected double totalSecond;
        protected string db = "?db=mac2s15";
        protected string dbName = "";
        protected Timer? timer;
        protected int refresh_interval { get; set; } = 40000;
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

            StateHasChanged();


            UpdateRealtimeGobalChart();

            busy = false;
            collapse = false;
        }
        protected async override Task OnParametersSetAsync()
        {
            busy = true;
            totalSecond = 0;
            seconds = (endTime - startTime).TotalSeconds;

            ShouldRender();
            busy = false;
            timer = new Timer(async (object? stateInfo) =>
            {

                endTime = DateTime.Now;
                startTimeString = "start=" + startTime.ToUniversalTime().ToString("u");
                endTimeString = "end=" + endTime.ToUniversalTime().ToString("u");

                SensorGlobalData = await _sensorGlobal.GetValues(Endpoint.SensorGlobalEndpoint + $"{db}&{startTimeString}&{endTimeString}");
                InvokeAsync(StateHasChanged); // NOTE: MUST CALL StateHasChanged() BECAUSE THIS IS TRIGGERED BY A TIMER INSTEAD OF A USER EVENT
                                              //Sensor1.AddRange(Sensor1Data.ToList());
                                              //Sensor2.AddRange(Sensor2Data.ToList());
                                              //Sensor3.AddRange(Sensor1Data.ToList());
                                              //Sensor4.AddRange(Sensor4Data.ToList());
                                              //Sensor5.AddRange(Sensor5Data.ToList());
                                              //  Console.WriteLine(SensorGraphData.Count());
                                              //Graph = Sensor1;
                UpdateRealtimeGobalChart();
            }, new AutoResetEvent(false), 4000, refresh_interval); // fire every 30000 milliseconds
        }


        protected async Task UpdateRealtimeGobalChart()
        {
            JsRuntime.InvokeVoidAsync("updateRealtimeGlobal", SensorGlobalData);

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
    }
}
