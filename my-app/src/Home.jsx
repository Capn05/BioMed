// src/Home.js
//IzaSyD9pRKlIdx58yUOCaGoEi6wrrIIhQ16eQs
import React, { useEffect, useState } from 'react';
import './home.css'
import DateCircle from './DateCircle';
import CircularRing from './CircularRing';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import Sidebar component

function Home() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pollendata, setPollendata] = useState();
    const [pollenIndex,setPollenIndex] = useState();
    const [day, setDay] = useState(0);

    const generateDates = () => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 5; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const formattedDate = futureDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            dates.push(formattedDate);
        }
        return dates;
    };

    const dates = generateDates();
      useEffect(() => {
        const latitude = 29.7604; // Houston latitude
        const longitude = -95.3698; // Houston longitude
    
        const fetchWeather = async () => {
          try {
            const response = await axios.get(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            setWeather(response.data.current_weather);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
          }
        };
        fetchWeather();
        // const options = {
        //     method: "GET",
        //     headers: {
        //       accept: "application/json",
        //       Authorization: `Bearer IzaSyD9pRKlIdx58yUOCaGoEi6wrrIIhQ16eQs`,
        //     },
        //   };
        fetch(`https://pollen.googleapis.com/v1/forecast:lookup?key=IzaSyD9pRKlIdx58yUOCaGoEi6wrrIIhQ16eQs&location.longitude=${longitude}&location.latitude=${latitude}&days=5`)
        .then(res => res.json())
        .then(res=>console.log(res))
        
      }, []);
      useEffect(() => {
        if (pollendata){
             setPollenIndex(((pollendata.dailyInfo[day].pollenTypeInfo[0].indexInfo.value+pollendata.dailyInfo[day].pollenTypeInfo[1].indexInfo.value+pollendata.dailyInfo[day].pollenTypeInfo[2].indexInfo.value)/3)*2)
        }

        
      },[pollendata,day])

      if (loading) return <div>Loading...</div>;
      const temperatureCelsius = weather.temperature;
      const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;

      const description = weather.weathercode; 
      const windSpeed = weather.windspeed;
      const getWeatherDescription = (code) => {
        switch (code) {
          case 0:
            return 'Clear sky';
          case 1:
            return 'Mainly clear';
          default:
            return 'Unknown weather';
        }
      };

  return(
    <div className='home'>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>Weather</li>
          <li>Allergy Forecast</li>
        </ul>
      </div>
      <div className={`overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1001 }}>
        ☰
      </button>
      <div className='header'>
    <h4 id='location'>Houston, Tx</h4>
    <div id = 'date-scroller'>
    {dates.map((date, index) => (
        <DateCircle key={index} date={date}onClick={() => {
            console.log({index});
            setDay(index);}}  />
      ))}
    </div>
    </div>
    <div className='box'id='Allergy'>
    <h2>Allergy Forecast</h2>
    <CircularRing percentage={pollenIndex*10} radius={100} strokeWidth={12} />
      <h4>Predominant allergens</h4>
      <p>View all</p>
    </div>
    <div className='box'id="Air">
    <h2>Air Quality</h2>
    <div className='aqiBox'>
        <div>
            AQI: 25
            </div>
            <div>
            Good
            </div> 
    </div>
    <div className="bar-container">
      <div
        className="bar-fill"
        style={{ width: `${5}%` }}
      ></div>
    </div>
    <br></br>
    <div>details</div>
    </div>
    <div className='box' id='Weather'>
        <h2>Weather</h2>
        <div className='weather-info'>
          <div className='weather-text'>
          <p>{temperatureFahrenheit.toFixed(1)}°F</p>
          <p>{getWeatherDescription(description)}</p>
            <p>Wind: {windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
