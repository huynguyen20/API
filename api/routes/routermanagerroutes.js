'use strict';



module.exports = function(app) {
	var manager = require("../controllers/routermanagercontroller")
	app.route('/collector')
		.post(manager.collectdatas);

	app.route('/distributor')
		.get(manager.distributedata);

	app.route('/distributor:id')
		.get(manager.getdeviceinfobyid);

	
	app.route('/init')
		.get(manager.initdevice);

	app.route('/cert')
		.get(manager.certification);
};

