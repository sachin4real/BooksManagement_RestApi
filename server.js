import express from 'express';


const app = express();

const Port = 8080;

app.listen(Port, ()=>{
    console.log(`Server is up and running on port${Port}`);
})


