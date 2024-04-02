window.addEventListener("load", () => {
    //selecciona el botón de añadir
    addButton = document.querySelector(".add");

    //agrega el evento de click al boton de añadir
    addButton.addEventListener("click", () => {
        //selecciona la fila existente que contiene los campos talle, cantidad, color
        const inputContainer = document.querySelector(".input-container");

        //clonamos la fila existente para crear una nueva
        const newInputContainer = inputContainer.cloneNode(true);

          // Genera un sufijo único para los IDs de los nuevos campos clonados
          const uniqueId = "inputContainer"+ Date.now();
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
          })
          newInputContainer.appendChild(removeButton);

        //limpia los valores de la nueva fila

        inputs.forEach((input) => {
            input.value = "";
        })

        //inserta la nueva fila debajo de la existente
        inputContainer.parentNode.insertBefore(newInputContainer, inputContainer.nextSibling);
    })

    addButton.classList.remove("show");

})