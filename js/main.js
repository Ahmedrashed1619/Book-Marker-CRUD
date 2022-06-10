
var productNameInp = document.getElementById('bookName');
var productUrlInp = document.getElementById('webSiteUrl');
var submit = document.getElementById('submit');

var showData = document.getElementById('showData');
showData.style.display = 'none';

var errorName = document.getElementById('errorName');
errorName.style.display = 'none';

var errorUrl = document.getElementById('errorUrl');
errorUrl.style.display = 'none';

var products = [];
if (JSON.parse(localStorage.getItem('listProducts')) != null)
{
    products = JSON.parse(localStorage.getItem('listProducts'));
    showData.style.display = 'block';
    displayProduct();
}

if (products = [])
{
    showData.style.display = 'none';
}

submit.onclick = function(){
    if( productNameInp.value == "" || 
        productNameInp.value == null || 
        productUrlInp.value == "" || 
        productUrlInp.value == null )
    {
        errorName.style.display = 'block';
        errorUrl.style.display = 'block';
        resetForm();
        return 0;
    }
    else
    {
        addProduct();
        displayProduct ();
        resetForm();
        showData.style.display = 'block';
    }
}


function addProduct(){
    var product = 
    {
        name : productNameInp.value,
        url : productUrlInp.value
    }
    products.push(product);
    localStorage.setItem('listProducts' , JSON.stringify(products));
}

function displayProduct (){
    var container = '';
    for (var i = 0; i < products.length; i++)
    {
        container += 
        `<div class="col-md-6">
            <div class="table-data d-flex justify-content-between align-items-center p-2">
                <h3 class="fs-4 fw-bold text-md-start">${products[i].name}</h3>
                <div class="text-white text-md-end">
                    <a href="${products[i].url}" class="text-decoration-none btn btn-primary">Visit</a>
                    <button onclick ="deleteItem(${i})" class="btn btn-danger ms-2">Delete</button>
                </div>
            </div>
        </div>`
    }
    document.getElementById('myData').innerHTML = container;
}

function resetForm(){
    var inputs = document.getElementsByClassName('form-control');
    for (var i = 0; i < inputs.length; i++)
    {
        inputs[i].value = '';
    }
}

function deleteItem(index){
    products.splice(index,1);
    displayProduct();
    localStorage.setItem('listProducts' , JSON.stringify(products));
}

