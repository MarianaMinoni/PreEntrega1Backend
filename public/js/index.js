const socket = io()


const title = document.querySelector("#title");
const description = document.querySelector("#description");
const code = document.querySelector("#code");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");
const category = document.querySelector("#category");



const productForm = document.querySelector('#productForm');
const allProducts = document.querySelector('#allProducts');




productForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
   socket.emit("newproduct", {
      title: title.value,
      description: description.value,
      code: code.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
    });
  });

  socket.on("addProductResponse", newProduct => {
    console.log("Respuesta del servidor:", newProduct);
   
    allProducts.innerHTML += `
    <div class="container col-3" > 
    <div class="card">
    <div class="card-body"> 
    <h5 class="card-title">${newProduct.title}</h5>
     <p lass="card-text"> Precio: ${newProduct.price}</p> 
     <p lass="card-text">stock: ${newProduct.stock} </p> 
     </div>
     </div>
     </div>`;
});


