'use strict';

const collector = require("../controllers/collector.js");
const distributor = require("../controllers/distribute.js");
const init = require("../controllers/init.js");
const cert = require("../models/cert.js");
const mqtt = require("../controllers/mqtt");
const auth = require("../models/auth");
const splash = require("../controllers/splash-controller");


module.exports = function(app) {


	app.route('/user/test')
		.get(function(req,res){
			res.status(200);
			res.end("TEST OK!");
		})	
	app.route('/collector')
		.post(auth.authentication);

	app.route('/collector')
		.post(collector.collectdata);

	app.route('/user/distributor')
		.get(distributor.distributedata);

	app.route('/user/distributor:mac')
		.get(distributor.getdeviceinfobymac);

	
	app.route('/init')
		.get(init.initdevice);

	app.route('/init/cert')
		.get(cert.certification);

	app.route('/init/md5')
		.get(cert.md5);

	app.route('/control/single')
		.post(mqtt.sendSingleCommand);

	app.route('/control/multiple')
		.post(mqtt.sendMultipleDevice);

/* 	app.route('/register')
		.post(user.Register);
	app.route('/login')
		.post(user.Login); */
	app.route('/splash/getuser')
		.get(splash.getUserList);
	app.route('/splash/getuser:user')
		.get(splash.getUserDetails);
	app.route('/splash/update')
		.post(splash.editUser)
	app.route('/splash/add')
		.post(splash.addUser);
};

