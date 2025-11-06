// dom elements 
const startScreen=document.getElementById("start-screen");
const quizScreen=document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton=document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer=document.getElementById("answers-container");
const currentQuestionSpan=document.getElementById("current-question");
const totalQuestionSPan=document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan=document.getElementById("final-score");
const maxScoreSpan=document.getElementById("max-score");
const resultMessage=document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// array of quiz questions
const quizQuestions = [
    {
        question:"What is the capital of france?",
        answers:[
            {text:"London",correct:false},
            {text:"Paris",correct:true},
            {text:"Tokyo",correct:false},
            {text:"Berlin",correct:false},
        ],
    },

    {
        question:"What is the most popular language?",
        answers:[
            {text:"Arabic",correct:false},
            {text:"French",correct:false},
            {text:"English",correct:true},
            {text:"Japanese",correct:false},
        ],
    },
    
    {
        question:"What is the most popular programming language?",
        answers:[
            {text:"Python",correct:true},
            {text:"c++",correct:false},
            {text:"Java Script",correct:false},
            {text:"Ruby",correct:false},
        ],
    },

    {
        question:"What is the oldest country?",
        answers:[
            {text:"Sudia Arabia",correct:false},
            {text:"America",correct:false},
            {text:"England",correct:false},
            {text:"Egypt",correct:true},
        ],
    },

    {
        question:"Who is the most popular footballer?",
        answers:[
            {text:"Cristiano Ronaldo",correct:false},
            {text:"Neymar",correct:false},
            {text:"Zidane",correct:false},
            {text:"Messi",correct:true},
        ],
    },
];


//quiz state vars 
let currentQuestionIndex= 0 ; 
let score=0;
// the socre will not be updated untill we move to the next question 
let answersDisabled=false;

// now to update our question and total counter
totalQuestionSPan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;
 
//event listener 
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQUiz);

 
function startQuiz(){
    //reset vars 
    currentQuestionIndex=0;
    score=0;
    scoreSpan.textContent=score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuesions();
}

function showQuesions(){
    //reset state  
    answersDisabled=false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent=currentQuestionIndex +1 ;

    // make it dynamic and calcuated by it own 
    const progressPercent = (currentQuestionIndex / quizQuestions.length)*100;
    progressBar.style.width=progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    
    // TODO: explain this in a second 
    // if you remove this part it will show all the answers for every question 
    // will show the answers of the last question and the answers for the one you solve now and so on 
    answerContainer.innerHTML="";

    // now to show the answers buttons you need to go through the questions you 
    // gave it as an dict and make button for every question of them 
   
    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // now to check if the answer is rigt or not  
        // dataset -> property of the button element that allows you to store custome data
        button.dataset.correct=answer.correct; 
        button.addEventListener("click",selectAnswer);
        answerContainer.appendChild(button);     
});
}

function selectAnswer(event){
    if (answersDisabled){
        return 
    }

    answersDisabled =true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    // we need to convert it to an array to loop in the items in it with foreach 
    // answerContainer.children --> will only display the collection for every answers 
     
    Array.from(answerContainer.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent=score;
    }

    // to add delay before move to the next question 
    //that will wait 1 second because 1000 measured in m ^ -3
    setTimeout(()=>{
        currentQuestionIndex++;
        //check if there are more question or the qui zis over
        if(currentQuestionIndex<quizQuestions.length){
            showQuesions();
        }else{
            showResults();
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score ;

    const percentage = (score/quizQuestions.length)*100;
    if (percentage == 100){
        resultMessage.textContent = "Perfect! you are a genius..";
    }else if (percentage>=80){
        resultMessage.textContent= "Great job! you know your stuff..";
    }else if (percentage>=60){
        resultMessage.textContent = "Good effort! keep learning..";
    }else if(percentage>40){
        resultMessage.textContent = "Not bad! try again to improve..";
    }else{
        resultMessage.textContent="keep studying! you will get better.."
    }
}

function restartQUiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}

