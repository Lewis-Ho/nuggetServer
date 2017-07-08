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

### 5.You may need to punch a hole on AWS instance for different IP access

Go to AWS -> EC2 -> Instance -> Security Groups -> Choose the security group -> inbound edit -> Choose SSH and add your IP

If you need direct read/write to RDS you will need to do the same thing for AWS RDS, instead you choose TCP, port 3306, your IP


### 6. To debug, you will need to ssh to instance. PM2 instruction is required to restart server. Contact admin for ssh pem.
