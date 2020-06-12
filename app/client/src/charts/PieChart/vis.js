import * as d3 from 'd3';

const draw = (props) => {

// set the dimensions and margins of the graph
d3.select('.vis-piechart > *').remove();
const margin = { top: 10, right: 20, bottom: 30, left: 40 };
const width = props.width - margin.left - margin.right;
const height = props.height - margin.top - margin.bottom;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
let radius = Math.min(width, height) / 2;


    

// append the svg object to the div called 'my_dataviz'
var svg = d3.select('.vis-piechart')
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data_sample = {a: 9, b: 20, c:30, d:8, e:12}
var data = d3.nest()
.key(function(d) { return d.activityType; })
.rollup(function(v) { return v.length; })
.object(props.data);
console.log("piechart");
console.log(data);
console.log(data_sample);

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeDark2)

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)


}







export default draw;