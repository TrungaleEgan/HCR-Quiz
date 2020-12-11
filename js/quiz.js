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

                if (currentQuestion.type == "radio") {
                    for (letter in currentQuestion.answers) {
                        // ...add an HTML radio button
                        answers.push(
                            `<label>
                                <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
                                ${currentQuestion.answers[letter]}
                            </label>`
                        );
                    }
                } else if (currentQuestion.type == "checkbox") {
                    for (letter in currentQuestion.answers) {
                        // ... or a checkbox
                        answers.push(
                            `<label>
                                <input type="checkbox" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
                                ${currentQuestion.answers[letter]}
                            </label>`
                        );
                    }
                } else if (currentQuestion.type == "dropdown") {
                    // ... or a dropdown
                    answers.push(
                        `<div class="dropdownRow">
                        <div class="dropdownCol">
                        <select name="question${questionNumber}" id="assetsDropdown">`
                    );
                    for (letter in currentQuestion.answers) {
                        answers.push(
                            `<option value="${currentQuestion.answers[letter]}">${currentQuestion.answers[letter]}</option>`
                        );
                    }
                    answers.push(
                        `</select>
                        </div>
                        <div class="dropdownCol">
                            <div class="dropdownText">Investable assets do not include the value of your home, 401k or savings accounts savings or emergency fund. HCR Wealth Advisors works with investors and families with over $500,000.</div>
                        </div>
                        </div>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="title"> ${currentQuestion.title} </div>
                        <div class="icon"> <img alt="${currentQuestion.title}" src="${currentQuestion.icon}"> </div>
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

        // gather form info
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const emailAddress = document.getElementById('emailAddress').value;

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let userScore = 0;
        const userSummary = [
            `<div class="headerRow">
                <div class="h1Container">
                    <h1>Financial Freedom<br />
                        <span class="h1-grey">Review</span><img id="clarity-formula-logo" src="img/Clarity-Formula-Logo.png" alt="The Clarity Formula"></h1>
                </div>
            <div class="congratsContainer">Congratulations, <span class="userName">${firstName} ${lastName}!</span></div>`
        ];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer exists
            if (userAnswer) {
                // add score
                const userAnswerKey = (answerContainer.querySelector(selector)).value;
                const thisScore = currentQuestion.scores[userAnswerKey];
                userScore = userScore + thisScore;

            }
            // if answer is blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        userSummary.push(
            `<div class="userScoreContainer"><div class="userScoreText">Your Financial<br />Freedom Score is...</div>
            <div class="userScoreNumber lightblue">${userScore}</div></div></div>
            <div class="userSummary">We're here to help you find the financial freedom you' re looking for in life. Interested in scheduling a no cost, no obligation meeting?</div>
            <button class="meetingButton">Schedule a Meeting</button>
            <hr />
            <div class="userSummary"><strong>A click away!</strong> Your <span class="lightblue">Financial Freedom Report</span> is ready for your review, please confirm your email address... just to be sure!</div>
            <div id="reportFormContainer">
            <script type="text/javascript" id="aoform-script-9349f916-1ace-41f2-940a-f18ce5632a58:d-0001">!function(o,t,e,a){o._aoForms=o._aoForms||[],o._aoForms.push(a);var n=function(){var o=t.createElement(e);o.src=("https:"==t.location.protocol?"https://":"http://")+"a43621.actonservice.com/acton/content/form_embed.js",o.async=!0;for(var a=t.getElementsByTagName(e)[0],n=a.parentNode,c=document.getElementsByTagName("script"),r=!1,s=0;s<c.length;s++){if(c[s].getAttribute("src")==o.getAttribute("src"))r=!0;}r?typeof(_aoFormLoader)!="undefined"?_aoFormLoader.load({id:"9349f916-1ace-41f2-940a-f18ce5632a58:d-0001",accountId:"43621",domain:"a43621.actonservice.com",isTemp:false,noStyle:false,prefill:false}):"":n.insertBefore(o,a)};window.attachEvent?window.attachEvent("onload",n):window.addEventListener("load",n,!1),n()}(window,document,"script",{id:"9349f916-1ace-41f2-940a-f18ce5632a58",accountId:"43621",domain:"a43621.actonservice.com",isTemp:false,noStyle:false,prefill:false});</script>
            </div>
            <hr />
            <div class="videoRow">
            <div class="videoContainer">
            <img src="img/hcr-video-thumbnail.png">
            </div>
            <div class="userSummary">
                <div class="userSummaryHeader">Why Work With a CFP<sup>&reg;</sup>?<br />Trust. Knowledge. Expertise.</div>
                Your <span class="lightblue">Financial Freedom</span> eserves a customized financial plan and the personalized service to help you reach your goals.
            </div>
            </div>
            <div class="center">
            <button class="meetingButton center">Schedule a Meeting</button>
            </div>
            `
        )

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

    // VARIABLES - FORM
    const formContainer = document.getElementById('form-container');
    const firstFormContainer = document.getElementById('form-1');
    const secondFormContainer = document.getElementById('form-2');
    const firstFormSubmitButton = document.getElementById('form-1-submit');
    const secondFormSubmitButton = document.getElementById('form-2-submit');


    // VARIABLES - QUIZ
    const outerquizContainer = document.getElementsByClassName('quiz-container')[0];
    const quizContainer = document.getElementById('quiz');
    const questionNavNumbersContainer = document.getElementById('questionNavNumbers');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh-icon');
    // QUIZ QUESTIONS
    const myQuestions = [{
            title: "Current Employment",
            icon: "img/icons/employment.png",
            question: "What is your current employment status?",
            answers: {
                a: "Unemployed",
                b: "Employed",
                c: "Business owner",
                d: "Retired"
            },
            scores: {
                "Unemployed": 4.5,
                "Employed": 5.5,
                "Business owner": 7,
                "Retired": 6
            },
            buttonText: "Let's keep going!",
            type: "radio"
        },
        {
            title: "Significant Life Event",
            icon: "img/icons/life-event.png",
            question: "Are you currently going through or anticipating a significant life event?",
            answers: {
                a: "Selling a business",
                b: "Recently divorced",
                c: "Recently widowed",
                d: "Retiring",
                e: "All is good now"
            },
            scores: {
                "Selling a business": 10,
                "Recently divorced": 7.5,
                "Recently widowed": 8,
                "Retiring": 10,
                "All is good now": 9
            },
            buttonText: "Thanks for sharing!",
            type: "radio"
        },
        {
            title: "Current Savings Rate",
            icon: "img/icons/savings-income.png",
            question: "You know how much you make, but do you know how much you save?",
            answers: {
                a: "Under 5%",
                b: "Between 5% - 10%",
                c: "Between 10% - 20%",
                d: "Over 20%",
                e: "I don't know"
            },
            scores: {
                "Under 5%": 8.5,
                "Between 5% - 10%": 9,
                "Between 10% - 20%": 10,
                "Over 20%": 12,
                "I don't know": 8.5
            },
            buttonText: "Let's keep going!",
            type: "radio"
        },
        {
            title: "Financial Concerns",
            icon: "img/icons/financial-concerns.png",
            question: "What are your main financial concerns? Check all that apply:",
            answers: {
                a: "Running out of money",
                b: "Leaving a legacy",
                c: "Market volatility",
                d: "Being able to retire",
                e: "Medical costs"
            },
            scores: {
                "Running out of money": 4.5,
                "Leaving a legacy": 5,
                "Market volatility": 6,
                "Being able to retire": 5,
                "Medical costs": 4.5
            },
            buttonText: "Thanks for the insights!",
            type: "checkbox"
        },
        {
            title: "Investable Assets",
            icon: "img/icons/investable-assets.png",
            question: "What is your current level of investable assets?",
            answers: {
                a: "$0 - $500K",
                b: "$500K - $1MM",
                c: "$1MM - $2MM",
                d: "$2MM - $5MM",
                e: "$5MM+"
            },
            scores: {
                "$0 - $500K": 10,
                "$500K - $1MM": 11,
                "$1MM - $2MM": 12,
                "$2MM - $5MM": 13,
                "$5MM+": 14
            },
            buttonText: "Let's Keep it Growing!",
            type: "dropdown"
        },
        {
            title: "Financial Advice",
            icon: "img/icons/financial-advisor.png",
            question: "How often do you and your financial advisor communicate?",
            answers: {
                a: "I don't have one",
                b: "Rarely, if ever",
                c: "Once a year",
                d: "2-3 times a year",
                e: "4+ times a year"
            },
            scores: {
                "I don't have one": 6.5,
                "Rarely, if ever": 7,
                "Once a year": 7.5,
                "2-3 times a year": 8,
                "4+ times a year": 9
            },
            buttonText: "We can help!",
            type: "radio"
        },
        {
            title: "Financial Plan",
            icon: "img/icons/financial-plan.png",
            question: "How often do you update your financial plan?",
            answers: {
                a: "I don't have one",
                b: "Rarely, if ever",
                c: "Once a year",
                d: "2-3 times a year",
                e: "4+ times a year"
            },
            scores: {
                "I don't have one": 6.5,
                "Rarely, if ever": 7,
                "Once a year": 7.5,
                "2-3 times a year": 8,
                "4+ times a year": 9
            },
            buttonText: "We're here to help!",
            type: "radio"
        },
        {
            title: "Estate Planning",
            icon: "img/icons/estate-plan.png",
            question: "When was the last time you reviewed your Estate Plan?",
            answers: {
                a: "I don't have one",
                b: "I just have a will",
                c: "A review is in order",
                d: "Reviewed last year",
                e: "Reviewed recently"
            },
            scores: {
                "I don't have one": 6.5,
                "I just have a will": 7,
                "A review is in order": 7.5,
                "Reviewed last year": 8,
                "Reviewed recently": 9
            },
            buttonText: "Put house in order!",
            type: "radio"
        },
        {
            title: "Financial Freedom",
            icon: "img/icons/financial-freedom.png",
            question: "Are your investments aligned to your financial freedom goals?",
            answers: {
                a: "I am not sure",
                b: "I think so",
                c: "Yes, they are",
                d: "No, they are not"
            },
            scores: {
                "I am not sure": 5.5,
                "I think so": 7,
                "Yes, they are": 8,
                "No, they are not": 6
            },
            buttonText: "Almost finished!",
            type: "radio"
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

    firstFormSubmitButton.addEventListener("click", function() {
        firstFormContainer.classList.add('hidden');
        secondFormContainer.classList.remove('hidden');
    });

    secondFormSubmitButton.addEventListener("click", function() {
        formContainer.classList.add('hidden');
        outerquizContainer.classList.remove('hidden');
    });

})();