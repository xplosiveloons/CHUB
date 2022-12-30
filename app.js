require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authenticateUser = require('./middleware/auth')
const app = express();


// connecting the database
const connectDB = require('./db/connect')

// getting the routers
const authRouter = require('./routes/auth')
const ccRouter = require('./routes/chub')

//routes
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/chub', authenticateUser, ccRouter)


const PORT = process.env.PORT || 5050

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()