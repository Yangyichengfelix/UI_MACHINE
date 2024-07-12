
function drawStatusGroupChart(data) {
    
    timeParse = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    const margin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 200
    },
        //width = document.getElementById('statusCategory_chart').parentNode.parentElement.clientWidth;
    width = document.getElementById('statusCategory_chart').clientWidth;

        height = 300;

    const statusCategory = d3.select("#statusCategory_chart")
        .attr("width", width )
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${0},${margin.top})`);


    let totalSecond=0;
    data.forEach((d, i) => {
        totalSecond = totalSecond + d.duration
    })
    let x = d3.scaleLinear()
    let maxX;
    maxX = d3.max(data, d => d.duration)
    maxX = totalSecond
    x.domain([0, maxX])
        .range([0, 250]);
    statusCategory.selectAll("rect")
        .data(data, function (d) {
            return d.name;
        })
        .join('rect')

        .attr('width', d => {
            return x(d.duration)
        })
        .attr('height', '50')
        .attr('y', (d, i) => {
            return i * 55;
        })
        .attr('x', '10')
        .style('fill', d => {
            return d.color
        });

    statusCategory.selectAll('text')
        .data(data, function (d) {
            return d.name;
        })
        .join('text')

        .attr('x', d => x(d.duration) +20)
        .attr('y', function (d, i) {
            return (i * 55) + 25;
        })
        .text(d => (`${d.name}, ${((d.duration / totalSecond) * 100).toFixed(2)} %`))
        .style("text-anchor", "start")

        .style('fill', 'rgb(63,63,63)')
        .style('opacity', '0.7');



    const outDuration = 2100,
        sortDuration = 1400,
        inDuration = 2100,
        outDelay = outDuration/data.length,
        sortDelay = sortDuration/data.length,
        inDelay = inDuration/data.length;

    function repeat(loopcount) {
        
        let statusGroupText = d3.select("#statusCategory_chart")
            .selectAll("text");
        let statusGroupRect = d3.select("#statusCategory_chart")
            .selectAll('rect');
        statusGroupText
            .sort((a, b) => {
                return loopcount%2 === 1 ?
                    a.duration - b.duration :
                    b.duration - a.duration;
            })
            .transition()
            .duration(outDuration)
            .attr('x', d => x(d.duration ) + 20)
            .style("opacity", 0)
            .delay(function (d, i) { return (i * outDelay) })
            .transition()
            .duration(sortDuration)
            .attr('y', (d, i) => (i * 55) + 20)
            .delay(function (d, i) { return (i * sortDelay) })
            .transition()
            .duration(inDuration)
            .attr('x', d => x(d.duration) + 20)
            .style("opacity", 1)
            .delay(function (d, i) { return (i * inDelay) })
        statusGroupRect
            .sort((a, b) => {  
                return loopcount % 2 === 1 ?
                    a.duration - b.duration :
                    b.duration - a.duration;
            })
            .transition()
            .duration(outDuration)
            .attr('x', '50')
            .attr('width', 0)
            .delay(function (d, i) { return (i * outDelay) })

            .transition()
            .duration(sortDuration)
            .style('fill', d=>d.color)
            .attr('y', (d, i) => (i * 55))
            .delay(function (d, i) { return (i * sortDelay) })

            .transition()
            .duration(inDuration)
            .attr('x', '10')
            .attr('width', d => x(d.duration))
            .delay(function (d, i) { return (i * inDelay) })
            .style('fill', d => d.color);
    }


    var loopcount = 1;
    Order = false;
    var interval = setInterval(function () {
        if (loopcount <= 6000) {
            loopcount++;
            repeat(loopcount);
        }
        else {
            clearInterval(interval);
        }
    }, 15000);
}

function cleanStatusGroupChartChildren() {
    const statusGroup_chart = document.getElementById("statusCategory_chart");
    while (statusGroup_chart.firstChild) {
        statusGroup_chart.removeChild(statusGroup_chart.lastChild);
    }
}