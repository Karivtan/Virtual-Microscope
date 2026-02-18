// 1. DATA CONFIGURATION
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
        "fotos/D.JPG",    // Index 1: Darkfield (DF)
        "fotos/1.JPG",   // Index 2: Phase 1
        "fotos/2.JPG",   // Index 3: Phase 2
        "fotos/3.JPG"    // Index 4: Phase 3
    ]
};

// 2. INITIAL STATE
let state = { 
    obj: 0, 
    dc: 0 
};

/**
 * Switches from the diagram to the eyepiece view.
 */
function startLab() {
    document.getElementById('initial-diagram').style.display = 'none';
    document.getElementById('instruction-step').style.display = 'none';
    document.getElementById('eyepiece-view').style.display = 'block';
    document.getElementById('step-2-selectors').style.display = 'flex';
    update();
}

/**
 * Navigates through the images with infinite loop logic.
 */
function change(type, dir) {
    if (type === 'obj') {
        state.obj = (state.obj + dir + lab.objectives.length) % lab.objectives.length;
    } else {
        state.dc = (state.dc + dir + lab.dc_settings.length) % lab.dc_settings.length;
    }
    update();
}

/**
 * Checks alignment and updates UI.
 */
function update() {
    // Update selector images
    document.getElementById('view-obj').src = lab.objectives[state.obj];
    document.getElementById('view-dc').src = lab.dc_settings[state.dc];
    
    const sampleImg = document.getElementById('sample-img');
    const statusText = document.getElementById('status-text');
    const nextBtn = document.getElementById('Next');



 // --- LOGIC: CHECK IF COMBINATION IS CORRECT ---
let isCorrect = false;
const currentObj = state.obj; // 0=10x, 1=20x, 2=40x, 3=100x
const currentDC = state.dc; // 0=BF, 1=DF, 2=Ph1, 3=Ph2, 4=Ph3

// 1. Brightfield (BF) is always correct
if (currentDC === 0) {
isCorrect = true;
}
// 2. Darkfield (DF) works with 10x and 20x
else if (currentDC === 1 && (currentObj === 0 || currentObj === 1)) {
isCorrect = true;
}
// 3. Ph1 matches 10x
else if (currentDC === 2 && currentObj === 0) {
isCorrect = true;
}
// 4. Ph2 matches 20x or 40x
else if (currentDC === 3 && (currentObj === 1 || currentObj === 2)) {
isCorrect = true;
}
// 5. Ph3 matches 100x
else if (currentDC === 4 && currentObj === 3) {
isCorrect = true;
}

// --- APPLY VISUAL CHANGES ---
if (isCorrect) {
sampleImg.classList.remove('blurry');
statusText.innerText = "✓ ALIGNED: Optical path correctly configured.";
statusText.style.color = "green";
nextBtn.disabled = false;
} else {
sampleImg.classList.add('blurry');
statusText.innerText = "✗ ERROR: D.C. mismatch for this objective.";
statusText.style.color = "red";
nextBtn.disabled = true;
}
}
