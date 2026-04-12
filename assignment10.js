/**
 * Assignment 10: Fluorescence Filter Block Assembly
 * Logic for Workshop and Microscope Simulation
 */

console.log("Assignment 10: JS Loaded");

// --- 1. CONFIGURACIÓN DE OBJETIVOS ---
const gfpCorrectCombo = {
    exciter: "blue",
    dichroic: "495",
    emitter: "green"
};

// --- 2. ELEMENTOS DEL DOM ---
const microscopeImg = document.getElementById('Microscope');
const explanationText = document.getElementById('explanation');
const viewStart = document.getElementById('view-start');
const viewWorkshop = document.getElementById('view-workshop');

// --- 3. FUNCIONES DE NAVEGACIÓN ---

/**
 * Muestra el panel del taller y oculta el mensaje inicial
 */
function showWorkshop() {
    viewStart.style.display = 'none';
    viewWorkshop.style.display = 'flex';
    explanationText.textContent = "Workshop mode: Selecting components for the filter cube...";
    
    // Opcional: Cambiar la imagen del micro a una del cubo vacío si la tienes
    // microscopeImg.src = "fotos/empty_cube.jpg"; 
}

/**
 * Oculta el taller y vuelve al estado inicial
 */
function hideWorkshop() {
    viewWorkshop.style.display = 'none';
    viewStart.style.display = 'block';
    explanationText.textContent = "To begin, go to the workshop and assemble the filter block.";
    microscopeImg.src = "fotos/ZeissRight.jpg";
}

// --- 4. LÓGICA DE VALIDACIÓN ---

/**
 * Evalúa los filtros seleccionados y muestra el resultado en el ocular
 */
function testBlock() {
    // Obtener los valores seleccionados por el alumno
    const selectedEx = document.getElementById('exciter-sel').value;
    const selectedDi = document.getElementById('dichroic-sel').value;
    const selectedEm = document.getElementById('emitter-sel').value;

    // Validación: No permitir campos vacíos
    if (selectedEx === "none" || selectedDi === "none" || selectedEm === "none") {
        toastr.error("The filter cube is incomplete. Please select all parts.");
        return;
    }

    // CASO 1: ÉXITO TOTAL (GFP)
    if (selectedEx === gfpCorrectCombo.exciter && 
        selectedDi === gfpCorrectCombo.dichroic && 
        selectedEm === gfpCorrectCombo.emitter) {
        
        microscopeImg.src = "fotos/fluocells.jpeg";
        explanationText.textContent = "SUCCESS! The block is perfectly configured. \nBlue light excites GFP, 495nm mirror reflects it, and Green filter lets the emission pass.";
        toastr.success("Perfectly assembled!");
    } 
    
    // CASO 2: FUGA DE LUZ (Excitation Leak)
    // El alumno puso luz azul pero se olvidó el filtro de barrera verde
    else if (selectedEx === "blue" && selectedDi === "495" && selectedEm !== "green") {
        microscopeImg.src = "fotos/blue_glare.png";
        explanationText.textContent = "WARNING: Intense blue light detected. \nYou are seeing the excitation light because the emission filter is wrong or missing.";
        toastr.warning("Check the Emission Filter!");
    }

    // CASO 3: EXCITACIÓN INCORRECTA
    // Si usa verde para excitar GFP, no habrá energía suficiente
    else if (selectedEx === "green") {
        microscopeImg.src = "fotos/all_black.png";
        explanationText.textContent = "DARKNESS: Green light does not have enough energy to excite GFP molecules.";
        toastr.error("Wrong excitation wavelength.");
    }

    // CASO 4: ERROR DE ESPEJO DICROICO
    // Si el espejo es de 570nm, dejará pasar el azul hacia arriba en lugar de reflejarlo a la muestra
    else if (selectedDi === "570" && selectedEx === "blue") {
        microscopeImg.src = "fotos/all_black.png";
        explanationText.textContent = "DARKNESS: The 570nm mirror is letting the blue light pass through instead of reflecting it to the sample.";
        toastr.error("Check the Dichroic Mirror cutoff.");
    }

    // CASO 5: CUALQUIER OTRO ERROR
    else {
        microscopeImg.src = "fotos/all_black.png";
        explanationText.textContent = "DARKNESS: The light path is blocked or the protein is not excited.";
        toastr.error("Incorrect assembly. Try again.");
    }
}

// --- 5. BOTONES DE MARCA (OPCIONAL) ---
// Puedes resetear el micro si pulsan Leica, Zeiss, etc.
document.getElementById('Zeiss').addEventListener('click', function() {
    microscopeImg.src = "fotos/ZeissRight.jpg";
    toastr.info("Zeiss Microscope selected.");
});

// Configuración de Toastr (Notificaciones flotantes)
toastr.options = {
    "positionClass": "toast-bottom-right",
    "timeOut": "3000"
};