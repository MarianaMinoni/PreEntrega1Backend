const socket = io()



const formData = document.querySelector("#productForm");
formData.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const code = document.querySelector("#code").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    const category = document.querySelector("#category").value;

    socket.emit("newProduct", { title, description, code, price, stock, category });
    
    // Clear form fields
    formData.reset();
});




//actualizo la lista de productos agregados

socket.on("productListUpdated", (products) => {
    // Actualizar la vista con los nuevos productos
    // Por ejemplo, si tienes una lista de productos en tu HTML:
    const productList = document.querySelector("#productList");
    productList.innerHTML = ""; // Limpiar la lista

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `<div> ${product.title}
         $${product.price}
        </div>`
        productList.appendChild(li);
    });
});