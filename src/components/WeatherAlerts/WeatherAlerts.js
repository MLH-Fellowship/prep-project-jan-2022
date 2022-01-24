import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './WeatherAlerts.css';
import Snackbar from '@mui/material/Snackbar';


function WeatherAlerts({weather}){
    
    
    let isalertmsg  = false;
    let alertmsg = '';

    const imgpath =  `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const weatherDescription = weather.description[0].toUpperCase() +  weather.description.slice(1);;

    function checkAlert(){
      
        if(weather.id >= 200 && weather.id <=232 ){
            isalertmsg  = true;
            alertmsg = `Watch out ${ weatherDescription}.`;
            if( weather.id === 212 || weather.id === 221 || weather.id === 232)
            {
                alertmsg = `${ weatherDescription}, When Thunder roars, Go indoors! `;
            }
        }
     
        else if(weather.id >= 300 && weather.id <=321){
           isalertmsg  = true;
           alertmsg = `It looks like ${ weatherDescription}.`;
           if( weather.id === 302 || weather.id === 312 || weather.id === 314)
           {
               alertmsg = `${ weatherDescription}, Get ready with your waterproof things! `;
           }
        }

        else if(weather.id >= 500 && weather.id <=531){
            isalertmsg  = true;
            alertmsg = `Take out your Raincoats and Umbrellas!`;
           if(( weather.id >= 502 && weather.id <= 511) || (weather.id === 522 || weather.id === 531) )
           {
               alertmsg = `${ weatherDescription}, It's raining cats and dogs, Do not to step outside! `;
           }
      }
     
      else if(weather.id >= 600 && weather.id <=622){
           isalertmsg  = true; 
           alertmsg = `Its Snowtime!`;         
           if( weather.id === 602 || weather.id === 613 || weather.id === 616 || weather.id >= 621 )
           {
               alertmsg = `${ weatherDescription}, Try not to step outside, not a good time to make a snowman! `;
           }
      }
     
        else if(weather.id > 701 && weather.id <=781){
           isalertmsg  = true;
           alertmsg = `It's ${ weatherDescription} out there.`;
           if( weather.id === 781 )
           {
               alertmsg = `${ weatherDescription}, Do not to step outside! `;
           }
        }
        else
        {
         isalertmsg  = false;
        }
    }
    checkAlert();

    return (

        <div className="WeatherAlertsSection">

        {isalertmsg && <>

            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} className ="werror--alert" >
            <Alert  onClose={handleClose} sx={{ width: '100%' }} variant="filled" severity="error" >
            <AlertTitle className ="werror--alert--title">{weather.main} <img src={imgpath} className ='werror--alert--logo' alt="" /></AlertTitle>
            <div className="werror--alert-content">{alertmsg}  </div>   
            </Alert>
            </Snackbar>

        </>
        }

        </div>


    )


}


export default WeatherAlerts;