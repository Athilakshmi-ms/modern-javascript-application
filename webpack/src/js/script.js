import Data from "../../assets/config.js";
import {rmvContainerChild} from "../../assets/rmvContainerChild.js"
const searchBar = document.querySelector('#searchBar');
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector('.city-name');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

searchBar.addEventListener('keyup', (event) => { // checking the action for specific key (Enter)
    if (event.key === "Enter") {
        const thisCity = event.target.value.toLowerCase(); // Store target in variable
        event.currentTarget.value = '';
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${thisCity}&appid=${Data.key}`)
            .then(response => response.json())  // Fetching first api to get the City coordinates
            .then(data => {
                console.log(data)
                const lon = data[0].lon;
                const lat = data[0].lat;
                cityNameContainer.innerHTML = data[0].name.toUpperCase();

                // Fetching final data according to the coordinates
                //fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=" + Data.key)
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${Data.key}`) 
                .then(response => response.json())
                    .then(result => {
                        console.log('Welcome to this basic weather app. this is not a product but the product of an academic exercise.')
                        console.log(result)
                        while (container.firstChild) {  // Removing all child elements from Container before creating new set of elements
                            container.removeChild(container.firstChild);    
                        };
                        for (let i = 0; i < 5; i++) {   // Looping through 5 days of weather data

                            // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
                            const date = new Date();
                            let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
                            const data = result.list[i];

                            // Create the elements with Data
                            const card = document.createElement('div');
                            card.classList.add("card");
                            container.appendChild(card);

                            const imageBox = document.createElement('div');
                            imageBox.classList.add("imgBx");
                            card.appendChild(imageBox);

                            const cardImg = document.createElement('img');
                            cardImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                            imageBox.appendChild(cardImg);

                            const contentBox = document.createElement("div");
                            contentBox.classList.add("contentBx");
                            card.appendChild(contentBox);

                            const cardHeader = document.createElement("h2");
                            cardHeader.innerHTML = dayOfTheWeek;
                            contentBox.appendChild(cardHeader);

                            const tempDescription = document.createElement("h4");
                            tempDescription.innerHTML = data.weather[0].description;
                            contentBox.appendChild(tempDescription);

                            const currentTempBox = document.createElement("div");
                            currentTempBox.classList.add("color");
                            contentBox.appendChild(currentTempBox);

                            const currentTempHeader = document.createElement("h3");
                            currentTempHeader.innerHTML = "Temp:"
                            currentTempBox.appendChild(currentTempHeader);

                            const currentTemp = document.createElement("span");
                            currentTemp.classList.add("current-temp");
                            currentTemp.innerHTML = data.main.temp + "°C";
                            currentTempBox.appendChild(currentTemp);

                            const minMaxTemperatures = document.createElement("div");
                            minMaxTemperatures.classList.add("details");
                            contentBox.appendChild(minMaxTemperatures);

                            const minMaxTempHeader = document.createElement("h3");
                            minMaxTempHeader.innerHTML = "More:"
                            minMaxTemperatures.appendChild(minMaxTempHeader);

                            const minTemp = document.createElement("span");
                            minTemp.classList.add("min-temp")
                            minTemp.innerHTML = data.main.temp_min + "°C";
                            minMaxTemperatures.appendChild(minTemp);

                            const maxTemp = document.createElement("span");
                            maxTemp.classList.add("max-temp")
                            maxTemp.innerHTML = data.main.temp_max + "°C";
                            minMaxTemperatures.appendChild(maxTemp);
                        };
                    });
            })
            .catch((error) => {
                console.error('Error:', "not a place!");
                rmvContainerChild(container);
                return alert("Are you sure you aren't holding your map upside down?");
            });
    };
});