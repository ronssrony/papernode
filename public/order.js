// Get a reference to the form and the elements
const form = document.querySelector('.form-container');
const quantityInput = document.getElementById('quantity');
const fileInput = document.getElementById('file_upload');
const totalCostElement = document.getElementById('total-cost');
const downloadLinkElement = document.getElementById('download-link');

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
                `;
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

// Add event listener to the form submit event
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    const quantity = parseInt(quantityInput.value);

    // Calculate the cost per item based on the color selection
    let costPerItem;
    const colorSelection = document.getElementById('color').value;
    if (colorSelection === 'color') {
        costPerItem = 5;
    } else {
        costPerItem = 2;
    }

    // Get the uploaded file
    const file = fileInput.files[0];

    // Calculate the total cost based on the number of pages in the file
    let totalPages = 0;
    if (file) {
        try {
            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
            totalPages = pdf.numPages;
        } catch (error) {
            console.log('Error loading PDF:', error);
        }
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
    
    
    const totalCost = totalPages * quantity * costPerItem + finishercost;

    // Update the total cost display
    totalCostElement.textContent = '$' + totalCost;

    // Generate the content for the PDF
    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    const pickupDate = tomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
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
    
    const pickupLocation = document.getElementById('pickup_location').value;
    const paperSize = document.getElementById('paper_size').value;
    const userEmail = document.getElementById('user-email').value;
   
    

    const content = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h1>Papertray Order Receipt</h1>
            <p style="font-size: 12px; color: #888; text-align:left">Order Id: ${orderNumber}</p>
            <hr style="border-top: 1px dashed #000;">
            <h2>Order Details</h2>
            <table style="margin: 0 auto;">
                <tr>
                    <td style="text-align: left;">Number of Copies:</td>
                    <td style="text-align: right;">${quantity}</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Total Pages:</td>
                    <td style="text-align: right;">${totalPages}</td>
                </tr>
                <tr>
                <td style="text-align: left;">Paper Size:</td>
                <td style="text-align: right;">${paperSize}</td>
            </tr>
                <tr>
                    <td style="text-align: left;">Printing Type:</td>
                    <td style="text-align: right;">${colorSelection}</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Finisher Style:</td>
                    <td style="text-align: right;">${finisherStyle} (${finishercost} tk added for ${finisherStyle})</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Total Cost:</td>
                    <td style="text-align: right;">${totalCost} tk</td>
                </tr>
                
            </table>
            <hr style="border-top: 1px dashed #000;">
            <h2>Pickup Details</h2>
            <table style="margin: 0 auto;">
                <tr>
                    <td style="text-align: left;">Pickup Location:</td>
                    <td style="text-align: right;">${pickupLocation}</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Order Date:</td>
                    <td style="text-align: right;">${currentDate.toLocaleDateString('en-US')}</td>
                </tr>
                <tr>
                    <td style="text-align: left;">Pickup Date:</td>
                    <td style="text-align: right;">${pickupDate}, 9 AM - 10 PM</td>
                </tr>
            </table>
            <hr style="border-top: 1px dashed #000;">

            
             <p style="font-size: 12px; color: #888;">${userEmail}</p>
             <p style="font-size: 12px; color: #888;">Thank you for your order!</p>
          
        </div>
    `;

    // Convert the content into a PDF using html2pdf library
    html2pdf()
        .set({ margin: 1, filename: 'order_form.pdf', image: { type: 'png', quality: 0.98 } })
        .from(content)
        .save();

    // Simulate a click event on the download link to initiate the download
    downloadLinkElement.style.display = 'block';
    downloadLinkElement.href = '#';
    downloadLinkElement.textContent = 'Download Order Form (PDF)';
});

// Call the updateOrderSummary function initially to display the default values
updateOrderSummary();
