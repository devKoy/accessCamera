var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
	Webcam.set({
		width: window.innerWidth,
		height: window.innerHeight,
		image_format: 'jpeg',
		jpeg_quality: 90
	});
}else{
	Webcam.set({
		width: window.innerWidth,
		height: window.innerHeight,
		image_format: 'jpeg',
		jpeg_quality: 90
	});
}

Webcam.attach( '#my_camera' );
//Image Preview
const imgInput = document.getElementById('fileInput')
  const imgEl = document.getElementById('img')
  imgInput.addEventListener('change', () => {
  if (imgInput.files && imgInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
    }
    reader.readAsDataURL(imgInput.files[0]);
  }
})

//Get Prediction from Model
function uploadFile() {
	var formData = new FormData(); 
	var fileInput = document.getElementById('fileInput'); 
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
