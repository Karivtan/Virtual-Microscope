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
        id: "first_polarizer",
        pregunta: "Find the: First Polarizer",
        explicacion: "The First Polarizer is located before the specimen. It constrains light to vibrate in a single plane.",
        imagen: "fotos/photofrontzeiss.png",
        clickZoom: "scale(2.2) translate(0px, -180px)", 
        xmin: 400, xmax: 550, 
        ymin: 750, ymax: 900 
    },
    {
        id: "filter_cube",
        pregunta: "Find the: second polarizer",
        explicacion: "The second polarizer (analyzer) is placed after the objective to analyze the light's polarization state.",
        imagen: "fotos/photofrontzeiss.png",
        xmin: 400, xmax: 480, 
        ymin: 600, ymax: 680 
    },
    {
        id: "objectives",
        pregunta: "Find the: Nomarski Prism (DIC) ",
        imagen: "fotos/photosintapa.jpg",
        xmin: 400, xmax: 550, 
        ymin: 540, ymax: 700
    },
    {
        id: "nomarski",
        pregunta: "Find the: Nomarski Prism (DIC)",
        explicacion: "The prism recombines the sheared light beams.",
        imagen: "fotos/photosintapa.jpg",
        zoom: "scale(2.8) translate(0px, -80px)", // Este paso SI tiene zoom inicial
        xmin: 490, xmax: 550, 
        ymin: 530, ymax: 600
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
function updateUI() {
    // 1. COMPROBAMOS SI ESTAMOS EN EL ÚLTIMO PASO (Prisma Detail)
    if (currentStep === steps.length - 1) {
        const step = steps[currentStep];
        
        // Ponemos la imagen final
        microscope.src = step.imagen;
        microscope.style.transform = "scale(1) translate(0, 0)";

        // Mostramos DIRECTAMENTE los mensajes de victoria
        toastr.success("Assignment 7 completed!", "Congratulations!");
        question.textContent = "All components found!";
        instruction.textContent = "You have completed the identification path.";
        explanation.textContent = "Great job! You can now proceed to the next assignment.";
        explanation.style.display = "block";
        
        // Bloqueamos el ratón para que no ruede más el juego
        microscope.style.pointerEvents = "none"; 
        return; // Salimos de la función para no ejecutar lo de abajo
    }

    // 2. LÓGICA PARA LOS PASOS NORMALES (0, 1, 2, 3)
    if (currentStep < steps.length) {
        const step = steps[currentStep]; 

        question.textContent = step.pregunta;
        instruction.textContent = step.instruccion || "Identify the requested component on the microscope.";
        
        explanation.style.display = "none";
        explanation.textContent = step.explicacion;

        if (!microscope.src.includes(step.imagen)) {
            microscope.src = step.imagen;
        }

        setTimeout(() => {
            if (step.zoom) {
                microscope.style.transform = step.zoom;
            } else {
                microscope.style.transform = "scale(1) translate(0, 0)";
            }
        }, 100);
    }
}

// Click Event Listener modificado para Zoom dinámico
microscope.addEventListener('click', function(event) {
    if (currentStep >= steps.length) return;

    const step = steps[currentStep];
    let coords = getAbsolutClickPosition(event, microscope);
    
    if (coords.percx > step.xmin && coords.percx < step.xmax && 
        coords.percy > step.ymin && coords.percy < step.ymax) {
        
        toastr.success("Correct Location!", "Success");

        // 1. SI EL PASO TIENE UN ZOOM DE CLIC
        if (step.clickZoom) {
            microscope.style.transform = step.clickZoom;
        }

        // 2. MOSTRAR EXPLICACIÓN
        explanation.style.display = "block";
        const nextStep = steps[currentStep + 1];
        if (nextStep && nextStep.imagen !== step.imagen) {
          
            setTimeout(() => {
                microscope.src = nextStep.imagen;
                microscope.style.transform = "scale(1) translate(0, 0)";
            }, 800); // Se cambia a los 0.8 segundos 
        }
        
        // 3. SECUENCIA PARA PASAR AL SIGUIENTE
        // Esperamos 2 segundos para que vean el zoom y lean
        setTimeout(() => {
            // Volvemos a normal antes de cambiar
            microscope.style.transform = "scale(1) translate(0, 0)";
            
            setTimeout(() => {
                currentStep++; 
                updateUI();
            }, 700); 
            
        }, 4000);
        
    } else {
        toastr.error("Try again! Look closely at the diagram.", "Wrong Location");
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
function initGame() {
    currentStep = 0;
    if(assignmentText) assignmentText.textContent = "DIC & Fluorescence Identification";
    updateUI();
}

initGame();