let questionNum = document.getElementById("questionNum")
let question = document.getElementById("question")
let option1 = document.getElementById("option1")
let option2 = document.getElementById("option2")
let option3 = document.getElementById("option3")
let option4 = document.getElementById("option4")

let options = [option1, option2, option3, option4];


let questionNumber = 0;
let index_increament = -1;
let wrong_answer = 0;
let right_answer = 0;


let checkBtn = document.getElementById("checkBtn")
let mainContainer = document.getElementById("mainContainer")
let container = document.getElementById("container")
let answersResult = document.getElementById("answersResult")
let percentage = document.getElementById("percentage")

checkBtn.addEventListener("click", () => {
    mainContainer.classList.add("hide")
    container.classList.remove("hide")
    answersResult.innerHTML = `15/${right_answer}`;
    
    let calculate = right_answer * 6.666666666666667;
    let getPercentage = calculate.toFixed(2)
    percentage.innerHTML = getPercentage+"%";
})

let timer = document.getElementById("timer");
let second = 60;
let minutes = 9;

function startTimer(){
    setInterval(() => {
        second--;
        if(second === 0){
            minutes--;
            second = 60;
        }
        if(minutes === -1){
            checkBtn.click();
        }
        timer.innerHTML = `${minutes} : ${second}`;
    }, 1000)
}

let nextBtn = document.getElementById("nextBtn")
nextBtn.innerHTML = "Start";

axios.get('https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple')
    .then(function (response) {
        nextBtn.addEventListener("click", (event) => {
            start = true;
            event.target.innerHTML = "Next";
            index_increament++;
            questionNumber++;
            questionNum.innerHTML = `(Question ${questionNumber})`;

            if(index_increament === 0){
                startTimer()
            }

            let correct_answer = response.data.results[index_increament].correct_answer;
            let incorrect_answers = response.data.results[index_increament].incorrect_answers;
            let random = Math.round(Math.random() * 3)
            incorrect_answers.splice(random, 0, correct_answer)

            question.innerHTML = response.data.results[index_increament].question;


            options.forEach((buttons, index) => {

                buttons.style.backgroundColor = "";
                buttons.style.color = "";
                buttons.disabled = false;

                buttons.innerHTML = incorrect_answers[index]

                buttons.addEventListener("click", (event) => {
                    options.forEach(btn => btn.disabled = true)

                    let text = event.target.innerHTML;
                    if (text === correct_answer) {
                        right_answer++;

                        event.target.style.backgroundColor = "green";
                        event.target.style.color = "white";
                    }
                    else {
                        wrong_answer++;

                        event.target.style.backgroundColor = "red";
                        event.target.style.color = "white";

                        options.forEach(btn => {
                            if (btn.innerHTML === correct_answer) {
                                btn.style.backgroundColor = "green";
                                btn.style.color = "white";
                            }
                        })
                    }
                })
            })


            if (index_increament === 14) {
                nextBtn.classList.add("hide")
                checkBtn.classList.remove("hide")
            }
        })
    })
    .catch(function (error) {
        console.log(error);
        alert("Please Reload The Page")
    });