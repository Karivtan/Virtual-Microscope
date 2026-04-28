/**
 * Assignment 11: Abbe Principle Simulation 
 */

document.addEventListener("DOMContentLoaded", function() {
    // Referencias
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


    const SampleImage = document.createElement("img");
    const FDImage = document.createElement("img");
    const CDImage = document.createElement("img");
    const DiffractionImage = document.createElement("img");
    const viewImage = document.createElement("img");

    
    [SampleImage, FDImage, viewImage, CDImage, DiffractionImage].forEach((img, i) => {
        img.style.cssText = "width:100%; height:100%; position:absolute; top:0; left:0; object-fit:contain; pointer-events:none; display:block;";
        img.style.zIndex = i;
        bottomLeftMiddle.appendChild(img);
    });


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
        const objective = objSelector.value;
    
        // 1. Cargar Imágenes
        if (!sampleLoaded || type === "none") {
            DiffractionImage.src = "samples/diff_none.png";
            SampleImage.src = "";
        } else {
            // Carga automática del patrón: diff_500.png, diff_diatom1.png, etc.
            DiffractionImage.src = "samples/diff_" + type + ".png";
    
            // Selección de la imagen del espécimen
            if (type === "500") {
                SampleImage.src = "samples/sample_foil_500.jpeg";
            } else if (type === "1000") {
                SampleImage.src = "samples/sample_foil_1000.jpeg";
            } else if (type === "diatom1") {
                SampleImage.src = "samples/sample_diatom1.jpg";
            } else if (type === "diatom2") {
                SampleImage.src = "samples/sample_diatom2.jpg";
            }
        }
    
        // 2. Lógica de Zooms Diferenciados
        let sampleZoom = 1; 
        if (objective === "40") sampleZoom = 2.5; 
        if (objective === "100") sampleZoom = 5;
    
        let diffZoom = 5; 
        if (objective === "40") diffZoom = 2.5; 
        if (objective === "100") diffZoom = 1.2; 
    
        // Aplicar transformaciones
        if (telescopeActive) {
            DiffractionImage.style.transform = `scale(${diffZoom})`;
            DiffractionImage.style.clipPath = `circle(${aperture/2}% at center)`;
            CDImage.style.transform = `scale(${aperture / 20})`; 
            CDImage.style.visibility = "visible";
        } else {
            SampleImage.style.transform = `scale(${sampleZoom})`;
            CDImage.style.visibility = "hidden";
        }
    
        // 3. Resolución (Principio de Abbe)
        
        let spotDistance = 20; 
        if (type === "1000") spotDistance = 40;
        if (type === "diatom2") spotDistance = 15; 
    
        let requiredAperture = spotDistance * diffZoom;
    
        if (sampleLoaded && type !== "none") {
            if (aperture < requiredAperture) {
                SampleImage.style.filter = "blur(12px) contrast(0.5)";
                explanation.innerHTML = "<b>Abbe Principle:</b> Diffraction orders are outside the aperture at this magnification. <b>Image not resolved.</b>";
            } else {
                SampleImage.style.filter = "blur(0px) contrast(1)";
                explanation.innerHTML = "<b>Abbe Principle:</b> Diffraction orders captured. <b>Image resolved!</b>";
            }
        }
    }

    // Eventos
    ocularButton.onclick = () => {
        telescopeActive = !telescopeActive;
        if (telescopeActive) {
            SampleImage.style.visibility = "hidden";
            FDImage.style.visibility = "hidden";
            DiffractionImage.style.visibility = "visible";
            ocularButton.textContent = "Remove Eyepiece";
        } else {
            SampleImage.style.visibility = sampleLoaded ? "visible" : "hidden";
            FDImage.style.visibility = "visible";
            CDImage.style.visibility = "hidden";
            DiffractionImage.style.visibility = "hidden";
            ocularButton.textContent = "Insert Centering Telescope";
        }
        updateAbbe();
    };

    loadButton.onclick = () => {
        sampleLoaded = !sampleLoaded;
        updateAbbe();
        SampleImage.style.visibility = (sampleLoaded && !telescopeActive) ? "visible" : "hidden";
        loadButton.textContent = sampleLoaded ? "Remove Specimen" : "Load Specimen";
    };

    irisSlider.oninput = updateAbbe;
    sampleSelector.onchange = updateAbbe;
    objSelector.onchange = updateAbbe;
});