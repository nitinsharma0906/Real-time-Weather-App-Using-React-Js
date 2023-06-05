import hotBG from "./assets/hot.jpg"
import coldBG from "./assets/cold.jpg"
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./WeatherServices";

function App() {
  const [city , setCity] =useState('Paris');
  const [weather , setWeather]=useState(null);
  const [units , setUnits] = useState("metric");
  const [BG , setBG] =useState(hotBG);



  useEffect(() =>{
    const fetchWeatherdata= async ()=>{
      const data = await getFormattedWeatherData(city , units)
      setWeather(data);

      //dynamic BG
      const threshold = units === "metric" ? 20 : 60;
      if(data.temp <= threshold) setBG (coldBG);
      else setBG (hotBG);
    };


    fetchWeatherdata();
  } ,[units ,city]);


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  }

  const enterKeyPressed =(e)=>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
  <div className="app" style={{backgroundImage: `url(${BG})`}}>
    <div className="overlay">
     { weather && (
        <div className="container">
        <div className="section section__inputs">
          <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter the City..."></input>
       <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
       </div>
       <div className="section section__temperature">
        <div className="icon">
          <h3>{`${weather.name} ,${weather.country}`}</h3>
          <img src={weather.iconURL} alt="WeatherIcon"></img>
          <h3>{weather.description}</h3>
          </div>
          <div className="temperature">
          <h1>{`${weather.temp.toFixed()}° ${units ==='metric' ? 'C' :'F'}`}</h1>
        </div>
        </div>
        
       

       {/* bottom description */}

       <Descriptions weather = {weather} units ={units} />

      </div>
      )}
      
    </div>

  </div>
  );
}

export default App;
