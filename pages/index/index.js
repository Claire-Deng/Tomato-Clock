const util = require('../../utils/util.js')

const initDeg = {
	left: 45,
	right: -45,
}

Page({
	data: {
		type: '',
		counting: false,
		leftDeg: initDeg.left,
		rightDeg: initDeg.right,
		log: {},
		taskName:'',
		// count down time
		keepTimeMinute: 0.2,
		remainingTime: '',
		completed: false

	},
	//words flashing
	wordAnimation: function() {
		var animation = wx.createAnimation({
			duration: 450,
			timingFunction: 'ease',

		});
		animation.opacity(0.2).step()
		animation.opacity(1).step()
		this.setData({
			ani: animation.export()
		})
		
	},
	//change task name
	changeLogName:function(e){	
		this.logName = e.detail.value;
	},
	
	//start counting down
	startTimer: function(e) {
		let logName = this.logName
		let startTime = Date.now();
		let keepTime = this.data.keepTimeMinute * 60 * 1000;
		
		this.setData({
			counting: true,
			completed:false,
			type: e.target.dataset.type,
			taskName:logName,
			log: {
				startTime: startTime,
				keepTime: keepTime,
				
			}
		})
		// 重置一下时间
		let current = util.formatTime(this.data.keepTimeMinute * 60 * 1000)
		this.setData({
			remainingTime: current
		})
		if (this.data.counting) {
			this.timer = setInterval((function() {
				this.updateTime();
				this.wordAnimation()
			}).bind(this), 1000)
		}else{
			this.stopTimer();			
		}
		this.log={			
			startTime:startTime,
			taskName:this.data.taskName || this.data.type
		}
		this.saveLog(this.log);
	},
	// 缓存数据
	saveLog:(log)=>{
		
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(log)
		wx.setStorageSync('logs', logs);
		console.log(logs)
	},
	
	stopTimer: function() {
	  // reset circle progress
	  this.setData({
	    leftDeg: initDeg.left,
	    rightDeg: initDeg.right
	  })
	
	  // clear timer
	  clearInterval(this.timer);
	  this.setData({
		  taskName:''
	  })
	},

	updateTime: function() {

		let log = this.data.log;
		let endTime = log.startTime + log.keepTime;
		let remainingTime = endTime - Date.now()+1000;
		let now = Date.now();
		// update circle progress
		let halfTime = log.keepTime / 2
		if ((remainingTime) > halfTime) {
			this.setData({
				leftDeg: initDeg.left - (now - log.startTime) * 360 / log.keepTime
			})
		} else {
			this.setData({
				leftDeg: -135
			})
			this.setData({
				rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
			})
		}
		let remainingTimeMinute = util.formatTime(remainingTime);
		//update time left
		this.setData({
			remainingTime: remainingTimeMinute
		})
		if (remainingTime <= 0) {
			this.setData({
				counting: false,
				completed:true,
				log:{
					logName:''
				}
			})
			this.stopTimer();
			return
		}
	},

	onLoad() {
		let current = util.formatTime(this.data.keepTimeMinute * 60 * 1000)
		this.setData({
			remainingTime: current
		})

	}
})
