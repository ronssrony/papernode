const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});
const allSideMenutop = document.querySelectorAll('#sidebar .side-menu li a');

allSideMenutop.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenutop.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
	document.body.classList.remove('dark');
	}
})



var statusColumns = document.getElementsByClassName('status-column');
var today = new Date();

for (var i = 0; i < statusColumns.length; i++) {
  var pickupDateAttribute = statusColumns[i].getAttribute('data-pickup-date');
  var pickupDate = new Date(pickupDateAttribute);
  pickupDate.setHours(0, 0, 0, 0); // Set pickup date to midnight for accurate comparison
  today.setHours(0, 0, 0, 0); // Set current date to midnight for accurate comparison

  if (pickupDate.getDate() > today.getDate()) {
    statusColumns[i].textContent = 'Pending';
    statusColumns[i].classList.add('status-pending');
  } else {
    statusColumns[i].textContent = 'Successful';
    statusColumns[i].classList.add('status-successful');
}
}

  // Fetch dashboard data and populate the main content
function fetchDashboard() {
	// ... your existing code to fetch and populate dashboard data
	// ...
  
	// Show/hide the appropriate content
	document.getElementById('dashboard-content').style.display = 'block';
	document.getElementById('sales-content').style.display = 'none';
	document.getElementById('user-content').style.display = 'none';
	document.getElementById('agent-content').style.display = 'none';
	document.getElementById('setting-content').style.display = 'none';
  }
  function fetchSales() {
	// ... your existing code to fetch and populate dashboard data
	// ...
  
	// Show/hide the appropriate content
	document.getElementById('dashboard-content').style.display = 'none';
	document.getElementById('sales-content').style.display = 'block';
	document.getElementById('user-content').style.display = 'none';
	document.getElementById('agent-content').style.display = 'none';
	document.getElementById('setting-content').style.display = 'none';
  }  function fetchUsers() {
	// ... your existing code to fetch and populate dashboard data
	// ...
  
	// Show/hide the appropriate content
	document.getElementById('dashboard-content').style.display = 'none';
	document.getElementById('sales-content').style.display = 'none';
	document.getElementById('user-content').style.display = 'block';
	document.getElementById('agent-content').style.display = 'none';
	document.getElementById('setting-content').style.display = 'none';
  }  function fetchAgents() {
	// ... your existing code to fetch and populate dashboard data
	// ...
  
	// Show/hide the appropriate content
	document.getElementById('dashboard-content').style.display = 'none';
	document.getElementById('sales-content').style.display = 'none';
	document.getElementById('user-content').style.display = 'none';
	document.getElementById('agent-content').style.display = 'block';
	document.getElementById('setting-content').style.display = 'none';
  }
  function fetchSetting() {
	// ... your existing code to fetch and populate dashboard data
	// ...
  
	// Show/hide the appropriate content
	document.getElementById('dashboard-content').style.display = 'none';
	document.getElementById('sales-content').style.display = 'none';
	document.getElementById('user-content').style.display = 'none';
	document.getElementById('agent-content').style.display = 'none';
	document.getElementById('setting-link').style.display = 'block';
  }
  
  
 
  
  // Add event listeners for navigation links
  document.getElementById('dashboard-link').addEventListener('click', fetchDashboard);
  document.getElementById('sales-link').addEventListener('click', fetchSales);
  document.getElementById('users-link').addEventListener('click', fetchUsers);
  document.getElementById('agents-link').addEventListener('click', fetchAgents);
  document.getElementById('setting-link').addEventListener('click', fetchSetting);
  
  // Highlight the active link on page load
  const currentPath = window.location.pathname;
  const activeLink = document.querySelector(`.nav-link[href="${currentPath}"]`);
  if (activeLink) {
	activeLink.classList.add('active');
  }
  
  // Show the appropriate content based on the active link
  if (activeLink === document.getElementById('sales-link')) {
	fetchSales();
  } else if (activeLink === document.getElementById('users-link')) {
	fetchUsers();
  } else if (activeLink === document.getElementById('agents-link')) {
	fetchAgents();
  }
  else if (activeLink === document.getElementById('setting-link')) {
	fetchSetting();
  } else {
	fetchDashboard();
  }
  // Admin.js

// Register Handlebars helper function to format decimal places
Handlebars.registerHelper('formatDecimal', function(value, decimalPlaces) {
	return value.toFixed(decimalPlaces);
  });
  
  // Rest of your JavaScript code...
  
  