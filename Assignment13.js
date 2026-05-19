// 1. Referencias al DOM
const microscopeImg = document.getElementById('Microscope');
const questionText = document.getElementById('question');
const btnRemove = document.getElementById('btnRemove');
const btnPolarizer = document.getElementById('btnPolarizer');
const btnPerspex = document.getElementById('btnPerspex');
const btnReset = document.getElementById('btnReset');
const knobSlider = document.getElementById('knobSlider');
const knobDiv = document.getElementById('knobControl');

// Rutas de las imágenes
const FOTO_1_INICIAL = "fotos/ZeissLeft.png"; 
const FOTO_2_SIN_OBJETIVO = "fotos/zeissnobojective.png"; 
const FOTO_3_CON_PERSPEX_FALSA = "fotos/zeiisblock.PNG"; 
const FOTO_FINAL_CONO = "fotos/newphoto.jpg";   
// --- LÓGICA DE LA SECUENCIA DE PASOS ---

// Paso 1: Quitar Objetivo
btnRemove.addEventListener('click', function() {
    microscopeImg.src = FOTO_2_SIN_OBJETIVO;
    questionText.innerHTML = "<b>Step 2:</b> Objective removed. <br><br>Now, add the polarizer to the light path.";
    
    btnRemove.disabled = true;
    btnPolarizer.disabled = false;
});

// Paso 2: Añadir Polarizador
btnPolarizer.addEventListener('click', function() {
    questionText.innerHTML = "<b>Step 3:</b> Polarizer added. <br><br>Now, place the Perspex block sample on the stage.";
    
    btnPolarizer.disabled = true;
    btnPerspex.disabled = false;
});

// Paso 3: Añadir bloque de Perspex (Muestra la foto intermedia y activa el slider)
btnPerspex.addEventListener('click', function() {
    microscopeImg.src = FOTO_3_CON_PERSPEX_FALSA;
    questionText.innerHTML = "<b>Step 4:</b> Perspex block placed. <br><br>To clearly see the light diffraction, use the slider below to open the aperture diaphragm to the maximum (100%).";
    
    btnPerspex.disabled = true;
    knobDiv.style.display = 'block'; // Mostramos el slider del diafragma
});

// Paso 4: Escuchar el movimiento del Slider para revelar el cono real al llegar al 100%
knobSlider.addEventListener('input', function() {
    let value = parseInt(this.value);
    
    if (value >= 100) {
        // Revelamos la foto final real
        microscopeImg.src = FOTO_FINAL_CONO;
        questionText.innerHTML = `
            <div style="line-height: 1.4; color: #001158;">
                <b>Light Cone Effect Observed!</b><br>
                With the aperture diaphragm fully open, you can now see the cross-sectional concave light cone with internal interference colors caused by stress birefringence.
            </div>
        `;
    } else {
        // Si vuelven a bajar el slider, regresa a la foto del bloque sin la luz a tope
        microscopeImg.src = FOTO_3_CON_PERSPEX_FALSA;
        questionText.innerHTML = "<b>Step 4:</b> Diaphragm is partially open. <br><br>Keep pushing the slider to 100% to fully reveal the light cone.";
    }
});

// Botón para reiniciar
btnReset.addEventListener('click', function() {
    location.reload(); 
});