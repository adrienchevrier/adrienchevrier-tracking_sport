# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install --save bootstrap
# RUN npm install --save fusioncharts
# RUN npm install --save fusionmaps
# RUN npm install --save react-fusioncharts
RUN npm install --save express body-parser mongoose
RUN npm install --save-dev nodemon concurrently
RUN npm install --save d3
RUN npm install --save antd

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]


