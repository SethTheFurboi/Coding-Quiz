var PlacetoPutScores = document.querySelector("#Scores")
var lbscores = JSON.parse(window.localStorage.getItem("Scores"))
console.log(lbscores)

function createtext(text) {

    var creation = document.createElement("div")
    creation.textContent = text

    PlacetoPutScores.appendChild(creation)
}

var PutScoresInOrder = []

if (lbscores) {

    for (var i = 0; i < lbscores.length + 1; i++) {

        var HighestScoreNumber = 0
        var ActualHighestScore

        for (var i2 = 0; i2 < lbscores.length + 1; i2++) {

            if (lbscores[i2] && lbscores[i2].Score >= HighestScoreNumber && !PutScoresInOrder.includes(lbscores[i2])) {

                HighestScoreNumber = lbscores[i2].Score
                ActualHighestScore = lbscores[i2]
    
            } 

        }

        PutScoresInOrder.push(ActualHighestScore)
    
    }
    
    for (var i = 0; i < PutScoresInOrder.length + 1; i++) {

        if (PutScoresInOrder[i]) {

            createtext("(Name: " + PutScoresInOrder[i].Name + ") (Score: " + PutScoresInOrder[i].Score + ")") 

        }

    }    


} else {

    createtext("No scores submitted!")

}