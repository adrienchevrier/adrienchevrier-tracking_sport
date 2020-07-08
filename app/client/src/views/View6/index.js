import React, { Component } from 'react';
import { List } from 'antd';
import './view6.css';
import * as d3 from 'd3';

export default class View6 extends Component {

    selectUser = (user) => {
        this.props.changeSelectUser(user);
    }
    




    render() {


        const {data} = this.props;
        const highlights = data.filter(a=>a.activityType== "cycling")
                            .filter(x=>x.duration_min==d3.max(data.filter(a=>a.activityType== "cycling"), function(d) { return d.duration_min; }))
                            .map(function (data) {
                                // console.log(data);
                                data['highlight'] = 'longest ride';
                                return data;
                                
                            }).concat(data.filter(a=>a.activityType== "running")
                            .filter(x=>x.duration_min==d3.max(data.filter(a=>a.activityType== "running"), function(d) { return d.duration_min; }))
                            .map(function (data) {
                                // console.log(data);
                                data['highlight'] = 'longest run';
                                return data;
                                
                            })).concat(data.filter(a=>a.activityType== "lap_swimming")
                            .filter(x=>x.duration_min==d3.max(data.filter(a=>a.activityType== "lap_swimming"), function(d) { return d.duration_min; }))
                            .map(function (data) {
                                // console.log(data);
                                data['highlight'] = 'longest swim';
                                return data;
                                
                            }));
        


        const renderProduct = activity => {
            // console.log(activity);
            return (
              <li key={activity._id} className="list__item product" style={{margin: 10 }}>
                <h3 className="product__name" style={{"fontWeight":"bold"}}>{activity.activityName}</h3>
                <h4 className="product__name" style={{"fontSize":16}}>{activity.highlight}</h4>
                <p className="product__description">average heartrate {activity.averageHR}</p>
                <p className="product__description">duration {timeConvert(activity.duration_min)}</p>
                <p className="product__description">distance {new Intl.NumberFormat().format(activity.distance)}m</p>
              </li>
            );
          };

        return (
            <div id='view6' className='pane'>
                <div className='header'>Top activities</div>
                <div className="activity">
                <ul className="list">
                                    {(highlights && highlights.length > 0) ? (
                                      highlights.map(activity => renderProduct(activity))
                                    ) : (
                                      <p>No activity found here</p>
                                    )}
                                  </ul>
                                </div>
            </div>
        )
    }
}

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) " + rminutes + " minute(s).";
    }