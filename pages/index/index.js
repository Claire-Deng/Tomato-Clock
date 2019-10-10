
const initDeg = {
  left: 45,
  right: -45,
}

Page({
  data: {
	type:'',
    counting:false,
	leftDeg: initDeg.left,
	rightDeg: initDeg.right,
	log:{}
	
  },
  start:function(){
    var animation = wx.createAnimation({
      duration: 450,
      timingFunction: 'ease',
      
    });
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      ani:  animation.export()
    })
  },
  
  startTimer:function(e){
	this.setData({
		counting:true,
		type:e.target.dataset.type
	})
	
  },
  
  
  updateTime:function(){
	  
	  let log = this.data.log;
		let endTime = log.startTime+ log.keepTime;
	  
	  
	  let remainingTime = endTime - Date.now();
	  let now = Date.now();
	  // update circle progress
	  let halfTime = log.keepTime / 2
	  if ((remainingTime) > halfTime) {
	    this.setData({
	      leftDeg: initDeg.left - (now-log.startTime)*360/log.keepTime
	    })
	  } else {
	    this.setData({
	      leftDeg: -135
	    })
	    this.setData({
	      rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
	    })
	  }
	  
	  console.log(this.data.leftDeg, this.data.rightDeg)
	  
  },
  
  onLoad(){
	  let startTime = Date.now();
	  this.data.log={
	  	  startTime:startTime,
	  	  keepTime:60000
	  }
	  // this.updateTime();
	  // var timer = setInterval((function() {
	  //   this.updateTime();
	  //   this.start()
	  // }).bind(this), 1000);
	  
	  
  }
})