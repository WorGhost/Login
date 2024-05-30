import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'


import authRoutes from './routes/auth.js'
import projectRoutes from './routes/project.js'
import hourRoutes from './routes/hour.js'
import phasesRoutes from './routes/phase.js'


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
app.use("/api", projectRoutes)
app.use("/api", phasesRoutes)

export default app
