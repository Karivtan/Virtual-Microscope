// 1. Referencias al DOM
const microscopeImg = document.getElementById('Microscope');
const lightEffect = document.getElementById('LightEffect');
const questionText = document.getElementById('question');
const btnRemove = document.getElementById('btnRemove');
const btnPerspex = document.getElementById('btnPerspex');
const btnReset = document.getElementById('btnReset');
const knobSlider = document.getElementById('knobSlider');
const knobDiv = document.getElementById('knobControl');
const knobOverlay = document.getElementById('knob-overlay');

// Rutas de fotos
const FOTO_1_COMPLETO = "fotos/ZeissLeft.png";
const FOTO_2_SIN_OBJETIVO = "fotos/zeissnobojective.png";
const FOTO_3_CON_PERSPEX = "fotos/zeiisblock.PNG";

// Estado
let isObjectiveRemoved = false;
let isPerspexPlaced = false;
let isDragging = false;
let startx = 0;
let startVal = 0;


function updateLight(value) {
    value = Math.max(0, Math.min(100, value));
    knobSlider.value = value;
    
    // 1. EFECTO VISUAL DE LA LUZ

    let scaleX = 0.15 + (value / 100) * 0.9; 
    lightEffect.style.opacity = value / 100;
    lightEffect.style.transform = `translateX(-50%) scaleX(${scaleX})`;
    
    // 2. CÁLCULOS TÉCNICOS (N.A. y sin alpha)
    // Rango aproximado de 0.1 a 1.25 según apertura
    let naValue = (0.1 + (value / 100) * 1.15).toFixed(2);
    let sinAlpha = (naValue / 1.0).toFixed(2); 

    // 3. ACTUALIZACIÓN DEL TEXTO (Limpio y profesional)
    questionText.innerHTML = `
        <div style="line-height: 1.4;">
            <b>Adjusting light cone...</b><br>
            <span style="color: #001158; font-size: 1.1em;">
             N.A.: <b>${naValue}</b>
            </span><br>
            <small>Observe the perspex block</small>
        </div>
    `;
}

// --- CONTROL DEL MANDO (KNOB / OVERLAY) ---

knobOverlay.addEventListener('mousedown', (e) => {
    if (!isPerspexPlaced) return;
    isDragging = true;
    startx = e.clientX;
    startVal = parseInt(knobSlider.value);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none'; 
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let diff = (e.clientX - startx) * 0.8; // Sensibilidad
    updateLight(startVal + diff);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
});

// --- LÓGICA DE LOS BOTONES ---

// Paso 1: Quitar Objetivo
btnRemove.addEventListener('click', function() {
    isObjectiveRemoved = true;
    microscopeImg.src = FOTO_2_SIN_OBJETIVO;
    questionText.innerHTML = "<b>Step 2:</b> Objective removed. <br>Now, add the Perspex block to the stage.";
    btnRemove.disabled = true;
    btnPerspex.disabled = false;
});

// Paso 2: Poner bloque y activar controles
btnPerspex.addEventListener('click', function() {
    if (!isObjectiveRemoved) return; 
    isPerspexPlaced = true;
    microscopeImg.src = FOTO_3_CON_PERSPEX;
    
    btnPerspex.disabled = true;
    knobDiv.style.display = 'block'; 
    knobOverlay.style.display = 'block'; 
    
    // Iniciamos la luz en un valor bajo para que el alumno empiece a ajustar
    updateLight(5);
});

// Slider manual (por si no usan el mando sobre la imagen)
knobSlider.addEventListener('input', function() {
    updateLight(this.value);
});

// Resetear
btnReset.addEventListener('click', function() {
    location.reload(); 
});