import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();


const Port =  process.env.Port ||  8000 ;

app.listen(Port, ()=>{
    console.log(`Server is up and running on port${Port}`);
})


