import React from "react";


function WeatherAlerts({weather,stats}){
    
    
    let isalertmsg  = false;
    let alertmsg = '';

    function checkAlert(){
      
        if(weather.id >= 200 && weather.id <=232 ){
            console.log("Warning");
            isalertmsg  = true;
            alertmsg = `Watch out ${weather.description}`;
            if( weather.id === 212 || weather.id === 221 || weather.id === 232)
            {
                alertmsg = `${weather.description.toUpperCase()}, When Thunder roars, Go indoors! `;
            }
        }
     
        else if(weather.id >= 300 && weather.id <=321){
           console.log("Warning");
           isalertmsg  = true;
           alertmsg = `It looks like ${weather.description}`;
           if( weather.id === 302 || weather.id === 312 || weather.id === 314)
           {
               alertmsg = `${weather.description.toUpperCase()}, Get ready with your waterproof things! `;
           }
        }

        else if(weather.id >= 500 && weather.id <=531){
         console.log("Warning");
         alertmsg = `Take out your Raincoats and Umbrellas!`;
         if(( weather.id >= 502 && weather.id === 511) || (weather.id >= 522 && weather.id <= 531) )
         {
             alertmsg = `${weather.description.toUpperCase()}, It's raining cats and dogs, Do not to step outside! `;
         }
      }
     
      else if(weather.id >= 600 && weather.id <=622){
           console.log("Warning");
           isalertmsg  = true; 
           alertmsg = `Its Snowtime!`;         
           if( weather.id === 602 || weather.id === 613 || weather.id === 616 || weather.id >= 621 )
           {
               alertmsg = `${weather.description.toUpperCase()}, Try not to step outside, not a good time to make a snowman! `;
           }
      }
     
        else if(weather.id >= 701 && weather.id <=781){
           console.log("Warning");
           isalertmsg  = true;
           alertmsg = `It's ${weather.description} out there.`;
           if( weather.id === 781 )
           {
               alertmsg = `${weather.description.toUpperCase()}, Do not to step outside! `;
           }
        }
        else
        {
         isalertmsg  = false;
        }
    }

    checkAlert();

    console.log("islaert :  ",isalertmsg);
  
    if(isalertmsg){
        if(alertmsg === '')
       alertmsg = weather.main;
    }


    let imgpath;

    if(weather.icon)
    imgpath = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    else
    imgpath = `http://openweathermap.org/img/wn/10d@2x.png`;

    return (

        <div className="WeatherAlertsSection">

        <h1>This is the Weather Alerts Section </h1>

        <p>{weather.main}</p>
        <p>{weather.description}</p>
        <p>{weather.id}</p>
        <p>{alertmsg}</p>
        <img src={imgpath} alt="" />


        </div>


    )


}


export default WeatherAlerts;