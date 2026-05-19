/**
 * Assignment 12: Abbe Principle & phase contrast
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Referencias al DOM
    const bottomLeftMiddle = document.getElementById('bottom-left-middle');
    const sampleSelector = document.getElementById('sample-sel');
    const objSelector = document.getElementById('obj-sel');
    const irisSlider = document.getElementById('iris-slider');
    const ocularButton = document.getElementById('ocularButton');
    const loadButton = document.getElementById('loadButton');
    const explanation = document.getElementById('explanation');

    // Estado de la simulación
    let telescopeActive = false;
    let sampleLoaded = false;

    // 2. Creación de capas de imagen
    const SampleImage = document.createElement("img");
    const FDImage = document.createElement("img"); // Field Diaphragm
    const CDImage = document.createElement("img"); // Condenser Diaphragm (Aperture)
    const DiffractionImage = document.createElement("img");
    const viewImage = document.createElement("img"); // El círculo de luz principal

    // Configuración de estilo para todas las imágenes
    [SampleImage, FDImage, viewImage, CDImage, DiffractionImage].forEach((img, i) => {
        img.style.cssText = "width:100%; height:100%; position:absolute; top:0; left:0; object-fit:contain; pointer-events:none; display:block;";
        img.style.zIndex = i;
        bottomLeftMiddle.appendChild(img);
    });

    // Configuración inicial de las imágenes
    viewImage.src = "fotos/Circle.png"; 
    FDImage.src = "fotos/diaphragmv5.png";
    FDImage.style.transform = "scale(25)";
    
    CDImage.src = "fotos/diaphragmv4.png";
    CDImage.style.visibility = "hidden";
    
    DiffractionImage.style.visibility = "hidden";
    SampleImage.style.visibility = "hidden";

   
    function updateAbbe() {
    
            const type = sampleSelector.value;
            const objective = objSelector.value;
            const aperture = 100;
      
    
        // A. CARGA DE IMÁGENES
        if (!sampleLoaded || type === "none") {
            DiffractionImage.src = "samples/diff_none.png";
            SampleImage.src = "";
            SampleImage.style.visibility = "hidden";
        } else {
            let diffName = (type === "500") ? "diff_500b.png" : "diff_" + type + ".png";
            DiffractionImage.src = "samples/" + diffName;
            // Mapeo de muestras
            const samplePaths = {
                "500": "samples/sample_foil_500.jpeg",
                "square" : "samples/IMG_square.jpg",
              
            };
            SampleImage.src = samplePaths[type] || "";
            SampleImage.style.visibility = telescopeActive ? "hidden" : "visible";
        }
    
        // B. LÓGICA DE APERTURA DINÁMICA 
        
        
        let viewScale = (aperture / 100) * 7.2; 
        viewImage.style.transform = `scale(${viewScale})`;

        // 2. Zooms según el objetivo seleccionado
        let sampleZoom = 1.5; 
        let diffZoom = 5; 
        
        if (objective === "40") {
            sampleZoom = 2.5;
            diffZoom = 2.5;
        } else if (objective === "100") {
            sampleZoom = 5;
            diffZoom = 1.2;
        }
    
        // C. MODO TELESCOPIO 
        if (telescopeActive) {
            bottomLeftMiddle.style.backgroundColor = "black"; // Evita el fondo blanco
            
            DiffractionImage.style.visibility = "visible";
            DiffractionImage.style.transform = `scale(${diffZoom})`;
         
            DiffractionImage.style.clipPath = `circle(${aperture/2.1}% at center)`;
            
            CDImage.style.visibility = "visible";
            CDImage.style.transform = `scale(${aperture / 20})`; 
            
            FDImage.style.visibility = "hidden";
        } else {
            
            bottomLeftMiddle.style.backgroundColor = "white";
            
            SampleImage.style.transform = `scale(${sampleZoom})`;
            
            CDImage.style.visibility = "hidden";
            DiffractionImage.style.visibility = "hidden";
            FDImage.style.visibility = "visible";
        }
    
        // D. PRINCIPIO DE ABBE (Resolución)
        let spotDistance = 20;
        if (type === "1000") spotDistance = 40;
        if (type === "diatom2") spotDistance = 15;
        let requiredAperture = spotDistance * diffZoom;
        if (sampleLoaded && type !== "none") {
        if (aperture < requiredAperture) {
        SampleImage.style.filter = "blur(8px) contrast(0.7)";
        explanation.innerHTML = "<b>Abbe Principle:</b> Diffraction orders are outside the objective aperture. <span style='color:red;'>Image not resolved.</span>";
        } else {
        SampleImage.style.filter = "blur(0px) contrast(1)";
        explanation.innerHTML = "<b>Abbe Principle:</b> Diffraction orders captured! <span style='color:green;'>Image resolved.</span>";
        }
        } else {
        explanation.innerHTML = "Load a specimen and observe the diffraction pattern by removing the eyepiece.";
        }
        }
        

    // 3. EVENTOS DE INTERFAZ

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

    // Listeners de cambio
    irisSlider.oninput = updateAbbe;
    sampleSelector.onchange = updateAbbe;
    objSelector.onchange = updateAbbe;

    // Ejecución inicial
    updateAbbe();
});