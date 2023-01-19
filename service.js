const mainInvoice = document.querySelector(".invoices")
const mainCustomer = document.querySelector(".customers")

const trimText =(value,number)=>{
    return value.substring(0,number)+"..."
}

let fetchBtns = document.querySelector('#btn');

fetchBtns.forEach(function(btn){
    btn.addEventListener('click',function(){
        let id = this.getAttribute('id');
        getInvoiceLines(id);
    });
});

const drawCustomerTable = ([])=>{
    
    var table = document.createElement("table");
    table.classList.add("table-format")
    var headerRow = document.createElement("tr");
    headerRow.classList.add("table-header");

    var TitleHeader = document.createElement("th");
    TitleHeader.innerHTML = "Title";
    var TaxNumberHeader = document.createElement("th");
    TaxNumberHeader.innerHTML = "Tax Number";
    var AddressHeader = document.createElement("th");
    AddressHeader.innerHTML = "Address";
    var ButtonHeader = document.createElement("th");
    
    headerRow.appendChild(TitleHeader);
    headerRow.appendChild(TaxNumberHeader);
    headerRow.appendChild(AddressHeader);
    headerRow.appendChild(ButtonHeader);
    table.appendChild(headerRow);
    
    for(var i=0;i<customers.length;i++){
        var row = document.createElement("tr");
        row.classList.add("table-row");

        var titleCell = document.createElement("td");
        titleCell.classList.add("row-cell")
        titleCell.innerHTML=customers[i].title;
        
        var taxNumberCell = document.createElement("td");
        taxNumberCell.classList.add("row-cell")
        taxNumberCell.innerHTML=customers[i].taxNumber;

        var addressCell = document.createElement("td");
        addressCell.classList.add("row-cell")
        addressCell.innerHTML=customers[i].address;

        var buttonCell = document.createElement("button");
        buttonCell.classList.add("row-cell")
        buttonCell.innerHTML="Select";

        row.appendChild(titleCell);
        row.appendChild(taxNumberCell);
        row.appendChild(addressCell);
        row.appendChild(buttonCell);
        table.appendChild(row);
    }

    document.body.appendChild(table);
};

const drawInvoiceTable = ([])=>{
    
    var table = document.createElement("table");
    table.classList.add("table-format")
    var headerRow = document.createElement("tr");
    headerRow.classList.add("table-header");

    var InvoiceDateHeader = document.createElement("th");
    InvoiceDateHeader.innerHTML = "Invoice Date";

    var InvoiceNumberHeader = document.createElement("th");
    InvoiceNumberHeader.innerHTML = "Invoice Number";

    var InvoiceCustomerHeader = document.createElement("th");
    InvoiceCustomerHeader.innerHTML = "Customer";
    
    var InvoiceCustomerTaxNumberHeader = document.createElement("th");
    InvoiceCustomerTaxNumberHeader.innerHTML = "Customer Tax Number";

    var TotalAmountHeader = document.createElement("th");
    TotalAmountHeader.innerHTML = "Total Amount";

    var ButtonHeader = document.createElement("th");
    
    headerRow.appendChild(InvoiceDateHeader);
    headerRow.appendChild(InvoiceNumberHeader);
    headerRow.appendChild(InvoiceCustomerHeader);
    headerRow.appendChild(InvoiceCustomerTaxNumberHeader);
    headerRow.appendChild(TotalAmountHeader);
    headerRow.appendChild(ButtonHeader);
    table.appendChild(headerRow);
    
    for(var i=0; i<invoices.length; i++){
        var row = document.createElement("tr");
        row.classList.add("table-row");

        var InvoiceDateCell = document.createElement("td");
        InvoiceDateCell.classList.add("row-cell")
        InvoiceDateCell.innerHTML=new Date(Date.parse(invoices[i].invoiceDate)).toLocaleDateString();

        var InvoiceNumberCell = document.createElement("td");
        InvoiceNumberCell.classList.add("row-cell")
        InvoiceNumberCell.innerHTML=invoices[i].invoiceNumber;

        var InvoiceCustomerCell = document.createElement("td");
        InvoiceCustomerCell.classList.add("row-cell")
        InvoiceCustomerCell.innerHTML=invoices[i].customer.title;
        
        var InvoiceCustomerTaxNumberCell = document.createElement("td");
        InvoiceCustomerTaxNumberCell.classList.add("row-cell")
        InvoiceCustomerTaxNumberCell.innerHTML=invoices[i].customer.taxNumber;

        var TotalAmountCell = document.createElement("td");
        TotalAmountCell.classList.add("row-cell")
        TotalAmountCell.innerHTML=invoices[i].totalAmount;

        var buttonCell = document.createElement("button");
        buttonCell.classList.add("row-cell")
        buttonCell.innerHTML="Select";
        buttonCell.id = invoices[i].id;

        row.appendChild(InvoiceDateCell);
        row.appendChild(InvoiceNumberCell);
        row.appendChild(InvoiceCustomerCell)
        row.appendChild(InvoiceCustomerTaxNumberCell)
        row.appendChild(TotalAmountCell);
        row.appendChild(buttonCell);
        table.appendChild(row);
    }

    document.body.appendChild(table);
};

const drawInvoiceLineTable = ([])=>{
    
    var table = document.createElement("table");
    table.classList.add("table-format")
    var headerRow = document.createElement("tr");
    headerRow.classList.add("table-header");

    var InvoiceDateHeader = document.createElement("th");
    InvoiceDateHeader.innerHTML = "Invoice Date";

    var InvoiceNumberHeader = document.createElement("th");
    InvoiceNumberHeader.innerHTML = "Invoice Number";

    var TotalAmountHeader = document.createElement("th");
    TotalAmountHeader.innerHTML = "Total Amount";

    var ButtonHeader = document.createElement("th");
    
    headerRow.appendChild(InvoiceDateHeader);
    headerRow.appendChild(InvoiceNumberHeader);
    headerRow.appendChild(TotalAmountHeader);
    headerRow.appendChild(ButtonHeader);
    table.appendChild(headerRow);
    
    for(var i=0; i<invoices.length; i++){
        var row = document.createElement("tr");
        row.classList.add("table-row");

        var InvoiceDateCell = document.createElement("td");
        InvoiceDateCell.classList.add("row-cell")
        InvoiceDateCell.innerHTML=new Date(Date.parse(invoices[i].invoiceDate)).toLocaleDateString();

        var InvoiceNumberCell = document.createElement("td");
        InvoiceNumberCell.classList.add("row-cell")
        InvoiceNumberCell.innerHTML=invoices[i].invoiceNumber;

        var TotalAmountCell = document.createElement("td");
        TotalAmountCell.classList.add("row-cell")
        TotalAmountCell.innerHTML=invoices[i].totalAmount;

        var buttonCell = document.createElement("button");
        buttonCell.classList.add("row-cell")
        buttonCell.innerHTML="Select";
        buttonCell.id=invoices[i].id;
        // buttonCell.onclick();

        row.appendChild(InvoiceDateCell);
        row.appendChild(InvoiceNumberCell);
        row.appendChild(TotalAmountCell);
        row.appendChild(buttonCell);
        table.appendChild(row);
    }

    document.body.appendChild(table);
};

// Get Invoices
let invoices=[]
const getInvoices=async()=>{

    let data = await fetch('http://localhost:5000/api/invoice');

    let result = await data.json()

    if(result["meta"] !=null)
        if(result["meta"]["isSuccess"] == true)
            invoices = result["entities"]
    
    if(invoices.length>0)
        drawInvoiceTable(invoices);

    console.log(invoices);
}

getInvoices();

//Get Customers
let customers=[]
const getCustomers=async()=>{

    let data = await fetch('http://localhost:5000/api/customer');

    let result = await data.json()

    if(result["meta"] !=null)
        if(result["meta"]["isSuccess"] == true)
            customers = result["entities"]


    if(customers.length>0)
        drawCustomerTable(customers);

    // customers.map((item)=>{
    //     customerList(item.customerId,item.title,item.taxNumber,trimText(item.address,50))
    // })
    console.log(customers);
}

// Get Invoices
let invoiceLines=[]

const getInvoiceLines=async(invoiceId)=>{

    console.log(invoiceId);
    var url = 'http://localhost:5000/api/invoiceLine/' +invoiceId;
    let data = await fetch(url);

    let result = await data.json()

    if(result["meta"] !=null)
        if(result["meta"]["isSuccess"] == true)
        invoiceLines = result["entities"]
    
    if(invoiceLines.length>0)
        invoiceLines = result["entities"]

    console.log(invoiceLines);
}


// // Post Invoice
// const postInvoices=async()=>{

//     let data = await fetch('http://localhost:5000/api/invoice');

//     let result = await data.json()

//     if(result["meta"] !=null)
//         if(result["meta"]["isSuccess"] == true)
//         invoices = result["entities"]
//     console.log(invoices);
// }