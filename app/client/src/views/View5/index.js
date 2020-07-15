import React, { Component } from 'react';
import BarChart from '../../charts/BarChart';
import './view5.css';

var selectedData = 'distance';

export default class View5 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedData: 'distance',
            activityName: 'Distance covered per week'};

        this.metadata = props.metadata;
    
        // Cette liaison est nécéssaire afin de permettre l'utilisation de `this` dans la fonction de rappel.    
        this.handleClickDistance = this.handleClickDistance.bind(this);  
        this.handleClickTime = this.handleClickTime.bind(this);
        
    }



    handleClickDistance() {
        this.setState(state => ({      selectedData: 'distance', activityName: 'Distance covered per week'   }));

    }

    handleClickTime() {
        this.setState(state => ({      selectedData: 'duration_min', activityName: 'Minutes of activity per week'    }));
    }



    render() {
        const {data} = this.props;
        return (
            <div id='view5' className='pane'>
                
        <div className='header'>{this.state.activityName} {this.metadata}</div>
                <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary active">
                    <input type="radio" name="options" id="distance" autocomplete="off" onClick={this.handleClickDistance}></input>  Distance
                </label>
                <label class="btn btn-primary">
                    <input type="radio" name="options" id="duration_min" autocomplete="off" onClick={this.handleClickTime}></input>  Time
                </label>
                </div>
                <div style={{ overflowX: 'scroll',overflowY:'hidden' }}>
                <BarChart data={data} width={1400} height={550} yValue = {this.state.selectedData}/>
                </div>                
            </div>
        )
    }


}
