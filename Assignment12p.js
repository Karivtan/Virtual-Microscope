/**
 * Assignment 12: Abbe Principle & phase contrast
 */

document.addEventListener("DOMContentLoaded", function() {
    const bottomLeftMiddle = document.getElementById('bottom-left-middle');
    const sampleSelector = document.getElementById('sample-sel');
    const objSelector = document.getElementById('obj-sel');
    const irisSlider = document.getElementById('iris-slider');
    const ocularButton = document.getElementById('ocularButton');
    const loadButton = document.getElementById('loadButton');
    const explanation = document.getElementById('explanation');

    let telescopeActive = false;
    let sampleLoaded = false;

    // Elementos
    const SampleImage = document.createElement("img");
    const FDImage = document.createElement("img");
    const CDImage = document.createElement("img");
    const viewImage = document.createElement("img");
    const aroCentral = document.createElement("img");
    const aroIzq = document.createElement("img");
    const aroDer = document.createElement("img");
    const aros = [aroCentral, aroIzq, aroDer];

    // Configurar imágenes
    aroCentral.src = "fotos/PhaseRing2.png";
    aroIzq.src = "fotos/aro_color1.png";
    aroDer.src = "fotos/aro_color2.png";

    [SampleImage, FDImage, viewImage, CDImage].forEach((img, i) => {
        img.style.cssText = "width:100%;height:100%;position:absolute; top:0; left:0; object-fit:contain; pointer-events:none; z-index: " + i;
        bottomLeftMiddle.appendChild(img);
    });

    aros.forEach(aro => {
        aro.style.cssText = "position:absolute; transition: all 0.3s ease; z-index: 10; display:none; object-fit:contain;";
        bottomLeftMiddle.appendChild(aro);
    });

    viewImage.src = "fotos/Circle.png";
    FDImage.src = "fotos/diaphragmv5.png";
    CDImage.src = "fotos/diaphragmv4.png";

    function setAro(el, left, top) {
        el.style.left = left;
        el.style.top = top;
        el.style.width = "20%";
        el.style.height = "20%";
    }

    function updateAbbe() {
        const objective = objSelector.value;
        const type = sampleSelector.value;

        // 1. Lógica de la MUESTRA (Siempre visible si está cargada)
        if (sampleLoaded && type !== "none") {
            SampleImage.src = "samples/sample_foil_500.jpeg";
            SampleImage.style.visibility = telescopeActive ? "hidden" : "visible";
            
            // Zoom de la muestra según objetivo
            let zoom = (objective === "10") ? 1.5 : (objective === "40") ? 3 : 7;
            SampleImage.style.transform = `scale(${zoom})`;
        } else {
            SampleImage.style.visibility = "hidden";
        }

        if (!telescopeActive && sampleLoaded && type !== "none") {
            viewImage.style.visibility = "visible";
            
            // Si el círculo se ve chico, aumenta estos números (ej. cambia 3.5 por 5.0)
            let circleZoom = (objective === "10") ? 3.5 : (objective === "40") ? 4.5 : 5.5;
            
            viewImage.style.transform = `scale(${circleZoom})`;
            viewImage.style.width = "100%";
            viewImage.style.height = "100%";
        } else {
            viewImage.style.visibility = "hidden";
        }

       

        // 2. Lógica del TELESCOPIO (Aros)
        if (telescopeActive) {
            bottomLeftMiddle.style.backgroundColor = "black";
            CDImage.style.visibility = "visible";
            FDImage.style.visibility = "hidden";
            aros.forEach(a => a.style.display = "block");
            const sizeCentral = "80%"; 
            const sizeOtros = "80%";

            if (objective === "10") {
                setAro(aroCentral, "40%", "35%"); 
                setAro(aroIzq, "30%", "34%");
                 setAro(aroDer, "50%", "34%");
            } else if (objective === "40" || objective === "20") {
                setAro(aroCentral, "40%", "35%"); 
                setAro(aroIzq, "35%", "34%");
                 setAro(aroDer, "45%", "34%");
            } else if (objective === "100") {
                setAro(aroCentral, "40%", "35%");
                 setAro(aroIzq, "36.5%", "34%"); 
                 setAro(aroDer, "43%", "34%");
            }
        } else {
            bottomLeftMiddle.style.backgroundColor = "white";
            CDImage.style.visibility = "hidden";
            FDImage.style.visibility = "visible";
            FDImage.style.transform = `scale(${25 - (objective/10)})`; 
            aros.forEach(a => a.style.display = "none");
        }
    }
    function posicionarAro(el, left, top, size) {
        el.style.left = left;
        el.style.top = top;
        el.style.width = size;
        el.style.height = size;
    }

    ocularButton.onclick = () => {
        telescopeActive = !telescopeActive;
        ocularButton.textContent = telescopeActive ? "put back eyepiece" : "remove Eyepiece";
        updateAbbe();
    };

    loadButton.onclick = () => {
        sampleLoaded = !sampleLoaded;
        loadButton.textContent = sampleLoaded ? "Remove Specimen" : "Load Specimen";
        updateAbbe();
    };

    sampleSelector.onchange = updateAbbe;
    objSelector.onchange = updateAbbe;
    updateAbbe();
} );