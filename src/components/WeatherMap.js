import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import {Marker,Popup} from 'react-leaflet';

const Default_Latitude = 51.505;
const Default_Longitude = -0.09;

class WeatherMap extends React.Component {
    render() {

        const currLatitude = this.props.cLatitude ? this.props.cLatitude :  Default_Latitude;
        const currLongitude = this.props.cLongitude ? this.props.cLongitude : Default_Longitude;
       
        
       /*  function SetArrow() {
          const map = useMapEvent('click', () => {
            map.setCenter([50.5, 30.5])
          })
      
          return null
        } */
        
         navigator.geolocation.getCurrentPosition( (pos)=>{
     
              console.log( pos.coords.latitude);
              console.log(pos.coords.longitude);
         }); 

        return(
            <MapContainer center={[currLatitude,currLongitude]} zoom = {13} scrollWheelZoom={false}>
  
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
              
                <Marker position={[currLatitude,currLongitude]}>
                <Popup>
                You are Here !
               </Popup>
              </Marker>
             
             
            
          </MapContainer>
          
        )
    }
}

  export default WeatherMap;


