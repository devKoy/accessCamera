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
   
    var res = document.getElementById("res-api").innerText;

    if (res.includes("No leaf Detected")){return} else
    if (res.includes("cordana")){resMark = "Cordana Leaf Spot"; addMarker("fungal", position)} else
    if (res.includes("healthy")){resMark = "None"; addMarker("healthy", position)} else
    if (res.includes("sigatoka")){resMark = "Sigatoka Leaf Spot"; addMarker("Bacterial", position)} else
    if (res.includes("pestalotiopsis")){resMark = "Pestalotiopsis"; addMarker("fungal", position)}
    
    if(locDefault){$("#res-api").text(""); locDefault = false}
    
    map.invalidateSize()
    
}

function addMarker(typerist, position){

  let today = new Date().toLocaleDateString()
  var bananaIcon;


  if(typerist == "healthy"){
    bananaIcon = L.icon({
      iconUrl: 'res/drawables/markers/healthy.png', iconSize:[50, 70], iconAnchor:[22, 94], shadowAnchor: [4, 62], popupAnchor:[-3, -76]
    });
  }else if(typerist == "fungal"){
    bananaIcon = L.icon({
      iconUrl: 'res/drawables/markers/fungus.png', iconSize:[50, 70], iconAnchor:[22, 94], shadowAnchor: [4, 62], popupAnchor:[-3, -76]
    });
  }else if(typerist == "Bacterial"){
    bananaIcon = L.icon({
      iconUrl: 'res/drawables/markers/bacterial.png', iconSize:[50, 70], iconAnchor:[22, 94], shadowAnchor: [4, 62], popupAnchor:[-3, -76]
    });
  }
  var marker = L.marker([position.coords.latitude ,
    position.coords.longitude
  ], {icon: bananaIcon}).addTo(map);
  marker.bindPopup("<b>PLANT:</b> BANANA <br><b>DISEASE:</b> "+resMark+"<br> <b>DATE:</b> "+today).openPopup();
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



$(".bg-dark").click(function(){
   $("#hide-res").trigger("click");
   setTimeout(function() {
      $(".bg-dark").css("display", "none");
    }, 1000);
});
