console.log("Assignment 7: DIC & Fluorescence Sequence Started");

// DOM Elements
const question = document.getElementById('question');
const microscope = document.getElementById('Microscope');
const assignmentText = document.getElementById('AssignmentInfo');
const instruction = document.getElementById('instruction');
const explanation = document.getElementById('explanation');
const nextStepBtn = document.getElementById('nextStepBtn');

// Game State
let currentStep = 0;

const steps = [
    {
        id: "first_polarizer",
        pregunta: "Find the: First Polarizer and Nomarski/Wollaston Prism",
        FoundTxt: "You have found the first Polarizer and Nomarski/Wollaston Prism",
        explicacion: "The First Polarizer/Prism combination is located before the specimen.\n\nIt splits the light beam into two perpendicular oscillating light beams. \n\nIt is contained within the condensor",
        imagen: "fotos/photofrontzeiss.png",
        clickZoom: "scale(2.2) translate(0px, -180px)", 
        xmin: 400, xmax: 550, 
        ymin: 750, ymax: 900 
    },
    {
        id: "filter_cube",
        pregunta: "Find the: second polarizer",
        FoundTxt: "You have found the second polarizer",
        explicacion: "The second polarizer (analyzer) is placed after the objective to analyze the light's polarization state.\n\n It allows light to pass that has gone through 2 different optical densities.",
        imagen: "fotos/photofrontzeiss.png",
        xmin: 300, xmax: 600, 
        ymin: 570, ymax: 670 
    },
    {
        id: "objectives",
        pregunta: "Find the: Nomarski/Wollaston Prism",
        
        imagen: "fotos/photosintapa.jpg",
        clickZoom: "scale(2.5) translate(0px, -120px)",
        xmin: 400, xmax: 550, 
        ymin: 540, ymax: 700
    },
    {
        id: "nomarski",
        pregunta: "Find the: Nomarski Prism/Wollaston",
        FoundTxt: "You have found the second Nomarski/Wollaston Prism",
        explicacion: "The second Nomarski prism is placed just above the objective to recombine the light that has moved through the sample.\n\n On the right is the DIC prism component you just located.",
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
    nextStepBtn.style.display = "none";

    // 1. COMPROBAMOS SI ESTAMOS EN EL ÚLTIMO PASO (Prisma Detail)
    if (currentStep === steps.length - 1) {
        const step = steps[currentStep];
        
        // Ponemos la imagen final
        microscope.src = step.imagen;
        microscope.style.transform = "scale(1) translate(0, 0)";

        // Mostramos DIRECTAMENTE los mensajes de victoria
        toastr.success("Assignment 7 completed!", "Congratulations!");
        question.textContent = "All components found!";
        instruction.textContent = "You have identified all DIC components.";
        explanation.textContent = "1. Polarizer - polarizes the light so all light vibrates in one direction\n 2. 1st Wollaston/Nomarski prism, splits the beam into two spatially seperated beams\n3. Specimen, alters the phase if the beams go through the sample\n4. 2nd prism, recombining the beams\n5. Analyzer emphasizing the beams that have been altered by the sample";
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

        // 1. EL ZOOM SIEMPRE VA PRIMERO (Para que sea instantáneo)
        if (step.clickZoom) {
            microscope.style.transform = step.clickZoom;
        }

        // 2. MOSTRAR EXPLICACIÓN
        explanation.style.display = "block";
        explanation.textContent = step.explicacion;
        question.textContent = step.FoundTxt;

        // 3. LÓGICA SEGÚN EL PASO
        if (step.id === "objectives") {
            // CASO OBJETIVOS: NO mostramos botón, pasamos al siguiente texto internamente
            setTimeout(() => {
                currentStep++; 
                const nextStep = steps[currentStep];
                if (nextStep) {
                    question.textContent = nextStep.pregunta;
                    // Si el siguiente paso (prisma) tiene otra imagen, la cargamos
                    if (nextStep.imagen !== step.imagen) {
                        microscope.src = nextStep.imagen;
                    }
                }
            }, 600); // Pequeña pausa para que vean el acierto antes de cambiar la pregunta

        } else {
            // CASO NORMAL (Polarizadores y Prisma final): SÍ mostramos botón
            nextStepBtn.style.display = "block"; 

            // Si el SIGUIENTE paso requiere cambio de imagen (de tapa a sin tapa)
            const nextStep = steps[currentStep + 1];
            if (nextStep && nextStep.imagen !== step.imagen) {
                setTimeout(() => {
                    microscope.src = nextStep.imagen;
                    microscope.style.transform = "scale(1) translate(0, 0)";
                }, 600);
            }
        }
        
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
function initGame() {
    currentStep = 0;
    if(assignmentText) assignmentText.textContent = "Differential Interference Contrast";
    updateUI();

}

initGame();

nextStepBtn.addEventListener('click', function() {
    nextStepBtn.style.display = "none"; 
    microscope.style.transform = "scale(1) translate(0, 0)";
    setTimeout(() => {
        currentStep++; 
        updateUI();
    }, 400); 
});