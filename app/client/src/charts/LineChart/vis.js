import * as d3 from 'd3';
import {Delaunay} from "d3-delaunay";
import _ from 'lodash';

const draw = (props) => {
    let data = [];
    if (props.data !== null) {
        data = _.cloneDeep(props.data);
    }
    
    d3.select('.vis-linechart > *').remove();
    let keys = [...new Set(data.map(({activityType})=>activityType))];
    let margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const width = props.width - margin.left - margin.right;;
    const height = props.height - margin.top - margin.bottom;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let svg = d3.select(".vis-linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function (d) {
        d.week = Number(d.week);
        d.date = new Date(d.date)    });
    console.log(data);
    
    // Add X axis --> it is a date format
    let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date)).nice()
    .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
   .domain(d3.extent(data, d => d.averageHR)).nice()
   .range([height - margin.bottom, margin.top]);

   // set the color scale
    let color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeRdBu[4])

   svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.date));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.averageHR));

    const dot = svg.append("g")
          .selectAll("g")
          .data(data)
          .join("circle")
            .attr("transform", d => `translate(${x(d.date)},${y(d.averageHR)})`)
            .attr("r", 2)
            .attr("fill", "none")
            .attr("stroke", function(d){ return(color(d.activityType)) })
            .attr("stroke-width", 1.5)
            .attr("class", "dots");


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
                    .attr("stroke", "black");
              
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
                path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
              }

  
            const voronoi = Delaunay
            .from(data, d => x(d.date), d => y(d.averageHR))
            .voronoi([margin.left, margin.top, width - margin.right, height - margin.bottom]); // ensures voronoi is limited to the chart area
            
            svg.append("g")
              .attr("class", "voronoiWrapper")
              .selectAll("path")
              .data(data)
              .join("path")
                .attr("opacity", 0.5)
                // .attr("stroke", "#ff1493") // Hide overlay
                .attr("fill", "none")
                .style("pointer-events", "all")
                .attr("d", (d,i) => voronoi.renderCell(i))
                .on("mouseover", (d, i) => {
                  if (d.date > 0) {
                    
                      tooltip.attr("transform", `translate(${x(d.date)},${y(d.averageHR)})`)
                      .call(popover, `${d.activityName}
            ${d.averageHR}
                  ${d.date.toLocaleDateString("en-US", options)}`);
            svg.selectAll(".dots").attr("stroke", "#ddd");
            svg.append("circle")
                .attr("class", "temp")
                .data(data)
                .join("circle")
                .attr("transform", `translate(${x(d.date)},${y(d.averageHR)})`)
                  .attr("r", 2)
                  .attr("fill", "none")
                  .attr("stroke", color(d.activityType))
                  .attr("stroke-width", 1.5)
                  .attr("class", "dots");
                  }
                })
                .on("mouseout", (d) => {
                tooltip.call(popover, null);
              svg.selectAll(".dots").data(data)
              .join("circle")
                .attr("transform", d => `translate(${x(d.date)},${y(d.averageHR)})`)
                .attr("r", 2)
                .attr("fill", "none")
                .attr("stroke", function(d){ return(color(d.activityType)) })
                .attr("stroke-width", 1.5)
                .attr("class", "dots");
          
              svg.selectAll(".temp").remove();
              });
            return svg

}

export default draw;