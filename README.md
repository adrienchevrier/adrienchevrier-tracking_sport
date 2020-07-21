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
<code>YOUR TRACKING SPORT FOLDER/python/config.ini</code>


# Launch
To launch the application, go to the application home directory and do one of the following :
* Windows : Double click on <code>tracking-sport.bat</code>
* Linux and MacOS : Double click on <code>tracking-sport.sh</code>
* Command line :  run the command line <code>docker-compose up</code>

To access the application, copy-paste this address on your web-browser :http://localhost:3000/
