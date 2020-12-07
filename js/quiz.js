(function() {

    // FUNCTIONS
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];
        const questionNavOutput = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
                            ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="title"> ${currentQuestion.title} </div>
                        <div class="icon"> </div>
                        <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );

                // add new navigation number
                questionNavOutput.push(
                    `<div class="navNumber" id="${questionNumber + 1}">${questionNumber + 1}</div>`
                )
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');



        // Build Question Nav
        questionNavNumbersContainer.innerHTML = questionNavOutput.join('');
    }

    function showResults() {

        // hide slides
        slides[currentSlide].classList.remove('active-slide');
        numbers[currentSlide].classList.remove('active-number');

        outerquizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');


        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;
        const userSummary = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer exists
            if (userAnswer) {
                // add to the number of answers
                numCorrect++;
                userSummary.push(
                    `<div class="resultQuestionContainer">${questionNumber + 1}: ${currentQuestion.question}<br />
                    <div class="userAnswerContainer">${userAnswer}</div></div>`
                );

                // color the answer green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
                userSummary.push(
                    `<div class="resultQuestionContainer">${questionNumber + 1}:  ${currentQuestion.question}<br />
                    <div class="userAnswerContainer">n/a</div></div>`
                );
            }
        });

        // show number of correct answers out of total
        // resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        resultsContainer.innerHTML = userSummary.join('');
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        numbers[currentSlide].classList.remove('active-number');
        slides[n].classList.add('active-slide');
        numbers[n].classList.add('active-number');
        currentSlide = n;
        nextButton.innerHTML = myQuestions[n].buttonText;
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function reloadQuiz() {
        location.reload();
    }

    // VARIABLES
    const outerquizContainer = document.getElementsByClassName('quiz-container')[0];
    const quizContainer = document.getElementById('quiz');
    const questionNavNumbersContainer = document.getElementById('questionNavNumbers');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh-icon');
    // QUIZ QUESTIONS
    const myQuestions = [{
            title: "Current Employment",
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
            title: "Significant Life Event",
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
            title: "Current Savings Rate",
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
            title: "Financial Concerns",
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
            title: "Investable Assets",
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
            title: "Financial Advice",
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
            title: "Financial Plan",
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
            title: "Estate Planning",
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
            title: "Financial Freedom",
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

    // START
    buildQuiz();

    // PAGINATION
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const numbers = document.querySelectorAll(".navNumber");
    let currentSlide = 0;

    // SHOW FIRST SLIDE
    showSlide(currentSlide);

    // EVENT LISTENERS
    submitButton.addEventListener('click', showResults);
    nextButton.addEventListener("click", showNextSlide);
    refreshButton.addEventListener("click", reloadQuiz);

    numbers.forEach(
        (currentNumber, numberIndex) => {
            currentNumber.addEventListener("click", function() {
                showSlide(numberIndex);
            })
        }
    );

})();