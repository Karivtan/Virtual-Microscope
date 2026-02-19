console.log("Assignment 2 loaded");

// Constants for DOM elements
const counterDisplay = document.getElementById('Assignment'); // Displays assignment number
const explanation = document.getElementById('explanation'); // Rotates the microscope image
const illumination= document.getElementById('Illumination'); // Rotates the microscope image
const imageForming = document.getElementById('ImageForming'); // Rotates the microscope image
const allPlanes = document.getElementById('AllPlanes'); // Loads/unloads sample
const question = document.getElementById('question'); // Displays the current question
const microscope = document.getElementById('Microscope'); // The microscope image
const assignmentText = document.getElementById('AssignmentInfo'); // Displays assignment title/instructions

const IlluminationPlanes =["Lamp filament","Condensor diaphragm","Back focal plane of the objective", "Eye pupil"];
const ImageFormingPlanes =["Field diaphragm","Specimen","Ocular diaphragm", "Retina"];
const AllPlanes=IlluminationPlanes.concat(ImageFormingPlanes);
let currentPlanes, percx, percy, cPlane, cSelection;
let nPlanes=[], Planes=[];
// Variables for script logic

// Initialize the assignment display
function selectAssignment(choice) {
    if(choice=='I'){ // only illumination lightpath
        loadQuestion(IlluminationPlanes);
    } else if (choice=='IF'){ //only image forming lightpath
        loadQuestion(ImageFormingPlanes);
    } else { // both paths
        loadQuestion(AllPlanes);
    }
}

// Function to update the question text
function loadQuestion(cPlanes) {
    Planes=cPlanes;
    nPlanes=[];
    //console.log(Planes.length);
    for (i=0;i<Planes.length;i++){
        nPlanes.push(i);
    }
    // here we need to update the question and wait for the next click
    console.log(nPlanes);
    updateQuestion(Planes)
    console.log('Done');
}

function updateQuestion(Planes){
    cPlane=Math.floor(Math.random()*nPlanes.length);
    console.log(Planes[nPlanes[cPlane]]);
    question.textContent=(Planes[nPlanes[cPlane]]);
    cSelection=(Planes[nPlanes[cPlane]])
    nPlanes.splice(cPlane,1); //removes the just clicked option from the list

}

// Event listener for clicks on the microscope image
microscope.addEventListener('click', function(event) {
    let coords = getAbsolutClickPosition(event, microscope);
    percx=coords.percx;
    percy=coords.percy;
    console.log(percx.toFixed(0) +",  "+ percy.toFixed(0));
    console.log(cSelection);
    if  // position of the objectives is different for eacht image hence all the ifs
        (percx < 94 && percx > 53 && percy < 80 && percy > 10 && cSelection == "Retina"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 614 && percx > 554 && percy < 480 && percy > 435 && cSelection == "Back focal plane of the objective"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 190 && percx > 135 && percy < 120 && percy > 45 && cSelection == "Eye pupil"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 620 && percx > 560 && percy < 915 && percy > 880 && cSelection == "Lamp filament"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 645 && percx > 520 && percy < 635 && percy > 610 && cSelection == "Condensor diaphragm"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 655 && percx > 520 && percy < 825 && percy > 780 && cSelection == "Field diaphragm"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 655 && percx > 520 && percy < 825 && percy > 780 && cSelection == "Field diaphragm"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 630 && percx > 530 && percy < 550 && percy > 520 && cSelection == "Specimen"){
        toastr.success('Well done!');
        checkPlanes();
    } else if
        (percx < 280 && percx > 170 && percy < 170 && percy > 60 && cSelection == "Ocular diaphragm"){
        toastr.success('Well done!');
        checkPlanes();
    } 

    
    else {
        toastr.warning('Try again!');
    }
});

function checkPlanes(){
     if (nPlanes.length>0){
            updateQuestion(Planes);
     } else if (nPlanes.length==0){
         setPositive();
         toastr.info("you have succesfully completed the assignment. \n\nClick one of the buttons on the lower left to start again. Or move on to the next assignment");
         setNegative();
     }
}

function setPositive(){ // view settings for positive feedback
    toastr.options = {
      "closeButton": true,
      "preventDuplicates": true,
      "positionClass": "toast-bottom-right", // Change this to modify position
      "onclick": null,
      "timeOut": "0",
      "extendedTimeOut":"0"
      };
}

function setNegative(){ // view settings for negative feedback
    toastr.options = {
      "closeButton": false,
      "preventDuplicates": true,
      "positionClass": "toast-bottom-right", // Change this to modify position
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "300",
      "timeOut": "2000",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
      };
}


illumination.addEventListener('click', function(){
    selectAssignment('I')
    },true);
imageForming.addEventListener('click', function(){
    selectAssignment('IF')
    },true);
allPlanes.addEventListener('click', function(){
    selectAssignment('All')
    },true);

function setPositive(){ // view settings for positive feedback
    toastr.options = {
      "closeButton": true,
      "preventDuplicates": true,
      "positionClass": "toast-bottom-right", // Change this to modify position
      "onclick": null,
      "timeOut": "0",
      "extendedTimeOut":"0"
      };
}

function setNegative(){ // view settings for negative feedback
    toastr.options = {
      "closeButton": false,
      "preventDuplicates": true,
      "positionClass": "toast-bottom-right", // Change this to modify position
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "300",
      "timeOut": "2000",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
      };
}


function getAbsolutClickPosition(event, MicImage){

  const rect = MicImage.getBoundingClientRect();
  // Calculate the actual dimensions of the rendered image inside the container
  const imgRatio = MicImage.naturalWidth / MicImage.naturalHeight;
  const containerRatio = rect.width / rect.height;
  let renderedWidth, renderedHeight, offsetX, offsetY;
  if (containerRatio > imgRatio) {
  // Pillarboxed: empty space on the sides
      renderedHeight = rect.height;
      renderedWidth = imgRatio * renderedHeight;
      offsetX = (rect.width - renderedWidth) / 2;
      offsetY = 0;
  } else {
        // Letterboxed: empty space top and bottom
      renderedWidth = rect.width;
      renderedHeight = renderedWidth / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - renderedHeight) / 2;
  }

  const effectiveScale = renderedHeight / MicImage.naturalHeight;
  // Adjust the mouse coordinates
  // 1. Get raw click position relative to the container's top-left
  const rawX = event.clientX - rect.left;
  const rawY = event.clientY - rect.top;
  // 2. Adjust for letterbox/pillarbox space
  const adjustedX = rawX - offsetX;
  const adjustedY = rawY - offsetY;
  // 3. Un-scale the coordinates to get the final position on the original image
  const percx = adjustedX / effectiveScale;
  const percy = adjustedY / effectiveScale;
  return{
      percx:percx,
      percy,percy
  };
}
