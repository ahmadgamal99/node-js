const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');
const port    = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text1 , text2) => text1.toUpperCase() + ' ' + text2.toUpperCase() );

app.set('view engine','hbs');
// app.use( (req,res,next) =>  res.render('maintenance'))

app.use(express.static(__dirname + '/public'));
app.use( (req,res,next) => {

    let now = new Date().toString();

    fs.appendFileSync('server.log' , 'server log : ' + `${now} : ${req.method} ${req.url}\n`);

    next();

});

app.get('/',(req,res) => {
    res.render('home.hbs',{
       title:'Home Page',
       welcomeMessage:'Welcome Home',
    });
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        title:'About Page',
    });
});


app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        title:'My Projects Page',
        welcomeMessage:'this is my portfolio'
    });
});

app.listen(port , () => console.log(`starting server up on port ${port}`));