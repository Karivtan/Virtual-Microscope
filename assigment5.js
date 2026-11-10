console.log("Assignment 5: Phase Contrast ");

const question = document.getElementById('question');
const microscope = document.getElementById('Microscope');
const assignmentText = document.getElementById('AssignmentInfo');

let cSelection;
let nPlanes = [], Planes = [];

// Inicia el juego automáticamente al azar
function initRandomGame() {
    const allTargets = ["phase ring", "Phase Plate", "Specimen"];
    assignmentText.textContent = "Task: Full Phase Contrast Path ";
    loadQuestion(allTargets);
}

function loadQuestion(cPlanes) {
    Planes = cPlanes;
    nPlanes = Array.from(Array(Planes.length).keys());
    updateQuestion();
}

function updateQuestion() {
    if (nPlanes.length > 0) {
        let randomIndex = Math.floor(Math.random() * nPlanes.length);
        cSelection = Planes[nPlanes[randomIndex]];
        question.textContent = "Find the: " + cSelection;
        nPlanes.splice(randomIndex, 1);
    } else {
        // Mensaje final cuando terminan todo
        toastr.success("Assignment completed! You found everything.", "Congratulations!");
        question.textContent = "All components found!";
        cSelection = null;
    }
}

microscope.addEventListener('click', function(event) {
    if (!cSelection) return;

    let coords = getAbsolutClickPosition(event, microscope);
    let percx = coords.percx;
    let percy = coords.percy;

    let isCorrect = false;

    if (cSelection === "phase ring") {
        if (percx > 350 && percx < 460 && percy > 830 && percy < 930) isCorrect = true;
    } 
    else if (cSelection === "Phase Plate") {
        if (percx > 370 && percx < 470 && percy > 640 && percy < 740) isCorrect = true;
    } 
    else if (cSelection === "Specimen") {
        if (percx > 320 && percx < 460 && percy > 720 && percy < 830) isCorrect = true;
    }

    if (isCorrect) {
        // --- AQUÍ ESTÁ EL MENSAJE DE SUCCESS CADA VEZ QUE ACIERTAN ---
        toastr.success("Success! Correct location.", "Correct!");
        
        
        setTimeout(() => {
            updateQuestion();
        }, 1000);
    } else {
        toastr.error("Try again!", "Wrong Location");
    }
});

function getAbsolutClickPosition(event, MicImage) {
    const rect = MicImage.getBoundingClientRect();
    const imgRatio = MicImage.naturalWidth / MicImage.naturalHeight;
    const containerRatio = rect.width / rect.height;
    let renderedWidth, renderedHeight, offsetX, offsetY;

    if (containerRatio > imgRatio) {
        renderedHeight = rect.height;
        renderedWidth = imgRatio * renderedHeight;
        offsetX = (rect.width - renderedWidth) / 2;
        offsetY = 0;
    } else {
        renderedWidth = rect.width;
        renderedHeight = renderedWidth / imgRatio;
        offsetX = 0;
        offsetY = (rect.height - renderedHeight) / 2;
    }

    const effectiveScale = renderedHeight / MicImage.naturalHeight;
    return {
        percx: (event.clientX - rect.left - offsetX) / effectiveScale,
        percy: (event.clientY - rect.top - offsetY) / effectiveScale
    };
}

initRandomGame();
