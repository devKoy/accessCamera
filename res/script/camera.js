var hide_result = document.getElementById("hide-res");
var result_panel = document.getElementById("result_panel");

//Get Prediction from Model
function uploadFile() {
    result_panel.classList.remove("result-hide-container");
    result_panel.classList.add("result-container");
    $("#previewImage").css("display", "flex");
    $("#canvas").css("display", "none");
    var img = document.getElementById("previewImage");
	var formData = new FormData(); 
	var fileInput = document.getElementById('fileInput'); 
	console.log(fileInput.files[0]);
    img.src = URL.createObjectURL(fileInput.files[0]);
	if (fileInput.files[0]){
		formData.append("classified_id", 2);
		formData.append("file", fileInput.files[0]); 					
		axios({
			method: 'post',
			url: 'https://bananaapi.herokuapp.com/predict', 
			data: formData,
			headers: { 
			  'Accept': 'application/json',
			  'Content-Type': 'multipart/form-data' },
		}).then(function(response) {
			$("#res-api").text(response.data);
			console.log(response);
		}) .catch(function(response) {
			$("#res-api").text(response.data);
			console.error(response);
		});
	} 
}


//  - --------------------CAMERA---------------------

	// The width and height of the captured photo. We will set the
	// width to the value defined here, but the height will be
	// calculated based on the aspect ratio of the input stream.
  
	var width = 420;    // We will scale the photo width to this
	var height = 500;     // This will be computed based on the input stream
  
	// |streaming| indicates whether or not we're currently streaming
	// video from the camera. Obviously, we start at false.
  
	var streaming = false;
  
	// The various HTML elements we need to configure or control. These
	// will be set by the startup() function.
  
	var video = document.getElementById('video');
	var canvas =  document.getElementById('canvas');;
	var photo = null;
	var startbutton = null;
  
	function showViewLiveResultButton() {
	  if (window.self !== window.top) {
		// Ensure that if our document is in a frame, we get the user
		// to first open it in its own tab or window. Otherwise, it
		// won't be able to request permission for camera access.
		document.querySelector(".contentarea").remove();
		const button = document.createElement("button");
		button.textContent = "View live result of the example code above";
		document.body.append(button);
		button.addEventListener('click', () => window.open(location.href));
		return true;
	  }
	  return false;
	}
  
	function startup() {
    
	  if (showViewLiveResultButton()) { return; }
	  photo = document.getElementById('photo');
	  clearButton = document.getElementById('clears');
	  startbutton = document.getElementById('scanner');
  
	  navigator.mediaDevices.getUserMedia({video: {
                  width: 720,
                  height: 1280,
		  facingMode: "environment"
	  }, audio: false})
	  .then(function(stream) {
		video.srcObject = stream;
		video.play();
	  })
	  .catch(function(err) {
		console.log("An error occurred: " + err);
	  });
  
  
	  startbutton.addEventListener('click', function(ev){
        if (menu_indicator.classList.contains("cam-indicator")){
            takepicture();
		    ev.preventDefault();
        }
	  }, false);
	  clearButton.addEventListener('click', function(ev){
		let div = document.getElementById("cont");
	    //	div.style.display = 'flex';
		clearphoto();
		ev.preventDefault();
	  }, false);
	 
	}
    
    function killCam(){
        video.pause();
        try{
            video.srcObject.getTracks().forEach(track => track.stop());    
        }catch(err){
            console.log("CAMERA already dead")
        }
        
    }
	// Fill the photo with an indication that none has been
	// captured.
  
	function clearphoto() {
	  canvas.style.display = 'none';
	}
  
	// Capture a photo by fetching the current contents of the video
	// and drawing it into a canvas, then converting that to a PNG
	// format data URL. By drawing it on an offscreen canvas and then
	// drawing that to the screen, we can change its size and/or apply
	// other changes before drawing it.
  
	function takepicture() {
      result_panel.classList.remove("result-hide-container");
      result_panel.classList.add("result-container");
      $("#previewImage").css("display", "none");
      $("#canvas").css("display", "flex");
	  var context = canvas.getContext('2d');
	  if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0);
		canvas.style.display = 'inline-block';
       
        
		canvas.toBlob((blob) => {
			let file = new File([blob], "fileName.jpg", { type: "image/jpeg" })
			var formData = new FormData(); 
			formData.append("classified_id", 2);
			formData.append("file", file); 		
			axios({
				method: 'post',
				url: 'https://bananaapi.herokuapp.com/predict', 
				data: formData,
				headers: { 
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data' },
			}).then(function(response) {
				$("#res-api").text(response.data);
				console.log(response);
			}) .catch(function(response) {
				$("#res-api").text(response.data);
				console.error(response);
			});
		}, 'image/jpeg');
		
	  } else {
		clearphoto();
	  }
	}
	
	// Set up our event listener to run the startup process
	// once loading is complete.
	

  
