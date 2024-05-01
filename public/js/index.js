
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
  

  // Escucha el evento click para eliminar el producto

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-product")) {
        const productId = event.target.getAttribute("data-product-id");
        socket.emit("deleteProduct", { productId });
        console.log(productId);
    }
});

// Escucha la respuesta de eliminación del producto



socket.on("deleteProductResponse", (response) => {
  console.log(response);
  if (response.success) {
      const productId = response.productId;
      console.log(productId);
      const productCard = document.querySelector(`[data-product-id="${productId}"]`);
      if (productCard) {
          productCard.parentElement.remove(); // Elimina el elemento padre (el contenedor del producto)
      }
  } else {
      console.error("Error al eliminar el producto:", response.error);
  }


});


//renderiza los productos

  socket.on("addProductResponse", newProduct => {
    console.log("Respuesta del servidor:", newProduct);
   
    allProducts.innerHTML += `
    <div>
    <div class="card">
    <div class="card-body"> 
    <h5 class="card-title">${newProduct.title}</h5>
     <p lass="card-text"> Precio: ${newProduct.price}</p> 
     <p lass="card-text">stock: ${newProduct.stock} </p> 
     <button type="button" class="btn btn-danger delete-product" data-product-id=" {{this._id}} ">Eliminar</button>
     </div>
     </div>    
     </div>
    
     `;
});


