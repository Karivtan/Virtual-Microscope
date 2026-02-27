// 1. LAB DATA CONFIGURATION
const lab = {
    folder: "fotos/",
    // Objetivos: 2.5x (0), 5x (1), 10x (2), 20x (3), 40x (4), 100x (5)
    objectives: [
    "fotos/OBJECTIVE Z 2,5X.JPG",
    "fotos/OBJECTIVE Z 5X.JPG",
    "fotos/OBJECTIVE Z 10X.JPG",
    "fotos/OBJECTIVE Z 20X.png",
    "fotos/OBJECTIVE40X.JPG",
    "fotos/OBJECTIVE Z 100X.JPG"
    ],
    // Fases disponibles: II (0), III (1), 1 (2), 2 (3), 3 (4), D (5), I/H (6)
    dc_settings: [
    "fotos/ZEIS II.JPG", // 0
    "fotos/ZEIS III.JPG", // 1
    "fotos/ZEISS 1 .JPG", // 2
    "fotos/ZEISS 2 .JPG", // 3
    "fotos/ZEISS 3 .JPG", // 4
    "fotos/ZEISS D .JPG", // 5
    "fotos/ZEISS IH .JPG" // 6
    ]
    };
    
    // 2. INITIAL STATE
    let state = {
    obj: 2, // Empieza en 10x
    dc: 0 // Empieza en Fase II
    };
    
    function startLab() {
    document.getElementById('initial-diagram').style.display = 'none';
    document.getElementById('instruction-step').style.display = 'none';
    document.getElementById('eyepiece-view').style.display = 'block';
    document.getElementById('step-2-selectors').style.display = 'flex';
    document.querySelector('.bottom-right').style.backgroundColor = 'black';
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
    let technique = "";
    let selectedSample = "samples/CheekEpithelialCellsBF10x-3033.czi.png"; // Imagen por defecto
    const currentObj = state.obj;
    const currentDC = state.dc;
    
    // Reset de efectos
    sampleImg.style.transform = "scale(1)";
    
    // --- LÓGICA DE SELECCIÓN DE MUESTRAS (DIC / DICL) ---
    
    // 1. CONFIGURACIONES PARA DIC ESTÁNDAR
    if (currentObj === 2 && currentDC === 6) { // 10x + Fase I/H
    isCorrect = true;
    technique = "DIC 10x";
    selectedSample = "samples/CheekEpithelialCellsDICL100x-3042.czi.jpg";
    }
    else if (currentObj === 3 && currentDC === 0) { // 20x + Fase II
    isCorrect = true;
    technique = "DIC 20x";
    selectedSample = "samples/CheekEpithelialCellsDIC20x-3035.czi.png";
    }
    else if (currentObj === 4 && currentDC === 0) { // 40x + Fase II
    isCorrect = true;
    technique = "DIC 40x";
    selectedSample = "samples/CheekEpithelialCellsDIC40x-3037.czi.png";
    }
    else if (currentObj === 5 && currentDC === 1) { // 100x + Fase III
    isCorrect = true;
    technique = "DIC 100x";
    selectedSample = "samples/CheekEpithelialCellsDIC100x-3039.czi.png";
    }
    
    // 2. CONFIGURACIÓN PARA DICL (Lineal)
    // Usamos Fase I/H (Índice 6) como el disparador para la muestra Lineal en 100x
    if ((currentObj === 2 || currentObj === 3) && currentDC === 5) {
    isCorrect = true;
    technique = "DICL " + (currentObj === 2 ? "10x" : "20x");
    selectedSample = "samples/CheekEpithelialCellsDIC10x-3034.czi.png";
    // Aplicamos el zoom a la muestra del ocular (sampleImg)
    if (currentObj === 3) {
    // SI ES 20x:
    sampleImg.classList.add("zoom-sample");
    sampleImg.classList.remove("normal-sample");
    } else {
    // SI ES 10x: Tamaño normal
    sampleImg.classList.add("normal-sample");
    sampleImg.classList.remove("zoom-sample");
    }
    } else {
    sampleImg.classList.remove("zoom-sample");
    sampleImg.classList.add("normal-sample");
    }
    // --- MANEJO DE RESULTADOS ---
    if (isCorrect) {
    sampleImg.src = selectedSample;
    sampleImg.classList.remove('blurry');
    statusText.innerText = "✓ ALIGNED: " + technique + " mode active.";
    statusText.style.color = "green";
    if (nextBtn) nextBtn.disabled = false;
    } else {
    // Si no hay combinación correcta, se ve borroso
    sampleImg.classList.add('blurry');
    statusText.style.color = "red";
    // Mensaje de error dinámico
    if (currentDC >= 2 && currentDC <= 4) {
    statusText.innerText = "✗ PHASE ERROR: Rings 1, 2, 3 are for Phase Contrast.";
    } else {
    statusText.innerText = "✗ MISALIGNED: Prism/Phase does not match the Objective.";
    }
    if (nextBtn) nextBtn.disabled = true;
    }
    }