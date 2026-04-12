/**
 * Assignment 11: 
 */

document.addEventListener("DOMContentLoaded", function() {
    // References
    const MicImage = document.getElementById('Microscope');
    const bottomLeftMiddle = document.getElementById('bottom-left-middle');
    const sampleSelector = document.getElementById('sample-sel');
    const objSelector = document.getElementById('obj-sel');
    const irisSlider = document.getElementById('iris-slider');
    const ocularButton = document.getElementById('ocularButton');
    const loadButton = document.getElementById('loadButton');
    const explanation = document.getElementById('explanation');

    
    let telescopeActive = false;
    let sampleLoaded = false;

    //  imagen
    const SampleImage = document.createElement("img");
    const FDImage = document.createElement("img");
    const CDImage = document.createElement("img");
    const DiffractionImage = document.createElement("img");
    const viewImage = document.createElement("img");

    //  CSS correcto
    [SampleImage, FDImage, viewImage, CDImage, DiffractionImage].forEach((img, i) => {
        img.style.cssText = "width:100%; height:100%; position:absolute; top:0; left:0; object-fit:contain; pointer-events:none; display:block;";
        img.style.zIndex = i;
        bottomLeftMiddle.appendChild(img);
    });

    // 
    viewImage.src = "fotos/Circle.png"; 
    viewImage.style.transform = "scale(7.2)";
    
    FDImage.src = "fotos/diaphragmv5.png";
    FDImage.style.transform = "scale(25)";
    
    CDImage.src = "fotos/diaphragmv4.png";
    CDImage.style.visibility = "hidden";
    
    DiffractionImage.style.visibility = "hidden";
    SampleImage.style.visibility = "hidden";

    function updateAbbe() {
        const type = sampleSelector.value;
        const aperture = parseInt(irisSlider.value);
        
        // 1. Lógica de Difracción (PNGs)
        if (!sampleLoaded || type === "none") {
            DiffractionImage.src = "samples/diff_none.png";
        } else {
            // Esto cargará diff_500.png, diff_1000.png o diff_diatom.png
            DiffractionImage.src = "samples/diff_" + type + ".png";
        }

        // 2.
        if (type === "diatom") {
            SampleImage.src = "samples/sample_diatom.jpg";
        } else {
            SampleImage.src = "samples/sample_foil.png";
        }

        // 3. 
        let spotDistance = (type === "1000" || type === "diatom") ? 50 : 25;
        let canResolve = (aperture > spotDistance);

        if (telescopeActive) {
            DiffractionImage.style.clipPath = `circle(${aperture/2}% at center)`;
            CDImage.style.transform = `scale(${aperture / 20})`;
            CDImage.style.visibility = "visible";
        }

        if (sampleLoaded) {
            if (!canResolve && type !== "none") {
                SampleImage.style.filter = "blur(12px) contrast(0.5)";
                explanation.innerHTML = "<b>Abbe Principle:</b> Aperture is too small to capture diffraction orders. Resolution lost!";
            } else {
                SampleImage.style.filter = "blur(0px) contrast(1)";
                explanation.innerHTML = "<b>Abbe Principle:</b> Diffraction orders captured. Image resolved.";
            }
        }
    }

    // Evento Ocular / Telescopio
    ocularButton.onclick = () => {
        telescopeActive = !telescopeActive;
        if (telescopeActive) {
            SampleImage.style.visibility = "hidden";
            FDImage.style.visibility = "hidden";
            CDImage.style.visibility = "visible";
            DiffractionImage.style.visibility = "visible";
            ocularButton.classList.add("active-telescope");
            ocularButton.textContent = "Remove Eyepiece";
        } else {
            SampleImage.style.visibility = sampleLoaded ? "visible" : "hidden";
            FDImage.style.visibility = "visible";
            CDImage.style.visibility = "hidden";
            DiffractionImage.style.visibility = "hidden";
            ocularButton.classList.remove("active-telescope");
            ocularButton.textContent = "Insert Centering Telescope";
        }
        updateAbbe();
    };

    // Cargar Muestra
    loadButton.onclick = () => {
        sampleLoaded = !sampleLoaded;
        updateAbbe(); // Actualiza src antes de mostrar
        SampleImage.style.visibility = (sampleLoaded && !telescopeActive) ? "visible" : "hidden";
        loadButton.textContent = sampleLoaded ? "Remove Specimen" : "Load Specimen";
    };

    // 
    irisSlider.oninput = updateAbbe;
    sampleSelector.onchange = updateAbbe;
    objSelector.onchange = updateAbbe;

    // Botón Zeiss 
    document.getElementById('Zeiss').onclick = () => {
        MicImage.src = "fotos/ZeissFront.png";
    };
});