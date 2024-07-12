using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.JSInterop;
using UI_MAC2S.Contracts;
using UI_MAC2S.Models;
using Endpoint = UI_MAC2S.Endpoints.Endpoint;
namespace UI_MAC2S.Components.SensorGraphComponents
{
    public partial class SensorGraph
    {
        [Inject] AuthenticationStateProvider AuthenticationStateProvider { get; set; }
        [Inject] NavigationManager _navManager { get; set; }

        [Inject] ISensorUniqueRepository _sensorUnique { get; set; }
        [Inject] IMachineRepository _machineRepo { get; set; }

        [Inject] IJSRuntime JsRuntime { get; set; }

        [Parameter] public MachineModel SelectedDatabase { get; set; }
        [Parameter] public string SelectedDatabaseName { get; set; }
        [Parameter] public EventCallback<string> DatabaseChanged { get; set; }

        public int selectedGroupValue { get; set; } = 1;
        public void MyGroupValueChangedHandler(int newValue)
        {
            selectedGroupValue = newValue;
            switch (newValue)
            {
                case 1:
                    SensorGraphData = Sensor1Data;
                    UpdateSensorChart();
                    break;
                case 2:
                    SensorGraphData = Sensor2Data;
                    UpdateSensorChart();
                    break;
                case 3:
                    SensorGraphData = Sensor3Data;
                    UpdateSensorChart();
                    break;
                case 4:
                    SensorGraphData = Sensor4Data;
                    UpdateSensorChart();
                    break;
                case 5:
                    SensorGraphData = Sensor5Data;
                    UpdateSensorChart();
                    break;
            }
            StateHasChanged();
        }
        protected Timer? timer;
        protected int refresh_interval { get; set; } = 40000;
        protected IEnumerable<SensorBaseModel> SensorPLData;
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

        protected IEnumerable<SensorSelection> sensorSelections = Enum.GetValues(typeof(SensorSelection)).Cast<SensorSelection>();
        protected SensorSelection sensorSelection = SensorSelection._;
        protected SensorSelection CurrentSelection;
        protected bool collapse = false;
        protected bool busy;
        protected DateTime startTime = DateTime.Now.AddMinutes(-5);
        // protected DateTime startTime = new DateTime(2022, 08, 05);
        protected DateTime endTime = DateTime.Now;
        //protected DateTime endTime = new DateTime(2022, 08, 06);
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

            SensorPLData = await _sensorUnique.GetValues(Endpoint.SensorSplEndpoint + $"{db}&{startTimeString}&{endTimeString}");
            Sensor1Data = await _sensorUnique.GetValues(Endpoint.Sensor1Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            Sensor2Data = await _sensorUnique.GetValues(Endpoint.Sensor2Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            Sensor3Data = await _sensorUnique.GetValues(Endpoint.Sensor3Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            Sensor4Data = await _sensorUnique.GetValues(Endpoint.Sensor4Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            Sensor5Data = await _sensorUnique.GetValues(Endpoint.Sensor5Endpoint + $"{db}&{startTimeString}&{endTimeString}");

            StateHasChanged();
            MyGroupValueChangedHandler(selectedGroupValue);
            Console.WriteLine(SensorPLData.Count());

            UpdateSensorChart();
            UpdateSensorPLChart();
            busy = false;
            collapse = false;
        }

        protected async override Task OnParametersSetAsync()
        {
            busy = true;
            totalSecond = 0;
            seconds = (endTime - startTime).TotalSeconds;

            SensorPLData = await _sensorUnique.GetValues(Endpoint.SensorSplEndpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor1Data = await _sensorUnique.GetValues(Endpoint.Sensor1Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor2Data = await _sensorUnique.GetValues(Endpoint.Sensor2Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor3Data = await _sensorUnique.GetValues(Endpoint.Sensor3Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor4Data = await _sensorUnique.GetValues(Endpoint.Sensor4Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            //Sensor5Data = await _sensorUnique.GetValues(Endpoint.Sensor5Endpoint + $"{db}&{startTimeString}&{endTimeString}");
            MyGroupValueChangedHandler(selectedGroupValue);
            //SensorGraphData = Sensor1Data;

            //UpdateSensorChart();
            //UpdateSensorPLChart();
            //JsRuntime.InvokeVoidAsync("init", SensorGraphData, endTime);

            ShouldRender();
            busy = false;
            timer = new Timer(async (object? stateInfo) =>
            {
       
                //startTime = DateTime.Now.AddMinutes(-1);
                endTime = DateTime.Now;
                startTimeString = "start=" + startTime.ToUniversalTime().ToString("u");
                endTimeString = "end=" + endTime.ToUniversalTime().ToString("u");
                Sensor1Data = await _sensorUnique.GetValues(Endpoint.Sensor1Endpoint + $"{db}&{startTimeString}&{endTimeString}");
                Sensor2Data = await _sensorUnique.GetValues(Endpoint.Sensor2Endpoint + $"{db}&{startTimeString}&{endTimeString}");
                Sensor3Data = await _sensorUnique.GetValues(Endpoint.Sensor3Endpoint + $"{db}&{startTimeString}&{endTimeString}");
                Sensor4Data = await _sensorUnique.GetValues(Endpoint.Sensor4Endpoint + $"{db}&{startTimeString}&{endTimeString}");
                Sensor5Data = await _sensorUnique.GetValues(Endpoint.Sensor5Endpoint + $"{db}&{startTimeString}&{endTimeString}");

                //MyGroupValueChangedHandler(selectedGroupValue);

                //SensorGraphData = Sensor1Data;

                InvokeAsync(StateHasChanged); // NOTE: MUST CALL StateHasChanged() BECAUSE THIS IS TRIGGERED BY A TIMER INSTEAD OF A USER EVENT
                                              //Sensor1.AddRange(Sensor1Data.ToList());
                                              //Sensor2.AddRange(Sensor2Data.ToList());
                                              //Sensor3.AddRange(Sensor1Data.ToList());
                                              //Sensor4.AddRange(Sensor4Data.ToList());
                                              //Sensor5.AddRange(Sensor5Data.ToList());
                                              //  Console.WriteLine(SensorGraphData.Count());
                                              //Graph = Sensor1;
                UpdateRealtimeChart1();
                UpdateRealtimeChart2();

            }, new AutoResetEvent(false), 4000, refresh_interval); // fire every 30000 milliseconds
        }


        protected async Task UpdateSensorChart()
        {
            JsRuntime.InvokeVoidAsync("cleanSensorChartChildren");
            JsRuntime.InvokeVoidAsync("drawSensorsChart", SensorGraphData, seconds);
            ShouldRender();

        }
        protected async Task UpdateSensorPLChart()
        {
            JsRuntime.InvokeVoidAsync("cleanPlChartChildren");
            JsRuntime.InvokeVoidAsync("drawPlChart", SensorPLData, seconds);
            ShouldRender();
        }
        protected async Task UpdateRealtimeChart1()
        {
            JsRuntime.InvokeVoidAsync("update", Sensor1Data);
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
    }
}
