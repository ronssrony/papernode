const form = document.querySelector('.form-container');
const quantityInput = document.getElementById('quantity');
const fileInput = document.getElementById('file_upload');
const totalCostElement = document.getElementById('total-cost');
const downloadLinkElement = document.getElementById('download-link');
const placeOrder = document.getElementById('place-order-button');

// Add event listeners to the form inputs
form.addEventListener('input', updateOrderSummary);
fileInput.addEventListener('change', updateOrderSummary);

// Function to update the order summary
function updateOrderSummary() {
    // Get the quantity value
    const quantity = parseInt(quantityInput.value);

    // Get the number of pages in the uploaded PDF file
    const file = fileInput.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const typedArray = new Uint8Array(e.target.result);
            pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
                const numPages = pdf.numPages;
                console.log('Number of Pages:', numPages);
                // Calculate the cost per item based on the color selection
                let costPerItem;
                const colorSelection = document.getElementById('color').value;
                if (colorSelection === 'color') {
                    costPerItem = 5;
                } else {
                    costPerItem = 2;
                }
             const finisherStyle = document.getElementById('finisher').value;
                let finishercost ;
                if(finisherStyle === 'Binder')
                {
                    finishercost = 25 ;
                }
                else if(finisherStyle === 'Hole Punch')
                {

                    finishercost = 20 ;
                }
                else
                {
                    finishercost = 0 ;
                }
          
                const totalCost = numPages * quantity * costPerItem +finishercost;
      
                // Update the total cost display
                totalCostElement.textContent = '$' + totalCost;
                const orderSummaryElement = document.getElementById('order-summary');
                orderSummaryElement.innerHTML = `
                    <h2>Order Summary</h2>
                    <p>Total Cost: <span id="total-cost">${totalCost} tk</span></p>
                    <p>Number of Pages:  ${numPages}</p>
                    <p>Number of copies:  ${quantity}</p>
                    <p>Finisher :  ${finisherStyle} <span>(${finishercost})tk </span>added </p>
                `
                const orderNumber = generateOrderNumber();

                // Function to generate a random order number
                function generateOrderNumber() {
                  // Generate a random number between 1000 and 9999
                  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
                  
                  // Get the current timestamp in milliseconds
                  const timestamp = Date.now();
                  
                  // Combine the random number and timestamp to create the order number
                  const orderNumber = randomNumber.toString() + timestamp.toString();
                  
                  return orderNumber;
                }
                const currentDate = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(currentDate.getDate() + 1);
                const pickupDate = tomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });                  
     document.getElementById('order-id').value =orderNumber;
     document.getElementById('total_cost').value = totalCost;
     document.getElementById('finisher_cost').value =finishercost;
     document.getElementById('order_date').value =currentDate.toLocaleDateString('en-US') ;
     document.getElementById('total_page').value =numPages ;
     document.getElementById('pickup_date').value =pickupDate ;
     


            });
             
        };
        fileReader.readAsArrayBuffer(file);
    } else {
        // Update the order summary without the number of pages
        const orderSummaryElement = document.getElementById('order-summary');
        orderSummaryElement.innerHTML = `
            <h2>Order Summary</h2>
            <p>Total Cost: <span id="total-cost">${totalCost}</span></p>
        `;
    }
}



