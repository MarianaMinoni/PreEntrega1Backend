const socket = io()

socket.emit("message", "hola desde scoket.io")


socket.on("newList", (products) => {
    renderProducts(products);
  });