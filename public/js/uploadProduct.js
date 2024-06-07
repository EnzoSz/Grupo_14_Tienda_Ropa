window.addEventListener("load", () => {
  //selecciona el botón de añadir
  const addButton = document.querySelector(".add");

  //seleccionamos el formulario
  const form = document.querySelector(".form-upload");

  //agrega el evento de click al boton de añadir
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    //selecciona la fila existente que contiene los campos talle, cantidad, color
    const inputContainer = document.querySelector(".input-container");

    //clonamos la fila existente para crear una nueva
    const newInputContainer = inputContainer.cloneNode(true);

    // Genera un sufijo único para los IDs de los nuevos campos clonados
    const uniqueId = "inputContainer" + Date.now();
    newInputContainer.id = uniqueId;

    // Modifica los IDs de los nuevos campos clonados agregando el sufijo único
    const inputs = newInputContainer.querySelectorAll("input, select");
    inputs.forEach((input) => {
      const oldId = input.getAttribute("id");
      const newId = oldId + "_" + uniqueId;
      input.setAttribute("id", newId);
    });
    //agrega el boton de eliminar
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.classList.add("remove");
    removeButton.textContent = "-";
    removeButton.addEventListener("click", () => {
      newInputContainer.remove();
    });
    newInputContainer.appendChild(removeButton);

    //limpia los valores de la nueva fila

    inputs.forEach((input) => {
      input.value = "";
    });

    //inserta la nueva fila debajo de la existente
    inputContainer.parentNode.insertBefore(
      newInputContainer,
      inputContainer.nextSibling
    );
  });

  addButton.classList.remove("show");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const discount = document.getElementById("discount").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const sizes = Array.from(document.querySelectorAll(".dinamic-size")).map(
      (size) => size.value
    );
    const colors = Array.from(document.querySelectorAll(".dinamic-color")).map(
      (color) => color.value
    );
    const amount = Array.from(document.querySelectorAll(".dinamic-amount")).map(
      (amount) => amount.value
    );
    const image_product = document.getElementById("image_product").files[0];
    // console.log(image_product);

    const productData = {
      name: name,
      description: description,
      price: price,
      discount: discount,
      brand_id: brand,
      category_id: category,
    };
    let fetures = [];
    for (let i = 0; i < sizes.length; i++) {
      fetures.push({
        size: sizes[i],
        amount: amount[i],
        color: colors[i],
      });
    }
    productData.fetures = fetures;
    // console.log(productData, image_product);

    const formData = new FormData();
    formData.append('productData', JSON.stringify(productData));
    formData.append('image_product', image_product);
    // console.log(JSON.parse(formData));
    try {
      const response = await fetch("/products/create", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // form.reset();
    location.href = "/products/detail/" + data.id;
  });
});
