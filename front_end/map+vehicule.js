var mymap = L.map('mapid').setView([45.771944, 4.8901709	], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZmFyZXNibXIiLCJhIjoiY2twZTFsODFiMXRjZzJucDc5NTFoMzVkdCJ9.lbJmtUODt74bblFY7-yZzg'
  }).addTo(mymap);
  



// Récupération et gestion des feux------------------------------------------------------------------------------
var fireIcon = L.icon({
    iconUrl: 'fire.png',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});




var HauteIntensite = new L.LayerGroup();
var FaibleIntensite = new L.LayerGroup();
var GrandeEtendue = new L.LayerGroup();
var FaibleEtendue = new L.LayerGroup();
var catA = new L.LayerGroup();
var catB_Gasoline = new L.LayerGroup();
var catB_Alcohol = new L.LayerGroup();
var catB_Plastics = new L.LayerGroup();
var catC_Flammable_Gases = new L.LayerGroup();
var catD_Metals = new L.LayerGroup();
var catE_Electric = new L.LayerGroup();

var voiture = new L.LayerGroup();
var citerne = new L.LayerGroup();
var pompes = new L.LayerGroup();
var camion = new L.LayerGroup();
var echelle = new L.LayerGroup();
var secours = new L.LayerGroup();



function addCar(){
console.log("Ajout d'une voiture")

fetch("http://localhost:8081/vehicle",
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({lon: 4.86,
      lat: 50,
      type: "CAR",
      efficiency: 10.0,
      liquidType: "WATER",
      liquidQuantity: 100.0,
      liquidConsumption: 1.0,
      fuel: 100.0,
      fuelConsumption: 10.0,
      crewMember: 8,
      crewMemberCapacity: 8,
      facilityRefID: 0})
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })
}
 





function addPompes(){
console.log("ajout d'une pompe")
  fetch("http://localhost:8081/vehicle",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({lon: 4.86,
        lat: 46,
        type: "PUMPER_TRUCK",
        efficiency: 10.0,
        liquidType: "WATER",
        liquidQuantity: 100.0,
        liquidConsumption: 1.0,
        fuel: 100.0,
        fuelConsumption: 10.0,
        crewMember: 8,
        crewMemberCapacity: 8,
        facilityRefID: 0})
  })
  .then(function(res){ console.log(res) })
  .catch(function(res){ console.log(res) })
  }


function addEchelle(){

  fetch("http://localhost:8081/vehicle",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({lon: 4.86,
        lat: 46.2,
        type: "TURNTABLE_LADDER_TRUCK",
        efficiency: 10.0,
        liquidType: "WATER",
        liquidQuantity: 100.0,
        liquidConsumption: 1.0,
        fuel: 100.0,
        fuelConsumption: 10.0,
        crewMember: 8,
        crewMemberCapacity: 8,
        facilityRefID: 0})
  })
  .then(function(res){ console.log(res) })
  .catch(function(res){ console.log(res) })
  }


function addSecours(){

  fetch("http://localhost:8081/vehicle",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({lon: 4.88,
        lat: 45.5,
        type: "FIRE_ENGINE",
        efficiency: 10.0,
        liquidType: "WATER",
        liquidQuantity: 100.0,
        liquidConsumption: 1.0,
        fuel: 100.0,
        fuelConsumption: 10.0,
        crewMember: 8,
        crewMemberCapacity: 8,
        facilityRefID: 0})
  })
  .then(function(res){ console.log(res) })
  .catch(function(res){ console.log(res) })
  }


function addCamion(){

  fetch("http://localhost:8081/vehicle",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({lon: 4.92,
        lat: 45.1,
        type: "TRUCK",
        efficiency: 10.0,
        liquidType: "WATER",
        liquidQuantity: 100.0,
        liquidConsumption: 1.0,
        fuel: 100.0,
        fuelConsumption: 10.0,
        crewMember: 8,
        crewMemberCapacity: 8,
        facilityRefID: 0})
  })
  .then(function(res){ console.log(res) })
  .catch(function(res){ console.log(res) })
  }


  function addCiterne(){
    fetch("http://localhost:8081/vehicle",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({lon: 4.92,
          lat: 45.1,
          type: "WATER_TENDER",
          efficiency: 10.0,
          liquidType: "WATER",
          liquidQuantity: 100.0,
          liquidConsumption: 1.0,
          fuel: 100.0,
          fuelConsumption: 10.0,
          crewMember: 8,
          crewMemberCapacity: 8,
          facilityRefID: 0})
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
    }



function getFire(){
  setInterval(function(){
    let context = {
          method : 'GET'
    };
    fetch("http://localhost:8081/fire", context)
    .then(value => value.json())
      .then(value => callback(value))
      .catch(error => alert("Erreur : " + error));
  },
  3000);
}

function callback(value){
  for(let elt in value){


if (value[elt]["intensity"] > 30){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(HauteIntensite).bindPopup("Intensité : " + value[elt]["intensity"] + " Type : " +value[elt]["type"] + " Etendue : " + value[elt]["range"]) ;

}



if (value[elt]["intensity"] < 30){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(FaibleIntensite).bindPopup("Intensité : " + value[elt]["intensity"] + " Type : " +value[elt]["type"] + " Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["range"] > 30){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(GrandeEtendue).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + " Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["range"] < 30){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(FaibleEtendue).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["type"] == "A"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catA).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["type"] == "B_Gasoline"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catB_Gasoline).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["type"] == "B_Alcohol"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catB_Alcohol).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["type"] == "B_Plastics"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catB_Plastics).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}

if (value[elt]["type"] == "C_Flammable_Gases"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catC_Flammable_Gases).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}
if (value[elt]["type"] == "D_Metals"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catD_Metals).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}
if (value[elt]["type"] == "E_Electric"){
L.marker([value[elt]["lat"],value[elt]["lon"]], {icon: fireIcon}).addTo(catE_Electric).bindPopup("Intensité : " + value[elt]["intensity"] + "Type : " +value[elt]["type"] + "Etendue : " + value[elt]["range"]) ;
}

    
  }
}







//Gestion des véhicules-----------------------------------------------------------------------------------------------



var vehicleIcon = L.icon({
      iconUrl: 'car.png',
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25 ,25], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-25] // point from which the popup should open relative to the iconAnchor
    });

var secourIcon = L.icon({
      iconUrl: 'secours.png',
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25 ,25], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-25] // point from which the popup should open relative to the iconAnchor
    });

var pompesIcon = L.icon({
      iconUrl: 'pompes.png',
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25 ,25], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-25] // point from which the popup should open relative to the iconAnchor
    });

var echelleIcon = L.icon({
      iconUrl: 'echelle.png',
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25 ,25], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-25] // point from which the popup should open relative to the iconAnchor
    });

var citerneIcon = L.icon({
      iconUrl: 'citerne.png',
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25 ,25], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-25] // point from which the popup should open relative to the iconAnchor
    });

var camionIcon = L.icon({
      iconUrl: 'camion.png',
      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25 ,25], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-25] // point from which the popup should open relative to the iconAnchor
    });




function getSecours(){
  
    let context = {
      method : 'GET'
    };
    fetch("http://localhost:8081/vehicle", context)
    .then(response => response.json())
    .then(response => callbackSecour(response))
    .catch(error => alert("Erreur : " + error));
  
  
}

function callbackSecour(response){
  
  for (let vehicule in response){
      
    if (response[vehicule]["type"] == 'FIRE_ENGINE'){
      
        L.marker([response[vehicule]["lat"],response[vehicule]["lon"]], {icon: secourIcon}).addTo(secours).bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]) ; 
      
    //L.marker([response[vehicule]["lat"], response[vehicule]["lon"]], {icon: vehicleIcon}).addTo(mymap)
    //.bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]);
    
  }
}
}


function getCar(){
  
  let context = {
    method : 'GET'
  };
  fetch("http://localhost:8081/vehicle", context)
  .then(response => response.json())
    .then(response => callbackCar(response))
    .catch(error => alert("Erreur : " + error));


}

function callbackCar(response){
  
  for (let vehicule in response){

      
    if (response[vehicule]["type"] == 'CAR'){
      L.marker([response[vehicule]["lat"],response[vehicule]["lon"]], {icon: vehicleIcon}).addTo(voiture).bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]) ;

    }
    
      
      
    //L.marker([response[vehicule]["lat"], response[vehicule]["lon"]], {icon: vehicleIcon}).addTo(mymap)
    //.bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]);
    
  }
}



function getPompes(){
  
  let context = {
    method : 'GET'
  };
  fetch("http://localhost:8081/vehicle", context)
  .then(response => response.json())
    .then(response => callbackPompes(response))
    .catch(error => alert("Erreur : " + error));


}

function callbackPompes(response){

for (let vehicule in response){
    
  if (response[vehicule]["type"] == 'PUMPER_TRUCK'){
    
  
      L.marker([response[vehicule]["lat"],response[vehicule]["lon"]], {icon: pompesIcon}).addTo(pompes).bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]) ; 
 // L.marker([response[vehicule]["lat"], response[vehicule]["lon"]], {icon: pompesIcon}).addTo(mymap)
  //.bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]);
  
}
}
}

function getCiterne(){
  
  let context = {
    method : 'GET'
  };
  fetch("http://localhost:8081/vehicle", context)
  .then(response => response.json())
    .then(response => callbackCiterne(response))
    .catch(error => alert("Erreur : " + error));


}

function callbackCiterne(response){

for (let vehicule in response){
    
  if (response[vehicule]["type"] == 'WATER_TENDER'){
    
      L.marker([response[vehicule]["lat"],response[vehicule]["lon"]], {icon: citerneIcon}).addTo(citerne).bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]) ;
    
  //L.marker([response[vehicule]["lat"], response[vehicule]["lon"]], {icon: citerneIcon}).addTo(mymap)
  //.bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]);
  
}
}
}

function getEchelle(){
  
  let context = {
    method : 'GET'
  };
  fetch("http://localhost:8081/vehicle", context)
  .then(response => response.json())
    .then(response => callbackEchelle(response))
    .catch(error => alert("Erreur : " + error));


}

function callbackEchelle(response){

for (let vehicule in response){
    
  if (response[vehicule]["type"] == 'TURNTABLE_LADDER_TRUCK'){
    
      L.marker([response[vehicule]["lat"],response[vehicule]["lon"]], {icon: echelleIcon}).addTo(echelle).bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]) ; 
    
  //L.marker([response[vehicule]["lat"], response[vehicule]["lon"]], {icon: echelleIcon}).addTo(mymap)
  //.bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]);
  
}
}
}

function getCamion(){
  
  let context = {
    method : 'GET'
  };
  fetch("http://localhost:8081/vehicle", context)
  .then(response => response.json())
    .then(response => callbackSecour(response))
    .catch(error => alert("Erreur : " + error));


}

function callbackCamion(response){

for (let vehicule in response){
    
  if (response[vehicule]["type"] == 'TRUCK'){
  
      L.marker([response[vehicule]["lat"],response[vehicule]["lon"]], {icon: camionIcon}).addTo(camion).bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]) ;
    
    
  //L.marker([response[vehicule]["lat"], response[vehicule]["lon"]], {icon: camionIcon}).addTo(mymap)
  //.bindPopup('Vehicule ' + response[vehicule]["id"] + response[vehicule]["type"]);
  }
  
}
}






// Interface de filtre des feux-------------------------------------------------------------------------------
var baseLayers = {};
var overlays = {
"Haute intensité" : HauteIntensite,
"Faible intensité" : FaibleIntensite,
"Grande étendue" : GrandeEtendue,
"Faible étendue" : FaibleEtendue,
"Type A" : catA,
"Type B_Gasoline" : catB_Gasoline,
"Type B_Alcohol" : catB_Alcohol,
"Type B_Plastics" : catB_Plastics,
"Type C_Flammable_Gases" : catC_Flammable_Gases,
"Type D_Metals" : catD_Metals,
"Type E_Electric" : catE_Electric,
};


L.control.layers(baseLayers, overlays, {collapsed :false}).addTo(mymap);

var baseLayers2 = {};
var overlays2 = {
"Voiture" : voiture,
"Secours" : secours,
"Pompes" : pompes,
"Citerne" : citerne,
"Echelle" : echelle,
"Camion" : camion,

};


L.control.layers(baseLayers2, overlays2, {collapsed :false}).addTo(mymap);

;












var marker;
function getCaserne(){
    
    ;
    var circle = L.circle([45.771944, 4.8901709], {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.1,
    radius: 5000
}).addTo(mymap);

  var marker = L.marker([45.771944, 4.8901709],{
    color: 'blue',
  }).addTo(mymap)
  .bindPopup('<iframe id="caserne" src= "./caserneInterface.html" height="500" </iframe>');
    


}


function callbackCaserne(response) {
    var circle = L.circle([45.771944, 4.8901709], {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.1,
        radius: 5000
    }).addTo(mymap);
    
      var marker = L.marker([45.771944, 4.8901709],{
        color: 'blue',
      }).addTo(mymap)
      .bindPopup('<iframe id='+'0'+' src= "./caserneInterface.html"  </iframe>')
}




getFire();
getCaserne();

getCar();
getSecours();
getPompes();
getCiterne();
getEchelle();
getCamion();
