import app from './app.js'
import {connectDB} from './db.js'

connectDB();
app.listen(3001)
console.log('server on port', 3001)