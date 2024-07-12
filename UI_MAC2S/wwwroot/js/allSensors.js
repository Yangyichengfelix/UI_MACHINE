function drawAllSensorsChart(data, seconds) {
    //console.log(seconds)
    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    timeFormat = d3.timeFormat("%c");
    const margin = {
        top: 90,
        right: 20,
        bottom: 90,
        left: 90
    },
        p = document.getElementById('allsensors_chart').parentNode.parentNode.clientWidth
    width = p * 0.8
        height = 400 - margin.top - margin.bottom;
    const sensors = d3.select("#allsensors_chart")
        // .append("svg")
        // .attr("id", "sensors_chart_svg")
        .attr("width", width + margin.right * 9)
        .attr("height", height + margin.top * 2 + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
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
    //const allSensors = [PL, S1, S2, S3, S4, S5];

    const path_s1 = sensors.append('g').append("path").attr("stroke", "red").attr("id", "sensorLine").style("stroke-width", 0.5).style("fill", "none");
    const path_s2 = sensors.append('g').append("path").attr("stroke", "blue").attr("id", "sensorLine").style("stroke-width", 0.5).style("fill", "none");
    const path_s3 = sensors.append('g').append("path").attr("stroke", "green").attr("id", "sensorLine").style("stroke-width", 0.5).style("fill", "none");
    const path_s4 = sensors.append('g').append("path").attr("stroke", "indigo").attr("id", "sensorLine").style("stroke-width", 0.5).style("fill", "none");
    const path_s5 = sensors.append('g').append("path").attr("stroke", "orange").attr("id", "sensorLine").style("stroke-width", 0.5).style("fill", "none");
    const path_pl = sensors.append('g').append("path").attr("stroke", "violet").attr("id", "sensorLine").style("stroke-width", 0.5).style("fill", "none");
    let dot_s1 = sensors.selectAll('circle').attr('class', 'sensorCircle').join('circle');
    let dot_s2 = sensors.selectAll('circle').attr('class', 'sensorCircle').join('circle');
    let dot_s3 = sensors.selectAll('circle').attr('class', 'sensorCircle').join('circle');
    let dot_s4 = sensors.selectAll('circle').attr('class', 'sensorCircle').join('circle');
    let dot_s5 = sensors.selectAll('circle').attr('class', 'sensorCircle').join('circle');
    let dot_pl = sensors.selectAll('circle').attr('class', 'sensorCircle').join('circle');
    const gGrid = sensors.append("g").attr('class', 'sensorGrid');
    const gx = sensors.append("g").attr("transform", `translate(0,  ${height})`)
        .attr("class", "sensor_xAxis");
    const gy = sensors.append("g").attr("transform", "translate(-1,0)")
        .attr("class", "sensor_yAxis")
    const gxBis = sensors.append("g").attr("transform", `translate(0,  0)`)
        .attr("class", "sensor_xAxis_bis")
    let xTicks;
    let xTixksResults;
    let xTixksResultsBis;
    let x = d3.scaleTime().domain(d3.extent(data, d => {return timeParse(d.date_Heure)})).range([0, width]);
    let y = d3.scaleLinear().domain([-70, 70]).range([height, 0]);

    if (seconds > 2592000) { //30 days
        xTicks = x.ticks(d3.timeWeek.every(1))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("W%W")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("W%W")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0)
    }
    else if (seconds > 604800) { // 7 days
        xTicks = x.ticks(d3.timeDay.every(7))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(d3.timeDay.every(7)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("W%W")).ticks(d3.timeWeek.every(1)).tickSizeOuter(0)
    }
    else if (seconds > 86400) {  //24h
        xTicks = x.ticks(d3.timeHour.every(4))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeHour.every(4)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0)
    }
    else if (seconds > 28800) {//8h
        xTicks = x.ticks(d3.timeMinute.every(5))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeHour.every(1)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d %H:%M")).ticks(d3.timeHour.every(2)).tickSizeOuter(0)
    }
    else {
        xTicks = x.ticks(d3.timeMinute.every(1));
        xTixksResults = (d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d %H:%M")).ticks(d3.timeMinute.every(15)).tickSizeOuter(0))
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0)

    }
    const grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
            .attr("class", "dataGridX")
            .selectAll("line")
            .data(xTicks)
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
    dot_s1 = sensors.selectAll('circle').data(data).join('circle');
    dot_s2 = sensors.selectAll('circle').data(data).join('circle');
    dot_s3 = sensors.selectAll('circle').data(data).join('circle');
    dot_s4 = sensors.selectAll('circle').data(data).join('circle');
    dot_s5 = sensors.selectAll('circle').data(data).join('circle');
    dot_pl = sensors.selectAll('circle').data(data).join('circle');
    gx.transition()
        .duration(2000)
        .call(xTixksResults)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-80)")
        .attr("font-size", "medium");
    gy.transition()
        .duration(2000)
        .call(d3.axisRight(y).ticks(6).tickSizeOuter(0))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("font-size", "medium");
    gxBis.transition()
        .duration(2000)
        .call(xTixksResultsBis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", ".8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(45)")
        .attr("font-size", "medium");
    gGrid.call(grid);
    path_s1.datum(data).transition().duration(2000)
        .attr("d", d3.line()
            .x(d => x(+timeParse(d.date_Heure)))
            .y(d => y(+d.v1))
    );
    path_s2.datum(data).transition().duration(2000)
        .attr("d", d3.line()
            .x(d => x(+timeParse(d.date_Heure)))
            .y(d => y(+d.v2))
    );
    path_s3.datum(data).transition().duration(2000)
        .attr("d", d3.line()
            .x(d => x(+timeParse(d.date_Heure)))
            .y(d => y(+d.v3))
    );
    path_s4.datum(data).transition().duration(2000)
        .attr("d", d3.line()
            .x(d => x(+timeParse(d.date_Heure)))
            .y(d => y(+d.v4))
    );
    path_s5.datum(data).transition().duration(2000)
        .attr("d", d3.line()
            .x(d => x(+timeParse(d.date_Heure)))
            .y(d => y(+d.v5))
    );
    path_pl.datum(data).transition().duration(2000)
        .attr("d", d3.line()
            .x(d => x(+timeParse(d.date_Heure)))
            .y(d => y(+d.vp))
    );
    dot_s1.data(data).transition().duration(2000).attr("cx", d =>x(+timeParse(d.date_Heure))).attr("cy", d => y(+d.v1)).attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        });
    dot_s2.data(data).transition().duration(2000).attr("cx", d => x(+timeParse(d.date_Heure))).attr("cy", d => y(+d.v2)).attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        });
    dot_s3.data(data).transition().duration(2000).attr("cx", d => x(+timeParse(d.date_Heure))).attr("cy", d => y(+d.v3)).attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        });
    dot_s4.data(data).transition().duration(2000).attr("cx", d => x(+timeParse(d.date_Heure))).attr("cy", d => y(+d.v4)).attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        });
    dot_s5.data(data).transition().duration(2000).attr("cx", d => x(+timeParse(d.date_Heure))).attr("cy", d => y(+d.v5)).attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        });
    dot_pl.data(data).transition().duration(2000).attr("cx", d => x(+timeParse(d.date_Heure))).attr("cy", d => y(+d.vp)).attr("r", 1.5)
        .style("fill", d => {
            let color;
            data.length > 100 ? color = "green" : color = black;
            return color
        });
}

function cleanAllSensorChartChildren() {
    const allsensors_chart = document.getElementById("allsensors_chart");
    while (allsensors_chart.firstChild) {
        allsensors_chart.removeChild(allsensors_chart.lastChild);
    }
}