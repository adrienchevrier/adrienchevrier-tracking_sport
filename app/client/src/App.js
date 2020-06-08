import React, { useState, useEffect } from "react";

// SERVICES
import garminService from './services/garminService';

function App() {
  const [activities, setproducts] = useState(null);

  useEffect(() => {
    if(!activities) {
      getProducts();
    }
  })

  const getProducts = async () => {
    let res = await garminService.getAll();
    console.log(res);
    setproducts(res);
  }

  const renderProduct = activity => {
    return (
      <li key={activity._id} className="list__item product">
        <h3 className="product__name">{activity.activityName}</h3>
        <p className="product__description">{activity.averageHR}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(activities && activities.length > 0) ? (
          activities.map(product => renderProduct(product))
        ) : (
          <p>No activity found here</p>
        )}
      </ul>
    </div>
  );
}

export default App;
