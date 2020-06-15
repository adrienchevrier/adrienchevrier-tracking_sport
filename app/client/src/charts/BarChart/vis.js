import * as d3 from 'd3';
import './style.css';

const draw = (props) => {
    d3.select('.vis-barchart > *').remove();
    const data = props.data;



    console.log("histo");
    console.log(data.filter( function(d){return d.week >3} ));
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    
    let svg = d3.select('.vis-barchart').append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
    //d3.json(data);

    // X axis: scale and draw:
    var x = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d.week }), d3.max(data, function(d) { return d.week })])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.duration_min; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(51)); // then the numbers of bins

    // And apply twice this function to data to get the bins.
    var bins1 = histogram(data);
    bins1 = bins1.map( s => get_duration(s));
    var bins2 = histogram(data.filter( function(d){return d.activityType === "running"} ));
    bins2 = bins2.map( s => get_duration(s));

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins1, function(d) { return d.duration_min; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
        .call(d3.axisLeft(y));


          // append the bars for series 1
  svg.selectAll("rect")
  .data(bins1)
  .enter()
  .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.duration_min) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return height - y(d.duration_min); })
    .style("fill", "#69b3a2")
    .style("opacity", 0.6);

// append the bars for series 2
svg.selectAll("rect2")
  .data(bins2)
  .enter()
  .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.duration_min) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return height - y(d.duration_min); })
    .style("fill", "#404080")
    .style("opacity", 0.4)

// Handmade legend
svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
svg.append("text").attr("x", 320).attr("y", 30).text("cycling").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 320).attr("y", 60).text("running").style("font-size", "15px").attr("alignment-baseline","middle")

console.log('bins');
var res = bins1.map( s => get_duration(s));
console.log(res);


}


function get_duration(data) {
    var y = [];
    y.duration_min = d3.sum(data, d => d.duration_min);
    y.x0 = data.x0;
    y.x1 = data.x1;
    y.activityType = data.activityType;

    return y;

}
export default draw;