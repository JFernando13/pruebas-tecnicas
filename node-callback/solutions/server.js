import express from 'express'

export const app = express()
app.use(express.json())

const items = [
  {
    id: 1,
    content: 'item 1'
  }
]

app.get('/items', (req, res) => {
  return res.json(items)
})

app.get('/items/:id', (req, res) => {
  const { id } = req.params
  const itemFound = items.find(item => item.id === Number(id))
  return res.json(itemFound)
})

app.post('/item', (req, res) => {
  const { content } = req.body
  const newItem = { id: items.length + 1, content }
  items.push(newItem)

  return res.json(newItem)
})

app.put('/items/:id', (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const item = items.find(item => item.id === Number(id))
  item.content = content

  return res.json(item)
})

app.delete('/items/:id', (req, res) => {
  const { id } = req.params 
  const newItems = items.filter(item => item.id !== Number(id))

  return res.json(newItems)
})

export const server = app.listen(process.env.PORT ?? 3000)