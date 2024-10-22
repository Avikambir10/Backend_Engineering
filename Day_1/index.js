const express = require('express');
const app = express();
const path = require('path');

const filePath = path.join(__dirname,'/views/index.ejs')
app.set('view engine','ejs');

app.get('/',(req,res) => {
    let name = "Avikam"
    const now = new Date(Date.now());
    const hours = now.getHours();
    res.render(filePath,{name,hours});
})

app.listen(9000 , (err) => {
    if(err) console.log("error connecting to server");
    else console.log("connected at port 9000");
})