document.addEventListener('DOMContentLoaded', function() {
  var orderRows = document.getElementsByClassName('order-row');

  for (var i = 0; i < orderRows.length; i++) {
    orderRows[i].addEventListener('click', toggleOrderDetails);
  }

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.order-card')) {
      closeOrderDetails();
    }
  });

  function toggleOrderDetails() {
    var detailsRow = this.nextElementSibling;

    this.classList.toggle('details-open');

    if (detailsRow.style.display === 'table-row') {
      detailsRow.style.display = 'none';
    } else {
      closeOrderDetails();
      detailsRow.style.display = 'table-row';
    }
  }

  function closeOrderDetails() {
    var openOrder = document.querySelector('.details-open');
    if (openOrder) {
      openOrder.classList.remove('details-open');
      openOrder.nextElementSibling.style.display = 'none';
    }
  }
});

// Update the status based on pickup date
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
document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', performSearch);

  function performSearch() {
    var orderId = document.getElementById('search-input').value;
    var orderDate = document.getElementById('search-input').value;

    // Loop through the order rows and hide/show based on search criteria
    var orderRows = document.getElementsByClassName('order-row');
    for (var i = 0; i < orderRows.length; i++) {
      var rowOrderId = orderRows[i].querySelector('.order-id').textContent;
      var rowOrderDate = orderRows[i].querySelector('.order-date').textContent;

      if (
        (orderId === '' || rowOrderId.includes(orderId)) &&
        (orderDate === '' || rowOrderDate.includes(orderDate))
      ) {
        orderRows[i].style.display = 'table-row';
      } else {
        orderRows[i].style.display = 'none';
      }
    }
  }
});
