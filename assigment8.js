const lab = {
    folder: "fotos/",
    objectives: [
        "fotos/OBJECTIVE10X.JPG",  // Index 0
        "fotos/OBJECTIVE20X.JPG",  // Index 1
        "fotos/OBJECTIVE40X.JPG",  // Index 2
        "fotos/OBJECTIVE100X.JPG"  // Index 3
    ],
    dc_settings: [
        "fotos/BF.JPG",    // Index 0: Brightfield (BF)
        "fotos/D.JPG",     // Index 1: Darkfield (DF)
        "fotos/1.JPG",     // Index 2: Phase 1
        "fotos/2.JPG",     // Index 3: Phase 2
        "fotos/3.JPG"      // Index 4: Phase 3
    ]
};

// 2. INITIAL STATE
let state = { 
    obj: 0, 
    dc: 0 
};

function startLab() {
    document.getElementById('initial-diagram').style.display = 'none';
    document.getElementById('instruction-step').style.display = 'none';
    document.getElementById('eyepiece-view').style.display = 'block';
    document.getElementById('step-2-selectors').style.display = 'flex';
    update();
}

function change(type, dir) {
    if (type === 'obj') {
        state.obj = (state.obj + dir + lab.objectives.length) % lab.objectives.length;
    } else {
        state.dc = (state.dc + dir + lab.dc_settings.length) % lab.dc_settings.length;
    }
    update();
}

function update() {
    // Referencias al HTML
    document.getElementById('view-obj').src = lab.objectives[state.obj];
    document.getElementById('view-dc').src = lab.dc_settings[state.dc];
    
    const sampleImg = document.getElementById('sample-img');
    const statusText = document.getElementById('status-text');
    const nextBtn = document.getElementById('Next');

    let isCorrect = false;
    let selectedSample = "samples/cheekephitelialcellsPC10xgbf-01.czi.png"; // Imagen por defecto
    
    const currentObj = state.obj; 
    const currentDC = state.dc;   

    // Reset de efectos
    sampleImg.style.transform = "scale(1)";

    // --- SELECCIÓN DE MUESTRAS ---

    // 1. BRIGHTFIELD 
    if (currentDC === 0) {
        isCorrect = true;
        if (currentObj === 0) selectedSample = "samples/cheekephitelialcellsPC10xgbf-01.czi.png";
        if (currentObj === 1) selectedSample = "samples/cheekephitelialcellsPC20xBF-02.czi.png";
        if (currentObj === 2) selectedSample = "samples/cheekephitelialcellsPC40xbf-03.czi.png";
        if (currentObj === 3) selectedSample = "samples/cheekephitelialcellsPC100xBF-13.czi.png";
    } 
    
    // 2. DARKFIELD 
    else if (currentDC === 1) {
        isCorrect = true; // Marcamos como correcto si el DC es 1
    
        if (currentObj === 0) {
            // Objetivo 10x
            selectedSample = "samples/cheekephitelialcellsPC10xd-08.czi.png";
        } 
        else if (currentObj === 1) {
            // Objetivo 20x
            selectedSample = "samples/cheekephitelialcellsPC20xD-09.czi.png";
        } 
        else if (currentObj === 2) {
            // Objetivo 40x
            selectedSample = "samples/cheekephitelialcellsPC40xD-10.czi.png";
        } 
        else if (currentObj === 3) {
            // Objetivo 100x
            selectedSample = "samples/cheekephitelialcellsPC100xD-12.czi.png";
        }
    }

    // 3. PHASE CONTRAST
    else if (currentDC === 2 && currentObj === 0) { // Ph1 + 10x
        isCorrect = true;
        selectedSample = "samples/cheekephitelialcellsPC10xpc-06.czi.png";
    }
    else if (currentDC === 3 && (currentObj === 1 || currentObj === 2)) { // Ph2 + 20/40x
        isCorrect = true;
        selectedSample = (currentObj === 1) ? "samples/cheekephitelialcellsPC20xpc-05.czi.png" : "samples/cheekephitelialcellsPC40xPC-04.czi.png";
    }
    else if (currentDC === 4 && currentObj === 3) { // Ph3 + 100x
        isCorrect = true;
        selectedSample = "samples/cheekephitelialcellsPC100xPC-14.czi.png";
    }

    // --- CAMBIOS ---
    if (isCorrect) {
        sampleImg.src = selectedSample; 
        sampleImg.classList.remove('blurry');
        statusText.innerText = "✓ ALIGNED: Configuration matches the sample.";
        statusText.style.color = "green";
        nextBtn.disabled = false;
    } else {
        sampleImg.src = "fotos/mitosis_view.jpg"; 
        sampleImg.classList.add('blurry');
        statusText.innerText = "✗ ERROR: D.C. mismatch for this objective.";
        statusText.style.color = "red";
        nextBtn.disabled = true;
    }
} //