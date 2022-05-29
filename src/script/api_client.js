

//Get Prediction from Model
function uploadFile() {
	var formData = new FormData(); 
	var fileInput = document.getElementById('fileInput'); 
	console.log(fileInput.files[0]);
	if (fileInput.files[0]){
		formData.append("classified_id", 2);
		formData.append("file", fileInput.files[0]); 					
		$("#previewImg").attr("src", fileInput.files[0]);
		axios({
			method: 'post',
			url: 'https://bananaapi.herokuapp.com/predict', 
			data: formData,
			headers: { 
			  'Accept': 'application/json',
			  'Content-Type': 'multipart/form-data' },
		}).then(function(response) {
			$("#result").text(response.data);
			console.log(response);
		}) .catch(function(response) {
			$("#result").text(response.data);
			console.error(response);
		});
	} 
}

// Capture Image
function take_snapshot() {
 
	// take snapshot and get image data
	Webcam.snap( function(data_uri) {
		// display results in page
		document.getElementById('results').innerHTML = 
		 '<img src="'+data_uri+'"/>';
	 } );
 }

//  - --------------------CAMERA---------------------

(function() {
	// The width and height of the captured photo. We will set the
	// width to the value defined here, but the height will be
	// calculated based on the aspect ratio of the input stream.
  
	var width = 320;    // We will scale the photo width to this
	var height = 0;     // This will be computed based on the input stream
  
	// |streaming| indicates whether or not we're currently streaming
	// video from the camera. Obviously, we start at false.
  
	var streaming = false;
  
	// The various HTML elements we need to configure or control. These
	// will be set by the startup() function.
  
	var video = null;
	var canvas = null;
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
	  video = document.getElementById('video');
	  canvas = document.getElementById('canvas');
	  photo = document.getElementById('photo');
	  clearButton = document.getElementById('clear');
	  startbutton = document.getElementById('startbutton');
  
	  navigator.mediaDevices.getUserMedia({video: {
		  facingMode: "environment"
	  }, audio: false})
	  .then(function(stream) {
		video.srcObject = stream;
		video.play();
	  })
	  .catch(function(err) {
		console.log("An error occurred: " + err);
	  });
  
	  video.addEventListener('canplay', function(ev){
		if (!streaming) {
		  height = video.videoHeight / (video.videoWidth/width);
  
		  // Firefox currently has a bug where the height can't be read from
		  // the video, so we will make assumptions if this happens.
  
		  if (isNaN(height)) {
			height = width / (4/3);
		  }
  
		  video.setAttribute('width', width);
		  video.setAttribute('height', height);
		  canvas.setAttribute('width', width);
		  canvas.setAttribute('height', height);
		  streaming = true;
		}
	  }, false);
  
	  startbutton.addEventListener('click', function(ev){
		takepicture();
		ev.preventDefault();
	  }, false);
	  clearButton.addEventListener('click', function(ev){
		clearphoto();
		ev.preventDefault();
	  }, false);
	 
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
	  var context = canvas.getContext('2d');
	  if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);
		canvas.style.display = 'inline-block';
		var data = canvas.toDataURL('image/jpeg', 1.0);

		canvas.toBlob((blob) => {
			let file = new File([blob], "fileName.jpg", { type: "image/jpeg" })
			var formData = new FormData(); 
			formData.append("classified_id", 2);
			formData.append("file", file); 					
			$("#previewImg").attr("src",file);
			axios({
				method: 'post',
				url: 'https://bananaapi.herokuapp.com/predict', 
				data: formData,
				headers: { 
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data' },
			}).then(function(response) {
				$("#result").text(response.data);
				console.log(response);
			}) .catch(function(response) {
				$("#result").text(response.data);
				console.error(response);
			});
		}, 'image/jpeg');
		
	  } else {
		clearphoto();
	  }
	}
	function dataURItoBlob(dataURI) {
		var byteString = atob(dataURI.split(',')[1]);
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
		return new Blob([ab], { type: 'image/jpeg' });
	  }
	// Set up our event listener to run the startup process
	// once loading is complete.
	window.addEventListener('load', startup, false);
  })();
  