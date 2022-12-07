import express from 'express';
import cors from 'cors';
const app = express()
import serverRoutes from './routes/serveRoutes.js';


app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(serverRoutes)


let listener = app.listen(process.env.PORT || 3030, () =>{
console.log(`Server is running ${listener.address().port}`);
})
