import React, {  Component } from 'react';
import data from './data';
import { Layout } from 'antd';
import garminService from './services/garminService';
import View1 from './views/View1';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
import View5 from './views/View5';
import View6 from './views/View6';
import './dashboard.css';

const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: data[0],
            greaterThenAge: 0,
            includedGender: ['Male', 'Female','Unknown'],
            activities: []
        }
        this.loadActivitiesFromServer = this.loadActivitiesFromServer.bind(this);
    }


    loadActivitiesFromServer = async () => {
        let res = await garminService.getAll();
        this.setState({ activities: res });
        console.log('activities');
        console.log(this.state.activities);
      }

    changeSelectUser = value => {
        this.setState({
            selectedUser: value
        })
    };

    changeGreaterThenAge = value => {
        this.setState({
            greaterThenAge: value
        })
    };

    changeIncludedGender = value => {
        this.setState({
            includedGender: value
        })
    };

    componentDidMount(){
        this.loadActivitiesFromServer();

    }


    render() {
        const {selectedUser, greaterThenAge, includedGender, activities} = this.state;
        const filteredData = data.filter(user=>includedGender.indexOf(user.gender)!==-1)
                                 .filter(user=>user.age>greaterThenAge);



         const renderProduct = activity => {
            return (
              <li key={activity._id} className="list__item product">
                <h3 className="product__name">{activity.activityName}</h3>
                <p className="product__description">{activity.averageHR}</p>
              </li>
            );
          };

        return (
            <div>
                <Layout style={{ height: 920 }}>
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 200 }}>
                            <View1 user={selectedUser}/>
                        </Content>
                        <Content style={{ height: 300 }}>
                            <View2 data={activities}/>
                        </Content>
                        <Content style={{ height: 400 }}>
                            <View3 
                                changeGreaterThenAge={this.changeGreaterThenAge}
                                changeIncludedGender={this.changeIncludedGender}
                            />
                        </Content>
                    </Sider>
                    <Layout>
                        <Content style={{ height: 300 }}>
                            <View4 user={selectedUser}/>
                        </Content>
                        <Layout style={{ height: 600 }}>
                            <Content>
                                <View5 
                                    data={activities} 
                                />
                            </Content>
                            <Sider width={300} style={{backgroundColor:'#eee'}}>
                                <View6 data={activities}/>
                                {/* <div className="App">
                                  <ul className="list">
                                    {(activities && activities.length > 0) ? (
                                      activities.map(product => renderProduct(product))
                                    ) : (
                                      <p>No activity found here</p>
                                    )}
                                  </ul>
                                </div> */}

                            </Sider>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout>
                    <Footer style={{ height: 20 }}>
                        <div style={{marginTop: -10}}>
                            Source Code <a href='https://github.com/sdq/react-d3-dashboard'>https://github.com/sdq/react-d3-dashboard</a>;
                            Author <a href='https://sdq.ai'>sdq</a>;
                        </div>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
