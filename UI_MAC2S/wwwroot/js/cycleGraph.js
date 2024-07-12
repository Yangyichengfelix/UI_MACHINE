timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
timeFormat = d3.timeFormat("%c");
function GraphCycleDateHeure(data) {
    let CycleArray = [];
    let margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 20
    },

        pw = document.getElementById('cycle_chart').parentNode.parentNode.clientWidth
    ph = document.getElementById('cycle_chart').parentNode.parentNode.clientWidth;
    width = pw * 0.8;
    height = ph * 0.3;
    yRange = height * 0.7
    translateX = width * 0.05;
    translateY = height * 0.065;
    data.forEach((el) => {
        CycleArray.push(el);
    })


    let CycleTimeChart = d3.select("#cycleTime_chart");
    let CycleChart = d3.select("#cycle_chart");
    CycleTimeChart.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    CycleChart.attr("width", width - margin.right * 2).attr("height", height - margin.top * 2 + margin.bottom).attr("transform", `translate(${translateX},${translateY})`);
    let tooltip = d3.select("#cycle_tooltip").style("opacity", 0)


    d3.select(".cycle_xAxis").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    d3.select(".cycle_yAxis").attr("transform", `translate(${20},  ${translateY})`);
    d3.select(".cycleTime_xAxis").attr("transform", `translate(${20},  ${yRange + translateY})`);
    d3.select(".cycleTime_yAxis").attr("transform", `translate(${20},  ${translateY})`);
    let gCycleDot = d3.select(".gCycleDot").attr("transform", `translate(${20},  ${translateY})`);
    let gCycleTimeDot = d3.select(".gCycleTimeDot").attr("transform", `translate(${20},  ${translateY})`);
    let gCycleLine = d3.select(".gCycleLine");
    let gCycleTimeLine = d3.select(".gCycleTimeLine");

    let cycleXmin = d3.min(CycleArray, d => timeParse(moment(d.date_Heure).format()));
    let cycleXmax = d3.max(CycleArray, d => timeParse(moment(d.date_Heure).format()));
    let cycleDiffernce = cycleXmax - cycleXmin;
    let cycleYmin = d3.min(CycleArray, d => d.nr_Cycle) - 0.5;
    let cycleYmax = d3.max(CycleArray, d => d.nr_Cycle) + 0.5;

    let cycleTimeXmin = d3.min(CycleArray, d => d.nr_Cycle);
    let cycleTimeXmax = d3.max(CycleArray, d => d.nr_Cycle);
    let cycleTimeDiffernce = cycleTimeXmax - cycleTimeXmin;
    let cycleTimeYmin = d3.min(CycleArray, d => d.cycleTime_s) - 5;
    let cycleTimeYmax = d3.max(CycleArray, d => d.cycleTime_s) + 0.5;
    //#region x, y scales definition
    let cycleXscale = d3.scaleTime().domain([cycleXmin, cycleXmax]).range([0, width]);
    let cycleYscale = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    let cycleTimeXscale = d3.scaleLinear().domain([cycleTimeXmin, cycleTimeXmax])//option + shift+ 5 pour [] sur apple
        .range([0, width]);
    let cycleTimeYscale = d3.scaleLinear().domain([cycleTimeYmin, cycleTimeYmax]).range([yRange, 0]);
    //#endregion x, y scales definition
    //#region x, y scales parameters

    let xCycleAxis = d3.axisBottom(cycleXscale);
    let xCycleTimeAxis = d3.axisBottom(cycleTimeXscale);

            console.log("diff: " + cycleTimeDiffernce)
    //if (cycleDiffernce < 60001) {
    //    xCycleAxis.ticks(d3.timeSecond.every(5));
    //}
    //else if (60002 < differnce || differnce < 900000) {
    //    xCycleAxis.ticks(d3.timeMinute.every(1));
    //}
    //else if (900001 < differnce || differnce < 1800000) {
    //    xCycleAxis.ticks(d3.timeMinute.every(15));
    //}
    //else if (1800001 < differnce || differnce < 3600000) {
    //    xCycleAxis.ticks(d3.timeMinute.every(30));

    //} else {
    //    xCycleAxis.ticks(d3.timeHour.every(6));
    //}
    //xCycleAxis.ticks(d3.timeDay.every(1), "%B %a %d - %I %p");
    xCycleAxis.ticks(d3.timeDay.every(1), "%Y-%m-%d")
    xCycleTimeAxis.ticks(5);

    let yCycleAxis = d3.axisRight(cycleYscale).ticks(10);
    let yCycleTimeAxis = d3.axisRight(cycleTimeYscale).ticks(10);
    //#endregion x, y scales parameters
    cycleXscale.domain([cycleXmin, cycleXmax]);
    cycleYscale.domain([cycleYmin, cycleYmax]);
    cycleTimeXscale.domain([cycleTimeXmin, cycleTimeXmax]);
    cycleTimeYscale.domain([cycleTimeYmin, cycleTimeYmax]);

    let cycleDot = gCycleDot.selectAll("circle").data(data);
    let cycleTimeDot = gCycleTimeDot.selectAll("circle").data(data);

    let t = d3.transition().duration(1750);

    d3.select('.cycle_xAxis').transition(t)
        .call(xCycleAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", (d) => "rotate(-35)")
        ;
    d3.select(".cycle_yAxis").transition(t).call(yCycleAxis)


    cycleDot.exit().attr("class", "exit").transition(t)
        .attr("cx", d => cycleXscale(timeParse(moment(d.date_Heure).format())))
        .attr("cy", d => cycleYscale(d.nr_Cycle))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    cycleDot.attr("class", "update").transition(t)
        .attr("cx", (d, i) => cycleXscale(timeParse(moment(d.date_Heure).format())))
        .attr("cy", d => cycleYscale(d.nr_Cycle))

        .style("opacity", 0.5);
    cycleDot.enter().append("circle").attr("class", "enter cycleDot")
        .attr("cx", d => {
            //console.log(d)
            return cycleXscale(timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => {
            return cycleYscale(d.nr_Cycle);
        })
        .attr("r", 3)

        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
        .style("opacity", 0.8)

    d3.select('.cycleTime_xAxis').transition(t).call(xCycleTimeAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function (d) {
            return `rotate(${-35})`
        });
    d3.select(".cycleTime_yAxis").transition(t).call(yCycleTimeAxis);

    //#region axis label
    let xCycleXAxisLabel =
        d3.select('#cycle_chart_x_label')
            .attr("x", width + margin.right)
            .attr("y", `${(yRange + translateY + margin.bottom) }`)
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
            .attr("x", width+margin.right)
            .attr("y", `${(yRange + translateY+margin.bottom)}`)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(" N° Cycle →");
    let xCycleTimeYAxisLabel =
        d3.select('#cycleTime_chart_y_label').attr("x", 0).attr("y", margin.top).attr("fill", "currentColor").attr("text-anchor", "start")
            .text("↑ Temps de cycle");

    //#endregion


    cycleTimeDot.exit().attr("class", "exit").transition(t)
        .attr("cx", d => cycleTimeXscale(d.nr_Cycle))
        .attr("cy", d => cycleTimeYscale(d.cycleTime_s))
        .attr("r", 1.5)

        .style("opacity", 1e-6)
        .remove();
    cycleTimeDot.attr("class", "update cycleTimeDot").transition(t)
        .attr("cx", d => cycleTimeXscale(d.nr_Cycle))
        .attr("cy", d => cycleTimeYscale(d.cycleTime_s))

        .style("opacity", 0.5);
    cycleTimeDot.enter().append("circle").attr("class", "enter cycleTimeDot")
        .attr("cx", d => {
            return cycleTimeXscale(d.nr_Cycle)
        })
        .attr("cy", d => {
            console.table(d.cycleTime_s);
            return cycleTimeYscale(d.cycleTime_s);
        })
        .attr("r", 3)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("opacity", 0.8)
        .style("fill", "crimson")

    //gCycleLine.datum(data).transition(t)
    //    .attr("d", d3.line()
    //        .x(d => xscale(+ timeParse(moment(d.date_Heure).format())))
    //        .y(d => yscale(+d.nr_Cycle))
    //    )


    //#region grid 
    const gridCycle = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(x.ticks(d3.timeHour.every(12)))
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove()
            )
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d)))
        .call(g => g
            .selectAll(".y")
            .data(y.ticks(5))
            .join(
                enter => enter.append("line").attr("class", "y").attr("x2", width),
                update => update,
                exit => exit.remove()
            )
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d)))
        ;
    d3.select(".gCycleGrid")
        .attr("transform", `translate(${20},${translateY})`)
        .call(gridCycle, cycleXscale, cycleYscale);

    const gridCycleTime = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(x.ticks(10))
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove()
            )
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d)))

        .call(g => g
            .selectAll(".y")
            .data(y.ticks(10))
            .join(
                enter => enter.append("line").attr("class", "y").attr("x2", width),
                update => update,
                exit => exit.remove()
            )
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d)))
        ;

    d3.select(".gCycleTimeGrid")
        .attr("transform", `translate(${20},${translateY})`)
        .call(gridCycleTime, cycleTimeXscale, cycleTimeYscale);
    //#endregion

    //#region tooltip function
    function pointerover(event, d, i) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> N° Cycle: " + d.nr_Cycle
            + "<br/> Temps de cycle: " + d.cycleTime_s + "(s)"
        )
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointermove(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.8);
        tooltip.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> N° Cycle: " + d.nr_Cycle
            + "<br/> Temps de cycle: " + d.cycleTime_s + "(s)"
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



