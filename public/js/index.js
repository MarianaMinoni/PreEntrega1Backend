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
    
    
    <div class="card"> <h3>${newProduct.title}</h3>
     <p>Precio: ${newProduct.price}$</p> </div>`;
});


