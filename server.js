'use strict';
const express=require ('express');
const app=express();

const cors= require('cors')

require('dotenv').config();

const PORT=process.env.PORT || 3030;
app.use(cors());

// {
//     "search_query": "seattle",
//     "formatted_query": "Seattle, WA, USA",
//     "latitude": "47.606210",
//     "longitude": "-122.332071"
//   }

// [
//     {
//       "forecast": "Partly cloudy until afternoon.",
//       "time": "Mon Jan 01 2001"
//     },
//     {
//       "forecast": "Mostly cloudy in the morning.",
//       "time": "Tue Jan 02 2001"
//     },
//     ...
//   ]
function Location(a,b){
    this.search_query=a;
    this.formatted_query=b[0].display_name;
    this.latitude=b[0].lat;
    this.longitude=b[0].lon;
    
}
function MyWeather(a,day,daynum,month,year){
    this.forecast=a.weather.description;
    this.time=`${day} ${month} ${daynum} ${year}`;
    // item,day,daynum,month,year
    MyWeather.all.push(this);
}
MyWeather.all=[];


app.get('/location',(req,res)=>{
    
    const city=req.query.city;
    const myLocation=require('./data/location.json');
    const myWeather=require('./data/weather.json');
    let theLocation=new Location(city,myLocation);
    
    res.send(theLocation);
})
app.get('/weather',(req,res)=>{
    
    const city=req.query.city;
 
    const myWeather=require('./data/weather.json');
//   getDay();
//   getMonthandYear();

//     var weekday = new Array(7);
//     weekday[0] = "Sunday";
//     weekday[1] = "Monday";
//     weekday[2] = "Tuesday";
//     weekday[3] = "Wednesday";
//     weekday[4] = "Thursday";
//     weekday[5] = "Friday";
//     weekday[6] = "Saturday";
    myWeather.data.forEach(item=>{
// let d=new Date(`${item.valid_date}`);
// let day=weekday[d.getDay()];
let day=getDay(item)[0];
let daynum=getDay(item)[1];

let month=getMonthandYear(item)[0];
let year=getMonthandYear(item)[1];


        let theWeather=new MyWeather(item,day,daynum,month,year);
    })
    res.send(MyWeather.all);
    // res.send(theLocation);
})
// var err=[{
//     status: 500,
//     resonseText: "Sorry, something went wrong",
   
//   }];

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// app.use(error,( req, res) => {
//     res.status(500).send(error);
// });

// app.get('*', (req, res) => {
//     let error = 'Sorry something went Wrong';
//     res.status(404).send('error', { 'message': error });
// });


app.listen(PORT,()=>{
    console.log("my server");
    // console.log(myLocation.length);
    // console.log(myWeather.data.length);


    

})


function getDay(item){
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
let d=new Date(`${item.valid_date}`);
let day=weekday[d.getDay()];
return [day,d.getDay()];
}
function getMonthandYear(item){
    var d = new Date(`${item.valid_date}`);
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[d.getMonth()];
    var nyear = d.getFullYear();
    return [n,nyear];
}