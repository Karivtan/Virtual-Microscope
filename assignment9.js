// 1. Referencias a elementos del HTML
const microscopeImg = document.getElementById('Microscope');
const lightEffect = document.getElementById('LightEffect'); // El DIV de CSS que hace de luz
const questionText = document.getElementById('question');
const btnRemove = document.getElementById('btnRemove');
const btnPerspex = document.getElementById('btnPerspex');
const btnReset = document.getElementById('btnReset');
const knobSlider = document.getElementById('knobSlider');
const knobDiv = document.getElementById('knobControl');

// 2. DEFINICIÓN DE TUS 3 IMÁGENES (Cambia los nombres si tus archivos se llaman distinto)
const FOTO_1_COMPLETO = "fotos/ZeissLeft.png";           // Micro con objetivos y sin bloque
const FOTO_2_SIN_OBJETIVO = "fotos/zeissnobojective.png"; // Micro SIN objetivos y sin bloque
const FOTO_3_CON_PERSPEX = "fotos/zeissblock.png";  // Micro SIN objetivos y CON bloque

// Estado de la simulación
let isObjectiveRemoved = false;
let isPerspexPlaced = false;

/**
 * PASO 1: Quitar los objetivos
 */
btnRemove.addEventListener('click', function() {
    isObjectiveRemoved = true;
    
    // CAMBIO A LA FOTO 2
    microscopeImg.src = FOTO_2_SIN_OBJETIVO;
    
    questionText.innerHTML = "2. Objective removed. Space is clear. \nNow, add the Perspex block to the stage.";
    
    // Actualizar botones
    btnRemove.disabled = true;
    btnRemove.innerText = "Objective Removed ✔";
    btnPerspex.disabled = false;
    
    toastr.success("Objectives removed.");
});

/**
 * PASO 2: Añadir el bloque de Perspex
 */
btnPerspex.addEventListener('click', function() {
    if (!isObjectiveRemoved) return; 
    
    isPerspexPlaced = true;
    
    // CAMBIO A LA FOTO 3
    microscopeImg.src = FOTO_3_CON_PERSPEX;
    
    questionText.innerHTML = "3. Perspex block placed. \nRotate the condenser knob to see the light cone.";
    
    // Bloquear este paso y mostrar el slider de luz
    btnPerspex.disabled = true;
    btnPerspex.innerText = "Perspex Placed ✔";
    knobDiv.style.display = 'block'; 
    
    toastr.success("Perspex block added.");
});

/**
 * PASO 3: Control de la luz (Slider)
 */
knobSlider.addEventListener('input', function() {
    if (!isPerspexPlaced) return; 
    
    let value = this.value; // 0 a 100
    
    // Aparece la luz (brillo)
    lightEffect.style.opacity = value / 100;
    
    // Se ensancha el cono (apertura)
    let scaleX = 0.5 + (value / 100); 
    lightEffect.style.transform = `scaleX(${scaleX})`;
    
    // Texto dinámico
    if(value > 80) {
        questionText.innerText = "Condenser OPEN: Wide Light Cone.";
    } else {
        questionText.innerText = "Adjusting Condenser... Observe the light cone.";
    }
});

/**
 * REINICIAR TODO
 */
btnReset.addEventListener('click', function() {
    isObjectiveRemoved = false;
    isPerspexPlaced = false;
    
    // Volver a la FOTO 1
    microscopeImg.src = FOTO_1_COMPLETO;
    
    questionText.innerHTML = "1. First, prepare the microscope by removing the objectives.";
    knobDiv.style.display = 'none';
    knobSlider.value = 0;
    
    // Apagar luz
    lightEffect.style.opacity = 0;
    lightEffect.style.transform = `scaleX(0.5)`;
    
    // Resetear botones
    btnRemove.disabled = false;
    btnRemove.innerText = "1. Remove Objectives";
    btnPerspex.disabled = true;
    btnPerspex.innerText = "2. Add Perspex Block";
    
    toastr.info("Simulation reset.");
});

// Al cargar la página por primera vez
window.onload = function() {
    microscopeImg.src = FOTO_1_COMPLETO;
};