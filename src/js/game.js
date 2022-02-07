let videoData = [];
let leftVideo = [];
let rightVideo = [];

let losingBackgrounds = [];
let decentBackgrounds = [];
let winningBackgrounds = [];

let score = 0;

//Uses fetch to fetch JSON file containing all video data and then pushes this to global array
function getJSON() {
    fetch('https://raw.githubusercontent.com/tfwdane/ViewGuesser/master/src/json/videos.json').then (data => data.json()).then(data => {
        //  console.log(data);
         videoData.push(data.videos);
        //  console.log(videoData);
         populateInitialLeftVideo();
         getEndscreenBackgrounds();
        
    })
    .catch(error => {
        console.log(error);
    })
}

function getEndscreenBackgrounds() {
  fetch('https://raw.githubusercontent.com/tfwdane/ViewGuesser/master/src/json/endscreen-backgrounds.json').then (data => data.json()).then(data => {
          
  losingBackgrounds.push(data.losingbackgrounds);
  decentBackgrounds.push(data.decentbackgrounds);
  winningBackgrounds.push(data.winningbackgrounds);
        
    })
    .catch(error => {
        console.log(error);
    })
}

function populateLeftVideo () {
    let leftTitle = leftVideo[0][0].title;
    let leftCreator = leftVideo[0][0].creator;
    let leftViews = leftVideo[0][0].viewcount;
    let leftThumbnail = leftVideo[0][0].thumbnail;

    
    $("#left-video-title").html("<b>" + leftTitle + "</b>");
    $("#left-video-subheading").html("by <span style=\"color: red;\">" + leftCreator + "</span> currently has");
    $("#left-video-viewcount").html("<b><span style=\"color: red;\">" + leftViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span></b> views");
    $("#leftside").css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("' + leftThumbnail + '")')
}

function populateRightVideo () {
        let rightTitle = rightVideo[0][0].title;
        let rightCreator = rightVideo[0][0].creator;
        let comparisonVideo = leftVideo[0][0].title;
        let rightThumbnail = rightVideo[0][0].thumbnail;

    $("#higherlower-buttons").css("display", "block");
       $("#right-video-bottom-text").css("display", "block");
       $("#right-video-end-viewcount").css("display", "none");
       $("#right-video-bottom-correct-text").css("display", "none");

    $("#right-video-title").html("<b>" + rightTitle + "</b>");
    $("#right-video-subheading").html("by <span style=\"color: red;\">" + rightCreator + "</span> has");
    $("#right-video-bottom-text").html("views than \"" + comparisonVideo + "\"");
    $("#rightside").css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("' + rightThumbnail + '")')
}

function randomVideo () {
  let randomVidArr = [];
   do {
     var randomVidRight = _.sample(videoData[0]);
     randomVidArr = [];
     randomVidArr.push(randomVidRight);
   }
   while (randomVidArr[0].title === leftVideo[0][0].title); 
   rightVideo.push(randomVidArr);

  populateRightVideo();
  console.log("Right: ", rightVideo);
  console.log("left: ", leftVideo)
}

function populateInitialLeftVideo() {
let leftVidArr = []

var randomVidLeft = _.sample(videoData[0]);
// console.log(randomVidLeft);
leftVidArr.push(randomVidLeft);
leftVideo.push(leftVidArr);
// console.log(leftVideo);
populateLeftVideo();
randomVideo();
}

  function updateEntries() {
      function emptyLeft() {
      //empty your array
      leftVideo.length = 0;
      }
      emptyLeft();


    if(leftVideo.length === 0) {
      leftVideo.push(rightVideo[0]);
      populateLeftVideo();
    } else {
      emptyLeft();
    }

    function emptyRight() {
      //empty your array
      rightVideo.length = 0;
    }
      emptyRight();

      if(rightVideo.length === 0) {
        randomVideo();
      } else {
        emptyRight()
      }
  }

    //Pulls random entry from videos.json file

    function highGuess() {
       let leftvideoViews = parseInt(leftVideo[0][0].viewcount);
       let rightvideoViews = parseInt(rightVideo[0][0].viewcount);

       if(rightvideoViews >= leftvideoViews) {
           console.log("true");
           $("#higherlower-buttons").css("display", "none");
           $("#right-video-bottom-text").css("display", "none");
           $("#right-video-end-viewcount").css("display", "block");
           $("#right-video-bottom-correct-text").css("display", "block");

            // $("#right-video-end-viewcount").html("<b><span style=\"color: red;\">" + rightViews + "</span></b>");
            $('#right-video-end-viewcount').each(function() {
                var $this = $(this),
                    countTo = rightvideoViews
                
                $({ countNum: $this.text()}).animate({
                  countNum: countTo
                },
              
                {
              
                  duration: 1500,
                  easing:'linear',
                  step: function() {
                    $this.text(Math.floor(this.countNum));
                  },
                  complete: function() {
                    $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                  }
              
                });  
                
                
              
              });

              var delayInMilliseconds = 1400; //1 second

              setTimeout(function() { 
                var audio = new Audio('images/sounds/correct.mp3');
                audio.play();
              }, delayInMilliseconds);

              var delayInMilliseconds = 1600; //1 second

            setTimeout(function() {
                //console.log(leftVideo);
                score = score + 1;
                $("#score-counter").html("<b>Score: " + score + "</b>")
                updateEntries();
            }, delayInMilliseconds);
       } else {
           //console.log("false", rightvideoViews);
           $("#higherlower-buttons").css("display", "none");
           $("#right-video-bottom-text").css("display", "none");
           $("#right-video-end-viewcount").css("display", "block");
           $("#right-video-bottom-correct-text").css("display", "block");

            // $("#right-video-end-viewcount").html("<b><span style=\"color: red;\">" + rightViews + "</span></b>");
            $('#right-video-end-viewcount').each(function() {
                var $this = $(this),
                    countTo = rightvideoViews
                
                $({ countNum: $this.text()}).animate({
                  countNum: countTo
                },
              
                {
              
                  duration: 1500,
                  easing:'linear',
                  step: function() {
                    $this.text(Math.floor(this.countNum));
                  },
                  complete: function() {
                    $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    //alert('finished');
                  }
              
                });  
                
                
              
              });

              losingScreen();

              var delayInMilliseconds = 1400; //1 second

              setTimeout(function() { 
                var audio = new Audio('images/sounds/incorrect.mp3');
                audio.play();
              }, delayInMilliseconds);

              var delayInMilliseconds = 1600; //1 second

            setTimeout(function() {
                console.log("You lost!")
                $("#losing-score").html(score);
                $("#losingModal").modal("show")
            }, delayInMilliseconds);

       }
    }

    function lowGuess() {
        let leftvideoViews = parseInt(leftVideo[0][0].viewcount);
        let rightvideoViews = parseInt(rightVideo[0][0].viewcount);

        if(leftvideoViews >= rightvideoViews) {
            $("#higherlower-buttons").css("display", "none");
            $("#right-video-bottom-text").css("display", "none");
            $("#right-video-end-viewcount").css("display", "block");
            $("#right-video-bottom-correct-text").css("display", "block");
 
             // $("#right-video-end-viewcount").html("<b><span style=\"color: red;\">" + rightViews + "</span></b>");
             $('#right-video-end-viewcount').each(function() {
                 var $this = $(this),
                     countTo = rightvideoViews
                 
                 $({ countNum: $this.text()}).animate({
                   countNum: countTo
                 },
               
                 {
               
                   duration: 1500,
                   easing:'linear',
                   step: function() {
                     $this.text(Math.floor(this.countNum));
                   },
                   complete: function() {
                     $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                     //alert('finished');
                   }
               
                 });  
                 
                 
               
               });

               var delayInMilliseconds = 1400; //1 second

              setTimeout(function() { 
                var audio = new Audio('images/sounds/correct.mp3');
                audio.play();
              }, delayInMilliseconds);
               
               var delayInMilliseconds = 1600; //1 second
 
             setTimeout(function() {
                 //console.log(leftVideo);
                 score = score + 1;
                 $("#score-counter").html("<b>Score: " + score + "</b>")
                 updateEntries();
             }, delayInMilliseconds);
        } else {
            $("#higherlower-buttons").css("display", "none");
            $("#right-video-bottom-text").css("display", "none");
            $("#right-video-end-viewcount").css("display", "block");
            $("#right-video-bottom-correct-text").css("display", "block");

            $('#right-video-end-viewcount').each(function() {
                var $this = $(this),
                    countTo = rightvideoViews
                
                $({ countNum: $this.text()}).animate({
                  countNum: countTo
                },
              
                {
              
                  duration: 1500,
                  easing:'linear',
                  step: function() {
                    $this.text(Math.floor(this.countNum));
                  },
                  complete: function() {
                    $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    //alert('finished');
                  }
              
                });  
                
                
              
              });

              losingScreen();

              var delayInMilliseconds = 1400; //1 second

              setTimeout(function() { 
                var audio = new Audio('images/sounds/incorrect.mp3');
                audio.play();
              }, delayInMilliseconds);

              var delayInMilliseconds = 1600; //1 second

            setTimeout(function() {
                console.log("You lost!")
                $("#losing-score").html(score);
                $("#losingModal").modal("show")
            }, delayInMilliseconds);

        }
    }

    function losingScreen() {
      if(score >= 15) {
        var randomwinningBackground = _.sample(winningBackgrounds[0]);
        $(".modal-body").css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("' + randomwinningBackground.backgroundURL + '")')
        $("#losing-comment").html(randomwinningBackground.endComment)
        $("#twitter-button").html("<a href=\"https://twitter.com/intent/tweet?text=I%20just%20scored%20" + score + "%20on%20ViewGuesser.%20Think%20you%20can%20do%20better?%20https://viewguesser.com\" id=\"tweet-button\" class=\"button\"><i class=\"fab fa-twitter\"></i> Tweet</a>")
      } else if(score >= 7) {
        var randomdecentBackground = _.sample(decentBackgrounds[0]);
        $(".modal-body").css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("' + randomdecentBackground.backgroundURL + '")')
        $("#losing-comment").html(randomdecentBackground.endComment)
        $("#twitter-button").html("<a href=\"https://twitter.com/intent/tweet?text=I%20just%20scored%20" + score + "%20on%20ViewGuesser.%20Think%20you%20can%20do%20better?%20https://viewguesser.com\" id=\"tweet-button\" class=\"button\"><i class=\"fab fa-twitter\"></i> Tweet</a>")
      } else {
        var randomlosingBackground = _.sample(losingBackgrounds[0]);
        $(".modal-body").css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("' + randomlosingBackground.backgroundURL + '")')
        $("#losing-comment").html(randomlosingBackground.endComment)
        $("#twitter-button").html("<a href=\"https://twitter.com/intent/tweet?text=I%20just%20scored%20" + score + "%20on%20ViewGuesser.%20Think%20you%20can%20do%20better?%20https://viewguesser.com\" id=\"tweet-button\" class=\"button\"><i class=\"fab fa-twitter\"></i> Tweet</a>")
      }
    }
    