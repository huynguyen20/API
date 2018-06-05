'use strict';

const collector = require("../controllers/collector.js");
const distributor = require("../controllers/distribute.js");
const init = require("../controllers/init.js");
const cert = require("../models/cert.js");
const mqtt = require("../models/mqtt");
const auth = require("../models/auth");


module.exports = function(app) {
	app.route('/collector')
		.post(auth.authentication);

	app.route('/collector')
		.post(collector.collectdata);

	app.route('/distributor')
		.get(distributor.distributedata);

	app.route('/distributor:id')
		.get(distributor.getdeviceinfobyid);

	
	app.route('/init')
		.get(init.initdevice);

	app.route('/cert')
		.get(cert.certification);

	app.route('/md5')
		.get(cert.md5);

	app.route('/control')
		.post(mqtt.sendCommand);
};

