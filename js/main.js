// =============================================================================
// Questions JSON
// =============================================================================

questionsJSON = {
    "questions": [
      {
        "question": "What is the purpose of a compass rose on a map?",
        "answers": [
          "To show colors",
          "To indicate directions",
          "To display the legend",
          "To show distances"
        ],
        "correct_answer": "To indicate directions"
      },
      {
        "question": "What is the term for a map that shows physical features like mountains and rivers?",
        "answers": [
          "Political map",
          "Topographic map",
          "Road map",
          "Climate map"
        ],
        "correct_answer": "Topographic map"
      },
      {
        "question": "Which of the following represents a small area in great detail on a map?",
        "answers": [
          "World map",
          "City map",
          "Country map",
          "Continent map"
        ],
        "correct_answer": "City map"
      },
      {
        "question": "What does a map scale help you understand?",
        "answers": [
          "The history of the area",
          "The distance between locations",
          "The elevation of mountains",
          "The climate of the region"
        ],
        "correct_answer": "The distance between locations"
      },
      {
        "question": "What type of map would you use to find the borders of countries?",
        "answers": [
          "Physical map",
          "Political map",
          "Weather map",
          "Historical map"
        ],
        "correct_answer": "Political map"
      },
      {
        "question": "What do we call the imaginary line at 0 degrees longitude?",
        "answers": [
          "Equator",
          "Prime Meridian",
          "International Date Line",
          "Tropic of Cancer"
        ],
        "correct_answer": "Prime Meridian"
      },
      {
        "question": "What is the term for a map that shows different climates in various regions?",
        "answers": [
          "Geographical map",
          "Climate map",
          "Population map",
          "Economic map"
        ],
        "correct_answer": "Climate map"
      },
      {
        "question": "Which feature on a map shows you where north is located?",
        "answers": [
          "Scale",
          "Legend",
          "Compass Rose",
          "Grid"
        ],
        "correct_answer": "Compass Rose"
      },
      {
        "question": "What is a map that shows roads and highways called?",
        "answers": [
          "Topographic map",
          "Road map",
          "Political map",
          "Satellite map"
        ],
        "correct_answer": "Road map"
      },
      {
        "question": "Which of the following is NOT a type of map?",
        "answers": [
          "Relief map",
          "Digital map",
          "Narrative map",
          "Historical map"
        ],
        "correct_answer": "Narrative map"
      }
    ]
  };

questionsJSON1 = {
    "questions": [
      {
        "question": "What is the purpose of a compass rose on a map?",
        "answers": [
          "To show colors",
          "To indicate directions",
          "To display the legend",
          "To show distances"
        ],
        "correct_answer": "To indicate directions"
      },
      {
        "question": "What is the term for a map that shows physical features like mountains and rivers?",
        "answers": [
          "Political map",
          "Topographic map",
          "Road map",
          "Climate map"
        ],
        "correct_answer": "Topographic map"
      }
    ]
}

// randomize question order in questions JSON
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// randomize questions
questionsJSON.questions = shuffle(questionsJSON.questions);

// randomize answers
for (var i = 0; i < questionsJSON.questions.length; i++) {
    questionsJSON.questions[i].answers = shuffle(questionsJSON.questions[i].answers);
}

// =============================================================================
// Variables
// =============================================================================

var currentQuestion = 0;
var wrongAnswers = 0;
var lastQuestion = '';
var timer = 20;

// =============================================================================
// On Page Load
// =============================================================================

// change next button to be 'start' button on page load
document.getElementById("Next-BTN").innerHTML = "Start";

// hide answer buttons on page load
var answerButtons = document.getElementsByClassName("Answer-Button");
for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].style.display = "none";
}

// hide question on page load
var questionContainer = document.getElementsByClassName("Question-Heading");
for (var i = 0; i < questionContainer.length; i++) {
    questionContainer[i].style.display = "none";
}

// =============================================================================
// On Start Button Click
// =============================================================================

// on start button click
document.getElementById("Next-BTN").addEventListener("click", function() {

    // unhide question
    var questionContainer = document.getElementsByClassName("Question-Heading");
    for (var i = 0; i < questionContainer.length; i++) {
        questionContainer[i].style.display = "block";
    }

    // change next button to be 'next' button
    document.getElementById("Next-BTN").innerHTML = "Next";
    document.getElementById("Next-BTN").disabled = true;

    // trigger question change
    populateQuestions();
});

// =============================================================================
// Questions JSON Population
// =============================================================================

function populateQuestions() {

    // check if last question
    if (currentQuestion == questionsJSON.questions.length) {
        // change next button to be 'start' button
        document.getElementById("Next-BTN").disabled = false;
        document.getElementById("Next-BTN").innerHTML = "Finish";
        document.getElementById("Next-BTN").onclick = function() {
            // hide everything on page
            var answerButtons = document.getElementsByClassName("Answer-Button");
            for (var i = 0; i < answerButtons.length; i++) {
                answerButtons[i].style.display = "none";
            }
            var timerContainer = document.getElementsByClassName("Timer-Container");
            for (var i = 0; i < timerContainer.length; i++) {
                timerContainer[i].style.display = "none";
            }
            var questionContainer = document.getElementsByClassName("Question-Heading");
            for (var i = 0; i < questionContainer.length; i++) {
                questionContainer[i].style.display = "none";
            }
            // render mosaics
            renderMosaics();
        }
        return;
    }

    // get questions from JSON
    var questions = questionsJSON.questions;

    // get question
    var question = questions[currentQuestion].question;

    // get answers
    var answers = questions[currentQuestion].answers;

    // get correct answer
    var correctAnswer = questions[currentQuestion].correct_answer;
    console.log(correctAnswer);

    // populate Question Heading
    document.getElementsByClassName("Question-Heading")[0].innerHTML = question;

    // remove previous answers
    var answerButtons = document.getElementsByClassName("Answer-Button");
    while (answerButtons.length > 0) {
        answerButtons[0].remove();
    }

    // populate answer buttons
    for (var i = 0; i < answers.length; i++) {
        var answerButton = document.createElement("button");
        answerButton.innerHTML = answers[i];
        answerButton.className = "Answer-Button";
        answerButton.addEventListener("click", function() {
            // if correct answer
            if (this.innerHTML == correctAnswer) {
                // change button to green
                this.style.backgroundColor = "#646c5b";
                // change button text to green
                this.innerHTML = "Correct!";

                var nextQuestion = document.getElementById("Next-BTN");
                nextQuestion.innerHTML = "Next";
                nextQuestion.disabled = false;
            }
            // if incorrect answer
            else {
                if (this.innerHTML != lastQuestion) {
                    wrongAnswers++;
                    lastQuestion = this.innerHTML;
                }
                // change button to red
                this.style.backgroundColor = "#c72614";
                // change button text to red
                this.innerHTML = "Incorrect";
                // change timer to 20 seconds
                timer = 20;
            }
        });
        document.getElementsByClassName("Answer-Container")[0].appendChild(answerButton);
    }
    
    // tick current question
    currentQuestion++;
}

// =============================================================================
// Mosaics
// =============================================================================

function renderMosaics() {
    document.getElementById("Next-BTN").disabled = true;
    
    console.log(questionsJSON.questions.length - wrongAnswers);
    for (var i = 0; i < questionsJSON.questions.length - wrongAnswers; i++) {
        var mosaic = document.createElement("div");
        mosaic.className = "Mosaic-Image";
        mosaic.style.backgroundImage = "url(../Map-Website/Assets/MEDALS/" + (i + 1) + ".JPG)";
        mosaic.style.backgroundSize = "cover";
        mosaic.style.backgroundPosition = "center";
        mosaic.style.backgroundRepeat = "no-repeat";
        mosaic.style.width = "4rem";
        mosaic.style.height = "4rem";
        document.getElementsByClassName("Mosaic-Container")[0].appendChild(mosaic);
    }
    document.getElementsByClassName("Quiz-Container")[0].style.display = "none";
}

// =============================================================================
// DEBUG
// =============================================================================