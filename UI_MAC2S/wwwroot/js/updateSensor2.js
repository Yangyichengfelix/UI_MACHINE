

timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
timeFormat = d3.timeFormat("%c");
let dataArray2 = [];
function update2(data) {
    let margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 20
    },
        pw = document.getElementById('realtime_chart').parentNode.parentNode.clientWidth
    ph = document.getElementById('realtime_chart').parentNode.parentNode.clientWidth
    width = pw * 0.8;
    height = ph * 0.35;
    yRange = height * 0.7
    translateX = width * 0.05;
    translateY = height * 0.08;

    data.forEach((el) => {
        dataArray2.push(el);
    })
    d3.select("#realtime_chart2")
        .attr("width", width - margin.right * 2)
        .attr("height", height - margin.top * 2 + margin.bottom)
        .attr("transform", `translate(${translateX},${translateY})`);

    let tooltip2 = d3.select("#sensors2_tooltip").style("opacity", 0)



    let gx2 = d3.select(".sensor2_xAxis").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gy2 = d3.select(".sensor2_yAxis").attr("transform", `translate(${20},${translateY})`);
    let gDot2 = d3.select(".gDot2");
    let gLine2 = d3.select(".gLine2");
    let Xmin2 = d3.min(dataArray2, d => timeParse(moment(d.date_Heure).format()));
    // console.log(dataArray);

    let Xmax2 = d3.max(dataArray2, d => timeParse(moment(d.date_Heure).format()));
    let differnce = Xmax2 - Xmin2;
    let Ymin2 = d3.min(dataArray2, d => d.value) - 0.5;

    let Ymax2 = d3.max(dataArray2, d => d.value) + 0.5;
    //#region x, y scales definition
    let xscale2 = d3.scaleTime().domain([Xmin2, Xmax2])//option + shift+ 5 pour [] sur apple
        .range([0, width ]);
    let yscale2 = d3.scaleLinear().domain([-5, 5]).range([height * 0.7, 0]);
    //#endregion x, y scales definition
    //#region x, y scales parameters

    let xAxis2 = d3.axisBottom(xscale2);
    if (differnce < 60001) {
        xAxis2.ticks(d3.timeSecond.every(5));
    }
    else if (60002 < differnce || differnce < 900000) {
        xAxis2.ticks(d3.timeMinute.every(1));
    }
    else if (900001 < differnce || differnce < 1800000) {
        xAxis2.ticks(d3.timeMinute.every(15));
    }
    else if (1800001 < differnce || differnce < 3600000) {
        xAxis2.ticks(d3.timeMinute.every(30));

    } else {
        xAxis2.ticks(d3.timeHour.every(1));
    }




    let yAxis2 = d3.axisRight(yscale2).ticks(2);
    //#endregion x, y scales parameters
    xscale2.domain([Xmin2, Xmax2]);
    yscale2.domain([Ymin2, Ymax2]);

    let t = d3.transition().duration(1750);

    let dot2 =gDot2.selectAll("circle").data(data);




    d3.select('.sensor2_xAxis')
        .transition(t)
        .call(xAxis2);
    d3.select(".sensor2_yAxis")
        .transition(t)
        .call(yAxis2);

    dot2.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => {
            return xscale2(timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => yscale2(d.value))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot2.attr("class", "update")
        .transition(t)
        .attr("cx", (d, i) => {
            return xscale2(timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => yscale2(d.value))

        .style("fill", "black")
        .style("fill-opacity", 1)
        ;


    dot2.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale2(timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => {
            return yscale2(d.value);
        })
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")
        ;


    gLine2.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale2(+ timeParse(moment(d.date_Heure).format())))
            .y(d => yscale2(+d.value))
        )


//#region grid 
    const grid2 = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(
                    x.ticks(d3.timeMinute.every(5))
             )
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove()
            )
            .attr("x1", d => 0.5 +  x(d))
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

    d3.select(".gGrid2").call(grid2, xscale2, yscale2);
//#endregion 

    //#region tooltip function
    function pointerover(event, d, i) {
        tooltip2.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip2.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> Valeur" + d.value
            + "<br/> Cycle" + d.nr_Cycle)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointermove(event, d) {
        tooltip2.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip2.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> Valeur" + d.value
            + "<br/> Cycle" + d.nr_Cycle)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointerout(event, d) {
        tooltip2.transition()
            .duration(500)
            .style("opacity", 0);
    }

    //#endregion 
}
//#endregion update or init function



