function drawStatusGroupHorizontalChart(data) {

    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    const margin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 200
    },
        p = document.getElementById('statusCategoryHorizontal_chart').parentNode.clientWidth
    width = p*0.8
   // width = parent.innerWidth / 2,
    
        height = 300;


   // console.log(width / data.length + 1)
    const statusCategory = d3.select("#statusCategoryHorizontal_chart")
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "rgba(220,220,220,0.5)")
        .style("border-radius", "10px")
        .append("g")
        .attr("transform", `translate(${0},${margin.top})`)
        ;
    let totalSecond = 0;
    data.forEach((d, i) => {
        totalSecond = totalSecond + d.duration
    })
    let y = d3.scaleSqrt()
    let maxY;
    maxY = d3.max(data, d => d.duration)
    maxY = totalSecond
    y.domain([0, maxY])
        .range([0, 250]);

    let x = d3.scaleLinear()
    x.domain([0, d3.max(data, d => d.id)]).range([0, width]);
    statusCategory.selectAll("rect")
        .data(data,  (d) => d.name)
        .join('rect')
        .attr('width', width/(data.length*2))
        .attr('x', (d, i) =>x(i+1.5))
        .attr('y', (d, i) =>y(0)-y(d.duration))
        .attr("height", (d, i) =>y(d.duration))
        .attr("transform", (d, i) =>`translate(${0},${height + margin.top })`)
        .style('fill', d =>d.color);
    statusCategory.selectAll('text')
        .data(data,  (d) =>d.name)
        .join('text')
        .attr('id', 'label')
        .attr('class', 'RectText')
        .attr('x', (d, i) => x(i + 1.5))
        .attr('y', (d, i) => y(0) - y(d.duration)-30)
        .attr("transform", (d, i) =>`translate(${0},${height + margin.top})`)
        .text(d => (`${d.name}`))
        .style("text-anchor", "start")
        .style('font-size', 11)
        .style('fill', 'rgb(63,63,63)')
        .style('opacity', '0.7');

    statusCategory.selectAll(null)
        .data(data)
        .join('text')
        .attr('id', 'value')
        .attr('class', 'RectText')
        .attr('x', (d, i) => x(i + 1.5))
        .attr('y', (d, i) =>y(0) - y(d.duration)-10)
        .attr("transform", (d, i) => `translate(${0},${height + margin.top})`)
        .text(d => (` ${((d.duration / totalSecond) * 100).toFixed(2)} %`))
        .style("text-anchor", "start")
        .style('fill', 'rgb(63,63,63)')
        .style('opacity', '0.7');

    const outDuration = 2100,
        sortDuration = 1400,
        inDuration = 2100,
        outDelay = outDuration / data.length,
        sortDelay = sortDuration / data.length,
        inDelay = inDuration / data.length;

    function repeat(loopcount) {
        let statusGroupText = d3.select("#statusCategoryHorizontal_chart").selectAll(".RectText")
        let statusGroupRect = d3.select("#statusCategoryHorizontal_chart")
            .selectAll('rect');
 
        statusGroupText
            .sort((a, b) => {return loopcount % 2 === 1 ?a.duration - b.duration :b.duration - a.duration;})
            .transition()
            .duration(outDuration)
            .style("opacity", 0)
            .delay(function (d, i) { return (i * outDelay) })
        statusGroupText
            .transition()
            .duration(sortDuration)
            .attr('x', (d, i) => x(i) + 180)
            .delay(function (d, i) { return (i * sortDelay) })
        statusGroupText
            .transition()
            .duration(inDuration)
            .style("opacity", 1)
            .delay(function (d, i) { return (i * inDelay) })

        statusGroupRect
            .sort((a, b) => {return loopcount % 2 === 1 ?a.duration - b.duration :b.duration - a.duration;})
            .transition()
            .duration(outDuration)
            .attr('y', (d, i) => y(0) - y(d.duration))
            .attr("height", 0)
            .attr("transform", (d, i) => `translate(${0},${height + margin.top})`)
            .delay(function (d, i) { return (i * outDelay) })
        statusGroupRect
            .transition()
            .duration(sortDuration)
            .style('fill', d => d.color)
            .attr('x', (d, i) => x(i) + 180)
            .delay(function (d, i) { return (i * sortDelay) })
        statusGroupRect
            .transition()
            .duration(inDuration)
            .attr('y', (d, i) => y(0) - y(d.duration))
            .attr("height", (d, i) => y(d.duration))
            .attr("transform", (d, i) => `translate(${0},${height + margin.top})`)
            .delay(function (d, i) { return (i * inDelay) })
            .style('fill', d => d.color);
    }


    var loopcount = 1;
    Order = false;
    var interval = setInterval(function () {
        if (loopcount <= 6000) {
            loopcount++;
           // repeat(loopcount);
        }
        else {
            clearInterval(interval);
        }
    }, 15000);
}

function cleanStatusGroupHorizontalChartChildren() {
    const statusGroupHorizontal_chart = document.getElementById("statusCategoryHorizontal_chart");
    while (statusGroupHorizontal_chart.firstChild) {
        statusGroupHorizontal_chart.removeChild(statusGroupHorizontal_chart.lastChild);
    }
}