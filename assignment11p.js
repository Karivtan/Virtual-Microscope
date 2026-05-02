/**
 * Assignment 10: Fluorescence Filter Block Assembly
 */

console.log("Assignment 10: JS Loaded with extended logic");

// --- 1. ELEMENTOS DEL DOM ---
const microscopeImg = document.getElementById('Microscope');
const explanationText = document.getElementById('explanation');
const viewStart = document.getElementById('view-start');
const viewWorkshop = document.getElementById('view-workshop');

// --- 2. FUNCIONES DE NAVEGACIÓN ---

window.showWorkshop = function() {
    viewStart.style.display = 'none';
    viewWorkshop.style.display = 'flex';
    explanationText.textContent = "Workshop mode: Selecting components for the filter cube...";
};

window.hideWorkshop = function() {
    viewWorkshop.style.display = 'none';
    viewStart.style.display = 'block';
    explanationText.textContent = "To begin, go to the workshop and assemble the filter block.";
    microscopeImg.src = "fotos/ZeissRight.jpg";
};

// --- 3. LÓGICA DE VALIDACIÓN ---

window.testBlock = function() {
    
    const ex = document.getElementById('exciter-sel').value;
    const di = document.getElementById('dichroic-sel').value;
    const em = document.getElementById('emitter-sel').value;

    
    if (ex === "none" || di === "none" || em === "none") {
        toastr.error("The filter cube is incomplete. Please select all parts.");
        return;
    }

    
    let finalImg = "fotos/all_black.png";
    let message = "DARKNESS: The light path is blocked or the excitation wavelength is incorrect.";
    let type = "error";

    // --- BLOQUE 1: EXCITACIÓN UV (365) ---
    if (ex === "365") {
        if (di === "405") {
            if (em === "440") {
                finalImg = "fotos/blue_nuclei.jpeg";
                message = "SUCCESS: You can see the blue nuclei (DAPI/Hoechst).";
                type = "success";
            } 
            else if (em === "420LP") {
                finalImg = "fotos/multi_color.jpeg";
                message = "SUCCESS: Blue nuclei, green cytoskeleton and red mitochondria are visible.";
                type = "success";
            }
            else {
                finalImg = "fotos/all_black.png";
                message = "BLACK: The emission filter is blocking the signal.";
            }
        } else {
            finalImg = "fotos/all_black.png";
            message = "BLACK: The dichroic mirror cutoff is too high for UV light.";
        }
    }

    // --- BLOQUE 2: EXCITACIÓN AZUL (470) ---
    else if (ex === "470") {
        if (di === "495") {
            if (em === "530em") {
                finalImg = "fotos/green_cells.jpeg";
                message = "SUCCESS: You can see the green cytoskeleton.";
                type = "success";
            } 
            else if (em === "420LP") {
                finalImg = "fotos/green_haze.png";
                message = "WARNING: Green haze. The Long Pass filter is letting too much background light through.";
                type = "warning";
            }
            else {
                finalImg = "fotos/all_black.png";
                message = "BLACK: Incorrect emission filter for blue excitation.";
            }
        } else {
            finalImg = "fotos/all_black.png";
            message = "BLACK: The dichroic mirror is not reflecting the 470nm light to the sample.";
        }
    }

    // --- BLOQUE 3: EXCITACIÓN CIAN/AZUL (480) 
    else if (ex === "480") {
        if (di === "495") {
           
            if (em === "440" || em === "530em" || em === "420LP") {
                finalImg = "fotos/green_haze.png";
                message = "WARNING: Green haze detected. Excitation/Emission match is not optimal for 480nm.";
                type = "warning";
            } 
            else if (em === "590") {
                finalImg = "fotos/all_black.png";
                message = "BLACK: No match for these wavelengths.";
                type = "error";
            }
        } else {
            finalImg = "fotos/all_black.png";
            message = "BLACK: Light path error.";
        }
    }

    // --- BLOQUE 4: EXCITACIÓN VERDE (530) ---
    else if (ex === "530") {
        if (di === "555") {
            if (em === "590") {
                finalImg = "fotos/red_mitochondria.jpeg";
                message = "SUCCESS: You can see the red mitochondria.";
                type = "success";
            } 
            else if (em === "530em" || em === "420LP") {
                finalImg = "fotos/orange_haze.png";
                message = "WARNING: Orange haze. Emission filter is overlapping with excitation.";
                type = "warning";
            }
            else {
                finalImg = "fotos/all_black.png";
                message = "BLACK: Emission filter mismatch.";
            }
        } else {
            finalImg = "fotos/all_black.png";
            message = "BLACK: The dichroic mirror is not suitable for green excitation.";
        }
    }

    
    microscopeImg.src = finalImg;
    explanationText.textContent = message;

    if (type === "success") toastr.success("Perfect combination!");
    else if (type === "warning") toastr.warning("Image quality is poor.");
    else toastr.error("Incorrect assembly.");
};

// --- 4. EVENTOS DE BOTONES EXTRAS ---
document.addEventListener('DOMContentLoaded', () => {
    const btnZeiss = document.getElementById('Zeiss');
    if (btnZeiss) {
        btnZeiss.addEventListener('click', function() {
            microscopeImg.src = "fotos/ZeissRight.jpg";
            explanationText.textContent = "To begin, go to the workshop and assemble the filter block.";
        });
    }
});