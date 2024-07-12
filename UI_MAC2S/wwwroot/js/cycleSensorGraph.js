

timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
timeFormat = d3.timeFormat("%c");

function GraphCycleSensor(data) {
    let dataCycleSensorArray = [];

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
        dataCycleSensorArray.push(el);
    })
    let tooltip = d3.select("#cyclesensors_tooltip").style("opacity", 0)
    let chart1 = d3.select("#cycleSensor_1_chart");
    let chart2 = d3.select("#cycleSensor_2_chart");
    let chart3 = d3.select("#cycleSensor_3_chart");
    let chart4 = d3.select("#cycleSensor_4_chart");
    let chart5 = d3.select("#cycleSensor_5_chart");
    chart1.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    chart2.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    chart3.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    chart4.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    chart5.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);


    d3.select("#cycleSensor_xAxis_1").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    d3.select("#cycleSensor_xAxis_2").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    d3.select("#cycleSensor_xAxis_3").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    d3.select("#cycleSensor_xAxis_4").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    d3.select("#cycleSensor_xAxis_5").attr("transform", `translate(${20},  ${(yRange + translateY)})`);

    d3.select("#cycleSensor_yAxis_1").attr("transform", `translate(${20},  ${translateY})`);
    d3.select("#cycleSensor_yAxis_2").attr("transform", `translate(${20},  ${translateY})`);
    d3.select("#cycleSensor_yAxis_3").attr("transform", `translate(${20},  ${translateY})`);
    d3.select("#cycleSensor_yAxis_4").attr("transform", `translate(${20},  ${translateY})`);
    d3.select("#cycleSensor_yAxis_5").attr("transform", `translate(${20},  ${translateY})`);

    let gCycleSensorDot_1 = d3.select(".gCycleSensorDot_1").attr("transform", `translate(${20},  ${translateY})`),
        gCycleSensorDot_2 = d3.select(".gCycleSensorDot_2").attr("transform", `translate(${20},  ${translateY})`),
        gCycleSensorDot_3 = d3.select(".gCycleSensorDot_3").attr("transform", `translate(${20},  ${translateY})`),
        gCycleSensorDot_4 = d3.select(".gCycleSensorDot_4").attr("transform", `translate(${20},  ${translateY})`),
        gCycleSensorDot_5 = d3.select(".gCycleSensorDot_5").attr("transform", `translate(${20},  ${translateY})`);

    d3.select(".gT").attr("stroke", "blue").style("opacity", 0.4);

    let gTH1 = d3.select("#gTH1").attr("transform", `translate(${20},  ${translateY})`),
        gTH2 = d3.select("#gTH2").attr("transform", `translate(${20},  ${translateY})`),
        gTH3 = d3.select("#gTH3").attr("transform", `translate(${20},  ${translateY})`),
        gTH4 = d3.select("#gTH4").attr("transform", `translate(${20},  ${translateY})`),
        gTH5 = d3.select("#gTH5").attr("transform", `translate(${20},  ${translateY})`);
    let gTL1 = d3.select("#gTL1").attr("transform", `translate(${20},  ${translateY})`),
        gTL2 = d3.select("#gTL2").attr("transform", `translate(${20},  ${translateY})`),
        gTL3 = d3.select("#gTL3").attr("transform", `translate(${20},  ${translateY})`),
        gTL4 = d3.select("#gTL4").attr("transform", `translate(${20},  ${translateY})`),
        gTL5 = d3.select("#gTL5").attr("transform", `translate(${20},  ${translateY})`);

    let Xmin = d3.min(dataCycleSensorArray, d => d.nr_Cycle);
    let Xmax = d3.max(dataCycleSensorArray, d => d.nr_Cycle);
    let differnce = Xmax - Xmin;


    let Ymin1 = -25;
    let Ymin2 = -25;
    let Ymin3 = -25;
    let Ymin4 = -25;
    let Ymin5 = -25;
    let Ymax1 = 25;
    let Ymax2 = 25;
    let Ymax3 = 25;
    let Ymax4 = 25;
    let Ymax5 = 25;
    //#region x, y scales definition
    let xscale = d3.scaleLinear().domain([Xmin, Xmax]).range([0, width]);
    let yscale1 = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    let yscale2 = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    let yscale3 = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    let yscale4 = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    let yscale5 = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    //#endregion x, y scales definition
    //#region x, y scales parameters

    let xAxis = d3.axisBottom(xscale);
    if (differnce < 60001) {
        xAxis.ticks(20);
    }
    else {
        xAxis.ticks(10);
    }

    let yAxis1 = d3.axisRight(yscale1).ticks(10);
    let yAxis2 = d3.axisRight(yscale2).ticks(10);
    let yAxis3 = d3.axisRight(yscale3).ticks(10);
    let yAxis4 = d3.axisRight(yscale4).ticks(10);
    let yAxis5 = d3.axisRight(yscale5).ticks(10);
    //#endregion x, y scales parameters
    xscale.domain([Xmin, Xmax]);
    yscale1.domain([Ymin1, Ymax1]);
    yscale2.domain([Ymin2, Ymax2]);
    yscale3.domain([Ymin3, Ymax3]);
    yscale4.domain([Ymin4, Ymax4]);
    yscale5.domain([Ymin5, Ymax5]);


    let dot_v1 = gCycleSensorDot_1.selectAll("circle").data(data);
    let dot_v2 = gCycleSensorDot_2.selectAll("circle").data(data);
    let dot_v3 = gCycleSensorDot_3.selectAll("circle").data(data);
    let dot_v4 = gCycleSensorDot_4.selectAll("circle").data(data);
    let dot_v5 = gCycleSensorDot_5.selectAll("circle").data(data);

    let t = d3.transition().duration(1750);
    d3.select('#cycleSensor_xAxis_1').transition(t).call(xAxis);
    d3.select('#cycleSensor_xAxis_2').transition(t).call(xAxis);
    d3.select('#cycleSensor_xAxis_3').transition(t).call(xAxis);
    d3.select('#cycleSensor_xAxis_4').transition(t).call(xAxis);
    d3.select('#cycleSensor_xAxis_5').transition(t).call(xAxis);
    d3.select("#cycleSensor_yAxis_1").transition(t).call(yAxis1);
    d3.select("#cycleSensor_yAxis_2").transition(t).call(yAxis2);
    d3.select("#cycleSensor_yAxis_3").transition(t).call(yAxis3);
    d3.select("#cycleSensor_yAxis_4").transition(t).call(yAxis4);
    d3.select("#cycleSensor_yAxis_5").transition(t).call(yAxis5);

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
    //#region V1

    dot_v1.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale(d.nr_Cycle))
        .attr("cy", d => yscale1(d.v1))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot_v1.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale(d.nr_Cycle))
        .attr("cy", d => yscale1(d.v1))
        .style("fill-opacity", 1)
        ;
    dot_v1.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale(d.nr_Cycle)
        })
        .attr("cy", d => {
            return yscale1(d.v1);
        })
        .attr("r", 2)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "green")

    gTH1.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ d.nr_Cycle))
            .y(d => yscale1(+d.tH1 * 1000))
        )
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "none")
    gTL1.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ d.nr_Cycle))
            .y(d => yscale1(+d.tL1 * 1000))
        )
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "none")

    //#endregion V1
    //#region V2

    dot_v2.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale(d.nr_Cycle))
        .attr("cy", d => yscale2(d.v2))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot_v2.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale(d.nr_Cycle))
        .attr("cy", d => yscale2(d.v2))
        .style("fill-opacity", 1)
        ;
    dot_v2.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale(d.nr_Cycle)
        })
        .attr("cy", d => {
            return yscale2(d.v2);
        })
        .attr("r", 2)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "green")

    gTH2.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ d.nr_Cycle))
            .y(d => yscale2(+d.tH2 * 1000))
        )
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "none")
    gTL2.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ d.nr_Cycle))
            .y(d => yscale2(+d.tL2 * 1000))
        )
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "none")

    //#endregion V2
    //#region V3

    dot_v3.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale(d.nr_Cycle))
        .attr("cy", d => yscale3(d.v3))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot_v3.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => xscale(d.nr_Cycle))
        .attr("cy", d => yscale3(d.v3))
        .style("fill-opacity", 1)
        ;
    dot_v3.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale(d.nr_Cycle)
        })
        .attr("cy", d => {
            return yscale3(d.v3);
        })
        .attr("r", 2)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "green")

    gTH3.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ d.nr_Cycle))
            .y(d => yscale3(+d.tH3 * 1000))
        )
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "none")
    gTL3.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ d.nr_Cycle))
            .y(d => yscale3(+d.tL3 * 1000))
        )
        .attr("stroke", "red")
        .attr("stroke-opacity", "0.1")
        .attr("fill", "none")

    //#endregion V3
    //#region grid 
    const grid = (g, x, y) => g
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

    d3.select("#gCycleSensorGrid_1").attr("transform", `translate(${20},  ${translateY})`).call(grid, xscale, yscale1);
    d3.select("#gCycleSensorGrid_2").attr("transform", `translate(${20},  ${translateY})`).call(grid, xscale, yscale2);
    d3.select("#gCycleSensorGrid_3").attr("transform", `translate(${20},  ${translateY})`).call(grid, xscale, yscale3);
    d3.select("#gCycleSensorGrid_4").attr("transform", `translate(${20},  ${translateY})`).call(grid, xscale, yscale4);
    d3.select("#gCycleSensorGrid_5").attr("transform", `translate(${20},  ${translateY})`).call(grid, xscale, yscale5);
    //#endregion

    //#region tooltip function
    function pointerover(event, d, i) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> Cycle : " + d.nr_Cycle
            + "<br/> TH1 : " + d.tH1 * 1000
            + "<br/> TL1 : " + d.tL1 * 1000
        )
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointermove(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> Cycle : " + d.nr_Cycle
            + "<br/> TH1 : " + d.tH1 * 1000
            + "<br/> TL1 : " + d.tL1 * 1000
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



