# nuggetServer

* For your local development, you should create your own local MySQL database



Steps to get set up for staging access

### 1. Install [Node](http://nodejs.org/)

### 2. Install project dependencies from package.json

```sh
$ npm install
```

### 3. Set up your local config

```sh
$ cp config/config.json
```

Customize your local config settings in the file `config/config.json` Contact Lewis for config detail

### 4. Run the app

```sh
$ node app.js
```

### 5.You may need to punch a hole on AWS RDS instance for different IP access

Go to AWS -> EC2 -> Security Groups -> Choose the security group -> inbound edit -> Add TCP, port number and your IP
