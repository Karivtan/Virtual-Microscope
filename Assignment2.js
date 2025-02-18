console.log("Assignment 1 loaded");
// constants needed for script
const counterDisplay = document.getElementById('Assignment');
const rotateButton = document.getElementById('rotate');
const loadButton = document.getElementById('loadButton');
const ocularButton = document.getElementById('ocularButton');
const question = document.getElementById('question');
const nextButton = document.getElementById('Next');
const myImage = document.getElementById('Microscope');
const assignmentText= document.getElementById('counthead');
const leftBottomButtons = document.getElementById('bottom-left-bottom');
const bottomLeftTop = document.getElementById('bottom-left-top');
const bottomLeftMiddle = document.getElementById('bottom-left-middle');
const explanation = document.getElementById('explanation');
const myObjectives =[10,20,40,100];
const myMagnifications = [1,2,4,10];
// images needed for the microscope
let newImage= document.createElement("img");
newImage.src="sample.jpg";
newImage.id = "sample";
let FDImage= document.createElement("img");
FDImage.src="diaphragmv4.png";
FDImage.id = "FD";
let viewImage= document.createElement("img");
viewImage.src="Circle.png";
viewImage.id = "view";
let CDImage= document.createElement("img");
CDImage.src="diaphragmv4.png";
CDImage.id = "CD";
let CondImage = document.createElement("img");

//variables needed for the script
let questionNumber = 0;
let assignmentNumber = 0;
let sampleContainer = null;
let objectiveCount =0;
let xoffsetFD=Math.random()*50;
let yoffsetFD=Math.random()*50;
let FDLoaded = false;	
let cFDF=0;
let FDcentre = false;
let DFDragging = false;
let Focus = false;
let FDFocus = false;
let sampleDragging = false;
let distanceY=0;
let distanceX=0;
let mouseDownY=0;
let mouseDownX=0;
let AS=15;
let cAS=0;
let FDF=0;
let CDcentre=false;
let cCD=1;
let CD=1;
let IntDrag=false;
let IntTF=1;
let cIntTF=1;
let FS=Math.random()*20-10;
let cFS=FS;
let sampleLoaded=false;
newImage.style.filter="contrast("+(16.5-cCD)/10+ ")";
let rot=10;
let crot=rot;
let SlideCD=false;

updateAssignment();
// #TODO automatic maximize screen
//To kohler the microscope you control the microscope.\nFor example: Click on focus button and drag to focus.\n Try out other components as well.\n To center the field diaphragm click the sample image, \nsame for the condensor diaphragm.
function updateAssignment() {
    counterDisplay.textContent = "Assignment 2";

    myImage.src = "Primostar1_left.jpg";
    newImage.src="sample.jpg";
    FDImage.src="diaphragmv4.png";
    // change component visibilities
    CondImage.style.visibility = "hidden";

    explanation.style.visibility= "visible";
    question.style.visibility = "hidden";
    if (loadButton != null){
    loadButton.style.visibility= "visible";
    ocularButton.style.visibility= "visible";
    }
    if (sampleLoaded){
    newImage.style.visibility = "visible";
    }
    FDImage.style.visibility = "visible"; 
    viewImage.style.visibility = "visible";

    // change texts
    counthead.textContent = "Please kohler the microscope";
    explanation.textContent="To kohler the microscope click the microscope controls on the microscope in the right picture.\n Dragging the buttons will allow you to focus, move the sample, open/close the field diaphragm....\n\n Centering the field diaphragm is done by dragging it in the image view.\nHere you can also open and close the condensor diaphragm"
    rotateButton.textContent="Rotate the microscope"

    // load the viewimage
    loadView("View");
    loadFD("FD");
    loadSample("sample.jpg", "Sample image");
    loadCD("CD"); 

    // load button action
    rotateButton.addEventListener('click',rotate, true);
  }

function loadCondensor(altText){
  bottomLeftMiddle.style.width = "100%";
  bottomLeftMiddle.style.height = "100%";
  bottomLeftMiddle.style.overflow = "hidden";
  bottomLeftMiddle.style.alignItems = "center";
  
  // Check if the image already exists
  CondImage.alt = altText;
  CondImage.src="Condensorv2.png"
  CondImage.title = "Condensor Diaphragm";
  CondImage.style.width = "100%";
  CondImage.style.height = "100%"; 
  CondImage.style.overflow = "hidden";
  CondImage.style.objectFit = "contain";
  CondImage.style.position = "absolute";
  CondImage.style.top = "0";
  CondImage.style.left = "0";
  CondImage.style.zIndex = "3";
  CondImage.style.transform = "scale("+1+") translateY(75px)";
  bottomLeftMiddle.appendChild(CondImage);
  CondImage.style.visibility = "visible";
  // Code to load the sample
  console.log("Condensor loaded!");
}

function loadCD(altText){
  bottomLeftMiddle.style.width = "100%";
  bottomLeftMiddle.style.height = "100%";
  bottomLeftMiddle.style.overflow = "hidden";
  bottomLeftMiddle.style.alignItems = "center";
  // Check if the image already exists
  CDImage.alt = altText;
  CDImage.title = "Condensor Diaphragm";
  CDImage.style.width = "100%";
  CDImage.style.height = "100%"; 
  CDImage.style.overflow = "hidden";
  CDImage.style.objectFit = "contain";
  CDImage.style.position = "absolute";
  CDImage.style.top = "0";
  CDImage.style.left = "0";
  CDImage.style.zIndex = "2";
  CDImage.style.transform = "scale("+CD+")";
  CDImage.style.filter = "opacity(0.9)";

  bottomLeftMiddle.appendChild(CDImage);
  CDImage.style.visibility = "hidden";
  // Code to load the sample
  console.log("CD loaded!");
}

function loadView(altText) {
  bottomLeftMiddle.style.width = "100%";
  bottomLeftMiddle.style.height = "100%";
  bottomLeftMiddle.style.overflow = "hidden";
  bottomLeftMiddle.style.alignItems = "center";
  // Check if the image already exists
  viewImage.alt = altText;
  viewImage.title = "View";
  viewImage.style.width = "100%";
  viewImage.style.height = "100%"; 
  viewImage.style.overflow = "hidden";
  viewImage.style.objectFit = "contain";
  viewImage.style.position = "absolute";
  viewImage.style.top = "0";
  viewImage.style.left = "0";
  viewImage.style.zIndex = "1";
  viewImage.style.transform = "scale(7.2)";
  bottomLeftMiddle.appendChild(viewImage);
  
  // Code to load the sample
  console.log("View loaded!");
}
function loadSample(altText) {
  bottomLeftMiddle.style.width = "100%";
  bottomLeftMiddle.style.height = "100%";
  bottomLeftMiddle.style.overflow = "hidden";
  bottomLeftMiddle.style.alignItems = "center";
  // Check if the image already exists
  newImage.alt = altText;
  newImage.title = "Sample";
  newImage.style.width = "100%";
  newImage.style.height = "100%"; 
  newImage.style.overflow = "hidden";
  newImage.style.objectFit = "contain";
  newImage.style.position = "absolute";
  newImage.style.top = "0";
  newImage.style.left = "0";
  newImage.style.zIndex = "0";
  newImage.style.filter = "blur(10px)";
  bottomLeftMiddle.appendChild(newImage);
  
  // Code to load the sample
  console.log("Sample loaded!");
}

function loadFD(altText) {
  if (!FDLoaded) {
    FDF=10;
    FDImage.alt = altText;
    FDImage.title = "FD";
    
    FDImage.style.width = "100%";
    FDImage.style.height = "100%";
    FDImage.style.overflow = "hidden";
    FDImage.style.objectFit = "contain";
    FDImage.style.position = "absolute";
    FDImage.style.top = "0";
    FDImage.style.left = "0";
    FDImage.style.zIndex = "2";
    FDImage.style.transform = "scale(7.5) translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px)";
    FDImage.style.filter = "blur(10px)";
    bottomLeftMiddle.appendChild(FDImage);
    // Code to load the sample
    //FDImage.style.top = '-20'; // Example
    console.log("FD loaded!");
    FDLoaded = true;
}
  /*FDImage.onload = () => {
    FDImage.style.top = '-20'; // Example
    console.log( bottomLeftMiddle.getBoundingClientRect().height);
    FDImage.style.left = '60px'; // Example
  }*/
}

leftBottomButtons.addEventListener('click', function(event) {
    if (event.target.id == "ocularButton") {
        if (CDImage.style.visibility == "hidden") {
        newImage.style.visibility = "hidden";
        FDImage.style.visibility = "hidden";
        CDImage.style.visibility = "visible";
        } else {
        if (sampleLoaded){
            newImage.style.visibility = "visible";
        }
        FDImage.style.visibility = "visible";
        CDImage.style.visibility = "hidden";
        }
    } else if (event.target.id =="loadButton"){
        if(CDImage.style.visibility == "hidden") {
            if (newImage.style.visibility=="visible"){
                sampleLoaded=false;
                newImage.style.visibility = "hidden";
            } else {
                newImage.style.visibility = "visible";
                sampleLoaded=true;
            }
        }
    }
});

function addButton(container, text){ // create button in the container, with text and id = text
  const newButton = document.createElement("button");
  newButton.id = text
  newButton.textContent = text
  newButton.classList.add("dynamic-button");
  container.appendChild(newButton);
  return newButton;
}

myImage.addEventListener('click', function(event) {
    // Code to execute when the image is clicked
    const x = event.offsetX;  // x-coordinate relative to the image 
    const y = event.offsetY;  // y-coordinate relative to the image
    /* The problem is that these do not fit when there are borders around the image so it needs be be recalculated to the correct position
    * This can be done by finding the max dimension
    */
    const imagerect = myImage.getBoundingClientRect();
    // make a choice based on which dimension is larger
    let percx=0;
    let percy=0;
    if (imagerect.width<imagerect.height){ // this means x is dominant and x positions are always fine
        percx=x/imagerect.width*100;
        percy=(y-(imagerect.height-imagerect.width)/2)/imagerect.width*100;
    } else { // this means y is dominantn and y positions are always fine
        percy=y/imagerect.height*100;
        percx=(x-(imagerect.width-imagerect.height)/2)/imagerect.height*100;

    }
    console.log(`Image was clicked! at x=${percx.toFixed(1)}, y= ${percy.toFixed(1)}`) ;
    if (percx<57&&percx>34&&percy<49&&percy>45&&myImage.title=="MicRight.jpg"){ //clicking on the objective
        objectiveCount++;
        objectiveCount=objectiveCount%4;
        newImage.style.transform = "scale("+myMagnifications[objectiveCount]+")";
        newImage.style.transition = "transform 0.25s ease";
        toastr.success("Changing magnification to "+myObjectives[objectiveCount]+"!");
    } else if (percx<58&&percx>34&&percy<48&&percy>36&&myImage.title=="MicLeft.jpg"){ //clicking on the objective
        objectiveCount++;
        objectiveCount=objectiveCount%4;
        newImage.style.transform = "scale("+myMagnifications[objectiveCount]+")";
        newImage.style.transition = "transform 0.25s ease";
        toastr.success("Changing magnification to "+myObjectives[objectiveCount]+"!");
        } 
  }
    );

FDImage.addEventListener('mousedown', function(event) { 
  mouseDownY=event.clientY;
  mouseDownX=event.clientX;
  event.preventDefault();
  FDcentre = true;
});

CDImage.addEventListener('mousedown', function(event) { 
  mouseDownY=event.clientY;
  mouseDownX=event.clientX;
  CDcentre = true;
  event.preventDefault();
});

CondImage.addEventListener('mousedown', function(event){
  mouseDownY=event.clientY;
  mouseDownX=event.clientX;
  SlideCD = true;
  event.preventDefault();
});

myImage.addEventListener('mousedown', function(event) {
  // Code to execute when the image is clicked
  const x = event.offsetX;  // x-coordinate relative to the image
  const y = event.offsetY;  // y-coordinate relative to the image
  const percx=x/this.width*100;
  const percy=y/this.height*100;
  event.preventDefault();
//  console.log("Image was mousedowned! at x="+ percx +", y="+ percy);
  // here we can set all locations to verify with the image
  switch(questionNumber){
    case 8:
      mouseDownY=event.clientY;
      mouseDownX=event.clientX;
      if (percx<62.5&&percx>46.5&&percy<80&&percy>68.5&&myImage.title=="MicLeft.jpg"){ // the field diaphragm is clicked
        DFDragging = true;
      } else if (percx<49&&percx>34&&percy<79.5&&percy>68.5&&myImage.title=="MicRight.jpg"){ // the field diaphragm is clicked
        DFDragging = true;
      } else if (percx<32&&percx>13&&percy<71&&percy>57&&myImage.title=="MicLeft.jpg"){ // the focus knob is clicked
        Focus = true;
      } else if (percx<78&&percx>67&&percy<73&&percy>62&&myImage.title=="MicRight.jpg"){ // the focus knob is clicked
        Focus = true;
      } else if (percx<39.5&&percx>32.5&&percy<63&&percy>57.5&&myImage.title=="MicLeft.jpg"){ // the focus knob condensor is clicked
        FDFocus = true;
      } else if (percx<65.5&&percx>58.5&&percy<67&&percy>57&&myImage.title=="MicRight.jpg"){ // the table control is clicked
        sampleDragging = true;
      } else if (percx<81&&percx>75&&percy<60&&percy>54&&myImage.title=="MicRight.jpg"){
        IntDrag=true;
      }
      break
  }
});

document.addEventListener('mousemove', (e) => {
  distanceY=mouseDownY-e.clientY;
  distanceX=mouseDownX-e.clientX;
  console.log(assignmentNumber);
  if (DFDragging) { // If the mouse is  being dragged we need to add the field diaphragm
    //console.log(Math.abs(distanceY/20));
    // it needs to be above 2.2 and below 15. But when it is clicked it needs to start at the current value
    cAS=Math.max(2.2,Math.min(12.8,AS+(distanceY/20))); // cannot be more than 15, and cannot be less than 2.2
    //this works the first time, and starts ok the second time, however the min and max are not implemented
    //console.log(cAS);  
    FDImage.style.transform = "scale("+cAS+") translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px)";
  } else if (Focus){
    cFS=Math.max(-10,Math.min(10,FS-distanceY/20)); // cannot be more than 10, and cannot be less than -10
    console.log(cFS);
    cFDF=Math.min(10,FDF+Math.abs(distanceY/50));
    newImage.style.filter = "blur("+Math.abs(cFS)+"px)";
    FDImage.style.filter = "blur("+cFDF+"px)";
  } else if (FDFocus){
    cFDF=Math.min(10,Math.abs(FDF-distanceY/20)); // cannot be more than 10, and cannot be less than 0
    //console.log("FDF"+cFDF);
    FDImage.style.filter = "blur("+cFDF+"px)";
  } else if (sampleDragging){
    newImage.style.transform="translateY("+distanceY+"px) translateX("+distanceX+"px) scale("+myMagnifications[objectiveCount]+")";
  } if (FDcentre){
    //console.log(distanceX+", "+distanceY+", "+xoffsetFD+", "+yoffsetFD);
    FDImage.style.transform = "scale("+AS+") translateY("+(yoffsetFD-distanceY/5)+"px) translateX("+(xoffsetFD-distanceX/5)+"px)";
  } if (CDcentre){
    cCD=Math.max(1,Math.min(12.8,CD+(distanceY/20)))
    CDImage.style.transform = "scale("+cCD+")";
    // this also has an effect on the image. More closed is more contrast less resolution
    // More open is less contrast, more resolution
    //newImage.style.filter= "blur("+(12.8-cCD)/100+ "px)";
    newImage.style.filter="contrast("+(16.5-cCD)/10+ ")";
  } if (IntDrag){
    //console.log("Intensity drag");
    cIntTF=IntTF+(distanceY/20);
    newImage.style.filter = "brightness("+cIntTF+")";
  } if (SlideCD){
      crot=Math.min(80, Math.max(10,rot+distanceX/5));
      newImage.style.transform="scale(2) rotate(-"+crot+"deg)";
      FDImage.style.transform="scale(2) rotate("+crot+"deg)";
  }
});

document.addEventListener('mouseup', () => {
  if(DFDragging){
    AS=cAS;
    //console.log("AS"+AS);
  }
  DFDragging = false;
  if (Focus){
    FS=cFS;
    FDF=cFDF
  }
  Focus = false;
  if (FDFocus){
    FDF=cFDF
  }
  FDFocus = false;
  sampleDragging = false;
  if (FDcentre){
    xoffsetFD=xoffsetFD-distanceX/5;
    yoffsetFD=yoffsetFD-distanceY/5;
  }  
  FDcentre = false;
  if (CDcentre){
    CD=cCD;
  }
  CDcentre = false;
  if (IntDrag){
    IntTF=cIntTF;
  }
  IntDrag=false;
  SlideCD=false;

    // Reset distance if needed:
  // distanceY = 0; // Or keep the final distance value
});

document.addEventListener('mouseleave', () => { // Optional: Stop dragging if mouse leaves
  if(DFDragging){
    AS=cAS;
  }
  DFDragging = false;
  if (Focus){
    FS=cFS;
    FDF=cFDF
  }
  Focus = false;
  FDFocus = false;
  sampleDragging = false;
  if (FDcentre){
    xoffsetFD=xoffsetFD-distanceX/5;
    yoffsetFD=yoffsetFD-distanceY/5;
  }  
  FDcentre = false;
  if (CDcentre){
    CD=cCD;
  }
  CDcentre = false;
  if (IntDrag){
    IntTF=cIntTF;
  }
  SlideCD=false;

    // Reset distance if needed:
    // distanceY = 0; // Or keep the final distance value
});

function rotate(event){
    if (myImage.title=="MicLeft.jpg"){
      myImage.src = "Primostar1.jpg";
      myImage.title = "MicRight.jpg";
    } else {
      myImage.src = "Primostar1_left.jpg";
      myImage.title = "MicLeft.jpg";
    }
  }

rotateButton.addEventListener('click', rotate,true);

nextButton.addEventListener('click', () => {
  assignmentNumber++;
  if (assignmentNumber==1){
    questionNumber=8;
  }
  updateAssignment();
});