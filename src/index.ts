import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

function getApiKey(req:any) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const match = /^Bearer\s+(.+)$/i.exec(authHeader);
    if (match) return match[1];
  }
  return req.get('api-key') || null;
}
app.use(express.json())

app.get('/',(req,res)=>{
  res.json({
    endpoints:[
      '/v1/models',
      '/v1/chat/completions'
    ]
  })
})

app.get('/v1/models', (req, res) => {
  res.json({
    object: 'list',
    data: [
      { id: 'gpt-6-astra', object: 'model', created: 0, owned_by: 'you' },
      { id: 'gpt-6-sol', object: 'model', created: 0, owned_by: 'you' }
    ]
  })
})

app.post('/v1/chat/completions', (req, res) => {
  const { model, } = req.body;
  const  authorization = getApiKey(req)
  if (authorization === 'sk-a8F3kL9mQ2xR7tY1nB5vC0dE4gH6jK8wP3zX9cV2bN7mQ1') {
    res.json({
      id: `chatcmpl-${Date.now() - 114514}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: model,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: '疯狂星期四V我50谢谢喵'
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30
      }
    })
  } else {
    res.json({
      error: {
        message: "Incorrect API key provided",
        type: "invalid_request_error",
        param: null,
        code: "invalid_api_key"
      }
    })
  }
})


export default app
