var QuestionsHtml = document.querySelector("#Questions")
var ActualQuestionHtml = document.querySelector("#ActualQuestion")
var TimerHtml = document.querySelector("#Timer")
var ScoreHtml = document.querySelector("#Score")
var SubmissionButtonHtml = document.querySelector("#SubmissionButton")
var SubmissionBoxHtml = document.querySelector("#SubmissionBox")
console.log(SubmissionBoxHtml)

var Points = 0
var TimeLeft = 0
var MaxTime = 60
var ChosenQuestion

var Questions = [
  {Question: 'What is "And" in javascript',
  Incorrect: ["&","and","&&&"],
  Correct: "&&",},

  {Question: 'What is "Equal" in javascript',
  Incorrect: ["=","===","equal"],
  Correct: "==",},

  {Question: 'What is "Absolute Equal" in javascript',
  Incorrect: ["=","==","absequal"],
  Correct: "===",},

  {Question: 'What stands for "Does not" in javascript',
  Incorrect: ["~","~~","!!"],
  Correct: "!",},

  {Question: 'What is the difference between "Equal" and "Absolute Equal" in javascript',
  Incorrect: ["None","Absolute allows use of decimals","Absolute allows use of positives and negatives"],
  Correct: "Absolute makes sure the data type is the same",},

  {Question: 'Commonly used data types DO NOT include:',
  Incorrect: ["strings","booleans","numbers"],
  Correct: "alerts",},

  {Question: 'The condition in an if / else statement is enclosed within ____.',
  Incorrect: ["quotes","curly brackets","square brackets"],
  Correct: "parentheses",},

  {Question: 'Arrays in JavaScript can be used to store ____.',
  Incorrect: ["numbers and strings","other arrays","booleans"],
  Correct: "all of these",},

  {Question: 'String values must be enclosed within ____ when being assigned to variables.',
  Incorrect: ["commas","curly brackets","parentheses"],
  Correct: "quotes",},

  {Question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
  Incorrect: ["JavaScript","terminal / bash","for loops"],
  Correct: "console.log",},

  // Template:
  // {Question: '',
  // Incorrect: ["","",""],
  // Correct: "",},

]

function renderquestions(ChosenQuestion) {

  QuestionsHtml.innerHTML = ""
  ActualQuestionHtml.textContent = "Question: " + ChosenQuestion.Question

  function createbutton(text) {

    var button = document.createElement("button")
    button.textContent = text

    QuestionsHtml.appendChild(button)

  }

  var WhichIsCorrect = Math.floor(Math.random() * (ChosenQuestion.Incorrect.length + 1))  

  var IncorrectDisplayed = 0

  for (var i = 0; i < ChosenQuestion.Incorrect.length + 1; i++) {

    if (i == WhichIsCorrect) {

      createbutton(ChosenQuestion.Correct)

    } else {

      createbutton(ChosenQuestion.Incorrect[IncorrectDisplayed])
      IncorrectDisplayed ++

    }

  } 


}

function updateguis() {

  TimerHtml.textContent = "TIME LEFT: " + Math.max(TimeLeft,0) 
  ScoreHtml.textContent = "POINTS: " + Points
  
}

function timer() {

  timer = setInterval(function() {
    TimeLeft--;
    updateguis()
    if (TimeLeft <= 0) {
      clearInterval(timer);

      var submitbutton = document.createElement("button")
      submitbutton.textContent = "Submit Score"
      SubmissionButtonHtml.appendChild(submitbutton)
    }
  }, 1000);


}

function choosequestion() {

  ChosenQuestion = Questions[Math.floor(Math.random() * Questions.length)]
  renderquestions(ChosenQuestion)

}

function game(){

  TimeLeft = MaxTime
  Points = 0
  timer()
  updateguis()
  choosequestion()

}

QuestionsHtml.addEventListener("click", function(event) {
  var element = event.target;

  if (element.matches("button") && TimeLeft > 0) {


    if (timer > 0 && element.textContent == ChosenQuestion.Correct) {

      Points = Points + Math.floor(250 * (TimeLeft/MaxTime)) 

    } else {
      TimeLeft = Math.max(TimeLeft - 15, 0)
    }

    choosequestion()
    updateguis()

  }
})

SubmissionButtonHtml.addEventListener("click", function(event) {
  event.preventDefault()

  var element = event.target;

  if (element.matches("button") && TimeLeft <= 0 && (SubmissionBoxHtml.value.trim() != (undefined || ""))) {

    var lbscores = JSON.parse(window.localStorage.getItem("Scores"))
    var submittedname = SubmissionBoxHtml.value.trim()

    if (lbscores == undefined) {
      lbscores = []
    }

    console.log("Name" + submittedname + "Score: " + Points)

    lbscores.push({Name: submittedname, Score: Points})

    window.localStorage.setItem("Scores", JSON.stringify(lbscores));

    console.log(lbscores)
    console.log(JSON.parse(window.localStorage.getItem("Scores")))

  }
  
  window.location.href = "leaderboardpage.html"

})  

game()