window.addEventListener("load", () => {
  let form = document.querySelector(".form-login");

  let errorName = document.getElementById("errorName");
  let errorDescription = document.getElementById("errorDescription");
  let errorPrice = document.getElementById("errorPrice");
  let errorCategory = document.getElementById("errorCategory");
  let errorAmount = document.querySelectorAll(".errorAmount");
  let errorColor = document.querySelectorAll(".errorColor");
  let errorSize = document.querySelectorAll(".errorSize");
  let errorImage = document.getElementById("errorImage");

  function checkErrorName(error) {
    errorName.innerHTML = `<p class='errorName'>${error.toUpperCase()}</p>`;
    errorName.style.color = "red";
  }
  function checkErrorDescription(error) {
    errorDescription.innerHTML = `<p class='errorDescription'>${error.toUpperCase()}</p>`;
    errorDescription.style.color = "red";
  }
  function checkErrorPrice(error) {
    errorPrice.innerHTML = `<p class='errorPrice'>${error.toUpperCase()}</p>`;
    errorPrice.style.color = "red";
  }
  function checkErrorAmount(error) {
    errorAmount.forEach((errorElement) => {
      errorElement.innerHTML = `<p class='errorAmount'>${error.toUpperCase()}</p>`;
      errorElement.style.color = "red";
    });
  }
  function checkErrorCategory(error) {
    errorCategory.innerHTML = `<p class='errorCategory'>${error.toUpperCase()}</p>`;
    errorCategory.style.color = "red";
  }
  function checkErrorColor(error) {
    errorColor.forEach((errorElement) => {
      errorElement.innerHTML = `<p class='errorColor'>${error.toUpperCase()}</p>`;
      errorElement.style.color = "red";
    });
  }
  function checkErrorSize(error) {
    errorSize.forEach((errorElement) => {
      errorElement.innerHTML = `<p class='errorSize'>${error.toUpperCase()}</p>`;
      errorElement.style.color = "red";
    });
  }
  function checkErrorImage(error) {
    errorImage.innerHTML = `<p class='errorImage'>${error.toUpperCase()}</p>`;
    errorImage.style.color = "red";
  }

  form.addEventListener("submit", (event) => {
    const sizes = document.querySelectorAll("input[name='size[]']");
    const colors = document.querySelectorAll("input[name='color[]']");
    const amount = document.querySelectorAll("input[name='amount[]']");

    if (sizes.value === "") {
      checkErrorSize("Debe seleccionar un talle");
      event.preventDefault();
    }
    if (amount.value === "" || amount[index].value <= 0) {
      checkErrorAmount("Debe seleccionar una cantidad");
      event.preventDefault();
    }
    if (colors.value === "") {
      checkErrorColor("Debe seleccionar un color");
      event.preventDefault();
    }

    if (form.name.value.trim().length < 3) {
      checkErrorName("Debe ingresar un nombre de mas de 5 caracteres");
      event.preventDefault();
    }
    if (form.description.value.trim().length < 20) {
      checkErrorDescription("Debe tener mas de 20 caracteres");
      event.preventDefault();
    }
    if (form.price.value.trim() <= 1) {
      checkErrorPrice("Debe ingresar un valor mayor a 1");
      event.preventDefault();
    }
    if (form.amount.value.trim() <= 1) {
      checkErrorAmount("Debe ingresar una cantidad mayor a 0");
      event.preventDefault();
    }
    if (form.category.value === "") {
      checkErrorCategory("Debe ingresar una categoria");
      event.preventDefault();
    }
    if (form.color.value === "") {
      checkErrorColor("Debe ingresar un color");
      event.preventDefault();
    }
    if (form.size.value === "") {
      checkErrorSize("Debe ingresar un talle");
      event.preventDefault();
    }
    if (form.image_product.value === "") {
      checkErrorImage("Debe ingresar una imagen");
      event.preventDefault();
    }
  });
});
