import React, { useState, useEffect, Component } from "react";
// import { Container, Nav } from "./styled-components";
// SERVICES
import garminService from './services/garminService';
// import "bootstrap/dist/css/bootstrap.css";
import * as d3 from "d3";
import { json } from "d3";


function get_total_time(activities){
  let total = 0;
  let i = 0;
  console.log("function");
  console.log(activities);
  // for (let i = 0; i < activities.length; i++) {  //loop through the array
    
  //   total += activities[i].duration_min;  //Do the math!
  // }
  return total;
}


class Barchart extends Component{
  componentDidMount() {
    console.log(this.props.data);
    this.drawBarChart(this.props.data)
    
}
  

drawBarChart(data) {
  const canvasHeight = 400
  const canvasWidth = 600
  const scale = 20
  const svgCanvas = d3.select(this.refs.canvas)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black")
  svgCanvas.selectAll("rect")
      .data(data).enter()
          .append("rect")
          .attr("width", 40)
          .attr("height", (datapoint) => datapoint * scale)
          .attr("fill", "orange")
          .attr("x", (datapoint, iteration) => iteration * 45)
          .attr("y", (datapoint) => canvasHeight - datapoint * scale)
  svgCanvas.selectAll("text")
      .data(data).enter()
        .append("text")
        .attr("x", (datapoint, i) => i*45+10)
        .attr("y", (datapoint,i) => canvasHeight - datapoint * scale - 10)
        .text(datapoint => datapoint)



  }

  render() {return <div ref="canvas"></div>}



}



class App extends Component {


render() { 
  const data = [ 2, 4, 2, 6, 8 ];
  return (
<div className="dashboard">
<Barchart 
  data={data}/>
  </div>)}
}






export default App;


// function App_sample() {
//   const [activities, setproducts] = useState(null);

//   useEffect(() => {
//     if(!activities) {
//       getProducts();
//     }
//   })

//   const getProducts = async () => {
//     let res = await garminService.getAll();
//     console.log('activities');
//     console.log(res);
//     setproducts(res);
//   }

//   const renderProduct = activity => {
//     return (
//       <li key={activity._id} className="list__item product">
//         <h3 className="product__name">{activity.activityName}</h3>
//         <p className="product__description">{activity.averageHR}</p>
//       </li>
//     );
//   };

//   const totalDuration = activities => {
//     return (
//       activities[0].duration_min
//       // activities.reduce(
//       //   (sum, activity) => sum + activity.duration_min,
//       //   0
//       // )
//     );
    
//   };
  


//   return (
//     <Container>
//       <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
//     <div className="navbar-brand h1 mb-0 text-large font-medium">
//       Sport tracking dashboard
//     </div>
//     <div className="navbar-nav ml-auto">
//       <div className="user-detail-section">
//         <span className="pr-2">Hi, fellow athlete</span>
//         <span className="img-container">
//         <img src="" className="rounded-circle" alt="user" />
//       </span>
//     </div>
//   </div>
//   </Nav>

//   {/* <!-- content area --> */}
//          {/* row 1 - revenue */}
//          { <Container className="row">
//             <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
//               <Container className="card grid-card is-card-dark">
//                 <Container className="card-heading">
//                   <Container className="is-dark-text-light letter-spacing text-small">
//                     Total hours training
//                   </Container>
//                 </Container>

//                 <Container className="card-value pt-4 text-x-large">
//                   <span className="text-large pr-1">h</span>
//                   {totalDuration(activities)}
//                 </Container>
//               </Container>
//             </Container>

//             <Container className="col-lg-3 col-sm-6 is-light-text mb-4">
//               <Container className="card grid-card is-card-dark">
//                 <Container className="card-heading">
//                   <Container className="is-dark-text-light letter-spacing text-small">
//                     last training
//                   </Container>
//                   <Container className="card-heading-brand">
//                     <i className="fab fa-amazon text-large" />
//                   </Container>
//                 </Container>

//                 <Container className="card-value pt-4 text-x-large">
//                   <span className="text-large pr-1">$</span>
//                   5
//                 </Container>
//               </Container>
//             </Container>
//           </Container> }

          
//   <div className="App">
//       <ul className="list">
//         {(activities && activities.length > 0) ? (
//           activities.map(product => renderProduct(product))
//         ) : (
//           <p>No activity found here</p>
//         )}
//       </ul>
//     </div>
//     </Container>
    
//   );
// }




{/* <!-- kpi + mini charts section --> */}

{/* <!-- charts section --> */}



