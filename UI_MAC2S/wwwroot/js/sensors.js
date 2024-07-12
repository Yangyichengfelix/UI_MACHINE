

function cleanSensorChartChildren() {
    const sensors_chart = document.getElementById("sensors_chart");
    while (sensors_chart.firstChild) {

        sensors_chart.removeChild(sensors_chart.lastChild);
    }
}

function drawSensorsChart(data, seconds) {

    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
    timeFormat = d3.timeFormat("%c");
    const margin = {
        top: 90,
        right: 20,
        bottom: 90,
        left: 90
    },
        //width = parent.innerWidth/1.7 - margin.left - margin.right,


        p = document.getElementById('sensors_chart').parentNode.parentNode.clientWidth
    width = p * 0.8
    height = 400 - margin.top - margin.bottom;

    yMax = d3.max(data, d => d.value) + 0.5;
    yMin = d3.min(data, d => d.value) - 0.5;

    const sensors = d3.select("#sensors_chart")
        // .append("svg")
        // .attr("id", "sensors_chart_svg")
        .attr("width", width + margin.right * 9)
        .attr("height", height + margin.top * 2 + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    if (data.length === 0) {
        sensors.attr('display', 'none')
    }
    const tooltip = d3.select("#sensors_tooltip")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#444")
        .style("color", "#fff")
        .style("display", "-webkit-flex")
        .style("display", "flex")
        .style("-webkit-justify-content", "center")
        .style("justify-content", "center")
        .style("margin", "auto")

        .style("border", "solid")
        .style("border-width", "12px")
        .style("border-color", "#444 transparent")

        .style("border-radius", "5px")
        .style("padding", "13px");
    const line = sensors
        .append('g')
        .append("path")
        .attr("stroke", "red")
        .attr("opacity", 0.7)
        .attr("id", "sensorLine")
        .style("stroke-width", 0.2)
        .style("fill", "none");
    const low = sensors
        .append('g')
        .attr("id", "sensorLow")
        .append("path")
        .attr("stroke", "blue")
        .style("opacity", "0.4")
        .style("stroke-width", 0.5)
        .style("fill", "none");
    const high = sensors
        .append('g')
        .attr("id", "sensorHigh")
        .append("path")
        .attr("stroke", "blue")
        .style("opacity", "0.4")
        .style("stroke-width", 0.5)
        .style("fill", "none");
    let dot = sensors
        .selectAll('circle')
        .attr('class', 'sensorCircle')
        .join('circle');
    const gGrid = sensors.append("g").attr('class', 'sensorGrid');
    const gx = sensors.append("g").attr("transform", `translate(0,  ${height})`)
        .attr("class", "sensor_xAxis");
    const gy = sensors.append("g").attr("transform", "translate(-1,0)")
        .attr("class", "sensor_yAxis")
    const gxBis = sensors.append("g").attr("transform", `translate(0,  0)`)
        .attr("class", "sensor_xAxis_bis")

    const COLOR_SCLAE =
        d3.scaleLinear()
            .domain([[-70, 70]])
            .range(['skyblue', 'orange']);
    let xTicks;
    let xTixksResults;
    let xTixksResultsBis;

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => {
            let date;
            //console.log(data);
            date = timeParse(moment(d.date_Heure).format());
            return date;
        }))
        .range([0, width]);
    let y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);


    function getXTicks(duration) {
        let xTicks = x.ticks(d3.timeMinute.every(1));
        if (duration > 14400) {
            xTicks = x.ticks(d3.timeWeek.every(1));
        }
        //console.log(duration);
        //console.log(xTicks);

        return xTicks;
    }
    function getXTicksResults(duration) {
        let xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeMinute.every(5)).tickSizeOuter(1);
        if (duration > 14400) {
            xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(1);
        }
        return xTixksResults;
    }
    function getXTicksResultsBis(duration) {
        let Results = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeHour.every(1)).tickSizeOuter(1);
        if (duration > 14400) {
            xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(1);
        }
        return Results;
    }

    const grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
            .attr("class", "dataGridX")
            .selectAll("line")
            .data(getXTicks(seconds))
            .join("line")
            .attr("class", "xGridLine")
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d))
            .attr("y1", 0)
            .attr("y2", height))
        .call(g => g.append("g")
            .attr("class", "dataGridY")
            .selectAll("line")
            .data(y.ticks())
            .join("line")
            .attr("class", "yGridLine")
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d))
            .attr("x1", 0)
            .attr("x2", width));


    dot = sensors
        .selectAll('circle')
        .data(data)
        .join('circle')
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout);
    function pointerover(event, d, i) {
        tooltip
            .style("opacity", 1)
            .html(`
        <ul>
          <li>
            <span class="tooltipspan"> Time </span>: ${timeFormat(timeParse(moment(d.date_Heure).format()))}
          </li>
          <li>      
            <span class="tooltipspan"> Value </span>: ${d.value} μm  
          </li>
        </ul>
        `)
            .style("left", (event.x) / 3 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (event.y) / 3 + "px")
            .transition()
            .duration(500)
    }
    function pointermove(event, d) {
        tooltip.style("opacity", 1)
            .html(`
          <ul>
            <li>
              <span class="tooltipspan"> Time </span>: ${timeFormat(timeParse(moment(d.date_Heure).format()))}
            </li>
            <li>      
              <span class="tooltipspan"> Value </span>: ${d.value} μm  
            </li>
          </ul>
          `
            )
            //.html(`<span class="tooltipspan"> Heure </span>: ${timeFormat(d.time)},  <span class="tooltipspan"> N° Cycles </span>: ${d.n_cycle}, <span class="tooltipspan"> Valeur </span>: ${d.value} μm`)
            .style("left", (event.x) / 3 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (event.y) / 3 + "px")
    }
    function pointerout(event, d) {
        tooltip
            .transition()
            .duration(2000)
            .style("opacity", 0)
    }

    gx
        .transition()
        .duration(2000)
        .call(getXTicksResults(seconds))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-80)")
        .attr("font-size", "medium")
        ;
    gy
        .transition()
        .duration(2000)
        .call(d3.axisRight(y).ticks(6).tickSizeOuter(0))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-size", "medium")
        ;
    gxBis
        .transition()
        .duration(2000)
        .call(getXTicksResultsBis(seconds))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", ".8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(45)")
        .attr("font-size", "medium")
        ;
    gGrid.call(grid);
    line
        .datum(data)
        .transition()
        .duration(2000)
        .attr("d", d3.line()
            .x(d => {
                //console.log(d)
                return x(+timeParse(moment(d.date_Heure).format()))
            })
            .y(d => {
                return y(+d.value)
            }))

        ;


    dot
        .data(data)
        .transition()
        .duration(2000)
        .attr("cx", d => {
            //console.log(d)
            return x(+timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => y(+d.value))
        .attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        })
        ;
    low
        .datum(data)
        .transition()
        .duration(2000)
        .attr("d", d3.line()
            .x(d => {
                return x(+timeParse(moment(d.date_Heure).format()))
            })
            .y(d => -0.2)
        );
    high
        .datum(data)
        .transition()
        .duration(2000)
        .attr("d", d3.line()
            .x(d => {
                return x(+timeParse(moment(d.date_Heure).format()))
            })
            .y(d => 0.2)

        );
    //dot
    //    .data(data)
    //    .transition()
    //    .duration(2000)
    //    .attr("cx", d => {
    //        //console.log(d.date_Heure)
    //        return x(+timeParse(moment(d.date_Heure).format()))
    //    })
    //    .attr("cy", d =>y(+d.value))
    //    .attr("r", 1)
    //    .style("fill", d => {
    //        let color;
    //        data.length > 1800 ? color = "green" : color = black;
    //        return color
    //    })
    //    ;
}

