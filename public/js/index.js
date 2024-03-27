const socket = io()

socket.emit("message", "hola desde scoket.io")




function renderProductList(productsList) {
    const productsContainer = document.getElementById("productsList");
    productsContainer.innerHTML = ""; 

    productsList.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-6", "mb-4");
        productCard.innerHTML = `
            <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Nombre producto: ${product.title}</h5>
                    <p class="card-text">Precio $${product.price}</p>
                    <p class="card-text">stock: ${product.stock}</p>
                </div>
            </div>
        `;

        productsContainer.appendChild(productCard);
        

    });
}

socket.on("newList", products => {
    renderProductList(products);
});






function sendFormData(event) {
    event.preventDefault(); 

    // Obtener los valores del formulario
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

   
    const productData = {
        title,
        description,
        code,
        price,
        stock,
        category
    };
    

  
    socket.emit("addProduct", productData);
}


document.getElementById("productForm").addEventListener("submit", sendFormData);