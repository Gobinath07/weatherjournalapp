/* Global Variables */


const d = new Date();
const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Create a new date instance dynamically with JS
let data;


let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
let apiKey ='&appid=98721fd58c1442399314ce10c43bb3a7';



const submitBtn=document.getElementById('generate');
const date=document.getElementById('date');
const temp=document.getElementById('temp');
const city=document.getElementById('city');

const content=document.getElementById('content');


var zip;
document.getElementById('generate').addEventListener('click',action);
function action(e){
    const feeling = document.getElementById('feelings').value;
    zip =document.getElementById("zip").value;
    getWeathe(baseURL, zip, apiKey)
    .then(function(data){
        console.log(data);
        postData('/newData',{date:newDate,temp:data.main.temp,city:data.name,feeling:feeling});
        updateUI();
    })
};
const getWeathe =async(baseURL,zip,apiKey) =>{
    const fetchApi = baseURL+zip+apiKey;
    const res = await fetch(fetchApi);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data)
        return data;
    }
    catch(error){
        console.log("error", error);
    }
};

const postData = async(url = "", data ={}) => {
    console.log(data);
 
  const option ={
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'

      },
      body:JSON.stringify(data)

  };
  const response = await fetch('/newData', option);
const json = await response.json();
console.log(json);

    };




//function to post to the server

//Function to get the recent ProjectData from the server
const getData = async(url) => {
    const response = await fetch('/getData');

    try {
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.log('error', error);
    }
}

const updateUI =async () => {
    const req = await fetch('/newData')
    try{
    
        const allData = await req.json();
        console.log(allData)
        
        document.getElementById('date').innerHTML =  `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature:${allData.temp}°c`;
        document.getElementById('city').innerHTML=  `City:${allData.city}`;
        document.getElementById('content').innerHTML = `you feel like :${allData.feeling}`;
      
}

    catch(error){
console.log('error',error);
    }
}


