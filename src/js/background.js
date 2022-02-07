let backgrounds = [];
let glrandomBackground = [];

function getJSON() {
    fetch('https://raw.githubusercontent.com/tfwdane/ViewGuesser/master/src/json/index-backgrounds.json').then (data => data.json()).then(data => {
        console.log(data);
        backgrounds.push(data.backgrounds);
        console.log(backgrounds);
        
        randomBG();
    })
    .catch(error => {
        console.log(error);
    })
}

function randomBG() {
    var randomBackground = _.sample(backgrounds[0]);
    glrandomBackground.push(randomBackground);
    populateData();

}

function populateData() {
    $("body").css({"background-image": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(\"" + glrandomBackground[0].backgroundURL + "\")", "-webkit-background-size": "cover;", "-moz-background-size": "cover;", "-o-background-size": "cover;", "background-size": "cover;", "padding": "0px;", "margin": "0px;", "background-color": "#000000af;", "color": "#000000b6;", "-webkit-text-size-adjust": "100%;", "-moz-text-size-adjust": "100%;", "-ms-text-size-adjust": "100%;", "-webkit-overflow-scrolling": "touch;"})
    $("#video-title").html("<b><a href=\"" + glrandomBackground[0].videoURL + "\">" + glrandomBackground[0].videoTitle +"</a></b>")
    $("#video-creator").html("<b>by <a href=\"" + glrandomBackground[0].creatorURL + "\">" + glrandomBackground[0].videoCreator + "</a></b>")
}

function showHowToPlayModal() {
    $("#howtoplayModal").modal("show")
}

function hideHowToPlayModal() {
    $("#howtoplayModal").modal("hide")
}

function showDonateModal() {
    $("#donateModal").modal("show")
}

function hideDonateModal() {
    $("#donateModal").modal("hide")
}