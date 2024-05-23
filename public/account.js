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

