function cleanActivityReportChartChildren() {
    const report_chart = document.getElementById("historicalReport_chart");
    while (report_chart.firstChild) {
        report_chart.removeChild(report_chart.lastChild);
    }
}
function drawHistoricalReportChart(data) {
    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z");
    timeFormat = d3.timeFormat("%c");
    const height = 300;
    const margin = ({ top: 20, right: 20, bottom: 30, left: 50 });
    const width = 900 - margin.left - margin.right;

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => {
            //console.log(d);
            //console.log(timeParse(moment(d.startTime).format()))
            return timeParse(moment(d.startTime).format())
        }))
        .range([margin.left, width * 6 - margin.right])

    const y = d3.scaleLinear()
        .domain([0, 20]).nice(6)
        .range([height - margin.bottom, margin.top])

    const xAxis = g => g
        .attr("transform", `translate(0,0)`)
        .attr("class", "xAxis")
        .call(d3.axisBottom(x).ticks(10).tickSizeOuter(0))
    const tooltip = d3.select("#historicalReport_tooltip")
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
    //  <span>Durée du cycle</span>: ${d.duration} secondes, 


    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again

    const area = d3.area()
        .curve(d3.curveStep)
        .x(d => timeParse(d.startTime))
        .y0(y(0))
        .y1(height);

    //const minX = x(timeParse(data[0].startTime));
    //const maxX = x(timeParse(data[data.length - 1].endTime));

    const minX = x(timeParse(moment(data[0].startTime).format()));
    const maxX=x(timeParse(moment(data[data.length - 1].startTime).format()))
   // const maxX = x((data[data.length - 1].endTime));

   // console.log(x(timeParse(moment(data[0].startTime).format())));
    const overwidth = maxX - minX + margin.left + margin.right;
    //console.log(overwidth)
    const parent = d3.select("#historicalReport_chart");


    const scollbar = parent.append("div")
        .attr("class", "scollBar")
        .style("overflow-x", "scroll")
        .style("-webkit-overflow-scrolling", "touch");

    const barArea = scollbar.append("svg")
        .attr("class", "barArea")
        .attr("width", overwidth)
        .attr("height", height)
    .style("background-color", "rgba(56,56,56,0.2)")

    data.forEach((d, i) => {
        //console.log(timeParse(d.endTime) - timeParse(d.startTime))
        
        if (i != data.length - 1) {
            
            d.endTime = data[i + 1].startTime;
        }
        d.duration = d3.timeSecond.count(timeParse(moment(d.startTime).format()), timeParse(moment(d.endTime).format()))
        //console.log('duration :', timeParse(d.endTime) - timeParse(d.startTime))
    })

    const bar=barArea.append('g')
        .attr("class", "bar")

    const gPolyline = bar.append("g").style('font-family', 'sans-serif')
    const gCodeLabels = barArea.append("g").style('font-family', 'sans-serif')
    const gDots = barArea.append("g").style('font-family', 'sans-serif')
    const spaceBetween = 30

    const barRect=bar.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d, i) => {
            return x(timeParse(moment(d.startTime).format()))
            //return 0
        })
        .attr("y", height)
        .attr("width", (d, i) => {
            console.log(x(timeParse(moment(d.endTime).format())))
            return x(timeParse(moment(d.endTime).format())) - x(timeParse(moment(d.startTime).format()))
        })
        .attr("height", ()=>{
            return height / 6
        })
        //.style("fill",d => COLOR[parseInt(d.Code)])
        .attr('transform', `translate(0,${- height / 6})`)
        .style("fill", d => d.color)
        .on("mouseover", (event, d, i) => {
            let time;
            if (d.duration > 86400) {
                time = (d.duration / 86400).toFixed(2) + " days"
            }
            else if (d.duration > 3600) {
                time = (d.duration / 3600).toFixed(2) + " hours"
            }
            else {
                time = d.duration + " seconds"
            }
            d3.select(event.currentTarget)
                .transition()
                .duration(2000)
                .attr("transform", `translate(0, ${- height / 3})`)
                .attr("height", 2 * height / 6);
            d3.select(event.currentTarget).select('rect')
                .transition()
                .duration(2000)
                .attr('stroke', 'rgba(100, 100, 100, 0.2)')
                .attr('stroke-width', 4);
            tooltip

                .style("opacity", 1)
                .html(` <ul style="list-style: none;">
                <li>${d.name}</li>
                <li><span>Start</span>: ${timeFormat(timeParse(d.startTime))}</li>
                <li><span>End</span>: ${timeFormat(timeParse(d.endTime))}</li>
                 <li><span>Last</span>: ${time}</li>
                </ul>
                `)
                .style("left", (event.x) / 5 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (event.y) / 5 + "px")
        })
        .on("mouseout", (event, d) => {
            d3.select(event.currentTarget)
                .transition()
                .duration(1000)
                .attr('transform', `translate(0,${-  height / 6})`)
                .attr("height", 2 * height / 6);
            d3.select(event.currentTarget).select('rect')
                .transition()
                .duration(1000)
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
            tooltip

                .style("opacity", 0)
        })

    const polyline = gPolyline
        .selectAll('allPolylines')
        .data(data)
        .attr("class", "polyline")
    polyline
        .join('polyline')
        .transition()
        .duration(1000)
        .attr("stroke", function (d, i) {
            i % 20 <11? color = 'black' : color = 'crimson'
            return color;
        })
        .style("fill", "none")
        .style("opacity", 0.2)
        .attr("stroke-width", 1)
        .attr('points', function (d, i) {
            let modulo = i % 10, secondModulo=i%20 
            const posA = [x(timeParse(moment(d.startTime).format())), height] // line insertion in the slice
            const posB = [x(timeParse(moment(d.startTime).format())), 2*height/3]  // Label position = almost the same as posB
            let cx, cy
            data.length - i > 20 ? cx = 1 : cx = -1
            secondModulo<10?cy=0:cy=15
            const posC = [x(timeParse(moment(d.startTime).format())) + (modulo * spaceBetween*cx), modulo * spaceBetween + 10+cy]
            return [posA, posB, posC]
        })
        .attr("display", (d, i) => {
           
            return (d.duration > 60 ? "none" : "inline");
        })
        ;


    const dots = gDots
        .selectAll('circle')
        .data(data)
        .join('circle')

        .on("mouseover", (event, d, i) => {
            tooltip
                .style("opacity", 0.8)
                .html(`<ul style="list-style: none;">
                <li>${d.name}</li>
                <li><span>Start</span>: ${timeFormat(timeParse(moment(d.startTime).format()))}</li>
                <li><span>End</span>: ${timeFormat(timeParse(moment(d.endTime).format()))}</li>
                <li><span>Last</span>: ${d.duration} seconds</li>
                </ul>`)
                //.style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (event.y) / 4 + "px")
                .transition()
                .duration(1000)
        })

        .on("mouseout", (event, d) => {
            tooltip
                .style("opacity", 0).transition()
                .duration(500)
        })

        dots
        .transition()
        .duration(1000)
        .attr('cx', (d, i) => {
            let modulo = i % 10, cx
            data.length - i > 20 ? cx = 1 : cx = -1
            return x(timeParse(moment(d.startTime).format())) + (modulo * spaceBetween * cx)
        })
        .attr('cy', (d, i) => {
            let modulo = i % 10, secondModulo = i % 20, cy
            secondModulo < 10 ? cy = 0 : cy = 15
            return modulo * spaceBetween + 10 + cy
        })
        .attr("r", 10)
        .style('fill', d => {
           return  d.color
        })
        .attr('opacity', 0.6)
        .attr("display", (d, i) => {
            return (d.duration > 60 ? "none" : "inline");
        });

    const xAxisDiv = scollbar.append("svg")
        .attr("class", "xAxisDiv")
        .attr("width", overwidth)
        .attr("height", margin.bottom)
        .style("display", "block")
        .call(svg =>
            svg.append("g")
                .call(xAxis))
    gPolyline.call(polyline);
    scollbar.node().scrollBy(overwidth, 0);
}

