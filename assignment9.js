// 1. Referencias Originales
const microscopeImg = document.getElementById('Microscope');
const lightEffect = document.getElementById('LightEffect');
const questionText = document.getElementById('question');
const btnRemove = document.getElementById('btnRemove');
const btnPerspex = document.getElementById('btnPerspex');
const btnReset = document.getElementById('btnReset');
const knobSlider = document.getElementById('knobSlider');
const knobDiv = document.getElementById('knobControl');
const knobOverlay = document.getElementById('knob-overlay'); // Usamos el del HTML

// Rutas de fotos
const FOTO_1_COMPLETO = "fotos/ZeissLeft.png";
const FOTO_2_SIN_OBJETIVO = "fotos/zeissnobojective.png";
const FOTO_3_CON_PERSPEX = "fotos/zeiisblock.PNG";

// Estado
let isObjectiveRemoved = false;
let isPerspexPlaced = false;
let isDragging = false;
let startY = 0;
let startVal = 0;

// Función para actualizar la luz (Sincronizada)
function updateLight(value) {
    value = Math.max(0, Math.min(100, value));
    knobSlider.value = value;
    
    // Cambia opacidad y escala del haz de luz
    lightEffect.style.opacity = value / 100;
    let scaleX = 0.2 + (value / 100) * 1.5; 
    lightEffect.style.transform = `translateX(-50%) scaleX(${scaleX})`;
    
    // Textos según la apertura
    if(value > 80) questionText.innerText = "Condenser OPEN: Wide Light Cone.";
    else if (value < 10) questionText.innerText = "Condenser CLOSED: Narrow Light Cone.";
    else questionText.innerText = "Adjusting Light Cone... Observe the Perspex block.";
}

// Lógica de arrastre sobre el mando de la imagen
knobOverlay.addEventListener('mousedown', (e) => {
    if (!isPerspexPlaced) return;
    isDragging = true;
    startY = e.clientY;
    startVal = parseInt(knobSlider.value);
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none'; 
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    let diff = (startY - e.clientY) * 0.8; // Sensibilidad del movimiento
    updateLight(startVal + diff);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
});



btnRemove.addEventListener('click', function() {
    isObjectiveRemoved = true;
    microscopeImg.src = FOTO_2_SIN_OBJETIVO;
    questionText.innerHTML = "2. Objective removed. Space is clear. \nNow, add the Perspex block to the stage.";
    btnRemove.disabled = true;
    btnPerspex.disabled = false;
});

// Botón 2: Añadir Bloque y ACTIVAR MANDO
btnPerspex.addEventListener('click', function() {
    if (!isObjectiveRemoved) return; 
    isPerspexPlaced = true;
    microscopeImg.src = FOTO_3_CON_PERSPEX;
    questionText.innerHTML = "3. Perspex block placed. \nUse the knob on the microscope or the slider to change the light cone.";
    btnPerspex.disabled = true;
    
    knobDiv.style.display = 'block'; // Muestra el slider
    knobOverlay.style.display = 'block'; // Muestra el mando invisible sobre la foto
});

// Slider manual
knobSlider.addEventListener('input', function() {
    updateLight(this.value);
});

// Resetear
btnReset.addEventListener('click', function() {
    location.reload(); 
});