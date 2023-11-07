const startButton = document.getElementById('start')
const nextButton = document.getElementById('next')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')
const homeButton = document.getElementById('home')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Function to start the game when the 'Start' button is clicked
function startGame() {
    // Reset the selected property of answers
    questions.forEach(question => {
    question.answers.forEach(answer => {
        answer.selected = false
    })})

    // Remove the score display if it still exists
    const scoreDisplay = questionContainerElement.querySelector('.score-display')
    if (scoreDisplay) {
        questionContainerElement.removeChild(scoreDisplay)
    }

    // Hide the home button and start button, show the question and answer buttons
    homeButton.classList.add('hide')
    startButton.classList.add('hide')
    questionElement.classList.remove('hide')
    answerButtonsElement.classList.remove('hide')

    // Shuffle the questions and set the current question index to 0
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    // Show the question and answer buttons for the first question
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

// Function to set the next question in the game
function setNextQuestion() {
    // Reset the game state
    resetState()

    // If there are more questions, display the next question
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex])
    } 
    else {
        // If all questions are answered, end the game
        endGame()
    } 
}

// Function to display a question and its answer choices
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
        button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// Function to reset the game state by clearing answer buttons and status classes
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

// Function to handle user answer selection
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    
    // Find the selected answer and mark it as selected
    const question = shuffledQuestions[currentQuestionIndex]
    question.answers.forEach(answer => {
        if (selectedButton.innerText === answer.text) {
            answer.selected = true
        }
    })
    
    // Apply status classes to answer buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    // Show the next button if there are more questions, otherwise end the game
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        endGame()
    }
}

// Function to apply status classes for correct and wrong answers
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// Function to clear status classes for correct and wrong answers
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// Function to end the game and display the final score
function endGame() {
    // Hide question and answer buttons
    questionElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')

    // Calculate the score and display it along with percentage
    const score = calculateScore()
    const totalQuestions = questions.length
    const scorePercentage = ((score / totalQuestions) * 100).toFixed(2)
    const scoreText = `Your Score: ${score}/${totalQuestions} (${scorePercentage}%)`

    // Create a score display element and append it to the question container
    const scoreDisplay = document.createElement('div')
    scoreDisplay.innerText = scoreText
    scoreDisplay.classList.add('score-display')
    questionContainerElement.appendChild(scoreDisplay)

    // Change the start button text to 'Restart' and show the home button
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    homeButton.classList.remove('hide')
}

// Function to calculate the user's score based on selected correct answers
function calculateScore() {
    let score = 0
    shuffledQuestions.forEach(question => {
        const userAnswer = question.answers.find(answer => answer.selected)
        if (userAnswer && userAnswer.correct) {
        score++
        }
})
    return score
}


// List of Questions
const questions = [
  {
    question: 'True or False: The Great Wall of China is visible from space.',
    answers: [
        { text: 'True', correct: false },
        { text: 'False', correct: true }
    ]
  },
  {
    question: 'What is the capital of France?',
    answers: [
        { text: 'Paris', correct: true },
        { text: 'London', correct: false },
        { text: 'Rome', correct: false },
        { text: 'Berlin', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the "Red Planet"?',
    answers: [
        { text: 'Earth', correct: false },
        { text: 'Mars', correct: true },
        { text: 'Venus', correct: false },
        { text: 'Jupiter', correct: false }
    ]
  },
  {
    question: 'True or False: Water boils at a higher temperature in the mountains than it does at sea level.',
    answers: [
        { text: 'True', correct: true },
        { text: 'False', correct: false }
    ]
  }
]