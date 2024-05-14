window.addEventListener("load", () => {
    //seleccionamos el boton de eliminar cuenta
    const deleteAccount = document.querySelector(".delete");
    //seleccionamos el boton de cancelar del modal de eliminar cuenta
    const cancelButton = document.querySelector(".cancel");

    
    //agregamos el evento de click al boton de eliminar cuenta
    deleteAccount.addEventListener("click", () => {

        //seleccionamos el modal de eliminar cuenta
        const modal = document.querySelector(".modal-delete");

        //mostramos el modal
        modal.style.display = "flex";

    })

    //agregamos el evento de click al boton de cancelar del modal de eliminar cuenta
    cancelButton.addEventListener("click", () => {

        //seleccionamos el modal de eliminar cuenta
        const modal = document.querySelector(".modal-delete");

        //ocultamos el modal
        modal.style.display = "none";
    })


})