

timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
timeFormat = d3.timeFormat("%c");
let dataArray = [];

function update(data) {

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
        dataArray.push(el);
    })
    d3.select("#realtime_chart")
        .attr("width", width - margin.right * 2)
        .attr("height", height - margin.top * 2 + margin.bottom)
        .attr("transform", `translate(${translateX},${translateY})`);
    let tooltip = d3.select("#sensors_tooltip").style("opacity", 0)


    let gx = d3.select("#sensor1_xAxis").attr("transform", `translate(${20},  ${(yRange + translateY)})`);
    let gy = d3.select("#sensor1_yAxis").attr("transform", `translate(${20},${translateY})`);
    let gDot1 = d3.select("#gDot1");
    let gLine1 = d3.select("#gLine1");
    let Xmin = d3.min(dataArray, d => timeParse(moment(d.date_Heure).format()));
   // console.log(dataArray);

    let Xmax = d3.max(dataArray, d => timeParse(moment(d.date_Heure).format()));
    let differnce=Xmax - Xmin;
    let Ymin = d3.min(dataArray, d => d.value)-0.5 ;

    let Ymax = d3.max(dataArray, d => d.value)+0.5;
    //#region x, y scales definition
    let xscale = d3.scaleTime().domain([Xmin,Xmax])//option + shift+ 5 pour [] sur apple
        .range([0, width]);
    let yscale = d3.scaleLinear().domain([-5, 5]).range([yRange, 0]);
    //#endregion x, y scales definition
    //#region x, y scales parameters

    let xAxis = d3.axisBottom(xscale);
    if (differnce < 60001) {
        xAxis.ticks(d3.timeSecond.every(5));
    }
    else if (60002 < differnce || differnce < 900000) {
        xAxis.ticks(d3.timeMinute.every(1));
    }
    else if (900001 < differnce || differnce < 1800000) {
        xAxis.ticks(d3.timeMinute.every(15));
    }
    else if (1800001 < differnce || differnce < 3600000) {
        xAxis.ticks(d3.timeMinute.every(30));

    } else {
        xAxis.ticks(d3.timeHour.every(1));

    }

    let yAxis = d3.axisRight(yscale).ticks(2);
    //#endregion x, y scales parameters
    xscale.domain([Xmin, Xmax]);
    yscale.domain([Ymin, Ymax]);


    let dot1 = gDot1.selectAll("circle").data(data);
 
    let t = d3.transition().duration(1750);
    d3.select('#sensor1_xAxis')
        .transition(t)
        .call(xAxis);
    d3.select("#sensor1_yAxis")
        .transition(t)
        .call(yAxis);

    dot1.exit().attr("class", "exit")
        .transition(t)
        .attr("cx", d => xscale(timeParse(moment(d.date_Heure).format())))
        .attr("cy", d => yscale(d.value))
        .attr("r", 1.5)
        .style("fill-opacity", 1e-6)
        .remove();
    dot1.attr("class", "update")
        .transition(t)
        .attr("cx", (d,i) =>xscale(timeParse(moment(d.date_Heure).format())))
        .attr("cy", d => yscale(d.value))
        .style("fill-opacity", 1)
        ;

    dot1.enter().append("circle")
        .attr("class", "enter")
        .attr("cx", d => {
            return xscale(timeParse(moment(d.date_Heure).format()))
        })
        .attr("cy", d => {
            return yscale(d.value);
        })
        .attr("r", 4)
        .on("mouseover", pointerover)
        .on("mousemove", pointermove)
        .on("mouseout", pointerout)
        .transition(t)
        .style("fill", "gold")

    gLine1.datum(data).transition(t)
        .attr("d", d3.line()
            .x(d => xscale(+ timeParse(moment(d.date_Heure).format())))
            .y(d => yscale(+d.value))
    )


    //#region grid 
    const grid1 = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
            .selectAll(".x")
            .data(x.ticks(d3.timeMinute.every(5)))
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

    d3.select("#gGrid1")
        .attr("transform", `translate(${20},${translateY})`)
        .call(grid1, xscale, yscale)
        ;
//#endregion

    //#region tooltip function
    function pointerover(event, d, i) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> Valeur" + d.value
            + "<br/> Cycle" + d.nr_Cycle)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    function pointermove(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .5);
        tooltip.html(timeFormat(timeParse(moment(d.date_Heure).format()))
            + "<br/> Valeur" + d.value
            + "<br/> Cycle" + d.nr_Cycle)
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



