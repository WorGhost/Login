import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import hourRoutes from './routes/hour.js'
import proyectRoutes from './routes/proyect.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ' http://localhost:5173',
    credentials: true
}))

app.get('/', (req, res) => {
    res.cookie('cookieName', 'cookieValue');
    res.send('Cookie sent!');
});


app.use("/api", authRoutes)
app.use("/api", hourRoutes)
app.use("/api", proyectRoutes)

export default app
