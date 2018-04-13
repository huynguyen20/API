'use strict';

const collector = require("../api/controllers/collector.js");
const distributor = require("../api/controllers/distribute.js");
const init = require("../api/controllers/init.js");
const cert = require("../api/controllers/cert.js");


module.exports = function(app) {
	app.route('/collector')
		.post(collector.collectdatas);

	app.route('/distributor')
		.get(distributor.distributedata);

	app.route('/distributor:id')
		.get(distributor.getdeviceinfobyid);

	
	app.route('/init')
		.get(init.initdevice);

	app.route('/cert')
		.get(cert.certification);
};

