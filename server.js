const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000

// create instance
const app = express()

app.use(express.json())
app.use(cors())

// routers
const productRouter = require('./routers/productRouter')
const categoryRouter = require('./routers/categoryRouter')

// main routes
app.use('/products', productRouter)
app.use('/category', categoryRouter)


app.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to my api'})
})

app.listen(PORT, () => console.log(`server running: ${PORT}`))
