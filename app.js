const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());
const authRoutes= require('./src/routes/authRoutes');
const scpRoutes=require('./src/routes/scpRoutes');
const farmerRoutes=require('./src/routes/farmerRoutes');

app.use(express.json()); //middleware to parse JSON request bodies
app.use(cors()); 
app.use('/auth',authRoutes); 
app.use('/scp',scpRoutes);
app.use('/farmers',farmerRoutes);

app.get('/',(req, res) =>{
    res.send('Backend is running!');
});
const port=process.env.PORT || 3000;
app.listen(port,() => { 
    console.log('server listening at http://localhost:${port} ');
});


