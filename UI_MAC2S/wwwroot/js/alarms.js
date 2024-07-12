
function cleanNokAlarmChartChildren() {
    const nokalarm_chart = document.getElementById("alarm_chart");
    while (nokalarm_chart.firstChild) {
        nokalarm_chart.removeChild(nokalarm_chart.lastChild);
    }
}

function drawAlarmChart(nokData, skewingData, seconds, start, end) {


    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    timeFormat = d3.timeFormat("%c");
    const margin = {
        top: 90,
        right: 20,
        bottom: 90,
        left: 90
    },
        height = 350;

    const width = 900 - margin.left - margin.right;

    const alarmTooltip = d3.select("#alarm_tooltip")
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


    let xTicks;
    let xTixksResults;
    let xTixksResultsBis;
    timeData = (nokData.map(d => timeParse(d.date_Heure)));

    nokData.forEach((el, i) => {
        el.date_Heure = timeParse(el.date_Heure)

    });
    skewingData.forEach((el, i) => {
        el.date_Heure = timeParse(el.date_Heure)

    });


    const y = d3.scaleLinear()
        .domain([0, 20]).nice(6)
        .range([height - margin.bottom, margin.top])

    let x = d3.scaleTime()
        .domain([timeParse(start), timeParse(end)])
        .range([margin.left, width * 6 - margin.right])


    const minX = x(timeParse(start));
    const maxX = x(timeParse(end));

    const overwidth = maxX - minX + margin.left + margin.right;
    const parent = d3.select("#alarm_chart");

    if (seconds > 86400) {  //24h
        xTicks = x.ticks(d3.timeHour.every(4))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeHour.every(4)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0)
    }
    else if (seconds > 28800) {//8h
        xTicks = x.ticks(d3.timeMinute.every(5))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeHour.every(1)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d %H:%M")).ticks(d3.timeMinute.every(30)).tickSizeOuter(0)
    }
    else if (seconds > 14400) {//4h
        xTicks = x.ticks(d3.timeMinute.every(5))
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%H:%M")).ticks(d3.timeHour.every(1)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d %H:%M")).ticks(d3.timeMinute.every(15)).tickSizeOuter(0)
    }
    else {
        xTicks = x.ticks(d3.timeMinute.every(1));
        xTixksResults = d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d %H:%M")).ticks(d3.timeMinute.every(30)).tickSizeOuter(0)
        xTixksResultsBis = d3.axisTop(x).tickFormat(d3.timeFormat("%m-%d")).ticks(d3.timeDay.every(1)).tickSizeOuter(0)
    }

    xAxis = g => g
        .attr("transform", `translate(0,0)`)
        .attr("class", "xAxis")

        .transition()
        .duration(1000)
        .call(xTixksResults)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        ;
    // set the parameters for the histogram
    gxBis = g => g
        .attr("transform", `translate(0,65)`)
        .attr("class", "xAxis")
        .transition()
        .duration(2000)
        .call(xTixksResultsBis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", ".8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(45)")
        .attr("font-size", "medium")
        ;
    const scollbar = parent.append("div")
        .attr("class", "scollBar")
        .style("overflow-x", "scroll")
        .style("-webkit-overflow-scrolling", "touch")
        .style("background-color", "rgba(56,56,56,0.2)")

    const xAxisDivStart = scollbar.append("svg")
        .attr("class", "xAxisDiv")
        .attr("width", overwidth)
        .attr("height", 66)
        .style("display", "block")
        .call(svg =>
            svg.append("g")
                .call(gxBis))
    //.style("background-color", "gray")
    //.style("opacity", 0.8);
    const AlarmDetail = scollbar.append("svg")
        .attr("class", "AlarmDetail")
        .attr("width", overwidth)
        .attr("height", height)


    const yAxis = AlarmDetail.append("g")
    //const xAxis = AlarmDetail.append("g");
    //const gxBis = AlarmDetail.append("g").attr("transform", `translate(0,  0)`)
    const gGrid = AlarmDetail.append("g");
    const gNokline = AlarmDetail.append("g").style('font-family', 'sans-serif')
    const gSkewingline = AlarmDetail.append("g").style('font-family', 'sans-serif')
    const spaceBetween = 30
    const gNokDots = AlarmDetail.append("g").style('font-family', 'sans-serif').attr("id", "nokdots")
    const gSkewingDots = AlarmDetail.append("g").style('font-family', 'sans-serif').attr("id", "skewingdots")
    const NokDots = gNokDots.selectAll("nokdots").data(nokData).join('circle')
        .on("mouseover", (event, d, i) => {
            alarmTooltip
                .style("opacity", 0.8)
                .html(`<ul style="list-style: none;">
                <li>NOK: ${d.nok}</li>
                <li><span>Time</span>: ${timeFormat(d.date_Heure)}</li>
                <li><span>Cycle N°</span>: ${d.nr_Cycle}</li>
                </ul>`)
                .style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("bottom", (event.y) / 4 + "px")
                .transition()
                .duration(1000)
        })
        .on("mousemove", (event, d, i) => {
            alarmTooltip
                .style("opacity", 0.8)
                .html(`<ul style="list-style: none;">
                <li>NOK: ${d.nok}</li>
                <li><span>Time</span>: ${timeFormat(d.date_Heure)}</li>
                <li><span>Cycle N°</span>: ${d.nr_Cycle}</li>
                </ul>`)
                .style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("bottom", (event.y) / 4 + "px")
                .transition()
                .duration(1000)
        })
        .on("mouseout", (event, d) => {
            alarmTooltip
                .style("opacity", 0).transition()
                .duration(500)
        })
    NokDots
        .transition()
        .duration(1000)
        .attr('cx', (d, i) => {
            let modulo = i % 10 + 1, cx
            nokData.length - i > 20 ? cx = 1 : cx = -1
            return x(d.date_Heure) + ((10 - modulo) * spaceBetween * cx)
        })
        .attr('cy', (d, i) => {
            let modulo = i % 10 + 1, secondModulo = i % 20, cy
            secondModulo < 10 ? cy = 0 : cy = 15
            return (10 - modulo) * spaceBetween + 10 + cy
        })
        .attr("r", 10)
        .style('fill', d => {
            return "crimson"
        })
        .attr('opacity', 0.7)
    const SkewingDots = gSkewingDots.selectAll("skewingdots").data(skewingData).join('circle')
        .on("mouseover", (event, d, i) => {
            let e1,e2, e3, e4, e5
            ((d.lo_Tol_S1 < d.abs_Val_S1_microm) && (d.abs_Val_S1_microm < d.hi_Tol_S1)) ? e1 = "No" : e1 ="Yes";   
            ((d.lo_Tol_S2 < d.abs_Val_S2_microm) && (d.abs_Val_S2_microm < d.hi_Tol_S2)) ? e2 = "No" : e2 = "Yes";
            ((d.lo_Tol_S3 < d.abs_Val_S3_microm) && (d.abs_Val_S3_microm < d.hi_Tol_S3)) ? e3 = "No" : e3 = "Yes";
            ((d.lo_Tol_S4 < d.abs_Val_S4_microm) && (d.abs_Val_S4_microm < d.hi_Tol_S4)) ? e4 = "No" : e4 = "Yes";
            ((d.lo_Tol_S5 < d.abs_Val_S5_microm) && (d.abs_Val_S5_microm < d.hi_Tol_S5)) ? e5 = "No" : e5 = "Yes";
            alarmTooltip
                .style("opacity", 0.8)
                .html(`<ul style="list-style: none;">
                <li>Skewing at</li>
                <li><span>Time</span>: ${timeFormat(d.date_Heure)}</li>               
                <li><span>Cycle N°</span>: ${d.nr_Cycle}</li>
                <li><span>Excess S1</span>: ${e1}</li>
                <li><span>Excess S2</span>: ${e2}</li>
                <li><span>Excess S3</span>: ${e3}</li>
                <li><span>Excess S4</span>: ${e4}</li>
                <li><span>Excess S5</span>: ${e5}</li>
                </ul>`)
                .style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("bottom", (event.y) / 4 + "px")
                .transition()
                .duration(1000)
        })
        .on("mousemove", (event, d, i) => {
            let e1, e2, e3, e4, e5
            ((d.lo_Tol_S1 < d.abs_Val_S1_microm) && (d.abs_Val_S1_microm < d.hi_Tol_S1)) ? e1 = "No" : e1 = "Yes";
            ((d.lo_Tol_S2 < d.abs_Val_S2_microm) && (d.abs_Val_S2_microm < d.hi_Tol_S2)) ? e2 = "No" : e2 = "Yes";
            ((d.lo_Tol_S3 < d.abs_Val_S3_microm) && (d.abs_Val_S3_microm < d.hi_Tol_S3)) ? e3 = "No" : e3 = "Yes";
            ((d.lo_Tol_S4 < d.abs_Val_S4_microm) && (d.abs_Val_S4_microm < d.hi_Tol_S4)) ? e4 = "No" : e4 = "Yes";
            ((d.lo_Tol_S5 < d.abs_Val_S5_microm) && (d.abs_Val_S5_microm < d.hi_Tol_S5)) ? e5 = "No" : e5 = "Yes";
            alarmTooltip
                .style("opacity", 0.8)
                .html(`<ul style="list-style: none;">
                 <li>Skewing at</li>
                <li><span>Time</span>: ${timeFormat(d.date_Heure)}</li>
                <li><span>Cycle N°</span>: ${d.nr_Cycle}</li>
                <li><span>Excess S1</span>: ${e1}</li>
                <li><span>Excess S2</span>: ${e2}</li>
                <li><span>Excess S3</span>: ${e3}</li>
                <li><span>Excess S4</span>: ${e4}</li>
                <li><span>Excess S5</span>: ${e5}</li>
                </ul>`)
                .style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("bottom", (event.y) / 4 + "px")
                .transition()
                .duration(1000)
        })
        .on("mouseout", (event, d) => {
            alarmTooltip
                .style("opacity", 0).transition()
                .duration(500)
        })
    SkewingDots
        .transition()
        .duration(1000)
        .attr('cx', (d, i) => {
            let modulo = i % 10 + 1, cx = -1
            //skewingData.length i > 20 ? cx = 1 : cx = -1
            return x(d.date_Heure) + (modulo * spaceBetween - cx)
        })
        .attr('cy', (d, i) => {
            let modulo = i % 10 + 1, secondModulo = i % 20, cy
            if (secondModulo < 5) {
                cy = 45
            }
            else if (secondModulo < 10) {
                cy = 30
            }
            else if (secondModulo < 15) {
                cy = 15
            }
            else {
                cy = 0
            }
            return modulo * spaceBetween - 10 + cy
        })
        .attr("r", 10)
        .style('fill', d => {
            return "skyblue"
        })
        .attr('opacity', 0.6)


    const nokline = gNokline
        .selectAll('allNoklines')
        .data(nokData)
        .attr("class", "polyline")
    nokline
        .join('polyline')
        .transition()
        .duration(1000)
        .attr("stroke", 'red')
        .style("fill", "none")
        .style("opacity", 0.5)
        .attr("stroke-width", 1)
        .attr('points', function (d, i) {
            let modulo = i % 10 + 1, secondModulo = i % 20

            const posA = [x((d.date_Heure)), height]
            const posB = [x((d.date_Heure)), 2 * height / 4]  // Label position = almost the same as posB
            let cx, cy
            nokData.length - i > 20 ? cx = 1 : cx = -1
            secondModulo < 10 ? cy = 0 : cy = 15
            const posC = [x(d.date_Heure) + ((10 - modulo) * spaceBetween * cx), (10 - modulo) * spaceBetween + 10 + cy]
            return [posA, posB, posC]
        })
    const skewingline = gSkewingline
        .selectAll('allSkewinglines')
        .data(skewingData)
        .attr("class", "polyline")
    skewingline
        .join('polyline')
        .transition()
        .duration(1000)
        .attr("stroke", 'black')
        .style("fill", "none")
        .style("opacity", 0.2)
        .attr("stroke-width", 1)
        .attr('points', function (d, i) {
            let modulo = i % 10 + 1, secondModulo = i % 20
            const posA = [x((d.date_Heure)), height]
            const posB = [x((d.date_Heure)), 2 * height / 3]  // Label position = almost the same as posB
            let cx = -1, cy
            //skewingData.length - i > 20 ? cx = 1 : cx = -1
            if (secondModulo < 5) {
                cy = 45
            }
            else if (secondModulo < 10) {
                cy = 30
            }
            else if (secondModulo < 15) {
                cy = 15
            }
            else {
                cy = 0
            }

            const posC = [x(d.date_Heure) - (modulo * spaceBetween * cx), modulo * spaceBetween - 10 + cy]
            return [posA, posB, posC]
        })

    const xAxisDivEnd = scollbar.append("svg")
        .attr("class", "xAxisDiv")
        .attr("width", overwidth)
        .attr("height", 65)
        .style("display", "block")
        .call(svg =>
            svg.append("g")
                .call(xAxis))
    //.style("background-color", "gray")
    //.style("opacity", 0.8);
    scollbar.node().scrollBy(overwidth, 0)
}
