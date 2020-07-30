import React, {  Component } from 'react';
import data from './data';
import { Layout } from 'antd';
import garminService from './services/garminService';
import metadataService from './services/metadataService';
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
            greaterThenWeek: 0,
            includedActivity: ['running', 'cycling','lol'],
            activities: [],
            metadata: []
        }
        this.loadActivitiesFromServer = this.loadActivitiesFromServer.bind(this);
    }


    loadActivitiesFromServer = async () => {
        let res = await garminService.getAll();
        this.setState({ activities: res });
        let meta = await metadataService.getAll();
        this.setState({ metadata: meta });
      }

    changeSelectUser = value => {
        this.setState({
            selectedUser: value
        })
    };

    changegreaterThenWeek = value => {
        this.setState({
            greaterThenWeek: value
        })
    };

    changeincludedActivity = value => {
        this.setState({
            includedActivity: value
        })
    };

    componentDidMount(){
        this.loadActivitiesFromServer();
        


    }


    render() {
        const {selectedUser, greaterThenWeek, includedActivity, activities, metadata} = this.state;
        const filteredData = activities.filter(a=>includedActivity.indexOf(a.activityType)!==-1)
                                 .filter(a=>Number(a.week)>greaterThenWeek);




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
                            <View1 user={metadata}/>
                        </Content>
                        <Content style={{ height: 300 }}>
                            <View2 data={filteredData}/>
                        </Content>
                        <Content style={{ height: 400 }}>
                            <View3 
                                changegreaterThenWeek={this.changegreaterThenWeek}
                                changeincludedActivity={this.changeincludedActivity}
                                activities={activities}
                            />
                        </Content>
                    </Sider>
                    <Layout>
                        <Content style={{ height: 300 }}>
                            <View4 data={filteredData}/>
                        </Content>
                        <Layout style={{ height: 700 }}>
                            <Content>
                                <View5 
                                    data={filteredData} 
                                />
                            </Content>
                            <Sider width={300} style={{backgroundColor:'#eee'}}>
                                <View6 data={filteredData} user={metadata}/>
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
                            Source Code <a href='https://github.com/adrienchevrier/adrienchevrier-tracking_sport.git'>
                                https://github.com/adrienchevrier/adrienchevrier-tracking_sport</a>;
                        Tracking Sport App
                        </div>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
