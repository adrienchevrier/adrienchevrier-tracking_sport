import React, { Component } from 'react';
import { Avatar } from 'antd';
import './view1.css';

export default class View1 extends Component {
    render() {
        let {user} = this.props;
        var name = user.map(({name})=>name)[0];
        var weight = user.map(({weight})=>weight)[0];
        var calendarDate = user.map(({calendarDate})=>calendarDate)[0];
        var restingHeartRate = user.map(({restingHeartRate})=>restingHeartRate)[0];
        var unitsystem = user.map(({unitsystem})=>unitsystem)[0];
        var weighttype = '';


        if (unitsystem === 'metric') {
            weighttype = 'kg';
        }else {
            weighttype = 'lb';
        }

        return (
            <div id='view1' className='pane'>
                <div className='header'>User Profile</div>
                <div>
                    {/* <div className={'avatar-view'}>
                        <Avatar shape="square" size={120} icon="user" />
                    </div> */}
                    <div className={'info-view'}>
                        <div>{name}</div>
                        <div>weight: {weight/1000} {weighttype}</div>
                        <div>last activity: {calendarDate}</div>
                        <div>resting heartrate: {restingHeartRate}</div>
                        <div>unit system: {unitsystem}</div>
                    </div>
                </div>
            </div>
        )
    }
}
