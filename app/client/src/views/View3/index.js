import React, { Component } from 'react';
import { Slider, Checkbox, Divider } from 'antd';
import './view3.css';

const CheckboxGroup = Checkbox.Group;

let plainOptions = ['running', 'cycling','plain'];
let defaultCheckedList = ['running', 'cycling', 'toto'];

export default class View3 extends Component {

    constructor(props) {
        super(props);


        this.state = {
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        };
    }

    onChangeCheckbox = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
        this.props.changeincludedActivity(checkedList);
    };

    onCheckAllChange = e => {
        const checkedList = e.target.checked ? plainOptions : [];
        this.setState({
            checkedList: checkedList,
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.changeincludedActivity(checkedList);
    };

    onChangeSilder = value => {
        this.props.changegreaterThenWeek(value);
    }

    render() {
        let keys =[...new Set(this.props.activities.map(({activityType})=>activityType))];
        plainOptions = [...new Set(this.props.activities.map(({activityType})=>activityType))];
        defaultCheckedList= plainOptions;


        return (
            <div id='view3' className='pane'>
                <div className='header'>Filter</div>
                <h3>Activity</h3>
                <div style={{ width: 275, margin: 5 }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <div style={{ width: 275, margin: 5 }}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedList}
                        onChange={this.onChangeCheckbox}
                    />
                </div>
                <Divider />
                <h3>Week</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder}/>
            </div>
        )
    }
}