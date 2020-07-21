# Tracking_sport
This projects intends to track the user's sport activity through weeks based on garmin products



# Prerequisites
Docker must be installed and running to launch the application
Download here https://docs.docker.com/get-docker/



# Installation
Download the project by clicking on Code => Download ZIP File :
![download image](https://github.com/adrienchevrier/adrienchevrier-tracking_sport/blob/master/images/download.PNG?raw=true)



# Setup
You need to write your credentials in the configuration file to get access to your Garmin data.
All the data and your credentials remain locally on your computer, nothing is sent outside of your machine.
Credentials can be changed in the following file :  
<code><YOUR APP FOLDER>/python/config.ini</code>




# Launch
To launch the application, go to the application home directory and do one of the following :
* Windows : Double click on <code>tracking-sport.bat</code>
* Linux and MacOS : Double click on <code>tracking-sport.sh</code>
* Command line :  run the command line <code>docker-compose up</code>

To access the application, copy-paste this address on your web-browser :http://localhost:3000/



# Technical documentation
The application is created using 3 docker images :
* *mongo-app* is the mongo database used to store the data 
* *load activities* is the python script that downloads the data and writes it in the mongo-app
* *react-dash-app* handles the application

#### Refresh data - Load-activities
This container can be used to refresh the data in the application without having to restart it. 
The user-friendly way to launch the refresh is to use docker dashboard 
here is explained how to access the docker dashboard : https://docs.docker.com/desktop/dashboard/
In the docker dashboard : 
* Expand the *react* container
* click the *load-activities* play button


When launched, this container downloads activities from the user's account, and writes it into the mongo-app container.
![refresh image](https://github.com/adrienchevrier/adrienchevrier-tracking_sport/blob/master/images/refresh_data.png?raw=true)


#### Dockerfiles
##### load-activities
* Location : <YOUR APP FOLDER>/python
* Image name : quanchisensei/load-activities
* Container name : load-activities
  
##### react-dash-app
* Location : <YOUR APP FOLDER>/app
* Image name : quanchisensei/react-dash:dev
* Container name : react-dash-app

