const _ = require('underscore');
const EventEmitter = require('eventemitter3');
const cfg = require('./Config.js');

const AWS = require('aws-sdk');
const AWSConfig = new AWS.Config({
  credentials: new AWS.Credentials(cfg.aws.accessKeyId, cfg.aws.secretAccessKey),
  region: cfg.aws.region
});

//Error list:
// -1 Unknown Error
// 1 User already exist

module.exports = class AWSManager extends EventEmitter{
	constructor () {
		super();
		AWS.config.update(AWSConfig);
		this.dbb = new AWS.DynamoDB.DocumentClient();

		//this.createUser("test");
		//this.getUserData("test");
		//this.modifyUserData("test",{wallet:100});
	}

	getUserData(username, data){ //data: array of strings
	    const params = {
	        TableName: 'mechGameUsers',
			Key: {username: username},
			AttributesToGet: data
	    };

	    return new Promise((resolve, reject) => {
			this.dbb.get(params, (err, data) => {
			    if (err) {
			        console.error("Unable to get user data.", username, err);
					resolve({ERROR:-1});
			    } else {
					if(!data.Item) return resolve(false);
					console.log("Get success", data.Item);
					resolve(data.Item);
			    }
			});
	    });
	}

	doesUserExist(username){
	    const params = {
	        TableName: 'mechGameUsers',
			Key: {username: username},
			AttributesToGet: ["username"]
	    };

	    return new Promise((resolve, reject) => {
			this.dbb.get(params, (err, data) => {
				if(err || !data.Item) resolve(false);
				else resolve(true);
			});
	    });
	}

	modifyUserData(username, newData){
		const attributeValues = {};
		let expression = "";
		_.each(newData, (val, name)=>{
			attributeValues[":"+name] = val;
			expression += ", set "+name+" = :"+name;
		});
		expression = expression.substr(1); //Remove the first ,

		const params = {
	        TableName: 'mechGameUsers',
			Key: {username : username},
			ExpressionAttributeValues: attributeValues,
			UpdateExpression: expression,
			ReturnValues: 'NONE'
	    };

		return new Promise((resolve, reject) => {
			this.dbb.update(params, (err, data) => {
				if (err) {
			        console.error("Unable to modify user data.", username, err);
					resolve({ERROR:-1});
			    } else {
					console.log("Modification success", data);
					resolve(data);
			    }
			});
		});
	}

	createUser(username, password, email){
		return new Promise((resolve, reject) => {
			this.doesUserExist(username).then((exists)=>{
				if(exists) return resolve({ERROR:1});

				cfg.newUserConfig.username = username;
				cfg.newUserConfig.password = password;
				cfg.newUserConfig.email = email;
				
				const params = {
					TableName: 'mechGameUsers',
					Item: cfg.newUserConfig,
					ReturnValues: 'NONE'
				};

				this.dbb.put(params, (err, data) => {
					if (err) {
						console.error("Unable to create user ", username, err);
						resolve({ERROR:-1});
					} else {
						console.log("Creation success", data);
						resolve(true);
					}
				});
			});
		});
	}

	login(username, password){
		const params = {
	        TableName: 'mechGameUsers',
			Key: {username : username, password: password},
			ExpressionAttributeValues: {":loggedIn" : true},
			UpdateExpression: "set loggedIn = :loggedIn",
			ReturnValues: 'NONE'
	    };

		return new Promise((resolve, reject) => {
			this.dbb.update(params, (err, data) => {
				if (err) resolve( false);
				else resolve(true);
			});
		});
	}

	logout(username){
		const params = {
	        TableName: 'mechGameUsers',
			Key: {username : username},
			ExpressionAttributeValues: {":loggedIn" : false},
			UpdateExpression: "set loggedIn = :loggedIn",
			ReturnValues: 'NONE'
	    };

		return new Promise((resolve, reject) => {
			this.dbb.update(params, (err, data) => {
				if (err) resolve(false);
				else resolve(true);
			});
		});
	}

}
