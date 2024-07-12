

timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
timeFormat = d3.timeFormat("%c");
let RealtimeGlobalArray = [];

function updateRealtimeGlobal(data) {

    let tooltip = d3.select("#cyclesensors_tooltip").style("opacity", 0)
    let margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 20
    },


        pw = document.getElementById('cycleSensor_1_chart').parentNode.parentNode.clientWidth
    ph = document.getElementById('cycleSensor_1_chart').parentNode.parentNode.clientWidth
    width = pw * 0.8;
    height = ph * 0.35;
    yRange = height * 0.7
    translateX = width * 0.05;
    translateY = height * 0.08;


    data.forEach((el) => {
        RealtimeGlobalArray.push(el);

    })
    //#region svg

    d3.select("#cycle_chart")
        .attr("width", width - margin.right * 2)
        .attr("height", height - margin.top * 2 + margin.bottom)
        .attr("transform", `translate(${translateX},${translateY})`);
    d3.select("#cycleTime_chart").attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);

    d3.select("#cycleSensor_1_chart").attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    d3.select("#cycleSensor_2_chart").attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    d3.select("#cycleSensor_3_chart").attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    d3.select("#cycleSensor_4_chart").attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    d3.select("#cycleSensor_5_chart").attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    //end#region

    //#region xAxis
    let gxcycle = d3.select("#cycle_xAxis").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gxcycleTime = d3.select("#cycleTime_xAxis").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gx1 = d3.select("#cycleSensor_xAxis_1").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gx2 = d3.select("#cycleSensor_xAxis_2").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gx3 = d3.select("#cycleSensor_xAxis_3").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gx4 = d3.select("#cycleSensor_xAxis_4").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gx5 = d3.select("#cycleSensor_xAxis_5").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    //end#region

    //#region yAxis
    let gycycle = d3.select("#cycle_yAxis").attr("transform", `translate(${20},${translateY})`);
    let gycycleTime = d3.select("#cycleTime_yAxis").attr("transform", `translate(${20},${translateY})`);
    let gy1 = d3.select("#cycleSensor_yAxis_1").attr("transform", `translate(${20},${translateY})`);
    let gy2 = d3.select("#cycleSensor_yAxis_2").attr("transform", `translate(${20},${translateY})`);
    let gy3 = d3.select("#cycleSensor_yAxis_3").attr("transform", `translate(${20},${translateY})`);
    let gy4 = d3.select("#cycleSensor_yAxis_4").attr("transform", `translate(${20},${translateY})`);
    let gy5 = d3.select("#cycleSensor_yAxis_5").attr("transform", `translate(${20},${translateY})`);
    //end#region

    //#region point
    let gCycleDot = d3.select("#gCycleDot").attr("transform", `translate(${20},${translateY})`);
    let gCycleTimeDot = d3.select("#gCycleTimeDot").attr("transform", `translate(${20},${translateY})`);
    let gDot1 = d3.select("#gCycleSensorDot_1").attr("transform", `translate(${20},${translateY})`);
    let gDot2 = d3.select("#gCycleSensorDot_2").attr("transform", `translate(${20},${translateY})`);
    let gDot3 = d3.select("#gCycleSensorDot_3").attr("transform", `translate(${20},${translateY})`); 
    let gDot4 = d3.select("#gCycleSensorDot_4").attr("transform", `translate(${20},${translateY})`);
    let gDot5 = d3.select("#gCycleSensorDot_5").attr("transform", `translate(${20},${translateY})`);
    //#endregion point
    //#region line
    let gCycleLine = d3.select("#gCycleLine").attr("transform", `translate(${20},${translateY})`);
    let gCycleTimeLine = d3.select("#gCycleTimeLine").attr("transform", `translate(${20},${translateY})`);
    let gLine1 = d3.select("#gCycleSensorLine_1").attr("transform", `translate(${20},${translateY})`);
    let gLine2 = d3.select("#gCycleSensorLine_2").attr("transform", `translate(${20},${translateY})`);
    let gLine3 = d3.select("#gCycleSensorLine_3").attr("transform", `translate(${20},${translateY})`);
    let gLine4 = d3.select("#gCycleSensorLine_4").attr("transform", `translate(${20},${translateY})`);
    let gLine5 = d3.select("#gCycleSensorLine_5").attr("transform", `translate(${20},${translateY})`);
    let gTH1 = d3.select("#gTH1").attr("transform", `translate(${20},${translateY})`);
    let gTH2 = d3.select("#gTH2").attr("transform", `translate(${20},${translateY})`);
    let gTH3 = d3.select("#gTH3").attr("transform", `translate(${20},${translateY})`);
    let gTH4 = d3.select("#gTH4").attr("transform", `translate(${20},${translateY})`);
    let gTH5 = d3.select("#gTH5").attr("transform", `translate(${20},${translateY})`);
    let gTL1 = d3.select("#gTL1").attr("transform", `translate(${20},${translateY})`);
    let gTL2 = d3.select("#gTL2").attr("transform", `translate(${20},${translateY})`);
    let gTL3 = d3.select("#gTL3").attr("transform", `translate(${20},${translateY})`);
    let gTL4 = d3.select("#gTL4").attr("transform", `translate(${20},${translateY})`);
    let gTL5 = d3.select("#gTL5").attr("transform", `translate(${20},${translateY})`);
    //#endregion line

    let Xmin_Time = d3.min(RealtimeGlobalArray, d => timeParse(moment(d.date_Heure).format()));
    let Xmax_Time = d3.max(RealtimeGlobalArray, d => timeParse(moment(d.date_Heure).format()));
    let differnce_Time = Xmax_Time - Xmin_Time;

    let Xmin_CycleNumber = d3.min(RealtimeGlobalArray, d => d.nr_Cycle);
    let Xmax_CycleNumber = d3.max(RealtimeGlobalArray, d => d.nr_Cycle);
    let differnce_CycleNumber = Xmax_CycleNumber - Xmin_CycleNumber;

    let min_cycleTime = d3.min(RealtimeGlobalArray, d => d.cycleTime_s);
    let max_cycleTime = d3.max(RealtimeGlobalArray, d => d.cycleTime_s);

    let Ymin_SensorValue = d3.min(RealtimeGlobalArray, d => d.tL1*100)-10 ;
    let Ymax_SensorValue = d3.max(RealtimeGlobalArray, d => d.tH1 * 100) + 10;


    //#region x, y scales definition
    let xscale_Time = d3.scaleTime().domain([Xmin_Time, Xmax_Time]).range([0, width]);

    let xscale_CycleNumber = d3.scaleLinear().domain([Xmin_CycleNumber, Xmax_CycleNumber]).range([0, width]);

    let yscale_CycleNumber = d3.scaleLinear().domain([Xmin_CycleNumber, Xmax_CycleNumber]).range([yRange, 0]);
    let yscale_CycleTime = d3.scaleLinear().domain([min_cycleTime, max_cycleTime]).range([yRange, 0]);
    let yscale_SensorValue = d3.scaleLinear().domain([Ymin_SensorValue, Ymax_SensorValue]).range([yRange, 0]);
    //#endregion x, y scales definition
    //#region x, y scales parameters

    let xAxis_Time = d3.axisBottom(xscale_Time);
    let xAxis_CycleNumner = d3.axisBottom(xscale_CycleNumber);

    if (differnce_Time < 60001) {
        xAxis_Time.ticks(d3.timeSecond.every(5));
    }
    else if (60002 < differnce_Time || differnce_Time < 900000) {
        xAxis_Time.ticks(d3.timeMinute.every(1));
    }
    else if (900001 < differnce_Time || differnce_Time < 1800000) {
        xAxis_Time.ticks(d3.timeMinute.every(15));
    }
    else if (1800001 < differnce_Time || differnce_Time < 3600000) {
        xAxis_Time.ticks(d3.timeMinute.every(30));
    } else {
        xAxis_Time.ticks(d3.timeHour.every(1));
    }

    let yAxis_CycleNumber = d3.axisRight(yscale_CycleNumber).ticks(5);
    let yAxis_CycleTime = d3.axisLeft(yscale_CycleTime).ticks(5);
    let yAxis_SensorValue = d3.axisRight(yscale_SensorValue).ticks(5);
    //#endregion x, y scales parameters

    let dotCycle = gCycleDot.selectAll("circle").data(data);
    let dotCycleTime = gCycleTimeDot.selectAll("circle").data(data);

    let dot1 = gDot1.selectAll("circle").data(data);
    let dot2 = gDot2.selectAll("circle").data(data);
    let dot3 = gDot3.selectAll("circle").data(data);
    let dot4 = gDot4.selectAll("circle").data(data);
    let dot5 = gDot5.selectAll("circle").data(data);
 
    let t = d3.transition().duration(1750);

    //#region gx call
    gxcycle.transition(t).call(xAxis_Time);
    gxcycleTime.transition(t).call(xAxis_CycleNumner);
    gx1.transition(t).call(xAxis_CycleNumner);
    gx2.transition(t).call(xAxis_CycleNumner);
    gx3.transition(t).call(xAxis_CycleNumner);
    gx4.transition(t).call(xAxis_CycleNumner);
    gx5.transition(t).call(xAxis_CycleNumner);
    //#endregion gx call

    //#region gy call

    gycycle.transition(t).call(yAxis_CycleNumber);
    gycycleTime.transition(t).call(yAxis_CycleTime);

    gy1.transition(t).call(yAxis_SensorValue);
    gy2.transition(t).call(yAxis_SensorValue);
    gy3.transition(t).call(yAxis_SensorValue);
    gy4.transition(t).call(yAxis_SensorValue);
    gy5.transition(t).call(yAxis_SensorValue);
    //#endregion gy call


    //#region axis label
    let xCycleXAxisLabel =
        d3.select('#cycle_chart_x_label')
            .attr("x", width + margin.right)
            .attr("y", `${(yRange + translateY + margin.bottom)}`)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("Date →");
    let xCycleYAxisLabel =
        d3.select('#cycle_chart_y_label')
            .attr("x", 0)
            .attr("y", margin.top)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ N° Cycle");

    let xCycleTimeXAxisLabel =
        d3.select('#cycleTime_chart_x_label')
            .attr("x", width + margin.right)
            .attr("y", `${(yRange + translateY + margin.bottom)}`)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(" N° Cycle →");
    let xCycleTimeYAxisLabel =
        d3.select('#cycleTime_chart_y_label').attr("x", 0).attr("y", margin.top).attr("fill", "currentColor").attr("text-anchor", "start")
            .text("↑ Temps de cycle");

    //#endregion
    //#region axis label
    d3.selectAll('.cycleSensor_xAxis_label')
        .attr("fill", "currentColor").attr("text-anchor", "end")
        .attr("x", width + margin.right).attr("y", `${(yRange + translateY + margin.bottom)}`)
        .text("N° Cycle →");

    let cycleSensor_yAxis_1_label =
        d3.select('#cycleSensor_yAxis_1_label')
            .attr("fill", "currentColor").attr("text-anchor", "start")
            .attr("x", 0).attr("y", margin.top)
            .text("↑ Valeur capteur 1");
    let cycleSensor_yAxis_2_label =
        d3.select('#cycleSensor_yAxis_2_label')
            .attr("fill", "currentColor").attr("text-anchor", "start")
            .attr("x", 0).attr("y", margin.top)
            .text("↑ Valeur capteur 2");
    let cycleSensor_yAxis_3_label =
        d3.select('#cycleSensor_yAxis_3_label')
            .attr("fill", "currentColor").attr("text-anchor", "start")
            .attr("x", 0).attr("y", margin.top)
            .text("↑ Valeur capteur 3");
    let cycleSensor_yAxis_4_label =
        d3.select('#cycleSensor_yAxis_4_label')
            .attr("fill", "currentColor").attr("text-anchor", "start")
            .attr("x", 0).attr("y", margin.top)
            .text("↑ Valeur capteur 4");
    let cycleSensor_yAxis_5_label =
        d3.select('#cycleSensor_yAxis_5_label')
            .attr("fill", "currentColor").attr("text-anchor", "start")
            .attr("x", 0).attr("y", margin.top)
            .text("↑ Valeur capteur 5");
    //#endregion
    //#region x dateTime, y numéro cycle
    dotCycle.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_Time(timeParse(moment(d.date_Heure).format())))
        .attr("cy", d => yscale_CycleNumber(d.nr_Cycle))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dotCycle.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_Time(timeParse(moment(d.date_Heure).format())))
        .attr("cy", d => yscale_CycleNumber(d.nr_Cycle))
        .style("fill-opacity", 1);
    dotCycle.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale_Time(timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => {
            return yscale_CycleNumber(d.nr_Cycle);
        })
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gCycleLine.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_Time(+ timeParse(moment(d.date_Heure).format())))
            .y(d => yscale_CycleNumber(+d.nr_Cycle))
        );
    //#endregion x dateTime, y numéro cycle

    //#region x numéro cycle, y time de cycle
    dotCycleTime.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_CycleTime(d.cycleTime_s))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dotCycleTime.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_CycleTime(d.cycleTime_s))
        .style("fill-opacity", 1);
    dotCycleTime.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale_CycleNumber(d.nr_Cycle)
        })
        .attr("cy", d => {
            return yscale_CycleTime(d.cycleTime_s);
        })
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gCycleTimeLine.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+d.nr_Cycle))
            .y(d => yscale_CycleTime(+d.cycleTime_s))
        );
    //#endregion x numéro cycle, y time de cycle

    //#region x numéro cycle, y valeur de capteur 1
    dot1.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v1))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot1.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v1))
        .style("fill-opacity", 1);
    dot1.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d =>xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d =>yscale_SensorValue(d.v1))
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gLine1.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.v1))
        );
    gTH1.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tH1*100))
    );
    gTL1.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tL1*100))
    );
    //#endregion x numéro cycle, y valeur de capteur 1
    //#region x numéro cycle, y valeur de capteur 2
    dot2.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v2))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot2.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v2))
        .style("fill-opacity", 1);
    dot2.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v2))
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gLine2.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.v2))
        );
    gTH2.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tH2 * 100))
        );
    gTL2.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tL2 * 100))
        );
    //#endregion x numéro cycle, y valeur de capteur 2
    //#region x numéro cycle, y valeur de capteur 3
    dot3.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v3))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot3.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v3))
        .style("fill-opacity", 1);
    dot3.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v3))
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gLine3.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.v3))
        );
    gTH3.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tH3 * 100))
        );
    gTL3.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tL3 * 100))
        );
    //#endregion x numéro cycle, y valeur de capteur 3
    //#region x numéro cycle, y valeur de capteur 4
    dot4.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v4))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot4.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v4))
        .style("fill-opacity", 1);
    dot4.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v4))
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gLine4.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.v4))
        );
    gTH4.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tH4 * 100))
        );
    gTL4.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tL4 * 100))
        );
    //#endregion x numéro cycle, y valeur de capteur 4
    //#region x numéro cycle, y valeur de capteur 5
    dot5.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v5))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot5.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v5))
        .style("fill-opacity", 1);
    dot5.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => xscale_CycleNumber(d.nr_Cycle))
        .attr("cy", d => yscale_SensorValue(d.v5))
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
    gLine5.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.v5))
        );
    gTH5.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tH5 * 100))
        );
    gTL5.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale_CycleNumber(+ d.nr_Cycle))
            .y(d => yscale_SensorValue(+d.tL5 * 100))
        );
    //#endregion x numéro cycle, y valeur de capteur 5
    //#region grid

    //#region grid cycle

    const grid_cycle = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(x.ticks(d3.timeMinute.every(1)))
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove())
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d)))
        .call(g => g
            .selectAll(".y")
            .data(y.ticks(4))
            .join(
                enter => enter.append("line").attr("class", "y").attr("x2", width),
                update => update,
                exit => exit.remove())
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d)));
    //#endregion grid cycle
    //#region grid temps de cycle
    const grid_cycleTime = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(x.ticks(6))
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove())
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d)))
        .call(g => g
            .selectAll(".y")
            .data(y.ticks(4))
            .join(
                enter => enter.append("line").attr("class", "y").attr("x2", width),
                update => update,
                exit => exit.remove())
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d)));
    //#endregion grid temps de cycle
    //#region grid valeur capteur
    const grid_SensorValue = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(x.ticks(5))
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove()
            )
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d)))
        .call(g => g
            .selectAll(".y")
            .data(y.ticks(4))
            .join(
                enter => enter.append("line").attr("class", "y").attr("x2", width),
                update => update,
                exit => exit.remove()
            )
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d)));
    //#endregion grid valeur capteur
    //#region call grid
    d3.select("#gCycleGrid")
        .attr("transform", `translate(${20},${translateY})`)
        .call(grid_cycle, xscale_Time, yscale_CycleNumber);
    d3.select("#gCycleTimeGrid")
        .attr("transform", `translate(${20},${translateY})`)
        .call(grid_cycleTime, xscale_CycleNumber, yscale_CycleTime);
    d3.select("#gCycleSensorGrid_1")
        .attr("transform", `translate(${20},${translateY})`)
        .call(grid_SensorValue, xscale_CycleNumber, yscale_SensorValue);
    d3.select("#gCycleSensorGrid_2")
        .attr("transform", `translate(${20},${translateY})`)
        .call(grid_SensorValue, xscale_CycleNumber, yscale_SensorValue);
    d3.select("#gCycleSensorGrid_3")
            .attr("transform", `translate(${20},${translateY})`)
            .call(grid_SensorValue, xscale_CycleNumber, yscale_SensorValue);
    d3.select("#gCycleSensorGrid_4")
            .attr("transform", `translate(${20},${translateY})`)
            .call(grid_SensorValue, xscale_CycleNumber, yscale_SensorValue);
    d3.select("#gCycleSensorGrid_5")
            .attr("transform", `translate(${20},${translateY})`)
        .call(grid_SensorValue, xscale_CycleNumber, yscale_SensorValue);
    //#endregion call grid

//#endregion grid

    //#region tooltip function
    function pointerover(event, d, i) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip.html(
            "<br/> Date_Heure:  "+timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> V1:  " + d.v1
            + "<br/> V2:  " + d.v2
            + "<br/> V3:  " + d.v3
            + "<br/> V4:  " + d.v4
            + "<br/> V5:  " + d.v5
            + "<br/> N° Cycle:  " + d.nr_Cycle
            + "<br/> Temps de cycle:  " + d.cycleTime_s + " (s)"
        )
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointermove(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip.html(
            "<br/> Date_Heure:  " + timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> V1:  " + d.v1
            + "<br/> V2:  " + d.v2
            + "<br/> V3:  " + d.v3
            + "<br/> V4:  " + d.v4
            + "<br/> V5:  " + d.v5
            + "<br/> N° Cycle:  " + d.nr_Cycle
            + "<br/> Temps de cycle:  " + d.cycleTime_s + " (s)"
        )
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointerout(event, d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    //#endregion 
}
//#endregion update or init function



