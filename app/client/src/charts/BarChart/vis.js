import * as d3 from 'd3';
import './style.css';



const draw = (props) => {
    d3.select('.vis-barchart > *').remove();
    var data = props.data;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    let svg = d3.select('.vis-barchart').append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const t = d3.transition()
            .duration(400);
    // console.log('data raw');
    // console.log(props);
    let keys = [...new Set(data.map(({activityType})=>activityType))];
    let weeks = data.map(function(d) { return Number(d.week); });
    weeks = weeks.sort(function(a,b) {
        return d3.ascending(a,b);
    });
    // format the data
    data.forEach(function(d) {
        d.duration_min = +d.duration_min;
        keys.forEach(e => {
            if (typeof e == "undefined") {
                d[e] = 0;
        }});
    });
    
    let data_clean = d3.nest()
        .key(function(d) { return d.week;})
        .key(function(d) { return d.activityType;})
        .rollup(function(v) { return d3.sum(v, function(d) {return d.duration_min})})
        .object(data)
    //     .map(function (obj) {
    //         for (const activity in keys){
    //             if (obj[activity].length === 1) {
    //                 console.log('value found');
    //                 console.log(obj);
    //                 } else {
    //                     obj.push({ [activity]: 0});
    //                     console.log('NO value found');
    //                     console.log(obj);
    //                 }
    //             }
    //         }

    //    );
    var data_array = [];
    Object.keys(data_clean).map(function(key, index) {
        data_clean[key]['total'] = 0;
        data_clean[key]['week'] = Number(key);
        for (var i = 0; i < keys.length; i++){
            var activity = keys[i];
                        if (typeof data_clean[key][activity] === 'undefined') {
                            data_clean[key][activity] = 0;
                            }
                            data_clean[key]['total'] += data_clean[key][activity];
                        }
        data_array.push(data_clean[key]);
        
      });

    

    // console.log('data array');
    // console.log(data_array)
    var barWidth = width / weeks.length;

    // console.log('barWidth');
    // console.log(barWidth);

    var  stack = d3.stack()
    .keys(keys)
    let series = stack(data_array).map(d => (d.forEach(v => v.key = d.key), d));
    // Scale the range of the data in the domains
    var x = d3.scaleBand()
      .domain(weeks)
      .range([0, width])
      .padding([0.2])
    let y = d3.scaleLinear()
          .range([height, 0]).nice();


    var z = d3.scaleOrdinal()
    .range(d3.schemeRdBu[4])
    .unknown("#ccc")
    
    y.domain([0, d3.max(data_array, function(d) { return d.total; })+150]);
    z.domain(keys);

    // append the rectangles for the bar chart
    const rect = svg.selectAll("g")

        .data(series)
        .join("g")
            .attr("fill", function(d) { return z(d.key); })
        .selectAll("rect")
        .data(function(d) {return d;})
        .enter().append("rect")
        .attr("class", "bar")
        .transition(t)
        .delay((d, i) => i * 20)
        .attr("x", function(d,i) { return x(d.data.week); })
        .attr("width", x.bandwidth())
        .transition(t)
        .attr("y", function(d) { return y(d[1]); })
        .transition(t)
        .attr("height", function(d) { return y(d[0]) - y(d[1]); });
        // .on("mouseover", function() { tooltip.style("display", null); })
        // .on("mouseout", function() { tooltip.style("display", "none"); })
        // .on("mousemove", function(d) {
        // //   console.log(d);
        //   var xPosition = d3.mouse(this)[0] - 5;
        //   var yPosition = d3.mouse(this)[1] - 5;
        //   tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        //   tooltip.select("text").text(d[1]-d[0]);
        // });
    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove());

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove());

    var legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  
    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);
  
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });
      // Prep the tooltip bits, initial display is hidden
    var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
    tooltip.append("rect")
  .attr("width", 60)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

    tooltip.append("text")
  .attr("x", 30)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");


}

export default draw;