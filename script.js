// Get the default tab (Carbon Footprint) and show its content by default
document.getElementById("carbon").style.display = "block";

function openTab(tabName) {
    // Hide all tab content
    const tabs = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    
    // Deactivate all tab links
    const tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the clicked tab content and activate its link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}

// Set the default tab (Carbon Footprint) as active
document.querySelector(".tablinks.active").click();


let totalCarbonFootprint = 0;
let totalEnergyUsage = 0;
let totalWasteGeneration = 0;
let totalActivities = 0;
let totalWaterUsage = 0;

var modal = document.getElementById("drivingModal");
var drivingBtn = document.getElementById("drivingBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
drivingBtn.onclick = function() {
    addCarbonFootprint('driving');
}

function addCarbonFootprint(activity) {
    let carbonEmission = 0;

    switch (activity) {
        case 'driving':
            carbonEmission = 0.2; // Carbon emission factor for driving (in kg CO2 per km)
            break;
        case 'electricity':
            carbonEmission = 0.5; // Carbon emission factor for electricity usage (in kg CO2 per kWh)
            break;
        case 'meals':
            carbonEmission = 2.0; // Carbon emission factor for meals (in kg CO2 per meal)
            break;
        case 'public-transport':
            carbonEmission = 0.1; // Carbon emission factor for public transportation (in kg CO2 per km)
            break;
        case 'biking':
            carbonEmission = 0; // Assuming biking has negligible carbon emissions
            break;
        case 'walking':
            carbonEmission = 0; // Assuming walking has negligible carbon emissions
            break;
        case 'air-travel':
            carbonEmission = 0.2; // Carbon emission factor for air travel (in kg CO2 per km)
            break;
        // Add more cases for additional activities
    }

    const carbonFootprint = carbonEmission;

    totalCarbonFootprint += carbonFootprint; // Update total carbon footprint
    console.log('Total carbon footprint:', totalCarbonFootprint); // Add this line to track the value
    updateSummary();
    updateProgress(totalCarbonFootprint);
    updateRecommendations(totalCarbonFootprint);

    totalActivities++;
    document.getElementById('currentCarbonFootprint').innerText = totalCarbonFootprint.toFixed(2); // Update UI
}

// Function to handle adding energy usage
function updateEnergyUsage() {
    const energyInput = document.getElementById('energy-usage').value;
    const energyUsage = parseFloat(energyInput);
    
    // Check if energyUsage is a valid number
    if (!isNaN(energyUsage) && energyUsage >= 0) {
        totalEnergyUsage += energyUsage;
        console.log('Total energy usage:', totalEnergyUsage);
        document.getElementById('totalEnergyUsage').innerText = totalEnergyUsage.toFixed(2);
        totalActivities++;
        updateSummary();
    } else {
        console.log('Invalid energy usage value:', energyInput);
        // You can add some error handling or display a message to the user here
    }
}


// Function to handle adding water usage
function updateWaterUsage() {
    const waterUsage = parseFloat(document.getElementById('water-usage').value);
    totalWaterUsage += waterUsage;
    console.log('Total water usage:', totalWaterUsage);
    document.getElementById('totalWaterUsage').innerText = totalWaterUsage.toFixed(2);
    totalActivities++;
    updateSummary();
}

// Function to handle adding waste generation
function updateWasteGeneration() {
    const wasteGeneration = parseFloat(document.getElementById('waste-generation').value);
    totalWasteGeneration += wasteGeneration;
    console.log('Total waste generation:', totalWasteGeneration);
    document.getElementById('totalWasteGeneration').innerText = totalWasteGeneration.toFixed(2);
    totalActivities++;
    updateSummary();
}

// Close the modal when the user clicks on the close button
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to update recommendations based on carbon footprint
function updateRecommendations(totalCarbonFootprint) {
    // Clear previous recommendations
    const recommendationsList = document.getElementById('carbon-recommendations');
    recommendationsList.innerHTML = '';

    // Add recommendations based on carbon footprint
    if (totalCarbonFootprint > 0.5) {
        addRecommendation("Consider carpooling or using public transportation.");
    }
    if (totalCarbonFootprint > 1.0) {
        addRecommendation("Switch to energy-efficient appliances and LED lighting.");
        addRecommendation("Reduce water usage by fixing leaks and using water-saving devices.");
    }
    if (totalCarbonFootprint > 1.5) {
        addRecommendation("Reduce meat consumption and opt for plant-based meals.");
        addRecommendation("Shop locally to support small businesses and reduce carbon emissions from transportation.");
    }
    if (totalCarbonFootprint > 2.0) {
        addRecommendation("Offset your carbon footprint by investing in carbon offset projects.");
    }
}

// Function to add recommendation to the list
function addRecommendation(recommendation) {
    const li = document.createElement('li');
    li.textContent = recommendation;
    document.getElementById('carbon-recommendations').appendChild(li);
}

// Function to update the progress bar
function updateProgress(totalCarbonFootprint) {
    const progress = document.getElementById('carbon-progress');
    const progressContainer = document.getElementById('carbon-progress-container');

    // Clamp the totalCarbonFootprint to a maximum of 2 and a minimum of 0
    const clampedFootprint = Math.min(Math.max(totalCarbonFootprint, 0), 2);

    // Set custom property for animation calculation
    progressContainer.style.setProperty('--current-carbon-footprint', clampedFootprint);

    // Determine the level of carbon footprint for color coding
    let progressClass = 'low';
    if (clampedFootprint > 1.0) {
        progressClass = 'moderate';
    }
    if (clampedFootprint > 2.0) {
        progressClass = 'high';
    }
    progress.className = `progress ${progressClass}`;

    // Update the tooltip text
    progressContainer.title = `Current Carbon Footprint: ${clampedFootprint}`;
}


// Function to update the summary section
function updateSummary() {
    document.getElementById('totalActivities').innerText = totalActivities;
    document.getElementById('totalCarbonFootprint').innerText = totalCarbonFootprint.toFixed(2);
    // Update other summary values here if needed
}

// Function to update the progress bar
function updateProgress(totalCarbonFootprint) {
    const progress = document.getElementById('carbon-progress');
    const progressContainer = document.getElementById('carbon-progress-container');

    // Clamp the totalCarbonFootprint to a maximum of 2
    const clampedFootprint = Math.min(totalCarbonFootprint, 2);

    // Set custom property for animation calculation
    progressContainer.style.setProperty('--current-carbon-footprint', clampedFootprint);

    // Determine the level of carbon footprint for color coding
    let progressClass = 'low';
    if (clampedFootprint > 1.0) {
        progressClass = 'moderate';
    }
    if (clampedFootprint > 2.0) {
        progressClass = 'high';
    }
    progress.className = `progress ${progressClass}`;

    // Update the tooltip text
    progressContainer.title = `Current Carbon Footprint: ${clampedFootprint}`;
}



// Function to clear all data
function clearData() {
    totalCarbonFootprint = 0;
    totalEnergyUsage = 0;
    totalWasteGeneration = 0;
    totalActivities = 0;
    totalWaterUsage = 0;

    document.getElementById('currentCarbonFootprint').innerText = "0.00";
    document.getElementById('totalEnergyUsage').innerText = "0.00";
    document.getElementById('totalWasteGeneration').innerText = "0.00";
    document.getElementById('carbon-recommendations').innerHTML = '';

    updateProgress(0);
    updateSummary();
}
