import * as d3 from 'd3';
import './style.css';



const draw = (props) => {
    d3.select('.vis-barchart > *').remove();
    var data = props.data;
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;
    const yValue = props.yValue;
    let svg = d3.select('.vis-barchart').append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const t = d3.transition()
            .duration(300);
    // console.log('data raw');
    // console.log(props);
    let keys = [...new Set(data.map(({activityType})=>activityType))];
    let weeks = data.map(function(d) { return Number(d.week); });
    weeks = weeks.sort(function(a,b) {
        return d3.ascending(a,b);
    });
    // format the data
    data.forEach(function(d) {
        d[yValue] = +d[yValue];
        keys.forEach(e => {
            if (typeof e == "undefined") {
                d[e] = 0;
        }});
        d.date = new Date(d.date);
    });
    
    let data_clean = d3.nest()
        .key(function(d) { return d.week;})
        .key(function(d) { return d.activityType;})
        .rollup(function(v) { return d3.sum(v, function(d) {return d[yValue]})})
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

   
      function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " hour(s) " + rminutes + " minute(s).";
        } 

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

    var xTime = d3.scaleTime()
      .domain(d3.extent(data, d => d.date)).nice()
      .range([margin.left, width - margin.right]);
      
    let y = d3.scaleLinear()
          .range([height, 0]);


    var z = d3.scaleOrdinal()
    .range(d3.schemeRdBu[4])
    .unknown("#ccc")
    
    y.domain([0, d3.max(data_array, function(d) { return d.total; })+150]);
    z.domain(keys);

    // append the rectangles for the bar chart


    let rect = svg.selectAll("g")

        .data(series)
        .join("g")
        .selectAll("rect")
        .data(function(d) {return d;})
        .enter().append("rect")
        .attr("fill", "white")
        .attr("class", "bar");

    rect.attr("x", function(d,i) { return x(d.data.week); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d[0]); })
        .attr("height", function(d) { return y(d[0]); });



    rect.transition(t)
      .attr("fill", function(d) { return z(d.key); })
      .attr("x", function(d,i) { return x(d.data.week); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d[1]); })
      .delay((d, i) => i * 20)
      .attr("height", function(d) { return y(d[0]) - y(d[1]); });
        
      rect.on("mouseover", function() { tooltip.style("display", null);
    });

      rect.on("mouseout", function() { 
        tooltip.style("display", "none"); 
      });

      rect.on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 15;
          var yPosition = d3.mouse(this)[1] - 65;
          if( yValue === "duration_min"){
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")")
            .call(popover, `${d.key}
            Hours spent ${timeConvert(d[1]-d[0])}
            Total hours ${timeConvert(d.data.total)}
            Week ${d.data.week}
            `);
          }
          else{
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")")
            .call(popover, `${d.key}
            distance covered ${new Intl.NumberFormat().format(d[1]-d[0])} m
            Total distance ${new Intl.NumberFormat().format(d.data.total)} m
            Week ${d.data.week}
            `);
          }
          

          
        })
    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xTime).tickSizeOuter(0))
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


      const tooltip = svg.append("g");

      let popover = (g, value) => {
                  if (!value) return g.style("display", "none");
                
                  // tooltip group
                  g
                    .style("display", null)
                    .style("pointer-events", "none")
                    .style("font", "10px sans-serif");
                
                  // tooltip container stroke
                  const path = g.selectAll("path")
                    .data([null])
                    .join("path")
                      .attr("fill", "white")
                      .attr("stroke", "black")
                      .attr("opacity",0.9);
                
                  // tooltip content
                  const text = g.selectAll("text")
                    .data([null])
                    .join("text")
                    .call(text => text
                      .selectAll("tspan")
                      .data((value + "").split(/\n/))
                      .join("tspan")
                        .attr("x", 0)
                        .attr("y", (d, i) => `${i * 1.1}em`)
                        .style("text-align", "center")
                        .style("font-weight", (_, i) => i ? null : "bold")
                        .text(d => d));
                
                  // tooltip positioning
                  const {x, y, width: w, height: h} = text.node().getBBox();
                  text.attr("transform", `translate(${-w / 2},${15 - y})`);
                  
                  // tooltip container path
                  path.attr("d", `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
                }

  rect.exit()
  .remove()



}




export default draw;