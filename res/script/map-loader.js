var camsur = {
    "long": 123.323891,
    "lat":  13.546718
}

var user = {
    "long": 0,
    "lat": 0
}

var map = L.map('maps').setView([camsur.lat, camsur.long], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '© OpenStreetMap'
}).addTo(map);

setTimeout(function(){
   map.invalidateSize(); 
}, 100);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function getLocationANDCloseResult() {
    $("#previewImage").css("display", "none");
    $("#canvas").css("display", "none");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
}

function showPosition(position) {
   
    var res = document.getElementById("res-api").innerText;
    var resMark = ""
    if (res.includes("No leaf Detected")){return} else
    if (res.includes("cordana")){resMark = "Cordana Leaf Spot"} else
    if (res.includes("healthy")){resMark = "None"} else
    if (res.includes("sigatoka")){resMark = "Sigatoka Leaf Spot"} else
    if (res.includes("pestalotiopsis")){resMark = "Pestalotiopsis Leaf Spot"}
    
    if(resMark != ""){
        var marker = L.marker([position.coords.latitude ,
            position.coords.longitude
        ]).addTo(map);
        let today = new Date().toLocaleDateString()
        marker.bindPopup("<b>PLANT:</b> BANANA <br><b>DISEASE:</b> "+resMark+"<br> <b>DATE:</b> "+today).openPopup();
    }
    map.invalidateSize()
    
}

