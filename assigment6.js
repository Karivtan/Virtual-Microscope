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
    let selectedSample = "samples/CheekEpithelialCellsBF10x-3033.czi.png"; // Imagen por defecto
    
    const currentObj = state.obj; 
    const currentDC = state.dc;   

    // Reset de efectos
    sampleImg.style.transform = "scale(1)";

    // --- LOGICA DE SELECCIÓN DE MUESTRAS ---

    // 1. BRIGHTFIELD (Muestra diferente para cada objetivo)
    if (currentDC === 0) {
        isCorrect = true;
        if (currentObj === 0) selectedSample = "samples/CheekEpithelialCellsBF10x-3033.czi.png";
        if (currentObj === 1) selectedSample = "samples/CheekEpithelialCellsBF20x-3036.czi.png";
        if (currentObj === 2) selectedSample = "samples/CheekEpithelialCellsBF40x-3038.czi.png";
        if (currentObj === 3) selectedSample = "samples/CheekEpithelialCellsBF100x-3040.czi.png";
    } 
    
    // 2. DARKFIELD (10x y 20x usan la misma, 20x con zoom)
    else if (currentDC === 1) {
        if (currentObj === 0 || currentObj === 1) {
            isCorrect = true;
            selectedSample = "samples/CheekEpithelialCellsDF10x-3045.czi.png"; 
            if (currentObj === 1) sampleImg.style.transform = "scale(2)";
        } else if (currentObj === 2) {
            isCorrect = true;
            selectedSample = "samples/CheekEpithelialCellsDF40x-3044.czi.png";
        } else if (currentObj === 3) {
            isCorrect = true;
            selectedSample = "samples/CheekEpithelialCellsDF100x-3043.czi.png";
        }
    }

    // 3. PHASE CONTRAST
    else if (currentDC === 2 && currentObj === 0) { // Ph1 + 10x
        isCorrect = true;
        selectedSample = "samples/cheekephitelialcellsPC20x_3-01.czi.png";
    }
    else if (currentDC === 3 && (currentObj === 1 || currentObj === 2)) { // Ph2 + 20/40x
        isCorrect = true;
        selectedSample = (currentObj === 1) ? "samples/cheekephitelialcellsPC20x_3-01.czi.png" : "samples/cheekephitelialcellsPC40x_3-02.czi.png";
    }
    else if (currentDC === 4 && currentObj === 3) { // Ph3 + 100x
        isCorrect = true;
        selectedSample = "samples/cheekephitelialcellsPC100x-01.czi.png";
    }

    // --- APLICAR CAMBIOS ---
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