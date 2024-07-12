function drawStatusPieChart(data) {


    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    const margin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 200
    },
        width = parent.innerWidth/2,
        height = 450,
        
        duration = 550,
        spaceBewteenElements =35
        ;
    const radius = Math.min(width, height) /3.5 - margin.top
    function calcTranslate(data, move = 4) {
        const moveAngle = data.startAngle + ((data.endAngle - data.startAngle) / 2);
        return `translate(${- move * Math.cos(moveAngle + Math.PI / 2) * 5}, ${- move * Math.sin(moveAngle + Math.PI / 2) * 5})`;
    }
    let pie = d3.pie()
        .startAngle(Math.PI)
        .endAngle(3 * Math.PI)
        .sort(/*(a, b) => fill.domain().indexOf(a.type) - fill.domain().indexOf(b.type)*/null)
        .value(d => {

            return d.duration
        })

    let dataReady = pie(data);
    const HeightOffset = height / 3.5
    const WidthOffset=width /5
    const tooltip = d3.select('#status_tooltip');
    tooltip.style("opacity", 0)
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
    const svgPie = d3.select('#status_chart').attr('width', width).attr('height', height - margin.top);

    const gSlice = svgPie.append("g").style('font-family', 'sans-serif')
        .attr('transform', `translate(${WidthOffset}, ${HeightOffset})`);
    const gPolyline = svgPie.append("g").style('font-family', 'sans-serif')
        .attr('transform', `translate(${WidthOffset}, ${HeightOffset})`);
    const gCodeLabels = svgPie.append("g").style('font-family', 'sans-serif')
        .attr('transform', `translate(${WidthOffset}, ${HeightOffset})`);
    const gPercentageLabels = svgPie.append("g").style('font-family', 'sans-serif')
        .attr('transform', `translate(${WidthOffset}, ${HeightOffset})`);

    const c = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateWarm(t * 0.8 + 0.1), data.length).reverse())

    // The arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.75)

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.8)

    let totalSecond = 0;


    data.forEach((d, i) => {
        totalSecond = totalSecond + d.duration

    })

     const slice=gSlice
         .selectAll('slice')
         .attr("class", "slice")

         .data(dataReady.reverse())

    slice
        .join('path')
        .on('mouseover', (event, v) => {
            let time;
            if (v.data.duration > 86400) {
                time = (v.data.duration / 86400).toFixed(2) + " days"
            }
            else if (v.data.duration > 3600) {
                time = (v.data.duration / 3600).toFixed(2) + " hours"
            }
            else if (v.data.duration > 60) {
                time = (v.data.duration / 60).toFixed(2) + " minutes"
            }
            else {
                time =v.data.duration + " seconds"
            }
            let ratio = (v.data.duration / totalSecond * 100).toFixed(2);
            d3.select(event.currentTarget)
                .transition()
                .duration(duration)
                .attr('transform', calcTranslate(v, 6));
            d3.select(event.currentTarget).select('arc')
                .transition()
                .duration(3000)
                .attr('stroke', 'rgba(100, 100, 100, 0.2)')
                .attr('stroke-width', 4);
            tooltip
                .style("opacity", 1)
                .html(`${v.data.name}, <span>Last about</span> ${time}, <span>Ratio</span>: ${ratio}%`)
                .style("left", (event.x) / 5 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                .style("top", (event.y) / 5 + "px")
        })
        .on('mouseout', (event, v) => {
            d3.select(event.currentTarget)
                .transition()
                .duration(4000)
                .attr('transform', 'translate(0, 0)');
            d3.select(event.currentTarget).select('arc')
                .transition()
                .duration(duration)
                .attr('stroke', 'white')
                .attr('stroke-width', 1)

            tooltip
                .style("opacity", 0);
        })
        .transition()
        .duration(1000)

        .attr('d', arc)
        .style("fill", d => {
            return d.data.color
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.5)
        .style('cursor', 'pointer')
;
    const polyline = gPolyline
        .selectAll('allPolylines')
        .data(dataReady)
        .attr("class", "polyline")
    polyline
        .join('polyline')
        .transition()
        .duration(1000)
        .attr("stroke", (d, i) => {
            return (i % 2 == 0 ? "red" : "black")
        })
        .style("fill", "none")
        .style("opacity", 0.5)
        .attr("stroke-width", 1)
        .attr('points', function (d, i) {
            let ratio = d.data.duration / totalSecond * 100
            const posA = arc.centroid(d) // line insertion in the slice
            //console.log(posA)
            //const posB = (i%2==0? arc.centroid(d):outerArcBis.centroid(d)) // line break: we use the other arc generator that has been built only for that
            const posB = (ratio > 40 ? outerArc.centroid(d) : arc.centroid(d));
            const posC = outerArc.centroid(d);  // Label position = almost the same as posB

            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
            // posB[0]=(i%2==0? posB[0]=20:posB[0])
            posB[0] = (ratio > 40 ? posA[0] : posB[0])
            posB[1] = (ratio > 40 ? posA[1] : posB[0])
            posC[0] = radius * 0.85 * (d.midangle > 6.5 ? -1.05 : 1.05); // multiply by 1 or -1 to put it on the right or on the left
            //posC[0]=  radius+i*25
            posC[1] = i * spaceBewteenElements - HeightOffset * 0.9
            return [posA, posB, posC]
        })
        .attr("display", (d, i) => {
            let ratio = d.data.duration / totalSecond * 100;
            return (ratio > 1 ? "none" : "inline");
        })
        ;

    const CodeLabels = gCodeLabels
        .selectAll('CodeLabels')
        .data(dataReady)
        .attr("class", "CodeLabels")
    CodeLabels
        .join('text')
        .transition()
        .duration(1000)
        .text(d => {
            //console.log(d.data[1].name)
            return `${d.data.name}`
        })
        .attr('transform', function (d, i) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            //pos[0] = radius * 0.85 * (midangle > Math.PI ? 1 : -1)-i*5;
            pos[0] = radius * 0.85 * (d.midangle > 6.5 ? -1.05 : 1.05);
            pos[1] = i * spaceBewteenElements - HeightOffset * 0.9
            return `translate(${pos})`;
        })
        .style('fill', 'crimson')
        .style('text-anchor', function (d, i) {
            //const midangle = d.startAngle + (d.endAngle - d.startAngle) / 10
            return 'start'
            //return (d.startAngle > 6.5 ? 'start' : 'end')
        })
        .attr("display", (d, i) => {
            let ratio = d.data.duration / totalSecond * 100;
            return (ratio > 1 ? "none" : "inline");
        });
    const PercentageLabels = gPercentageLabels
        .selectAll('PercentageLabels')
        .data(dataReady)
    PercentageLabels
         .join('text')
         .transition()
         .duration(1000)

        .text(d => {
            let time;
  
            if (d.data.duration > 86400) {
                time = (d.data.duration / 86400).toFixed(2) +" days"
            }
            else if (d.data.duration > 3600) {
                time = (d.data.duration / 3600).toFixed(2) + " hours"
            }
            else if (d.data.duration > 60) {
                time = (d.data.duration / 60).toFixed(2) + " minutes"
            }
            else {
                time = d.data.duration +" seconds"
            }
            return `${time} , ≈ ${(d.data.duration / totalSecond * 100).toFixed(2)}%`
        })
        .attr('transform', function (d, i) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            //pos[0] = radius * 0.85 * (midangle > Math.PI ? 1 : -1)-i*5;
            pos[0] = radius * 0.85 * (d.midangle > 6.5 ? -1.05 : 1.05);
            pos[1] = i * spaceBewteenElements + 15 - HeightOffset * 0.9
            return `translate(${pos})`;
        })
        .style('text-anchor', function (d, i) {
            //const midangle = d.startAngle + (d.endAngle - d.startAngle) / 10
            return'start'
            //return (d.startAngle > 6.5 ? 'start' : 'end')
        })
        .attr("display", (d, i) => {
            let ratio = d.data.duration / totalSecond * 100;
            return (ratio > 1 ? "none" : "inline");
        })
        ;
    gSlice.call(slice);
    gPolyline.call(polyline);
    gCodeLabels.call(CodeLabels);
    gPercentageLabels.call(PercentageLabels);
}
function cleanStatusPieChartChildren() {
    const status_chart = document.getElementById("status_chart");
    while (status_chart.firstChild) {
        status_chart.removeChild(status_chart.lastChild);
    }
}