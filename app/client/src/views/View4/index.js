import React, { Component } from 'react';
import './view4.css';
import LineChart from '../../charts/LineChart';

export default class View4 extends Component {
    render() {
        const {data} = this.props,
              width = 1400,
              height = 250;
        return (
            <div id='view4' className='pane' >
                <div className='header'>Average Heartrate per activity</div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                    <LineChart data={data} width={width} height={height}/>
                </div>
            </div>
        )
    }
}