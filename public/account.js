// Get the profile button and wrapper elements
const profileButton = document.querySelector('.btnLogin-popup');
const wrapper = document.querySelector('.wrapper');

// Function to show the wrapper
function showWrapper() {
  wrapper.classList.add('active-popup');
  document.addEventListener('click', handleOutsideClick);
}

// Function to hide the wrapper
function hideWrapper() {
  wrapper.classList.remove('active-popup');
  document.removeEventListener('click', handleOutsideClick);
}

// Function to handle click outside the wrapper
function handleOutsideClick(event) {
  if (!wrapper.contains(event.target) && event.target !== profileButton) {
    hideWrapper();
  }
}

// Add event listener to profile button
profileButton.addEventListener('click', showWrapper);



// Get the input element and listen for changes
const uploadInput = document.getElementById('upload');
uploadInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];

  // Check if a file is selected
  if (file) {
    // Perform actions with the uploaded file
    console.log('File uploaded:', file);
    
    // You can store the uploaded file in local storage or send it to a server for further processing
    
    // Display the uploaded image in the profile picture section
    const reader = new FileReader();
    reader.onload = function(e) {
      const profilePic = document.querySelector('.profile-pic');
      profilePic.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
}
