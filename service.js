document.querySelector('#search').addEventListener('click', getByDate);

var invoices = [];
var selectedInvoiceLines = [];

// Draw invoice html after search button clicked
async function drawInvoiceTable([]) {
    var html = `<table class="table-format">
                    <tr class="table-header">
                        <th>Invoice Date</th>
                        <th>Invoice Number</th>
                        <th>Customer</th>
                        <th>Customer Tax Number</th>
                        <th>Total Amount</th>
                        <th></th>
                    </tr>`;

    invoices.forEach(invoice => {
        html += `
            <tr class="table-row">
                <td class="row-cell">${new Date(Date.parse(invoice.invoiceDate)).toLocaleDateString()}</td>
                <td class="row-cell">${invoice.invoiceNumber}</td>
                <td class="row-cell">${invoice.customer.title}</td>
                <td class="row-cell">${invoice.customer.taxNumber}</td>
                <td class="row-cell">${invoice.totalAmount}</td>
                <td class="row-cell"><button onclick = getLineItems(${invoice.id}) id=${invoice.id}>Select</button></td>
            </tr>
            <tr> <div id="selectedlineResults"> </tr>`;
    });

    html += `</table>`;

    document.querySelector('#results').innerHTML = html;
};

// Redraw page for invoice lines after select an invoice
async function reDrawPage([], invoiceId) {
    var html = `<table class="table-format">
                    <tr class="table-header">
                        <th>Invoice Date</th>
                        <th>Invoice Number</th>
                        <th>Customer</th>
                        <th>Customer Tax Number</th>
                        <th>Total Amount</th>
                        <th></th>
                    </tr>`;

    invoices.forEach(invoice => {
        html += `
            <tr class="table-row">
                <td class="row-cell">${new Date(Date.parse(invoice.invoiceDate)).toLocaleDateString()}</td>
                <td class="row-cell">${invoice.invoiceNumber}</td>
                <td class="row-cell">${invoice.customer.title}</td>
                <td class="row-cell">${invoice.customer.taxNumber}</td>
                <td class="row-cell">${invoice.totalAmount}</td>
                <td class="row-cell"><button onclick = getLineItems(${invoice.id}) id=${invoice.id}>Select</button></td>
            </tr>`;
        if (invoice.id == invoiceId) {
            drawSlecetedInvoiceLineTable(selectedInvoiceLines);
            html += invoiceLineHtml;
        }
    });

    html += `</table>`;
    document.querySelector('#results').innerHTML = html;
}

// Create invoice line html for selected Invoice
var invoiceLineHtml = "";
async function drawSlecetedInvoiceLineTable([]) {
    invoiceLineHtml = `
            <tr class="table-header">
                <th></th>
                <th>ProductName</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
                <th></th>
            </tr>`;

    selectedInvoiceLines.forEach(invoiceLine => {
        invoiceLineHtml += `
        <tr class="table-row">
            <td></td>
            <td class="row-cell">${invoiceLine.itemName}</td>
            <td class="row-cell">${invoiceLine.quantity}</td>
            <td class="row-cell">${invoiceLine.price}</td>
            <td></td>
            <td></td>
        </tr>`;
    });
};

// Get all invoices from api service 
async function getAll() {

    var url = "http://localhost:5000/api/invoice";

    var data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    var result = await data.json();

    if (result["meta"] != null)
        if (result["meta"]["isSuccess"] == true)
            invoices = result["entities"]

    if (invoices.length > 0)
        await drawInvoiceTable(invoices);
}

// Get invoices from api service byDate
async function getByDate() {

    var url = "http://localhost:5000/api/invoice/bydate";

    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;

    var content = new GetInvoice(startDate, endDate);

    var data = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })

    var result = await data.json();

    if (result["meta"] != null)
        if (result["meta"]["isSuccess"] == true)
            invoices = result["entities"]

    if (invoices.length > 0)
        await drawInvoiceTable(invoices);
}

// Get lineItems from api service
async function getLineItems(invoiceId) {
    var url = "http://localhost:5000/api/invoiceLine/" + invoiceId;

    var data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    var result = await data.json();

    if (result["meta"] != null)
        if (result["meta"]["isSuccess"] == true)
            selectedInvoiceLines = result["entities"]

    if (invoices.length > 0)
        await reDrawPage(selectedInvoiceLines, invoiceId);
}

getAll();

class GetInvoice {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}