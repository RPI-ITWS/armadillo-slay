import express from 'express';

const app = express();

app.get('/', (req,res) => {
  res.send('Hello, World!')
});

let port = process.env.PORT || 3000

app.listen(port,()=>{
  console.log(`Armadillo Slay listening on port ${port}.`);
});
