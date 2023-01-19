document.querySelector('#search').addEventListener('click', getByDate);

var invoices = [];

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

            console.log(invoices.length);
    if (invoices.length > 0)
        await drawInvoiceTable(invoices);
}

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
                <td class="row-cell"><button id=${invoice.id}>Select</button></td>
            </tr>`;
        });

    html += `</table>`;
    
    document.querySelector('#results').innerHTML = html;
};

class GetInvoice {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}