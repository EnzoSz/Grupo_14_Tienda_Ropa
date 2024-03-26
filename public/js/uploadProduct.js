window.addEventListener("load", () => {
    let contenedorCantidadProductos = document.querySelector(".container-cantidad-product");
    let inputCantidad = document.querySelector(".input-cantidad");

    inputCantidad.addEventListener("blur", (e) => {
        let cantidad = e.target.value;
        // segun la cantidad se crean los div correspondientes
        for (let i = 0; i < cantidad; i++) {
            contenedorCantidadProductos.insertAdjacentHTML('beforeend', `
            <div class="input-group">
                <label for="color">Color</label>
                <select name="color_id" id="color">
                    <option value="" disabled selected>Selecciona color</option>
                    <% allColors.forEach(color => { %>
                        <option value="<%= color.id %>"><%= color.name %></option>
                    <% }) %>
                </select>
                <% if (locals.error && error.color) { %>
                    <p><%= error.color.msg %></p>
                <% } %>
                <div id="errorColor"></div>
            </div>
            <div class="input-group">
                <label for="size">Talle</label>
                <select name="size_id" id="size">
                    <option value="" disabled selected>Selecciona Talle</option>
                    <% allSizes.forEach(size => { %>
                        <option value="<%= size.id %>"><%= size.name %></option>
                    <% }) %>
                </select>
                <% if (locals.error && error.size) { %>
                    <p><%= error.size.msg %></p>
                <% } %>
                <div id="errorSize"></div>
            </div>
            `)
        } 
    })
    
})