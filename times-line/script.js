var data = [
    { "category": "Task 1", "from": "01-Feb-17", "to": "15-Mar-17", "progress": 100 },
    { "category": "Task 2", "from": "13-May-17", "to": "01-Jun-17", "progress": 60 },
    { "category": "Task 3", "from": "01-Feb-17", "to": "15-Feb-17", "progress": 70 },
    { "category": "Task 4", "from": "10-Feb-17", "to": "01-Mar-17", "progress": 10 },
    { "category": "Task 5", "from": "01-May-17", "to": "12-Dec-17", "progress": 90 },
    { "category": "Task 6", "from": "01-Apr-17", "to": "31-Dec-17", "progress": 90 },
    { "category": "Task 7", "from": "01-Nov-17", "to": "30-Jan-18", "progress": 50 },
]

var parseDate = d3.timeParse("%d-%b-%y");
data.forEach(function (d) {
    d.from = parseDate(d.from);
    d.to = parseDate(d.to);
});

var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = window.innerWidth - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom,
    padding = 50;

// creat svg container 
var vis = d3
    .select("#chart").
    append("svg:svg")
    .attr("width", width)
    .attr("height", height);
// x-axis scale and axis
var minX = new Date(2016, 0, 1),
    maxX = new Date(2017, 0, 1);


var x = d3
    .scaleTime()
    .domain([d3.min(data, function (d) { return d.from; }), d3.max(data, function (d) { return d.to; })])
    // .domain([minX, maxX])
    // .range([padding, width-padding])
    .range([padding, width - padding * 2]);

var zoom = d3
    .zoom()
    .scaleExtent([1, width])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

var xAxis = d3
    .axisBottom()
    .ticks(10)
    .scale(x);

//y-axis scale and axis     
var y = d3
    // .scaleLinear()
    .scaleBand()
    // .domain([0, 100])    
    .domain(data.map((d) => { return d.category }))
    .rangeRound([height - padding, padding])
    .padding([0.1]);

var yAxis = d3
    .axisLeft()
    .ticks(6)
    .scale(y);

// draw y axis with labels and move in from the size by the amount of padding
var gY = vis.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// draw x axis with labels and move to the bottom of the chart area
var gX = vis.append("g")
    .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

vis.call(zoom);

function zoomed() {
    // view.attr("transform", d3.event.transform);
    gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
    // gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
}

vis.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("y", function (d) { return y(d.category); })
    .attr("height", y.bandwidth())
    .attr("x", function (d) { return x(d.from); })
    .attr("width", function (d) { return x(d.to) - x(d.from) });

vis.selectAll(".pending")
    .data(data)
    .enter().append("rect")
    .attr("class", "pending")
    .attr("y", function (d) { return y(d.category); })
    .attr("height", y.bandwidth())
    .attr("x", function (d) { return x(d.from) + (x(d.to) - x(d.from)) * d.progress / 100 })
    .attr("width", function (d) { return (x(d.to) - x(d.from)) * (1 - (d.progress / 100)) });

