(function(){

// Functions
function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    // keep track of user's answers
    let numCorrect = 0;
  
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
  
        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}


// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
// Create Questions
const myQuestions = [
    {
      question: "What is your current employment status?",
      answers: {
        a: "Unemployed",
        b: "Employed",
        c: "Business owner",
        d: "Retired"
      },
      correctAnswer: "a",
      buttonText: "Let's keep going!"
    },
    {
      question: "Are you currently going through or anticipating a significant life event?",
      answers: {
        a: "Selling a business",
        b: "Recently divorced",
        c: "Recently widowed",
        d: "Retiring",
        e: "All is good now"
      },
      correctAnswer: "a",
      buttonText: "Thanks for sharing!"
    },
    {
      question: "You know how much you make, but do you know how much you save?",
      answers: {
        a: "Under 5%",
        b: "Between 5% - 10%",
        c: "Between 10% - 20%",
        d: "Over 20%",
        e: "I don't know"
      },
      correctAnswer: "a",
      buttonText: "Let's keep going!"
    },
    {
      question: "What are your main financial concerns? Check all that apply:",
      answers: {
        a: "Running out of money",
        b: "Leaving a legacy",
        c: "Market volatility",
        d: "Being able to retire",
        e: "Medical costs"
      },
      correctAnswer: "a",
      buttonText: "Thanks for the insights!"
    },
    {
      question: "What is your current level of investable assets?",
      answers: {
        a: "$0 - $500K",
        b: "$500K - $1MM",
        c: "$1MM - $2MM",
        d: "$2MM - $5MM",
        e: "$5MM+"
      },
      correctAnswer: "a",
      buttonText: "Let's Keep it Growing!"
    },
    {
      question: "How often do you and your financial advisor communicate?",
      answers: {
        a: "I don't have one",
        b: "Rarely, if ever",
        c: "Once a year",
        d: "2-3 times a year",
        e: "4+ times a year"
      },
      correctAnswer: "a",
      buttonText: "We can help!"
    },
    {
      question: "How often do you update your financial plan?",
      answers: {
        a: "I don't have one",
        b: "Rarely, if ever",
        c: "Once a year",
        d: "2-3 times a year",
        e: "4+ times a year"
      },
      correctAnswer: "a",
      buttonText: "We're here to help!"
    },
    {
      question: "When was the last time you reviewed your Estate Plan?",
      answers: {
        a: "I don't have one",
        b: "I just have a will",
        c: "A review is in order",
        d: "Reviewed last year",
        e: "Reviewed recently"
      },
      correctAnswer: "a",
      buttonText: "Put house in order!"
    },
    {
      question: "Are your investments aligned to your financial freedom goals?",
      answers: {
        a: "I am not sure",
        b: "I think so",
        c: "Yes, they are",
        d: "No, they are not"
      },
      correctAnswer: "a",
      buttonText: "Almost finished!"
    }
];
  
// Display Quiz
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


// Show the first slide
showSlide(currentSlide);

// Event Listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


})();