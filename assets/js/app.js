// this global variable is where all the script goes so that
// it doesn't polute the global namespace
var MYAPP = MYAPP || {};
		var alarmTriggered = false;
		function pulseVibrate() {
		for(var i=0;i<3;i++){
			setTimeout(function() {navigator.notification.vibrate(500);}, 1250*i);
		}	}		
		function updateClock() {
			var now = moment();
			var alarm = moment("2013-05-07 05:14:30 PM", "YYYY-MM-DD HH:mm:ss A");
			$('#time').html(now.format("h:mm:ss A"));
			if(alarm.diff(now)<500 && !alarmTriggered){
				alarmTriggered = true;
				alert("beep beep!");
				pulseVibrate();				
			}
		}
MYAPP.run = (function() {
	// create the Kendo UI Mobile application
    MYAPP.app = new kendo.mobile.Application(document.body, { transition: "slide" }); 
setInterval(updateClock, 1000); //updates the clock every second
});

// this is called when the intial view shows. it prevents the flash
// of unstyled content (FOUC)
MYAPP.show = (function() {
	$(document.body).show();
});

// this function runs at startup and attaches to the 'deviceready' event
// which is fired by PhoneGap when the hardware is ready for native API
// calls. It is self invoking and will run immediately when this script file is 
// loaded.
(function() {
    if (navigator.userAgent.indexOf('Browzr') > -1) {
        // blackberry
        setTimeout(MYAPP.run, 250)    
    } else {
        // attach to deviceready event, which is fired when phonegap is all good to go.
        document.addEventListener('deviceready', MYAPP.run, false);
    }
})();
