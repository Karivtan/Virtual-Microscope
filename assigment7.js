console.log("Assignment 7: Phase Contrast - Initializing...");

// --- BUTTON COMPONENTS (UI) ---
const rotateLeft = document.getElementById('rotateLeft');    // Rotates the microscope image
const rotateFront = document.getElementById('rotateFront');  // Front view of the microscope
const rotateRight = document.getElementById('rotateRight');  // Rotates the microscope image
const zoomButton = document.getElementById('zoomButton');    // Zoom into the condenser
const loadButton = document.getElementById('loadButton');    // Load the sample/slide
const ocularButton = document.getElementById('ocularButton'); // Remove Ocular / Centering Telescope
const nextButton = document.getElementById('Next');          // Navigation: Next Assignment
const prevButton = document.getElementById('Previous');      // Navigation: Previous Assignment

// Brand Selectors
const OB = document.getElementById('Olympus');
const ZB = document.getElementById('Zeiss');

// Alias for easier reading (used interchangeably in some scripts)
const sambut = loadButton; 

// --- HTML COMPONENTS (TEXT & INSTRUCTIONS) ---
const question = document.getElementById('question');           // Main instructional step
const assignmentText = document.getElementById('counthead');    // Phase title / Header
const explanation = document.getElementById('explanation');     // Bottom help text / feedback
const micHTML = document.getElementById('micIm');               // Microscope container
const micImage = document.getElementById('Microscope');         // The <img> element for Zeiss/Olympus

// --- DYNAMIC ELEMENTS FOR PHASE CONTRAST ---
// We create these here so they are globally accessible throughout the script
const SampleImage = document.createElement('img'); // The actual specimen image (cells)
const PhasePlate = document.createElement('div');  // The Phase Plate Ring (Fixed in objective)
const LightRing = document.createElement('div');   // The Light Annulus Ring (Mobile in condenser)
// --- LISTS FOR MAGNIFICATIONS AND BRAND CHANGES ---
const myObjectives = [10, 20, 40, 100];
const myMagnifications = [1, 2, 4, 10];
const myCDScales = [6, 3.5, 2, 1.25];
const myPRScales = [0, 1, 2, 4, 7];
const myPPScales = [1, 2, 2, 4];
const OlympusTitles = ["OlympusLeft.png", "OlympusFront.png", "OlympusRight.png"];
const ZeissTitles = ["ZeissLeft.png", "ZeissFront.png", "ZeissRight.jpg"];
const MicBrand = ["Olympus", "Zeiss"];
const Mbuttons = [OB, ZB];

// --- IMAGES NEEDED FOR THE MICROSCOPE ---

// The specimen/cells image
SampleImage.src = "samples/sample.jpg";
SampleImage.id = "sample";

// Field Diaphragm image
let FDImage = document.createElement("img"); 
FDImage.src = "fotos/diaphragmv5.png";
FDImage.id = "FD";

// The circle to limit the field of view (the "blackout" mask)
let viewImage = document.createElement("img"); 
viewImage.src = "fotos/Circle.png";
viewImage.id = "view";

// Condenser diaphragm image (used as the Light Ring in phase)
let CDImage = document.createElement("img"); 
CDImage.src = "fotos/diaphragmv4.png";
CDImage.id = "CD";

// Phase Ring (The mobile annulus)
let PRImage = document.createElement("img"); 
PRImage.src = "fotos/PhaseRing.png";
PRImage.id = "PR";

// Phase Plate (The fixed dark ring)
let PPImage = document.createElement("img"); 
PPImage.src = "fotos/Phaseplate.png";
PPImage.id = "PP";

// Zoom state tracker
let zoomC = false;
// --- ALL NUMBER VARIABLES ---
let distanceY = 0, distanceX = 0, mouseDownY = 0, mouseDownX = 0;
let AS = 25, cAS = 25, FDF = 0, IntTF = 1, cIntTF = 1, FS = 0, cFS = FS, rot = 10, crot = rot;
let SampleImageDisplaceX = 0, SampleImageDisplaceY = 0;
let cCD = 1, CD = 1, brandnr = Math.floor(Math.random() * 2);
let cFDF = 0, cyoffsetFD = 0, cxoffsetFD = 0, yoffsetFD = 0, xoffsetFD = 0;
let objectiveCount = 0, cCont = 1, cont = 1;
let assignmentNumber = 0, condInt = 1.0, totInt = 1.0, cPh = 0;

// --- ALL BOOLEANS ---
let CDcentre = false, IntDrag = false, CondCenter = false, buttonclick = false;
let FDLoaded = false, FDcentre = false, FDcentreR = false, DFDragging = false;
let Focus = false, FDFocus = false, sampleDragging = false;
let sampleLoaded = true, sampleFocussed = false, FDFocussed = false, FDCentered = false;
let FDCorrectSize = false, condensorCorrectSize = false, condSizeDrag = false;

// --- ALL STRINGS ---
let brand = MicBrand[brandnr];
let Titles = [OlympusTitles, ZeissTitles];
let MyIms = Titles[brandnr];
let cTitle = MyIms[0];

// --- SCRIPT STARTS HERE ---
MicChange(brandnr);
updateAssignment();

/**
 * updateAssignment: Prepare the UI and components for Phase Contrast alignment.
 * Note: In Phase Contrast, we focus on aligning PR (Phase Ring) and PP (Phase Plate).
 */
function updateAssignment() {
    // Set initial sources
    SampleImage.src = "samples/sample.jpg";
    FDImage.src = "fotos/diaphragmv5.png";
    PRImage.src = "fotos/PhaseRing.png";
    PPImage.src = "fotos/Phaseplate.png";

    // Component Visibilities
    explanation.style.visibility = "visible";
    question.style.visibility = "hidden";
    loadButton.style.visibility = "visible";
    ocularButton.style.visibility = "visible";

    if (sampleLoaded) {
        SampleImage.style.visibility = "visible";
    } else {
        SampleImage.style.visibility = "hidden";
    }

    // Phase Contrast requires FD and View to be active for the background
    FDImage.style.visibility = "visible"; 
    viewImage.style.visibility = "visible";

    // Text Updates
    counthead.textContent = "The microscope is kohlered, now align the phase rings";
    explanation.textContent = "To align the phase rings, click the controls on the microscope. Dragging the adjustment screws will allow you to move the light annulus (PR) to match the phase plate (PP).";

    // Load elements into the container
    loadView("View");
    loadFD("FD");
    loadSample("samples/sample.jpg", "Sample image");
    loadCD("CD"); 
    loadPR("PR"); // Light Annulus (Mobile)
    loadPP("PP"); // Phase Plate (Fixed)
}
function loadCD(altText) { // Condenser Diaphragm
    bottomLeftMiddle.style.width = "100%";
    bottomLeftMiddle.style.height = "100%";
    bottomLeftMiddle.style.overflow = "hidden";
    bottomLeftMiddle.style.display = "flex"; // Added for alignment
    bottomLeftMiddle.style.alignItems = "center";
    
    CDImage.alt = altText;
    CDImage.title = "Condenser Diaphragm";
    CDImage.style.width = "100%";
    CDImage.style.height = "100%"; 
    CDImage.style.objectFit = "contain";
    CDImage.style.position = "absolute";
    CDImage.style.top = "0";
    CDImage.style.left = "0";
    CDImage.style.zIndex = "2";
    // Uses objectiveCount to scale the diaphragm correctly
    CDImage.style.transform = "scale(" + myCDScales[objectiveCount] * (objectiveCount + 1) + ")";
    CDImage.style.filter = "opacity(0.9)";
  
    bottomLeftMiddle.appendChild(CDImage);
    CDImage.style.visibility = "hidden";
    console.log("CD loaded!");
  }
  
  function loadPR(altText) { // Phase Ring (Light Annulus)
    bottomLeftMiddle.style.width = "100%";
    bottomLeftMiddle.style.height = "100%";
    bottomLeftMiddle.style.overflow = "hidden";
    
    PRImage.alt = altText;
    PRImage.title = "Phase Ring";
    PRImage.style.width = "100%";
    PRImage.style.height = "100%"; 
    PRImage.style.objectFit = "contain";
    PRImage.style.position = "absolute";
    PRImage.style.top = "0";
    PRImage.style.left = "0";
    PRImage.style.zIndex = "4"; // Higher Z-index to be seen over PP
    // Initial scale based on the first PR scale value
    PRImage.style.transform = "scale(" + (myPRScales[0]) + ")";
    PRImage.style.filter = "opacity(0.9)";
  
    bottomLeftMiddle.appendChild(PRImage);
    PRImage.style.visibility = "hidden";
    console.log("PR loaded!");
  }
  
  function loadPP(altText) { // Phase Plate (Objective Ring)
    bottomLeftMiddle.style.width = "100%";
    bottomLeftMiddle.style.height = "100%";
    bottomLeftMiddle.style.overflow = "hidden";
    
    PPImage.alt = altText;
    PPImage.title = "Phase Plate";
    PPImage.style.width = "100%";
    PPImage.style.height = "100%"; 
    PPImage.style.objectFit = "contain";
    PPImage.style.position = "absolute";
    PPImage.style.top = "0";
    PPImage.style.left = "0";
    PPImage.style.zIndex = "3"; // Below PR but above CD
    // Uses PPScales specific to the phase plate
    PPImage.style.transform = "scale(" + (myPPScales[0]) + ")";
    PPImage.style.filter = "opacity(0.5)";
  
    bottomLeftMiddle.appendChild(PPImage);
    PPImage.style.visibility = "hidden";
    console.log("PP loaded!");
  }
  function loadView(altText) { // the circle of the ocular that you look through
    bottomLeftMiddle.style.width = "100%";
    bottomLeftMiddle.style.height = "100%";
    bottomLeftMiddle.style.overflow = "hidden";
    bottomLeftMiddle.style.alignItems = "center";
    
    viewImage.alt = altText;
    viewImage.title = "View";
    viewImage.style.width = "100%";
    viewImage.style.height = "100%"; 
    viewImage.style.objectFit = "contain";
    viewImage.style.position = "absolute";
    viewImage.style.top = "0";
    viewImage.style.left = "0";
    viewImage.style.zIndex = "10"; // Keep the ocular mask on the very top
    viewImage.style.transform = "scale(7.2)";
    bottomLeftMiddle.appendChild(viewImage);
    
    console.log("View loaded!");
  }
  
  function loadSample(altText) { // the specimen image
    bottomLeftMiddle.style.width = "100%";
    bottomLeftMiddle.style.height = "100%";
    bottomLeftMiddle.style.overflow = "hidden";
    bottomLeftMiddle.style.alignItems = "center";
    
    SampleImage.alt = altText;
    SampleImage.title = "Sample";
    SampleImage.style.width = "100%";
    SampleImage.style.height = "100%"; 
    SampleImage.style.objectFit = "contain";
    SampleImage.style.position = "absolute";
    SampleImage.style.top = "0";
    SampleImage.style.left = "0";
    SampleImage.style.zIndex = "1"; // Bottom layer
    // In Phase Contrast, the sample is blurred if the rings aren't aligned
    SampleImage.style.filter = "blur(" + Math.abs(cFS) + "px)"; 
    bottomLeftMiddle.appendChild(SampleImage);
   
    console.log("Sample loaded!");
  }
  
  function setPositive(){ // settings for persistent positive feedback
      toastr.options = {
        "closeButton": true,
        "preventDuplicates": true,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "timeOut": "0",
        "extendedTimeOut":"0"
        };
  }
  
  function setNegative(){ // settings for temporary negative feedback
      toastr.options = {
        "closeButton": false,
        "preventDuplicates": true,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "300",
        "timeOut": "2000",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        };
  }
  
  function loadFD(altText) { // field diaphragm (acts as background in Phase)
    if (!FDLoaded) {
      FDImage.alt = altText;
      FDImage.title = "FD";
      FDImage.style.width = "100%";
      FDImage.style.height = "100%";
      FDImage.style.objectFit = "contain";
      FDImage.style.position = "absolute";
      FDImage.style.top = "0";
      FDImage.style.left = "0";
      FDImage.style.zIndex = "2"; // Above sample, below rings
      // Transform allows for centering movement
      FDImage.style.transform = "translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px) scale("+cAS+")";
      FDImage.style.filter = "blur("+FDF+"px)";
      bottomLeftMiddle.appendChild(FDImage);
      
      console.log("FD loaded!");
      FDLoaded = true;
      }
  }