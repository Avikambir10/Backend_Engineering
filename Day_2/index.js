const express = require('express');
const app = express();
const path = require('path');
app.set('template engine',"ejs");

const filePath = path.join(__dirname,'/views/index.ejs')
const filePath1 = path.join(__dirname,'/views/products.ejs')


const products = [
    {
        name:"phone",
        price:"1000$"
    },
    {
        name:"TV",
        price:"500$"
    },
    {
        name:"car",
        price:"50000$"
    },
    {
        name:"shoes",
        price:"50$"
    },
    {
        name:"laptop",
        price:"1500$"
    },
    {
        name:"laptop",
        price:"1500$"
    },
    {
        name:"laptop",
        price:"1500$"
    }
]

app.get('/',(req,res) => {
    const name = "Avikam"
    res.render(filePath,{name});
})

app.get('/products',(req,res) => {
    res.render(filePath1,{products});
})

app.listen(8000,(err) => {
    if(err){
        console.log("error connecting to server")
    } else {
        console.log("server connected at port 8000")
    }
})