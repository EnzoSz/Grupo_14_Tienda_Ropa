window.addEventListener("load", () => {
    //obtenemos el contenedor de las imagenes
    const slider = document.querySelector("#slider");
    //obtenemos todas las imagenes con la clase (slider-section)
    let sliderSection = document.querySelectorAll(".slider-section");
    //obtenemos la ultima imagen
    let sliderSectionLast = sliderSection[sliderSection.length - 1];
    //obtenemos los botones
    const btnLeft = document.querySelector("#btn-left");
    const btnRight = document.querySelector("#btn-right");
    //insertamos la ultima imagen al principio del slider
    slider.insertAdjacentElement('afterbegin', sliderSectionLast);

    //Funciones

    //Funcion para mover la imagen a la derecha
    function Next() {
        let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
        slider.style.marginLeft = "-200%";
        slider.style.transition = "all 0.5s";
        setTimeout(function () {
            slider.style.transition = "none";
            slider.insertAdjacentElement('beforeend', sliderSectionFirst);
            slider.style.marginLeft = "-100%";
        },500);
    }

    //Funcion para mover la imagen a la izquierda
    function Prev() {
        let sliderSection = document.querySelectorAll(".slider-section");
        let sliderSectionLast = sliderSection[sliderSection.length - 1];
        slider.style.marginLeft = "0";
        slider.style.transition = "all 0.5s";
        setTimeout(function () {
            slider.style.transition = "none";
            slider.insertAdjacentElement('afterbegin', sliderSectionLast);
            slider.style.marginLeft = "-100%";
        }, 500);
    }
    //Eventos de los botones izquierdo y derecho
    btnRight.addEventListener("click", function () {
        Next();
    })
    btnLeft.addEventListener("click", function () {
        Prev();
    })

    //Autoplay
    setInterval(function () {
        Next();
    }, 5000);
})