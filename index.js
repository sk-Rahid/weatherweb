const weatherForm=document.querySelector(".wheatherForm");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="82a44f893bf75edbc1ed6d70e47613ff";
weatherForm.addEventListener("submit",async event =>{
    event.preventDefault();
    const city=cityinput.value;
    if(city){
        try{
            const wheatherdata=await getwheatherdata(city);
                        displaywheatherinfo(wheatherdata);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
        
    }
    else{
        displayError("please enter a city");
    }
});
async function getwheatherdata(city) {
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
   const response =await fetch(apiUrl);
    if(!response.ok){
        throw new error("could not fetch weather data");

    }
    return await response.json();
    
}
function displaywheatherinfo(data){
   const {name:city,
    main:{temp,humidity},
   weather:[{description,id}]}=data;

   card.textContent="";
   card.style.display="flex";

   const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
     const humiditydisplay=document.createElement("p");
      const descdisplay=document.createElement("p");
       const weatheremoji=document.createElement("p");
      
       citydisplay.textContent=city;
       tempdisplay.textContent = `${temp.toFixed(1)}°C`;
       humiditydisplay.textContent=`humidity: ${humidity}%`;
       descdisplay.textContent=description;
       weatheremoji.textContent= getwheatheremoji(id);


     citydisplay.classList.add("citydisplay");
     tempdisplay.classList.add("tempdisplay");
              humiditydisplay.classList.add("humiditydisplay");
              descdisplay.classList.add("descdisplay");


       card.appendChild(citydisplay);
       card.appendChild(tempdisplay);
           card.appendChild(humiditydisplay);
               card.appendChild(descdisplay);
                   card.appendChild(weatheremoji);


}
function getwheatheremoji(weatherid){
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️"
             case (weatherid >= 300 && weatherid < 400):
            return "🌧️"
             case (weatherid >= 500 && weatherid < 600):
            return "🌧️"
            case (weatherid >= 600 && weatherid < 700):
            return "❄️"
            case (weatherid >= 700 && weatherid < 800):
            return "🌫️"
            case (weatherid===800):
            return "☀️"
            case (weatherid >= 801 && weatherid < 810):
            return "💭"
            default:
                return "❓"
                
            
            
            

    }

}
function displayError(message){
      
    const errordisplay = document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay); 
}