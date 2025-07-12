const apiKeyInput = document.getElementById('apiKey')
const gameInput = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const sendForm = (event) =>{
  event.preventDefault()
  const apiKey = apiKeyInput.value
  const game = gameInput.value
  const question = questionInput.value

  console.log(apiKey, game, question)

  if(apiKey == '' || game == '' || question == ''){
    alert('Preencha todos os campos')
    return
  }

  askButton.disabled = true
  askButton.querySelector('.button-text').style.display = 'none'
  askButton.querySelector('.loading').style.display = 'inline-block'

  // Simula tempo de resposta
  setTimeout(() => {
    askButton.disabled = false
    askButton.querySelector('.button-text').style.display = 'inline'
    askButton.querySelector('.loading').style.display = 'none'
  }, 3000)
}
form.addEventListener('submit', sendForm)