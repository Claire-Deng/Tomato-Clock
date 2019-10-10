function formatTime(timeStamp) {
  let seconds = Math.floor(timeStamp/1000)%60;
          let minutes = Math.floor(timeStamp/60/1000);
          let reseconds;
          let reminutes;
          if(seconds<10){
              reseconds="0"+seconds
          }else{
              reseconds=""+seconds;
          }
          if(minutes<=0){
              reminutes = ""
          }else{
              reminutes = minutes+":"
          }
          return reminutes+reseconds;
}

module.exports = {
  formatTime: formatTime
}