const apiKeyInput = document.getElementById('apiKey')
const gameInput = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const perguntarIA = async (question, game, apiKey) =>{
  const model = "gemini-2.5-flash"
  const gemini_url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const pergunta = `
    Estou jogando ${game} e gostaria de saber ${question}
  `
  
  const contents = [{
    parts: [{
      text: pergunta
    }]
  }]

  const response = await fetch(gemini_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents
    }) 
  })
  
  const data = await response.json()

  if (!data.candidates || !data.candidates[0]) {
    throw new Error('Nenhuma resposta válida recebida da API.')
  }

  return data.candidates[0].contents.parts[0].text
}

const sendForm = async (event) =>{
  event.preventDefault()
  const apiKey = apiKeyInput.value
  //const apiKey = ''
  const game = gameInput.value
  const question = questionInput.value

  console.log("api key:", apiKey)

  if(apiKey == '' || game == '' || question == ''){
    alert('Preencha todos os campos')
    return
  }

  askButton.disabled = true
  askButton.querySelector('.button-text').style.display = 'none'
  askButton.querySelector('.loading').style.display = 'inline-block'

  setTimeout(() => {
    askButton.disabled = false
    askButton.querySelector('.button-text').style.display = 'inline'
    askButton.querySelector('.loading').style.display = 'none'
  }, 3000)

  try{
    //perguntar para a ia
    const text = await perguntarIA(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = text

  } catch(error){
    console.log('Erro: ',error)
  } finally{
    askButton.disabled = false
    askButton.textContent = "Perguntar"
    askButton.classList.remove('loading')

  }
}
form.addEventListener('submit', sendForm)