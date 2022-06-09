var camsur = {
    "long": 123.323891,
    "lat":  13.546718
}

var user = {
    "long": 0,
    "lat": 0
}

//MARKER ICON BANANA
/*
var bananaIcon = L.icon({
  iconUrl: 'res/drawables/banana-marker.png',

  iconSize:     [120, 120], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
*/

var map = L.map('maps').setView([camsur.lat, camsur.long], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '© OpenStreetMap'
}).addTo(map);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
var locDefault = false

//GET RESULT AND LOCATION AND REMOVE RESULT PANEL AND DATA
function getLocationANDCloseResult() {
    var result_panel = document.getElementById("result_panel");
    setTimeout(function() {
      $(".bg-dark").css("display", "none");
    }, 500);
   
    result_panel.classList.remove("result-container");
    result_panel.classList.add("result-hide-container");
    $("#previewImage").css("display", "none");
    $("#canvas").css("display", "none");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    locDefault = true
}


var resMark = ""
function showPosition(position) {

    var res_name = document.getElementById("res-plant").innerText;
    var res = document.getElementById("res-api").innerText;
    if (res.includes("No leaf Detected")){return}

    if(res_name.toUpperCase() == "BANANA"){
      if (res.includes("Cordana")){resMark = "Cordana"; addMarker("fungal", position, res_name)} else
      if (res.includes("Healthy")){resMark = "None"; addMarker("healthy", position, res_name)} else
      if (res.includes("Sigatoka")){resMark = "Sigatoka"; addMarker("Bacterial", position, res_name)} else
      if (res.includes("Pestalotiopsis")){resMark = "Pestalotiopsis"; addMarker("fungal", position, res_name)}
    }else if(res_name.toUpperCase() == "RICE"){
      if (res.includes("Brown")){resMark = "Brown Spot"; addMarker("fungal", position, res_name)} else
      if (res.includes("Hispa")){resMark = "Hispa"; addMarker("pest", position, res_name)} else
      if (res.includes("Leaf Blast")){resMark = "Leaf Blast"; addMarker("fungal", position, res_name)} 
    }else if(res_name.toUpperCase() == "CORN"){
      if (res.includes("Gray")){resMark = "Gray Leaf Spot"; addMarker("fungal", position, res_name)} else
      if (res.includes("Blight")){resMark = "Leaf Blight"; addMarker("fungal", position, res_name)} else
      if (res.includes("Common")){resMark = "Common Rust"; addMarker("fungal", position, res_name)} else
      if (res.includes("Healthy")){resMark = "None"; addMarker("healthy", position, res_name)}
    }else if(res_name.toUpperCase() == "TOMATO"){
      if (res.includes("Bacterial")){resMark = "Bacterial Spot"; addMarker("Bacterial", position, res_name)} else
      if (res.includes("Early")){resMark = "Early Blight"; addMarker("fungal", position, res_name)} else
      if (res.includes("Healthy")){resMark = "None"; addMarker("healthy", position, res_name)} else
      if (res.includes("Late")){resMark = "Late Blight"; addMarker("fungal", position, res_name)} else
      if (res.includes("Mold")){resMark = "Leaf Mold"; addMarker("fungal", position, res_name)} else
      if (res.includes("Mosaic")){resMark = "Mosaic Virus"; addMarker("viral", position, res_name)} else
      if (res.includes("Target")){resMark = "Target Spot"; addMarker("fungal", position, res_name)} else
      if (res.includes("Curl")){resMark = "Yellow Leaf Curl Virus"; addMarker("viral", position, res_name)}
    }
   
    
    if(locDefault){
      $("#res-api").text(""); 
     locDefault = false
     $("#waiting-result-text").text("Analyzing Plant... Please wait a few momment");
    }
   
    map.invalidateSize()
    
}

function addMarker(typerist, position, res_name){

  let today = new Date().toLocaleDateString()
  var circle

  if(typerist == "healthy"){
     circle = L.circle([position.coords.latitude ,
      position.coords.longitude], {
      color: '#4FA03A',
      fillColor: '#57AC44',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  }else if(typerist == "fungal"){
    circle = L.circle([position.coords.latitude ,
      position.coords.longitude], {
      color: '#C761AB',
      fillColor: '#D171B8',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  }else if(typerist == "Bacterial"){
    circle = L.circle([position.coords.latitude ,
      position.coords.longitude], {
      color: '#F2A402',
      fillColor: '#FFAD03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  }else if(typerist == "viral"){
    circle = L.circle([position.coords.latitude ,
      position.coords.longitude], {
      color: '#C93C48',
      fillColor: '#F2A402',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  }
  circle.bindPopup("<b>PLANT:</b>"+res_name+"<br><b>DISEASE:</b> "+resMark+"<br> <b>DATE:</b> "+today).openPopup();
}

$("#mapper").on("click touchstart", function(){
    getLocation()
    map.invalidateSize()
});

function toggleDash(){
  var report_panel = document.getElementById("dashboard-report");

  if($("#dashboard_map").hasClass("toggled")){
    $("#dashboard_map").css({'transform' : 'rotate('+ 0 +'deg)'});
    report_panel.classList.add("dashboard-report-hide");
    report_panel.classList.remove("dashboard-report");
  }else{
    $("#dashboard_map").css({'transform' : 'rotate('+ 90 +'deg)'});
    report_panel.classList.remove("dashboard-report-hide");
    report_panel.classList.add("dashboard-report");
  }
  $("#dashboard_map").toggleClass("toggled");
}