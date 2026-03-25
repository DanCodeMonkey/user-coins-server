const express = require("express")

const app = express()

app.use(express.json())

// "Banco de dados" em memória
let users = []
let idCounter = 1

// Criar usuário
app.post("/users", (req, res) => {

  const { name } = req.body

  const user = {
    id: idCounter++,
    name: name,
    coins: 0
  }

  users.push(user)

  res.json(user)

})

// Consultar moedas do usuário
app.get("/users/:id/coins", (req, res) => {

  const id = parseInt(req.params.id)

  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" })
  }

  res.json({
    userId: user.id,
    coins: user.coins
  })

})

app.listen(3000, () => {
  console.log("Microsserviço rodando na porta 3000")
})