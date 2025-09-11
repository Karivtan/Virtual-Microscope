console.log("Assignment 1 loaded");

// Constants for DOM elements
const counterDisplay = document.getElementById('Assignment'); // Displays assignment number
const rotateLeft = document.getElementById('rotateLeft'); // Rotates the microscope image
const rotateFront = document.getElementById('rotateFront'); // Rotates the microscope image
const rotateRight = document.getElementById('rotateRight'); // Rotates the microscope image
const loadButton = document.getElementById('loadButton'); // Loads/unloads sample
const ocularButton = document.getElementById('ocularButton'); // Toggles ocular view
const question = document.getElementById('question'); // Displays the current question
const myImage = document.getElementById('Microscope'); // The microscope image
const assignmentText = document.getElementById('counthead'); // Displays assignment title/instructions
const leftBottomButtons = document.getElementById('bottom-left-bottom'); // Container for bottom-left buttons
const restartButton = document.getElementById('Restart');
const LB=document.getElementById('Leica');
const NB=document.getElementById('Nikon');
const OB=document.getElementById('Olympus');
const ZB=document.getElementById('Zeiss');
const CDImage = document.getElementById('CDImage');
const FDImage = document.getElementById('FDImage');
const newImage = document.getElementById('newImage');
const LeicaTitles = ["LeicaLeft.png","LeicaFront.png","LeicaRight.png"];
const NikonTitles =["NikonLeft.png","NikonFront.png","NikonRight.png"];
const OlympusTitles =["OlympusLeft.png","OlympusFront.png","OlympusRight.png"];
const ZeissTitles =["ZeissLeft.png","ZeissFront.png","ZeissRight.jpg" ];
const MicBrand=["Leica","Nikon","Olympus","Zeiss"];
const Mbuttons=[LB,NB,OB,ZB];
// Variables for script logic
let questionNumber = 0; // Current question number
let brandnr=Math.floor(Math.random()*4);
let brand=MicBrand[brandnr];
let Titles=[LeicaTitles,NikonTitles,OlympusTitles,ZeissTitles];
let MyIms=Titles[brandnr];
let cTitle=MyIms[0];
MicChange(brandnr);
updateQuestion(); // Initialize the first question
/*#TODO, interpupillary distance for all views

*/


// Initialize the assignment display
function updateAssignment() {
  counterDisplay.textContent = "Assignment 1";
  counthead.textContent = "Please identify the microscope parts";
  question.style.visibility = "visible";
  questionNumber = 0;
}

// Function to update the question text
function updateQuestion() {
    console.log(brandnr);
  switch (questionNumber) {
    case 0:
      question.textContent = "Find the on/off switch on the microscope. \nClick on the switch to answer the question.";
      break;
    case 1:
      question.textContent = "Please find the light intensity regulator on the microscope.\nClick on the switch to answer the question.";
      break;
    case 2:
      question.textContent = "Find the focus button on the microscope. \nClick on the microscope to answer the question.";
      break;
    case 3:
      question.textContent = "Find the interpupillary distance adjustment on the microscope. \nClick on the microscope to answer the question.";
      break;
    case 4:
      question.textContent = "Find the condensor on the microscope. \nClick on the microscope to answer the question.";
      break;
    case 5:
      question.textContent = "Find the focus knob of the condensor on the microscope. \nClick on the microscope to answer the question.";
      break;
    case 6:
      question.textContent = "Find the field diaphragm on the microscope. \nClick on the microscope to answer the question.";
      break;
    case 7:
      question.textContent = "Find the table control on the microscope. \nClick on the microscope to answer the question.";
      break;
  }
}

// Event listener for clicks on the microscope image
myImage.addEventListener('click', function(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  const imagerect = myImage.getBoundingClientRect();
  let percx = 0;
  let percy = 0;

  // Calculate click percentage relative to image dimensions, handling aspect ratio
  if (imagerect.width < imagerect.height) {
    percx = x / imagerect.width * 100;
    percy = (y - (imagerect.height - imagerect.width) / 2) / imagerect.width * 100;
  } else {
    percy = y / imagerect.height * 100;
    percx = (x - (imagerect.width - imagerect.height) / 2) / imagerect.height * 100;
  }

  console.log(`Image was clicked! at x=${percx.toFixed(1)}, y= ${percy.toFixed(1)}, q= ${questionNumber}, IM=${myImage.title} `);
  console.log(`Image was clicked! at x=${x.toFixed(1)}, y= ${y.toFixed(1)}, q= ${questionNumber}, IM=${myImage.title} `);

  // Check click location against defined regions for each question
  switch (questionNumber) {
    case 0: // on/off switch
      if ((percx < 75.5 && percx > 72.5 && percy < 72.5 && percy > 68 && myImage.title == "ZeissRight.jpg")||
         (percx < 58 && percx > 51 && percy < 99 && percy > 92 && myImage.title == "OlympusLeft.png")||
         (percx < 43 && percx > 32 && percy < 99 && percy > 95 && myImage.title == "OlympusFront.png")||
         (percx < 33 && percx > 28 && percy < 87.5 && percy > 82 && myImage.title == "OlympusRight.png")||
         (percx < 39 && percx > 36 && percy < 72 && percy > 69 && myImage.title == "NikonLeft.png")||
         (percx < 45 && percx > 44 && percy < 72 && percy > 70 && myImage.title == "NikonFront.png")||
         (percx < 44 && percx > 39 && percy < 79.5 && percy > 75 && myImage.title == "LeicaLeft.png")||
         (percx < 41.5 && percx > 40.5 && percy < 75 && percy > 71 && myImage.title == "LeicaFront.png")
        ) {
        console.log("you clicked on the on/off switch");
        toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 1: // light intensity regulator
      if ((percx < 75.5 && percx > 72.5 && percy < 72.5 && percy > 68 && myImage.title == "ZeissRight.jpg")||
         (percx < 63 && percx > 60 && percy < 93 && percy > 88 && myImage.title == "OlympusRight.png")||
         (percx < 39 && percx > 36 && percy < 72 && percy > 69 && myImage.title == "NikonLeft.png")||
         (percx < 45 && percx > 44 && percy < 72 && percy > 70 && myImage.title == "NikonFront.png")||
         (percx < 44 && percx > 39 && percy < 79.5 && percy > 75 && myImage.title == "LeicaLeft.png")||
         (percx < 41.5 && percx > 40.5 && percy < 75 && percy > 71 && myImage.title == "LeicaFront.png")
        ) {
            toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 2: // focus button
      if (
         (percx < 30 && percx > 19 && percy < 85 && percy > 75 && myImage.title == "ZeissLeft.png")||
         (percx < 39 && percx > 32 && percy < 78 && percy > 70 && myImage.title == "ZeissFront.png")||
         (percx < 75 && percx > 70 && percy < 80 && percy > 74 && myImage.title == "ZeissRight.jpg")||
         (percx < 29 && percx > 19 && percy < 60 && percy > 52 && myImage.title == "OlympusLeft.png")||
         (percx < 79 && percx > 68 && percy < 65 && percy > 55 && myImage.title == "OlympusRight.png")||
         (percx < 38 && percx > 29 && percy < 63 && percy > 55 && myImage.title == "NikonLeft.png")||
         (percx < 45 && percx > 40 && percy < 63 && percy > 57 && myImage.title == "NikonFront.png")||
         (percx < 73 && percx > 67.5 && percy < 64 && percy > 56 && myImage.title == "NikonRight.png")||
         (percx < 36 && percx > 25 && percy < 69 && percy > 60 && myImage.title == "LeicaLeft.png")||
         (percx < 76 && percx > 66 && percy < 69 && percy > 58 && myImage.title == "LeicaRight.png")
        ) {
        console.log("you clicked on the focus knob");
        toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else if (percx<77&&percx>67&&percy<72.5&&percy>62&&myImage.title=="MicRight.jpg"){
        console.log("you clicked on the focus knob");
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 3: // interpupillary distance adjustment
      if (
         (percx < 53 && percx > 48.5 && percy < 20 && percy > 14     && myImage.title == "ZeissFront.png")||
         (percx < 52.5 && percx > 46.5 && percy < 25 && percy > 14 && myImage.title == "OlympusFront.png")||
         (percx < 53 && percx > 50 && percy < 24.5 && percy > 18 && myImage.title == "NikonFront.png")||
         (percx < 52 && percx > 47 && percy < 24 && percy > 14 && myImage.title == "LeicaFront.png")
        ) {
        toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else if (percx<27&&percx>20&&percy<26&&percy>17.5&&myImage.title=="MicRight.jpg"){
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 4: // condensor
      if ((percx < 56 && percx > 42 && percy < 72 && percy > 65 && myImage.title == "ZeissLeft.png")||
         (percx < 55 && percx > 42.5 && percy < 71 && percy > 65 && myImage.title == "ZeissFront.png")||
         (percx < 60 && percx > 49 && percy < 71 && percy > 64 && myImage.title == "ZeissRight.jpg")|| 
         (percx < 66 && percx > 41 && percy < 56 && percy > 50 && myImage.title == "OlympusLeft.png")||
         (percx < 62 && percx > 38 && percy < 62 && percy > 57 && myImage.title == "OlympusFront.png")||
         (percx < 55 && percx > 33 && percy < 59 && percy > 52 && myImage.title == "OlympusRight.png")|| 
         (percx < 59 && percx > 48 && percy < 58 && percy > 55 && myImage.title == "NikonLeft.png")||
         (percx < 56 && percx > 46 && percy < 61 && percy > 58 && myImage.title == "NikonFront.png")||
         (percx < 51 && percx > 44 && percy < 59 && percy > 55 && myImage.title == "NikonRight.png")||
         (percx < 63 && percx > 55 && percy < 64 && percy > 61 && myImage.title == "LeicaLeft.png")||
         (percx < 54 && percx > 44 && percy < 66 && percy > 61 && myImage.title == "LeicaFront.png")||
         (percx < 49 && percx > 38 && percy < 67 && percy > 62 && myImage.title == "LeicaRight.png") 
        ){
        toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else if (percx<46&&percx>37.5&&percy<53&&percy>48&&myImage.title=="MicRight.jpg"){
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 5: // focus knob of the condensor
      if ((percx < 36 && percx > 31 && percy < 74 && percy > 70 && myImage.title == "ZeissLeft.png")||
         (percx < 41 && percx > 39 && percy < 70 && percy > 66 && myImage.title == "ZeissFront.png")||

         (percx < 38 && percx > 33 && percy < 60 && percy > 53 && myImage.title == "OlympusLeft.png")||
         
         
         (percx < 44 && percx > 39 && percy < 62 && percy > 56 && myImage.title == "NikonLeft.png")||
         (percx < 45 && percx > 44 && percy < 63 && percy > 59 && myImage.title == "NikonFront.png")||
         
         (percx < 41 && percx > 37 && percy < 66 && percy > 62 && myImage.title == "LeicaLeft.png")||
         (percx < 42.5 && percx > 40.5 && percy < 62 && percy > 61 && myImage.title == "LeicaFront.png")
       
        ){
        toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 6: // field diaphragm 
      if ((percx < 56 && percx > 42 && percy < 85 && percy > 78 && myImage.title == "ZeissLeft.png")||
         (percx < 55 && percx > 42 && percy < 86 && percy > 78 && myImage.title == "ZeissFront.png")||
         (percx < 62 && percx > 49 && percy < 84 && percy > 77 && myImage.title == "ZeissRight.jpg")|| 
         (percx < 58 && percx > 41 && percy < 74 && percy > 68 && myImage.title == "OlympusLeft.png")||
         (percx < 58 && percx > 43 && percy < 80 && percy > 72 && myImage.title == "OlympusFront.png")||
         (percx < 56 && percx > 41 && percy < 75 && percy > 70 && myImage.title == "OlympusRight.png")||
         (percx < 59 && percx > 48 && percy < 73 && percy > 65 && myImage.title == "NikonLeft.png")||
         (percx < 56 && percx > 45 && percy < 78 && percy > 68 && myImage.title == "NikonFront.png")||
         (percx < 55 && percx > 44 && percy < 75 && percy > 65 && myImage.title == "NikonRight.png")||
         (percx < 65 && percx > 50 && percy < 79 && percy > 71 && myImage.title == "LeicaLeft.png")||
         (percx < 57 && percx > 42 && percy < 79 && percy > 70 && myImage.title == "LeicaFront.png")||
         (percx < 53 && percx > 36 && percy < 81 && percy > 72 && myImage.title == "LeicaRight.png") 
        ){
        toastr.success('Well done, moving on');
        questionNumber++;
        updateQuestion();
      } else if (percx<49&&percx>35.5&&percy<79.5&&percy>68.5&&myImage.title=="MicRight.jpg"){
        questionNumber++;
        updateQuestion();
      } else {
        toastr.warning('Try again!');
      }
      break;
    case 7: // table control // to be done
      if (
         (percx < 59 && percx > 56 && percy < 70 && percy > 65 && myImage.title == "ZeissFront.png")||
         (percx < 70 && percx > 66 && percy < 74 && percy > 66 && myImage.title == "ZeissRight.jpg")|| 

         (percx < 68.5 && percx > 63.5 && percy < 64 && percy > 57 && myImage.title == "OlympusFront.png")||
         (percx < 69 && percx > 64 && percy < 66 && percy > 57 && myImage.title == "OlympusRight.png")||
         (percx < 60 && percx > 56 && percy < 61 && percy > 59 && myImage.title == "NikonLeft.png")||
         (percx < 68 && percx > 63 && percy < 67 && percy > 60 && myImage.title == "NikonFront.png")||
         (percx < 69 && percx > 64 && percy < 69 && percy > 60 && myImage.title == "NikonRight.png")||

         (percx < 64 && percx > 60 && percy < 69 && percy > 60 && myImage.title == "LeicaFront.png")||
         (percx < 65 && percx > 59 && percy < 74 && percy > 67 && myImage.title == "LeicaRight.png") 
        ){
        questionNumber++;
        toastr.options.timeOut = 5000;
        toastr.success('Congratulations! You have found all the components!');
        toastr.options.timeOut = 1000;
        setTimeout(function(){
            window.location.href = "Assignment2.html";
        },2000);
      } else {
        toastr.warning('Try again!');
      }
  }
});

// Function to rotate the microscope image
function rotate(newView) {
  if (newView == 'Left') {
    myImage.src = "fotos/"+MyIms[0];
    myImage.title=MyIms[0];
  } else if (newView == "Front") {
    myImage.src = "fotos/"+MyIms[1];
    myImage.title=MyIms[1];
  } else {
    myImage.src = "fotos/"+MyIms[2];
    myImage.title=MyIms[2];
  }
}

function MicChange(br){
    brand=br;
    MyIms=Titles[brand];
    rotate(MyIms);
    for (let i=0;i<4;i++){
        if (i==br){
            Mbuttons[i].style.backgroundColor='cyan'
        } else {
            Mbuttons[i].style.backgroundColor='lightgrey'
        }
    }
}

function Restart(){
    questionNumber=0;
    console.log("restarted");
    updateQuestion();
}

rotateLeft.addEventListener('click', function(){
    rotate('Left')
    },true);
rotateFront.addEventListener('click', function(){
    rotate('Front')
    },true);
rotateRight.addEventListener('click', function(){
    rotate('Right')
    },true);
ZB.addEventListener('click', function(){
    MicChange(3)}, true);

LB.addEventListener('click', function(){
    MicChange(0) },true);

NB.addEventListener('click', function(){
    MicChange(1) },true);

OB.addEventListener('click', function(){
    MicChange(2)}, true);

restartButton.addEventListener('click', function(){
    Restart()},true);