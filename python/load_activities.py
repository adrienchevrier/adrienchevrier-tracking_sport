
### import libraries
from garminconnect import (
    Garmin,
    GarminConnectConnectionError,
    GarminConnectTooManyRequestsError,
    GarminConnectAuthenticationError,
)
from datetime import date
import pandas as pd
pd.options.display.max_columns = None
import json 
import pymongo
from datetime import datetime
from configparser import ConfigParser
pd.options.mode.chained_assignment = None

"""
Setup Mongo Connection
"""
mongoclient = "mongodb://mongo-app:27017/"
mongodb = "activities"
mongocol = "general_activities"


"""
Read config.ini file
"""
config_object = ConfigParser()
config_object.read("config.ini")

"""
Get the password
"""
userinfo = config_object["USERINFO"]


"""
Initialize Garmin client with credentials
"""
try:
    client = Garmin(userinfo["email"],userinfo["password"])
except (
    GarminConnectConnectionError,
    GarminConnectAuthenticationError,
    GarminConnectTooManyRequestsError,
) as err:
    print("Error occured during Garmin Connect Client init: %s" % err)
    quit()
except Exception:  # pylint: disable=broad-except
    print("Unknown error occured during Garmin Connect Client init")
    quit()


"""
Login to Garmin Connect portal
"""
try:
    client.login()
except (
    GarminConnectConnectionError,
    GarminConnectAuthenticationError,
    GarminConnectTooManyRequestsError,
) as err:
    print("Error occured during Garmin Connect Client login: %s" % err)
    quit()
except Exception:  # pylint: disable=broad-except
    print("Unknown error occured during Garmin Connect Client login")
    quit()


"""
Get full name from profile
"""
try:
    print(client.get_full_name())
except (
    GarminConnectConnectionError,
    GarminConnectAuthenticationError,
    GarminConnectTooManyRequestsError,
) as err:
    print("Error occured during Garmin Connect Client get full name: %s" % err)
    quit()
except Exception:  # pylint: disable=broad-except
    print("Unknown error occured during Garmin Connect Client get full name")
    quit()

"""
Get activities data
"""
try:
    activities = client.get_activities(0,10000) # 0=start, 1=limit
except (
    GarminConnectConnectionError,
    GarminConnectAuthenticationError,
    GarminConnectTooManyRequestsError,
) as err:
    print("Error occured during Garmin Connect Client get activities: %s" % err)
    quit()
except Exception:  # pylint: disable=broad-except
    print("Unknown error occured during Garmin Connect Client get activities")
    quit()

"""
Connect to Mongo DB
"""
myclient = pymongo.MongoClient(mongoclient)
mydb = myclient[mongodb]
mycol = mydb[mongocol]


#Create pandas dataframe from data
df_act = pd.DataFrame(activities)

"""
clean dataframe
"""
# select columns
full_activities = df_act[['activityId','activityName','activityType','distance','duration','averageHR','startTimeLocal']]
# Get duration in minutes
full_activities.loc[:, 'duration_min'] = full_activities['duration']/60
# Get activity type
full_activities['activityType'] = full_activities['activityType'].apply(
    lambda x : x['typeKey'])
# convert datetime to datetime format
full_activities['startTimeLocal'] = full_activities['startTimeLocal'].apply(
    lambda x :datetime.strptime(x, '%Y-%m-%d %H:%M:%S'))
# Get week number
full_activities['week'] = full_activities['startTimeLocal'].apply(lambda x : x.strftime("%V"))
full_activities['date'] = full_activities['startTimeLocal'].apply(lambda x : x.date())
full_activities['date'] =  pd.to_datetime(full_activities['date']).dt.strftime('%Y-%m-%d')

"""
Insert data into mongodb
"""
# Convert dataframe to json
records = json.loads(full_activities.T.to_json()).values()

for doc in records:
    mycol.replace_one(
        {'activityId' : doc['activityId']},
        doc,
        upsert=True
    )