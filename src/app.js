const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const geoCode = require('../util/geocode');
const forecast = require('../util/forecast');


console.log(__dirname);
console.log(path.join(__dirname, '..', path.sep, 'public'));

const publicDirPath = path.join(__dirname, '..', path.sep, 'public');
const viewPath = path.join(__dirname, '..', path.sep, 'templates');
const partialPath = path.join(__dirname,'..', path.sep, 'templates', path.sep, 'partials');
console.log(partialPath);

hbs.registerPartials(partialPath);

//
///

//console.log(viewPath);
/* 
By default when view engine is set express look up for 'views' folder 
To change views directory path add new folder and add that folder as view file using syntax below 
app.set('views',newAbsolutePath);

*/

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewPath);

// Setup static directory to server 
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index',{
        title:'Website Title Goes Here',
        name: 'MY name is bhavya Soni'
    });
});

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About Us Page Title',
        name:'About us page is created by bhavya soni'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        heading : 'Help Page',
        subHeading: 'Help Page Subtitle'
    });
});
//app.use('/about', path.join(publicDirPath,path.sep,'about.html'));

// app.get('/', (req, res) => {
//     res.send('<h1>Hello express</h1>');
// });

// app.get('/help', (req,res) => {
//     res.send({
//         name: 'Bhavya',
//         surName : 'Soni'
//     });
// });

// app.get('/about', (req,res) => {
//     res.send('About Page is opened');
// });

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide address'
        });
    }
    console.log(req.query.address);

    geoCode ( req.query.address, ( error, data = {} ) => {
        if(error) {
            //return console.log(error);
            return res.send({
                error
            });             
        }
        //console.log('Error', error);
        //console.log('data', data);
    
        forecast (data.latitude, data.longitude, (forcasterror, forcastdata) => {
            if(forcasterror) {
                return res.send({
                    forcasterror
                });                
            }
            console.log('Error', error);
            console.log(data.location);
            console.log('Data', forcastdata);

            res.send({
                address : req.query.address,
                forcastdata           
            });

        });
    
    });


});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide search term',
        });
    }
    console.log(req.query);
    res.send({
        products: []    
    });
});
// app.com
// app.com/about
// app.com/help

/* 404 not found page if ther 
if there is no explicit match then express provide wildcard route to match any thing and return the content based on tha

*/

/* To match the pages e.g /help/test or /help/abc etc use this app.get request*/

app.get('/help/*', ( req, res ) => {
    res.render('404_page', {
        title : 'Help Page Not Found',
        name: 'Need Help for this'
    });
});

/* This route need to set at last above all other route */
app.get('*', (req, res) => {
    res.render('404_page', {
        title:'404 Page Not Found !',
        name: 'Bhavya Soni'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});