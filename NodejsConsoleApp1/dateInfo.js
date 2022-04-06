var info = {
	getDate: function () {
		var now = new Date();
		return now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
	},
	getTime: function () {
		var now = new Date();
		return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	}
};
module.exports = info;
//module.exports is used for defining what a module exports (function, object or variable) and makes available through require().
