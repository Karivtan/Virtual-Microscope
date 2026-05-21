// 1. Referencias al DOM
const microscopeImg = document.getElementById('Microscope');
const questionText = document.getElementById('question');
const btnRemove = document.getElementById('btnRemove');
const btnPolarizer = document.getElementById('btnPolarizer');
const btnPerspex = document.getElementById('btnPerspex');
const btnRemovePattern = document.getElementById('btnRemovePattern');
const btnReset = document.getElementById('btnReset');
const knobSlider = document.getElementById('knobSlider');
const knobDiv = document.getElementById('knobControl');

// Rutas de las imágenes
const FOTO_1_INICIAL = "fotos/ZeissLeft.png"; 
const FOTO_2_SIN_OBJETIVO = "fotos/zeissnobojective.png"; 
const FOTO_3_CON_PERSPEX_FALSA = "fotos/perpexblocktransparent.png"; 
const FOTO_FINAL_CONO = "fotos/newphoto.jpg";  
const FOTO_LUZBLANCA_ = "fotos/luzblanca.jpg"; 
// --- LÓGICA DE LA SECUENCIA DE PASOS ---

// Paso 1: Quitar Objetivo
btnRemove.addEventListener('click', function() {
    microscopeImg.src = FOTO_2_SIN_OBJETIVO;
    questionText.innerHTML = "<b>Step 2:</b> Objective removed. <br><br>Now, add the diffraction grating to the light path.";
    
    btnRemove.disabled = true;
    btnPolarizer.disabled = false;
    btnRemovePattern.disabled = true;
});

// Paso 2: Añadir Polarizador
btnPolarizer.addEventListener('click', function() {
    questionText.innerHTML = "<b>Step 3:</b> Polarizer added. <br><br>Now, place the Perspex block sample on the stage.";
    
    btnPolarizer.disabled = true;
    btnPerspex.disabled = false;
    btnRemovePattern.disabled = true;
});

// Paso 3: Añadir bloque de Perspex (Muestra la foto intermedia y activa el slider)
btnPerspex.addEventListener('click', function() {
    microscopeImg.src = FOTO_3_CON_PERSPEX_FALSA;
    questionText.innerHTML = "<b>Step 4:</b> Perspex block placed. <br><br>To clearly see the light diffraction, use the slider below to open the aperture diaphragm to the maximum (100%).";
    
    btnPerspex.disabled = false;
    knobDiv.style.display = 'block'; // Mostramos el slider del diafragma
});

// Paso 4: Escuchar el movimiento del Slider para revelar el cono real al llegar al 100%
knobSlider.addEventListener('input', function() {
    let value = parseInt(this.value);
    
    if (value >= 100) {
        // Revelamos la foto final real
        microscopeImg.src = FOTO_FINAL_CONO;
        btnRemovePattern.style.display = 'inline-block'; 
        btnRemovePattern.disabled = false;
        questionText.innerHTML = `
            <div style="line-height: 1.4; color: #001158;">
                <b>Light Cone Effect Observed!</b><br>
                With the aperture diaphragm fully open, you can now see the cross-sectional concave light cone with internal interference colors caused by stress birefringence.
            </div>
        `;
    } else {
        // Si vuelven a bajar el slider, regresa a la foto del bloque sin la luz a tope
        microscopeImg.src = FOTO_3_CON_PERSPEX_FALSA;
        btnRemovePattern.style.display = false;
        questionText.innerHTML = "<b>Step 4:</b> Diaphragm is partially open. <br><br>Keep pushing the slider to 100% to fully reveal the light cone.";
    }
});
btnRemovePattern.addEventListener('click', function() {
    if (parseInt(knobSlider.value) >= 100) {
        microscopeImg.src = FOTO_LUZBLANCA_;
        questionText.innerHTML = "<b>Step 5:</b> Diffraction grating removed. Observing in white light.";
        btnRemovePattern.disabled = true;
    } 
});
// Botón para reiniciar
btnReset.addEventListener('click', function() {
    location.reload(); 
});