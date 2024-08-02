document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snapButton = document.getElementById('snap');
    const uploadButton = document.getElementById('uploadButton');
    const uploadInput = document.getElementById('upload');
    const imageDataInput = document.getElementById('imageData');
    const receiptForm = document.getElementById('receiptForm');

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
        });

    // Capture the photo
    snapButton.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL and set to hidden input
        const dataURL = canvas.toDataURL('image/png');
        imageDataInput.value = dataURL;

        // Show the canvas with the captured image
        canvas.style.display = 'block';
    });

    // Handle image upload from gallery
    uploadButton.addEventListener('click', () => {
        uploadInput.click();
    });

    uploadInput.addEventListener('change', () => {
        const file = uploadInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            imageDataInput.value = dataURL;

            // Load the image to canvas for preview
            const img = new Image();
            img.onload = function() {
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
                canvas.style.display = 'block';
            };
            img.src = dataURL;
        };
        reader.readAsDataURL(file);
    });

    // Handle form submission
    receiptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(receiptForm);
        // Here you can handle the form data submission to the server
        // For example, using fetch or XMLHttpRequest
        console.log('Form submitted with image data:', formData.get('imageData'));
    });
});
