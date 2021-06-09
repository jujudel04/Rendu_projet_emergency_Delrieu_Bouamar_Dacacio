function printVehicle(response,indexTruck){
  if(indexMax==0){
    document.getElementsByClassName("slideshow-container").innerHTML = "Pas de camion";
  } else {
    for(c of response){
      if(c.facilityRefId != caserneId){
        console.log(response);
        c.delete;
      }
    }
    w3.displayObject("truckInfo",response[indexTruck]);
  }
}

function slide(indexTruck){
  let context = {
      method : 'GET'
    };
  fetch("http://localhost:8080/access/sim/vehicle", context)
  .then(response => response.json())
  .then(response => printVehicle(response,indexTruck))
  .catch(error => alert("Erreur : " + error));
}


function getParameterByName(name)
{
 name = name.replace("/[[]/", "[").replace("/[]]/", "]");
 var regexS = "[?&]" + name + "=([^&#]*)";
 var regex = new RegExp(regexS);
 var results = regex.exec(window.location.search);
 if(results == null)
 return ;
 else
 return decodeURIComponent(results[1].replace("/+/g", ));
}

caserneId = parseInt(getParameterByName("caserneId"));

function nbVehicleCaserne(){
  let context = {
    method : 'GET'
  };
  fetch("http://localhost:8080/access/sim/vehicle", context)
  .then(response => response.json())
  .then(response => callbackNbVehicleCaserne(response))
  .catch(error => alert("Erreur : " + error));
}
function callbackNbVehicleCaserne(rsponse){
  return response.length;
}

function plusSlides(i){
  slide(indexTruck+=i)
}

indexMax = nbVehicleCaserne()-1;
indexTruck = 0;
slide(indexTruck);

