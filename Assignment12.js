document.addEventListener("DOMContentLoaded", function() {
    const analyzerZone = document.getElementById('analyzer-zone');
    const polarizerZone = document.getElementById('polarizer-zone');
    const rotationControls = document.getElementById('rotation-controls');
    const slider = document.getElementById('polarizer-slider');
    const angleVal = document.getElementById('angle-val');
    const sampleImg = document.getElementById('sample-display');
    const explanation = document.getElementById('explanation');

    let hasAnalyzer = false;
    let hasPolarizer = false;

    function checkFilters() {
        if (hasAnalyzer && hasPolarizer) {
            
            rotationControls.classList.remove('hidden');
            slider.disabled = false; 
            
            toastr.success("Both polaraizer inserted! The rotation dial is now active.");
            explanation.innerHTML = "<b>Step 2:</b> Rotate the analyzer to 90° to achieve maximum contrast.";
        } else {
            explanation.innerHTML = "Analyzer inserted. <b>insert the polaraizer </b> to enable the rotation dial.";
        }
    }

    analyzerZone.onclick = () => {
        if (!hasAnalyzer) {
            hasAnalyzer = true;
            analyzerZone.style.border = "none";
            analyzerZone.style.backgroundColor = "none";
            toastr.info("Analyzer (Top) inserted");
            checkFilters();
        }
    };

    polarizerZone.onclick = () => {
        if (!hasPolarizer) {
            hasPolarizer = true;
            polarizerZone.style.border = "none";
            polarizerZone.style.backgroundColor = "none";
            toastr.info("Polarizer (Bottom) inserted");
            checkFilters();
        }
    };

    slider.oninput = () => {
        const angle = parseInt(slider.value);
        angleVal.innerText = angle + "°";

        if (angle < 18) {
            sampleImg.src = "samples/ZF_nopol.czi.png";
        } 
        else if (angle >= 18 && angle < 36) {
            sampleImg.src = "samples/ZF01.czi.png"; 
        } 
        else if (angle >= 36 && angle < 54) {
            sampleImg.src = "samples/ZF02.czi.png";
        } 
        else if (angle >= 54 && angle < 75) {
            sampleImg.src = "samples/ZF03.czi.png"; 
        } 
        else {
            sampleImg.src = "samples/ZF04_correct.czi.png";
            explanation.innerHTML = "<span style='color:#4caf50;'><b>90° - Crossed Polarizers:</b></span> Birefringent muscle fibers are visible.";
        }
    };
});