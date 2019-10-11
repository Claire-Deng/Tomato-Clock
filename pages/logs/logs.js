//logs.js
const util = require('../../utils/util.js')

Page({
	data: {
		logs: []
	},
	onShow: function() {
		this.start();
	},
	start: function() {
		let logs = wx.getStorageSync('logs');
		let list = [];
		logs.forEach(function(item, index, arry) {
			if (item.startTime && item.taskName) {
				item.startTime = new Date(item.startTime).toLocaleString();
				list.push(item.taskName +" " + item.startTime)
			}
		});
		this.setData({
			logs: list
		})		
	},
	clearData:function(){
		wx.setStorageSync('logs', []);
		this.start();
	}
		
	
})
