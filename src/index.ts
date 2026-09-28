import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
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
  const { model } = req.body;
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
})

export default app
