import * as d3 from 'd3';
import { arc } from 'd3';

const draw = (props) => {

  var data_entry = d3.nest()
  .key(function(d) { return d.activityType; })
  .rollup(function(v) { return v.length; })
  .entries(props.data);

  const t = d3.transition()
            .duration(400);

  console.log(data_entry);
  d3.select('.vis-piechart > *').remove();
  let keys_entry = data_entry.keys;
  var keys = [
    "White"
    , "Unknown"
    , "Black or African American"
    , "American Indian or Alaska Native"
    , "Asian"
    , "Native Hawaiian or Other Pacific Islander"];
  console.log(keys_entry);

  const margin = { top: 10, right: 20, bottom: 30, left: 40 };
  var width = props.width - margin.left - margin.right,
    height = props.height - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2;

  var svg = d3.select('.vis-piechart')
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  svg.append("g").attr("class", "slices");
  
  var pie = d3.pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });
  
  var arc = d3.arc()
    .outerRadius(radius * 1.0)
    .innerRadius(radius * 0.0);
  
  var outerArc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 1);

  // shape helper to build arcs:
  var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);
  
  var key = function(d) { return d.data.key; };
  
  var color = d3.scaleOrdinal(d3.schemePastel1)
      .domain(keys);
  
  update(data_entry);
  
  function mergeWithFirstEqualZero(first, second){
  
    var secondSet = d3.set();
  
    second.forEach(function(d) { secondSet.add(d.key); });
  
    var onlyFirst = first
      .filter(function(d){ return !secondSet.has(d.key) })
      .map(function(d) { return {key: d.key, value: 0}; });
  
    var sortedMerge = d3.merge([ second, onlyFirst ])
      .sort(function(a, b) {
          return d3.ascending(a.key, b.key);
        });
  
    return sortedMerge;
  }
  

  
  function update(data) {
  
      var duration = 500;
  
      var oldData = svg.select(".slices")
        .selectAll("path")
        .data().map(function(d) { return d.data });
  
      if (oldData.length == 0) oldData = data;
  
      var was = mergeWithFirstEqualZero(data, oldData);
      var is = mergeWithFirstEqualZero(oldData, data);
  
      var slice = svg.select(".slices")
        .selectAll("path")
        .data(pie(was), key);
  
      slice.enter()
        .insert("path")
        .attr("class", "slice")
        .style("fill", function(d) { return color(d.data.key); })
        .each(function(d) {
            this._current = d;
          });
  
      slice = svg.select(".slices")
        .selectAll("path")
        .data(pie(is), key);
  
      slice.transition()
        .duration(duration)
        .attrTween("d", function(d) {
            var interpolate = d3.interpolate(this._current, d);
            var _this = this;
            return function(t) {
                _this._current = interpolate(t);
                return arc(_this._current);
              };
          });
  
      slice = svg.select(".slices")
        .selectAll("path")
        .data(pie(data), key);

        // Now add the annotation. Use the centroid method to get the best coordinates
      var w = svg
      .selectAll("slice")
      .data(data_entry)

      w
      .enter()
      .append('text')
      .text(function(d){ return d.key})
      .transition()
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 17)
  
      slice.exit()
        .transition()
        .delay(duration)
        .duration(0)
        .remove();

        w.exit()
        .remove()
  };
}




export default draw;