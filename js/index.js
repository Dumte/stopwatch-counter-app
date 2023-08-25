$(function() {
    //variables
        var mode = 0; //app mode
        var timeCounter = 0; //time counter
        var lapCounter = 0; //lap counter
        var action; //variable for setInterval
        var lapNumber = 0; //number of laps

        //minutes, seconds, mini-seconds for time and lap
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

        // On App load, show start and lap buttons
        hideShowButtons("#startButton", "#lapButton");
        
        // By clicking on "startButton" - set the mode to on(i.e true), show the "stopButton" and "lapButton", start the counter.
        $('#startButton').click(function(){
            mode = 1; //set the mode to on
            
            hideShowButtons("#stopButton", "#lapButton");

            startAction(); //start the counter
        });

        // By clicking the "stopButton" - show the "resumeButton" and "#resetButton" and stop the counter.
        $('#stopButton').click(function() {

            hideShowButtons("#resumeButton", "#resetButton");

            clearInterval(action); // this clears the setInterval() inside the action.
        });

        // By clicking on the "#resumeButton" - show "#stopButton" and "#lapButton" and start counting.
        $('#resumeButton').click(function() {
            hideShowButtons("#stopButton", "#lapButton");

            startAction(); // start counting
        });

        // By clicking on the "#resetButton" - reload the page.
        $('#resetButton').click(function() {
            location.reload(); // this function reloads the page
        });

        // By clicking on the "#lapButton"\
        $('#lapButton').click(function() {
            if (mode = 1) {// if mode is on
                clearInterval(action);//we stop counting

                lapCounter = 0; //reset lap 

                addLap(); //and print the lap details

                startAction(); // and start counting

            } else {// if mode is off
                location.reload();
            };
            
        });
        

        // THE FUNCTIONS DEFINITIONS

        
        // format number
        function format(number) {
            if (number < 10) {
                return "0"+number;
            } else {
                return number;
            }
        }
        // hideShowButtons functions show two buttons 
        function hideShowButtons(x, y) { //where x and y represents the IDs(including the # signs) of the element to be hidden
            $('.btn-control').hide(); //hides all the buttons at first
            $(x).show(); //shows on the #startButton
            $(y).show(); //shows on the #lapButton
        };

        function startAction() {
            action = setInterval(function() {
                timeCounter++;
                lapCounter++;
                updateTime();
            }, 10);
        };

        function updateTime() { //updateTime: converts counters to min, sec, centisec
            // 1min = 60*100centiseconds = 6000centiseconds
            timeMinutes = Math.floor(timeCounter/6000); // I want a whole number that's why you see Math.floor()
            $('#timeminutes').text(format(timeMinutes));
            
            timeSeconds = Math.floor((timeCounter%6000)/100);
            $('#timeseconds').text(format(timeSeconds));
            
            timeCentiseconds = (timeCounter%6000)%100;
            $('#timecentiseconds').text(format(timeCentiseconds));


            // lapMinutes, lapSeconds and lapCentiseconds
            lapMinutes = Math.floor(lapCounter/6000); // I want a whole number that's why you see Math.floor()
            $('#lapminutes').text(format(lapMinutes));
            
            lapSeconds = Math.floor((lapCounter%6000)/100);
            $('#lapseconds').text(format(lapSeconds));
            
            lapCentiseconds = (lapCounter%6000)%100;
            $('#lapcentiseconds').text(format(lapCentiseconds));
        };

        // addLap function
        function addLap() {
            lapNumber++;
            var myLapDetails = 
            "<div class='lap'>" + 
                '<div class="laptimetitle">' +
                    'Lap' + lapNumber +
                '</div>' + 
                '<div class="laptime">' + 
                    '<span>' + format(lapMinutes) + '</span>' +
                    ':<span>' + format(lapSeconds) + '</span>' +
                    ':<span>' + format(lapCentiseconds) + '</span>' +
                '</div>' + 
            "</div>";
            $(myLapDetails).prependTo("#laps");
        }

});