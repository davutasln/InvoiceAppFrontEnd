document.querySelector('#addInvoiceLine').addEventListener('click', addInvoiceLine);

var customers = []
//Get customers from api service
const getCustomers = async () => {

    let data = await fetch('http://localhost:5000/api/customer');

    let result = await data.json()

    if (result["meta"] != null)
        if (result["meta"]["isSuccess"] == true)
            customers = result["entities"]

    console.log(customers);
}

getCustomers();

// Add Customers to drop down list
async function PopulateCustomerList (){
    var ddlCustomers = document.getElementById("ddlCustomers");

    //Add the Options to the DropDownList.
    customers.forEach(customer => {
        var option = document.createElement("OPTION");
        option.innerHTML = customer.title;
        option.value = customer.id;
        ddlCustomers.options.add(option);
    });
}

var invoiceLines = [];

// Add invoiceLine list to new item
async function addInvoiceLine() {
    var productName = document.getElementById('productName').value;
    var quantity = Number.parseInt(document.getElementById('quantity').value);
    var price = Number.parseFloat(document.getElementById('price').value);

    var invoiceLine = new PostInvoiceLine(productName, quantity, price);

    invoiceLines.push(invoiceLine);
    await drawInvoiceLineTable(invoiceLines);
}

async function removeItem(index) {
    invoiceLines.pop(index);
    await drawInvoiceLineTable(invoiceLines);
}

// Remove from invoiceLine list to selected item
async function drawInvoiceLineTable([]) {
    var invoiceLineHtml = `
        <table class="table-format">
            <tr class="table-header">
                <th>ProductName</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
            </tr>`;

    invoiceLines.forEach(invoiceLine => {
        invoiceLineHtml += `
        <tr class="table-row">
            <td class="row-cell">${invoiceLine.itemName}</td>
            <td class="row-cell">${invoiceLine.quantity}</td>
            <td class="row-cell">${invoiceLine.price}</td>
            <td class="row-cell"><button onclick = "removeItem(this)" id=${invoiceLine.index}>Remove</button></td>
        </tr>`;
    });

    invoiceLineHtml += `</table>`;

    document.querySelector('#lineResults').innerHTML = invoiceLineHtml;
};

// Send new invoice to api service 
async function postInvoice() {

    var url = "http://localhost:5000/api/invoice";

    var customerId = Number.parseInt(document.getElementById('ddlCustomers').value);
    var content = new PostInvoice(customerId, invoiceLines);

    var data = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    });

    var result = data.json();
}

class PostInvoice {
    constructor(customerId, []) {
        this.customerId = customerId;
        this.invoiceLines = invoiceLines
    }
}

class PostInvoiceLine {
    constructor(itemName, quantity, price) {
        this.itemName = itemName,
            this.quantity = quantity,
            this.price = price
    }
}