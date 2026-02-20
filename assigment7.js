console.log("Assignment 7: DIC & Fluorescence Sequence Started");

// DOM Elements
const question = document.getElementById('question');
const microscope = document.getElementById('Microscope');
const assignmentText = document.getElementById('AssignmentInfo');
const instruction = document.getElementById('instruction');
const explanation = document.getElementById('explanation');

// Game State
let currentStep = 0;

const steps = [
    {
        id: "filter_cube",
        pregunta: "Find the: Fluorescence Filter Cube",
        instruccion: "Locate the external compartment on the main body.",
        explicacion: "The cube contains the dichroic mirror and filters.",
        imagen: "fotos/PHOTO FRONT OF ZEISS.JPG", // Full microscope
        xmin: 1580, xmax: 1690, 
        ymin: 2090, ymax: 2200 
    },
    {
        id: "objectives",
        pregunta: "Find the: Objectives",
        instruccion: "The cover is now removed. Locate the objective lenses.",
        explicacion: "Objectives collect light from the specimen.",
        imagen: "fotos/PHOTOSINTAPA.JPG", // Inside view
        xmin: 1640, xmax: 1760, 
        ymin: 1910, ymax: 2020
    },
    {
        id: "nomarski",
        pregunta: "Find the: Nomarski Prism (DIC)",
        instruccion: "Identify the prism slider above the objectives.",
        explicacion: "The prism recombines the sheared light beams.",
        imagen: "fotos/PHOTOSINTAPA.JPG", // Zoom view
        zoom: "scale(2.8) translate(0px, -80px)",
        xmin: 1800, xmax: 1910, ymin: 1880, ymax: 1990
    },
    {
        id: "final_prism_view",
        pregunta: "Nomarski Prism Detail",
        instruccion: "This is the DIC prism component you just located.",
        explicacion: "Great! You have identified all the main components of this setup.",
        imagen: "fotos/DIC PRISM NEOFLUAR20X .jpeg", 
        zoom: "scale(1) translate(0, 0)", 
        xmin: 0, xmax: 5000, ymin: 0, ymax: 5000 
    }
];

// Initialize the game
function initGame() {
    currentStep = 0;
    assignmentText.textContent = "DIC & Fluorescence Identification";
    updateUI();
}

function updateUI() {
    // ESTA LÍNEA ES VITAL: Define qué paso estamos cargando
    if (currentStep < steps.length) {
        const step = steps[currentStep]; 

        // 1. Update content
        question.textContent = step.pregunta;
        instruction.textContent = step.instruccion;
        explanation.textContent = step.explicacion;

        // 2. Update image (Source change)
        if (!microscope.src.includes(step.imagen)) {
            microscope.src = step.imagen;
        }

        // 3. APLICAR EL ZOOM
        setTimeout(() => {
            if (step.zoom) {
                console.log("Applying zoom:", step.zoom);
                microscope.style.transform = step.zoom;
            } else {
                // Si el paso no tiene zoom (como los primeros), reseteamos
                microscope.style.transform = "scale(1) translate(0, 0)";
            }
        }, 100);

        console.log("Current Step:", step.id, "Image:", step.imagen);
    } 
    else {
        // Final state
        toastr.success("Assignment 7 completed!", "Congratulations!");
        question.textContent = "All components found!";
        instruction.textContent = "You have completed the identification path.";
        explanation.textContent = "Great job! You can now proceed to the next assignment.";
        microscope.style.transform = "scale(1) translate(0, 0)"; // Reset final
        microscope.style.pointerEvents = "none"; 
    }
}

// Click Event Listener
microscope.addEventListener('click', function(event) {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];
    let coords = getAbsolutClickPosition(event, microscope);
    
    // Values to help you calibrate coordinates in the console
    console.log(`Click at - X: ${Math.round(coords.percx)}, Y: ${Math.round(coords.percy)}`);

    // Check if click is inside the target area
    if (coords.percx > step.xmin && coords.percx < step.xmax && 
        coords.percy > step.ymin && coords.percy < step.ymax) {
        
        toastr.success("Correct Location!", "Success");
        
        currentStep++; // Move to next step
        
        // Short delay to see the success message
        setTimeout(() => {
            updateUI();
        }, 1200);
        
    } else {
        toastr.error("Try again! Look closely at the diagram.", "Wrong Location");
    }
});

// Coordinate Calculation Logic (Keeps accuracy regardless of screen size)
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

// Start
initGame();