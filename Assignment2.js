/*
#TODO more samples
#TODO more realistig condensor effects and link between condensor and image, 
    check all button positions
    toastr checklist in green appearing indefinitely on the right top?

*/

console.log("Assignment 2 loaded");
// constants needed for script
// button components
const rotateLeft = document.getElementById('rotateLeft'); // Rotates the microscope image
const rotateFront = document.getElementById('rotateFront'); // Rotates the microscope image
const rotateRight = document.getElementById('rotateRight'); // Rotates the microscope image
const zoomButton = document.getElementById('zoomButton');
const loadButton = document.getElementById('loadButton');
const ocularButton = document.getElementById('ocularButton');
const nextButton = document.getElementById('Next');
const LB=document.getElementById('Leica');
const NB=document.getElementById('Nikon');
const OB=document.getElementById('Olympus');
const ZB=document.getElementById('Zeiss');
const rotbut=document.getElementById('rotate');
const sambut=document.getElementById('loadButton');

// html components
const question = document.getElementById('question');
const assignmentText= document.getElementById('counthead');
const bottomLeftTop = document.getElementById('bottom-left-top');
const bottomLeftMiddle = document.getElementById('bottom-left-middle');
const explanation = document.getElementById('explanation');
const micHTML = document.getElementById('micIm');

// lists for magnifications, and brand changes
const myObjectives =[10,20,40,100];
const myMagnifications = [1,2,4,10];
const myCDScales = [6,3.5,2,1.25];
const LeicaTitles = ["LeicaLeft.png","LeicaFront.png","LeicaRight.png"];
const NikonTitles =["NikonLeft.png","NikonFront.png","NikonRight.png"];
const OlympusTitles =["OlympusLeft.png","OlympusFront.png","OlympusRight.png"];
const ZeissTitles =["ZeissLeft.png","ZeissFront.png","ZeissRight.jpg" ];
const MicBrand=["Leica","Nikon","Olympus","Zeiss"];
const Mbuttons=[LB,NB,OB,ZB];

// html component of the microscope image
const MicImage = document.getElementById('Microscope');

// images needed for the microscope
let SampleImage= document.createElement("img"); //Microscope
SampleImage.src="sample.jpg";
SampleImage.id = "sample";
let FDImage= document.createElement("img"); //Field Diaphragm
FDImage.src="diaphragmv5.png";
FDImage.id = "FD";
let viewImage= document.createElement("img"); //The circle to limit the field of view
viewImage.src="Circle.png";
viewImage.id = "view";
let CDImage= document.createElement("img"); //Condensor diaphragm
CDImage.src="diaphragmv4.png";
CDImage.id = "CD";
let zoomC=false;

//variables needed for the script

let sampleContainer = null;

// all number variables
let distanceY=0, distanceX=0, mouseDownY=0, mouseDownX=0, AS=15, cAS=15, FDF=0, IntTF=1, cIntTF=1, FS=Math.random()*20-10, cFS=FS, rot=10, crot=rot, SampleImageDisplaceX=0; SampleImageDisplaceY=0;;
let cCD=0.8, CD=0.8, brandnr=Math.floor(Math.random()*4), cFDF=0, cyoffsetFD=0, cxoffsetFD=0, yoffsetFD=Math.random()*100-50, xoffsetFD=Math.random()*100-50, objectiveCount =0, cCont=1, cont=1;
let assignmentNumber = 0, condInt=1.0, totInt=1.0;

// all booleans
let CDcentre=false, IntDrag=false, CondCenter=false, buttonclick =false, FDLoaded = false, FDcentre = false, FDcentreR =false, DFDragging = false, Focus = false, FDFocus = false, sampleDragging = false;
let sampleLoaded=false, sampleFocussed = false, FDFocussed=false, FDCentered=false, FDCorrectSize=false,condensorCorrectSize=false, condSizeDrag = false;

// all strings
let brand=MicBrand[brandnr], Titles=[LeicaTitles,NikonTitles,OlympusTitles,ZeissTitles], MyIms=Titles[brandnr], cTitle=MyIms[0];

// script starts here

MicChange(brandnr);
updateAssignment();
// #TODO automatic maximize screen
//To kohler the microscope you control the microscope.\nFor example: Click on focus button and drag to focus.\n Try out other components as well.\n To center the field diaphragm click the sample image, \nsame for the condensor diaphragm.
function updateAssignment() { // prepare everything for the assignment
    SampleImage.src="sample.jpg";
    FDImage.src="diaphragmv5.png";
    // change component visibilities
    explanation.style.visibility= "visible";
    question.style.visibility = "hidden";
    loadButton.style.visibility= "visible";
    ocularButton.style.visibility= "visible";
    if (sampleLoaded){
    SampleImage.style.visibility = "visible";
    } else {
        SampleImage.style.visibility = "hidden";
    }
    FDImage.style.visibility = "visible"; 
    viewImage.style.visibility = "visible";

    // change texts
    counthead.textContent = "Please kohler the microscope";
    explanation.textContent="To kohler the microscope click the microscope controls on the microscope in the right picture.\n Dragging the buttons will allow you to focus, move the sample, open/close the field diaphragm....\n\n Centering the field diaphragm is done by dragging it in the image view.\nHere you can also open and close the condensor diaphragm"

    // load the viewimage
    loadView("View");
    loadFD("FD");
    loadSample("sample.jpg", "Sample image");
    loadCD("CD"); 
    //console.log(cFS);
}

function loadCD(altText){ //condensordiaphragm
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
  CDImage.style.transform = "scale("+myCDScales[objectiveCount]*CD+")";
  CDImage.style.filter = "opacity(0.9)";

  bottomLeftMiddle.appendChild(CDImage);
  CDImage.style.visibility = "hidden";
  // Code to load the sample
  console.log("CD loaded!");
}

function loadView(altText) { // the circle of the ocular that you look through
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
function loadSample(altText) { // the sample
  bottomLeftMiddle.style.width = "100%";
  bottomLeftMiddle.style.height = "100%";
  bottomLeftMiddle.style.overflow = "hidden";
  bottomLeftMiddle.style.alignItems = "center";
  // Check if the image already exists
  SampleImage.alt = altText;
  SampleImage.title = "Sample";
  SampleImage.style.width = "100%";
  SampleImage.style.height = "100%"; 
  SampleImage.style.overflow = "hidden";
  SampleImage.style.objectFit = "contain";
  SampleImage.style.position = "absolute";
  SampleImage.style.top = "0";
  SampleImage.style.left = "0";
  SampleImage.style.zIndex = "0";
  SampleImage.style.filter = "blur("+Math.abs(cFS)+"px)";
  bottomLeftMiddle.appendChild(SampleImage);
 
  

  // Code to load the sample
  console.log("Sample loaded!");
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

function loadFD(altText) { // field diaphragm
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
    FDImage.style.transform = "translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px) scale("+AS+")";
    FDImage.style.filter = "blur(10px)";
    bottomLeftMiddle.appendChild(FDImage);
    // Code to load the sample
    //FDImage.style.top = '-20'; // Example
    //console.log("1st"+xoffsetFD+", "+yoffsetFD);
    console.log("FD loaded!");
    FDLoaded = true;
    }
}

MicImage.addEventListener('click', function(event) { // only checks for clicks, which only have an effect on objective magnification
  let coords = getAbsolutClickPosition(event, MicImage);
  percx=coords.percx;
  percy=coords.percy;
  //console.log(`Image was clicked! at x=${percx.toFixed(1)}, y= ${percy.toFixed(1)}`) ;
  if ( // position of the objectives is different for eacht image hence all the ifs
        (percx < 1510 && percx > 1038 && percy < 1682 && percy > 1342 && MicImage.title == "ZeissLeft.png")||
        (percx < 1963 && percx > 1376 && percy < 1961 && percy > 1615 && MicImage.title == "ZeissFront.png")||
        (percx < 2173 && percx > 1611 && percy < 1882 && percy > 1550 && MicImage.title == "ZeissRight.jpg")|| 
        (percx < 2050 && percx > 1350 && percy < 1350 && percy >  850 && MicImage.title == "OlympusLeft.png")||
        (percx < 2050 && percx > 1450 && percy < 1700 && percy > 1200 && MicImage.title == "OlympusFront.png")||
        (percx < 2000 && percx > 1250 && percy < 1700 && percy > 1150 && MicImage.title == "OlympusRight.png")|| 
        (percx < 2650 && percx > 1950 && percy < 1950 && percy > 1400 && MicImage.title == "NikonLeft.png")||
        (percx < 2400 && percx > 1700 && percy < 2050 && percy > 1550 && MicImage.title == "NikonFront.png")||
        (percx < 2150 && percx > 1500 && percy < 2000 && percy > 1425 && MicImage.title == "NikonRight.png")||
        (percx < 2250 && percx > 1700 && percy < 1950 && percy > 1475 && MicImage.title == "LeicaLeft.png")||
        (percx < 2100 && percx > 1525 && percy < 1925 && percy > 1475 && MicImage.title == "LeicaFront.png")||
        (percx < 1975 && percx > 1350 && percy < 1825 && percy > 1425 && MicImage.title == "LeicaRight.png") 
  ){ //clicking on the objective
        console.log("Changing objective");
        objectiveChange();
  } 
});

function objectiveChange(){ // loops through magnifications, going back to low after 100x
    console.log(MyIms[0]);
    objectiveCount++;
    objectiveCount=objectiveCount%4;
    SampleImage.style.transform = "scale("+myMagnifications[objectiveCount]+")";
    toastr.success("Changing magnification to "+myObjectives[objectiveCount]+"!");
    cAS=1.5*myMagnifications[objectiveCount]*AS;
    FDImage.style.transform = "translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px) scale("+cAS+")";
    FDImage.style.transition = "transform 0.25s ease";
    CDImage.style.transform = "scale("+myCDScales[objectiveCount]*CD+")";
    // added to see if lighting stays constant
    cCD=Math.max(0.8,Math.min(10.0/myCDScales[objectiveCount],CD+(distanceX/100.0))) // make sure the CD diaphragm adjust to objective size
    condInt=(cCD*myCDScales[objectiveCount]-5)/10; 
    totInt=IntTF+condInt;
    console.log('cInt '+ IntTF.toFixed(2)+ ' condInt ' +condInt.toFixed(2)+", cCD "+cCD);
    SampleImage.style.filter="contrast("+(0.5+(10-cCD*myCDScales[objectiveCount])/10)+ ") brightness(" +totInt+") blur("+(7-cCD)/20+ "px)";
    console.log('totInt '+ totInt.toFixed(2));

    console.log("changed FD");
}

function getAbsolutTouchPosition(e, MicImage){
  const event = e.touches ? e.touches[0] : e;
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

MicImage.addEventListener('touchstart', function(event){  // equal to mousedown
  // these still change based on window zoom and aspect ratio
  //const x = event.offsetX;  // x-coordinate relative to the image 
  // const y = event.offsetY;  // y-coordinate relative to the image
  //const percx=x/this.width*100; // this changes based on display size, this is why we dont use it
  //const percy=y/this.height*100;
  event.preventDefault(); // means the image wont be dragged
  let coords = getAbsolutTouchPosition(event, MicImage);
  percx=coords.percx;
  percy=coords.percy;
  // this method gives the absolute pixel positions on the image whether or not zoomed in or not 
  // Return the final position only if the click was within the visible image
  //console.log(finalX.toFixed(1)+", "+finalY.toFixed(1));
  console.log("Image was mousedowned! at x="+ percx.toFixed(0) +", y="+ percy.toFixed(0));
  
  // here we can set all locations to verify with the image
  // add all locations with zoom on condensor
    mouseDownY=event.clientY;
    mouseDownX=event.clientX;
    if (// the field diaphragm is clicked
         (percx < 1650 && percx > 1225 && percy < 2500 && percy > 2250 && MicImage.title == "ZeissLeft.png")||
         (percx < 1975 && percx > 1475 && percy < 2950 && percy > 2650 && MicImage.title == "ZeissFront.png")||
         (percx < 2050 && percx > 1575 && percy < 2800 && percy > 2500 && MicImage.title == "ZeissRight.jpg")|| 
         (percx < 1800 && percx > 1325 && percy < 2300 && percy > 2025 && MicImage.title == "OlympusLeft.png")||
         (percx < 2100 && percx > 1575 && percy < 2825 && percy > 2500 && MicImage.title == "OlympusFront.png")||
         (percx < 2100 && percx > 1600 && percy < 2800 && percy > 2525 && MicImage.title == "OlympusRight.png")||
         (percx < 2400 && percx > 1950 && percy < 2950 && percy > 2550 && MicImage.title == "NikonLeft.png")||
         (percx < 2325 && percx > 1875 && percy < 3150 && percy > 2700 && MicImage.title == "NikonFront.png")||
         (percx < 2275 && percx > 1800 && percy < 3000 && percy > 2575 && MicImage.title == "NikonRight.png")||
         (percx < 2450 && percx > 1825 && percy < 2950 && percy > 2600 && MicImage.title == "LeicaLeft.png")||
         (percx < 2125 && percx > 1575 && percy < 2900 && percy > 2550 && MicImage.title == "LeicaFront.png")||
         (percx < 1800 && percx > 1250 && percy < 2700 && percy > 2400 && MicImage.title == "LeicaRight.png")
    ){ // the field diaphragm is clicked
        console.log("Changing field diafragm size");
        DFDragging = true;
    } else if ( // the focus knob is clicked
         (percx < 0925 && percx > 0600 && percy < 2575 && percy > 2200 && MicImage.title == "ZeissLeft.png")||
         (percx < 1390 && percx > 1150 && percy < 2750 && percy > 2425 && MicImage.title == "ZeissFront.png")||
         (percx < 2475 && percx > 2330 && percy < 2700 && percy > 2450 && MicImage.title == "ZeissRight.jpg")||
         (percx < 0950 && percx > 0575 && percy < 1900 && percy > 1600 && MicImage.title == "OlympusLeft.png")||
         (percx < 2975 && percx > 2605 && percy < 2450 && percy > 2050 && MicImage.title == "OlympusRight.png")||
         (percx < 1575 && percx > 1200 && percy < 2550 && percy > 2250 && MicImage.title == "NikonLeft.png")||
         (percx < 1795 && percx > 1625 && percy < 2900 && percy > 2325 && MicImage.title == "NikonFront.png")||
         (percx < 2500 && percx > 2320 && percy < 2550 && percy > 2375 && MicImage.title == "NikonFront.png")||
         (percx < 3050 && percx > 2800 && percy < 2675 && percy > 2275 && MicImage.title == "NikonRight.png")||
         (percx < 1400 && percx > 0950 && percy < 2625 && percy > 2275 && MicImage.title == "LeicaLeft.png")||
         (percx < 1500 && percx > 1325 && percy < 2400 && percy > 2225 && MicImage.title == "LeicaFront.png")||
         (percx < 2625 && percx > 2225 && percy < 2400 && percy > 2000 && MicImage.title == "LeicaRight.png")
    ){ // the focus knob is clicked
        Focus = true;
    } else if (// the focus knob condensor is clicked
         (percx < 1100 && percx > 0925 && percy < 2150 && percy > 2000 && MicImage.title == "ZeissLeft.png")||
         (percx < 1475 && percx > 1375 && percy < 2425 && percy > 2300 && MicImage.title == "ZeissFront.png")||
         (percx < 1175 && percx > 1050 && percy < 1875 && percy > 1700 && MicImage.title == "OlympusLeft.png")||
         (percx < 1825 && percx > 1625 && percy < 2525 && percy > 2275 && MicImage.title == "NikonLeft.png")||
         (percx < 1860 && percx > 1810 && percy < 2570 && percy > 2375 && MicImage.title == "NikonFront.png")||
         (percx < 1600 && percx > 1425 && percy < 2475 && percy > 2300 && MicImage.title == "LeicaLeft.png")||
         (percx < 1610 && percx > 1515 && percy < 2300 && percy > 2250 && MicImage.title == "LeicaFront.png")
    ){ // the focus knob condensor is clicked
        console.log("Focussing condensor");
        FDFocus = true;
    } else if (// the table control is clicked
         (percx < 2070 && percx > 1940 && percy < 2430 && percy > 2260 && MicImage.title == "ZeissFront.png")||
         (percx < 2335 && percx > 2205 && percy < 2450 && percy > 2150 && MicImage.title == "ZeissRight.jpg")|| 
         (percx < 2425 && percx > 2250 && percy < 2300 && percy > 2050 && MicImage.title == "OlympusFront.png")||
         (percx < 2575 && percx > 2355 && percy < 2475 && percy > 2075 && MicImage.title == "OlympusRight.png")||
         (percx < 2430 && percx > 2275 && percy < 2475 && percy > 2370 && MicImage.title == "NikonLeft.png")||
         (percx < 2700 && percx > 2520 && percy < 2700 && percy > 2425 && MicImage.title == "NikonFront.png")||
         (percx < 2775 && percx > 2550 && percy < 2725 && percy > 2400 && MicImage.title == "NikonRight.png")||
         (percx < 2350 && percx > 2200 && percy < 2525 && percy > 2275 && MicImage.title == "LeicaFront.png")||
         (percx < 2225 && percx > 2000 && percy < 2475 && percy > 2200 && MicImage.title == "LeicaRight.png")
    ){ // the table control is clicked
        console.log("dragging sample")
        sampleDragging = true;
    } else if ( // the intensity control is clicked
         (percx < 2525 && percx > 2375 && percy < 2400 && percy > 2275 && MicImage.title == "ZeissRight.jpg")||
         (percx < 2350 && percx > 2150 && percy < 3400 && percy > 3575 && MicImage.title == "OlympusRight.png")||
         (percx < 1625 && percx > 1450 && percy < 2950 && percy > 2825 && MicImage.title == "NikonLeft.png")||
         (percx < 1857 && percx > 1810 && percy < 2955 && percy > 2870 && MicImage.title == "NikonFront.png")||
         (percx < 1650 && percx > 1450 && percy < 3000 && percy > 2875 && MicImage.title == "LeicaLeft.png")||
         (percx < 1550 && percx > 1525 && percy < 2775 && percy > 2675 && MicImage.title == "LeicaFront.png")
    ){ // the intensity control is clicked
        console.log("changing intensity")
        IntDrag=true;
    } else if ( //The field diaphragm centering knobs left are clicked
         (percx < 1360 && percx > 1295 && percy < 2235 && percy > 2145 && MicImage.title == "ZeissLeft.png")||
         (percx < 1495 && percx > 1405 && percy < 2595 && percy > 2095 && MicImage.title == "ZeissFront.png")|| 
         (percx < 1550 && percx > 1470 && percy < 2400 && percy > 2340 && MicImage.title == "ZeissRight.jpg")|| //
         (percx < 1505 && percx > 1440 && percy < 1895 && percy > 1815 && MicImage.title == "OlympusLeft.png")||
         (percx < 1555 && percx > 1465 && percy < 2300 && percy > 2260 && MicImage.title == "OlympusFront.png")||
         (percx < 2175 && percx > 2140 && percy < 2300 && percy > 2270 && MicImage.title == "NikonLeft.png")||
         (percx < 1925 && percx > 1895 && percy < 2425 && percy > 2400 && MicImage.title == "NikonFront.png")||
         (percx < 2280 && percx > 2245 && percy < 2385 && percy > 2355 && MicImage.title == "LeicaLeft.png")||
         (percx < 1785 && percx > 1740 && percy < 2380 && percy > 2335 && MicImage.title == "LeicaFront.png")
    ){ //The field diaphragm centering knobs left are clicked
        console.log("centering field Diaphragm left")
         FDcentre = true;
         //console.log("2nd "+mouseDownX+","+ distanceX+", "+distanceY+", "+xoffsetFD+", "+yoffsetFD);
         //console.log(cxoffsetFD+', '+cyoffsetFD);
    } else if ( 
         (percx < 1720 && percx > 1655 && percy < 2115 && percy > 2050 && MicImage.title == "ZeissLeft.png")||
         (percx < 2055 && percx > 1980 && percy < 2550 && percy > 2470 && MicImage.title == "ZeissFront.png")|| 
         (percx < 2035 && percx > 1935 && percy < 2485 && percy > 2395 && MicImage.title == "ZeissRight.jpg")|| //
         (percx < 2200 && percx > 2085 && percy < 2300 && percy > 2245 && MicImage.title == "OlympusFront.png")||
         (percx < 2000 && percx > 1900 && percy < 2345 && percy > 2250 && MicImage.title == "OlympusRight.png")||
         (percx < 2265 && percx > 2230 && percy < 2430 && percy > 2405 && MicImage.title == "NikonFront.png")||
         (percx < 2070 && percx > 2020 && percy < 2340 && percy > 2310 && MicImage.title == "NikonRight.png")||
         (percx < 1965 && percx > 1930 && percy < 2375 && percy > 2340 && MicImage.title == "LeicaFront.png")||
         (percx < 1480 && percx > 1440 && percy < 2215 && percy > 2180 && MicImage.title == "LeicaRight.png") 
    ){ //The field diaphragm centering knobs right are clicked
        console.log("centering field Diaphragm right")
         FDcentreR = true;
    } else if ( 
         (percx < 1595 && percx > 1425 && percy < 2010 && percy > 1950 && MicImage.title == "ZeissLeft.png")||
         (percx < 1915 && percx > 1515 && percy < 2380 && percy > 2285 && MicImage.title == "ZeissFront.png")|| 
         (percx < 1865 && percx > 1470 && percy < 2230 && percy > 2165 && MicImage.title == "ZeissRight.jpg")|| //
         (percx < 1590 && percx > 1555 && percy < 1825 && percy > 1800 && MicImage.title == "OlympusLeft.png")||//
         (percx < 2040 && percx > 1750 && percy < 1745 && percy > 1725 && MicImage.title == "OlympusLeft.png")||//
         (percx < 2020 && percx > 1550 && percy < 2315 && percy > 2230 && MicImage.title == "OlympusFront.png")||//
         (percx < 1615 && percx > 1320 && percy < 2230 && percy > 2125 && MicImage.title == "OlympusRight.png")||//
         (percx < 2405 && percx > 2190 && percy < 2335 && percy > 2285 && MicImage.title == "NikonLeft.png")||//
         (percx < 2270 && percx > 1915 && percy < 2490 && percy > 2435 && MicImage.title == "NikonFront.png")||//
         (percx < 2020 && percx > 1810 && percy < 2385 && percy > 2305 && MicImage.title == "NikonRight.png")||//
         (percx < 2455 && percx > 2155 && percy < 2350 && percy > 2260 && MicImage.title == "LeicaLeft.png")||
         (percx < 2060 && percx > 1685 && percy < 2325 && percy > 2275 && MicImage.title == "LeicaFront.png")||//
         (percx < 1545 && percx > 1335 && percy < 2175 && percy > 2140 && MicImage.title == "LeicaRight.png")
    ){ //The condensor diaphragm knobs are clicked
        console.log("changing condensor diaphragm")
         CDcentre = true;
    }
    //console.log(`Image was mousedowned! at x=${percx.toFixed(1)}, y= ${percy.toFixed(1)}, focus =${Focus}, ${DFDragging} , ${FDFocus}, ${IntDrag}`) ;
});

MicImage.addEventListener('mousedown', function(event) { // check all the possible actions on the image of the microscope and depending on where is clicked acts on what happens
  // these still change based on window zoom and aspect ratio
  //const x = event.offsetX;  // x-coordinate relative to the image 
  // const y = event.offsetY;  // y-coordinate relative to the image
  //const percx=x/this.width*100; // this changes based on display size, this is why we dont use it
  //const percy=y/this.height*100;
  event.preventDefault(); // means the image wont be dragged
  let coords = getAbsolutClickPosition(event, MicImage);
  percx=coords.percx;
  percy=coords.percy;
  // this method gives the absolute pixel positions on the image whether or not zoomed in or not 
  // Return the final position only if the click was within the visible image
  //console.log(finalX.toFixed(1)+", "+finalY.toFixed(1));
  console.log("Image was mousedowned! at x="+ percx.toFixed(0) +", y="+ percy.toFixed(0));
  
  // here we can set all locations to verify with the image
  // add all locations with zoom on condensor
    mouseDownY=event.clientY;
    mouseDownX=event.clientX;
    if (// the field diaphragm is clicked
         (percx < 1650 && percx > 1225 && percy < 2500 && percy > 2250 && MicImage.title == "ZeissLeft.png")||
         (percx < 1975 && percx > 1475 && percy < 2950 && percy > 2650 && MicImage.title == "ZeissFront.png")||
         (percx < 2050 && percx > 1575 && percy < 2800 && percy > 2500 && MicImage.title == "ZeissRight.jpg")|| 
         (percx < 1800 && percx > 1325 && percy < 2300 && percy > 2025 && MicImage.title == "OlympusLeft.png")||
         (percx < 2100 && percx > 1575 && percy < 2825 && percy > 2500 && MicImage.title == "OlympusFront.png")||
         (percx < 2100 && percx > 1600 && percy < 2800 && percy > 2525 && MicImage.title == "OlympusRight.png")||
         (percx < 2400 && percx > 1950 && percy < 2950 && percy > 2550 && MicImage.title == "NikonLeft.png")||
         (percx < 2325 && percx > 1875 && percy < 3150 && percy > 2700 && MicImage.title == "NikonFront.png")||
         (percx < 2275 && percx > 1800 && percy < 3000 && percy > 2575 && MicImage.title == "NikonRight.png")||
         (percx < 2450 && percx > 1825 && percy < 2950 && percy > 2600 && MicImage.title == "LeicaLeft.png")||
         (percx < 2125 && percx > 1575 && percy < 2900 && percy > 2550 && MicImage.title == "LeicaFront.png")||
         (percx < 1800 && percx > 1250 && percy < 2700 && percy > 2400 && MicImage.title == "LeicaRight.png")
    ){ // the field diaphragm is clicked
        console.log("Changing field diafragm size");
        DFDragging = true;
    } else if ( // the focus knob is clicked
         (percx < 0925 && percx > 0600 && percy < 2575 && percy > 2200 && MicImage.title == "ZeissLeft.png")||
         (percx < 1390 && percx > 1150 && percy < 2750 && percy > 2425 && MicImage.title == "ZeissFront.png")||
         (percx < 2475 && percx > 2330 && percy < 2700 && percy > 2450 && MicImage.title == "ZeissRight.jpg")||
         (percx < 0950 && percx > 0575 && percy < 1900 && percy > 1600 && MicImage.title == "OlympusLeft.png")||
         (percx < 2975 && percx > 2605 && percy < 2450 && percy > 2050 && MicImage.title == "OlympusRight.png")||
         (percx < 1575 && percx > 1200 && percy < 2550 && percy > 2250 && MicImage.title == "NikonLeft.png")||
         (percx < 1795 && percx > 1625 && percy < 2900 && percy > 2325 && MicImage.title == "NikonFront.png")||
         (percx < 2500 && percx > 2320 && percy < 2550 && percy > 2375 && MicImage.title == "NikonFront.png")||
         (percx < 3050 && percx > 2800 && percy < 2675 && percy > 2275 && MicImage.title == "NikonRight.png")||
         (percx < 1400 && percx > 0950 && percy < 2625 && percy > 2275 && MicImage.title == "LeicaLeft.png")||
         (percx < 1500 && percx > 1325 && percy < 2400 && percy > 2225 && MicImage.title == "LeicaFront.png")||
         (percx < 2625 && percx > 2225 && percy < 2400 && percy > 2000 && MicImage.title == "LeicaRight.png")
    ){ // the focus knob is clicked
        Focus = true;
    } else if (// the focus knob condensor is clicked
         (percx < 1100 && percx > 0925 && percy < 2150 && percy > 2000 && MicImage.title == "ZeissLeft.png")||
         (percx < 1475 && percx > 1375 && percy < 2425 && percy > 2300 && MicImage.title == "ZeissFront.png")||
         (percx < 1175 && percx > 1050 && percy < 1875 && percy > 1700 && MicImage.title == "OlympusLeft.png")||
         (percx < 1825 && percx > 1625 && percy < 2525 && percy > 2275 && MicImage.title == "NikonLeft.png")||
         (percx < 1860 && percx > 1810 && percy < 2570 && percy > 2375 && MicImage.title == "NikonFront.png")||
         (percx < 1600 && percx > 1425 && percy < 2475 && percy > 2300 && MicImage.title == "LeicaLeft.png")||
         (percx < 1610 && percx > 1515 && percy < 2300 && percy > 2250 && MicImage.title == "LeicaFront.png")
    ){ // the focus knob condensor is clicked
        console.log("Focussing condensor");
        FDFocus = true;
    } else if (// the table control is clicked
         (percx < 2070 && percx > 1940 && percy < 2430 && percy > 2260 && MicImage.title == "ZeissFront.png")||
         (percx < 2335 && percx > 2205 && percy < 2450 && percy > 2150 && MicImage.title == "ZeissRight.jpg")|| 
         (percx < 2425 && percx > 2250 && percy < 2300 && percy > 2050 && MicImage.title == "OlympusFront.png")||
         (percx < 2575 && percx > 2355 && percy < 2475 && percy > 2075 && MicImage.title == "OlympusRight.png")||
         (percx < 2430 && percx > 2275 && percy < 2475 && percy > 2370 && MicImage.title == "NikonLeft.png")||
         (percx < 2700 && percx > 2520 && percy < 2700 && percy > 2425 && MicImage.title == "NikonFront.png")||
         (percx < 2775 && percx > 2550 && percy < 2725 && percy > 2400 && MicImage.title == "NikonRight.png")||
         (percx < 2350 && percx > 2200 && percy < 2525 && percy > 2275 && MicImage.title == "LeicaFront.png")||
         (percx < 2225 && percx > 2000 && percy < 2475 && percy > 2200 && MicImage.title == "LeicaRight.png")
    ){ // the table control is clicked
        console.log("dragging sample")
        sampleDragging = true;
    } else if ( // the intensity control is clicked
         (percx < 2525 && percx > 2375 && percy < 2400 && percy > 2275 && MicImage.title == "ZeissRight.jpg")||
         (percx < 2350 && percx > 2150 && percy < 3400 && percy > 3575 && MicImage.title == "OlympusRight.png")||
         (percx < 1625 && percx > 1450 && percy < 2950 && percy > 2825 && MicImage.title == "NikonLeft.png")||
         (percx < 1857 && percx > 1810 && percy < 2955 && percy > 2870 && MicImage.title == "NikonFront.png")||
         (percx < 1650 && percx > 1450 && percy < 3000 && percy > 2875 && MicImage.title == "LeicaLeft.png")||
         (percx < 1550 && percx > 1525 && percy < 2775 && percy > 2675 && MicImage.title == "LeicaFront.png")
    ){ // the intensity control is clicked
        console.log("changing intensity")
        IntDrag=true;
    } else if ( //The field diaphragm centering knobs left are clicked
         (percx < 1360 && percx > 1295 && percy < 2235 && percy > 2145 && MicImage.title == "ZeissLeft.png")||
         (percx < 1495 && percx > 1405 && percy < 2595 && percy > 2095 && MicImage.title == "ZeissFront.png")|| 
         (percx < 1550 && percx > 1470 && percy < 2400 && percy > 2340 && MicImage.title == "ZeissRight.jpg")|| //
         (percx < 1505 && percx > 1440 && percy < 1895 && percy > 1815 && MicImage.title == "OlympusLeft.png")||
         (percx < 1555 && percx > 1465 && percy < 2300 && percy > 2260 && MicImage.title == "OlympusFront.png")||
         (percx < 2175 && percx > 2140 && percy < 2300 && percy > 2270 && MicImage.title == "NikonLeft.png")||
         (percx < 1925 && percx > 1895 && percy < 2425 && percy > 2400 && MicImage.title == "NikonFront.png")||
         (percx < 2280 && percx > 2245 && percy < 2385 && percy > 2355 && MicImage.title == "LeicaLeft.png")||
         (percx < 1785 && percx > 1740 && percy < 2380 && percy > 2335 && MicImage.title == "LeicaFront.png")
    ){ //The field diaphragm centering knobs left are clicked
        console.log("centering field Diaphragm left")
         FDcentre = true;
         //console.log("2nd "+mouseDownX+","+ distanceX+", "+distanceY+", "+xoffsetFD+", "+yoffsetFD);
         //console.log(cxoffsetFD+', '+cyoffsetFD);
    } else if ( 
         (percx < 1720 && percx > 1655 && percy < 2115 && percy > 2050 && MicImage.title == "ZeissLeft.png")||
         (percx < 2055 && percx > 1980 && percy < 2550 && percy > 2470 && MicImage.title == "ZeissFront.png")|| 
         (percx < 2035 && percx > 1935 && percy < 2485 && percy > 2395 && MicImage.title == "ZeissRight.jpg")|| //
         (percx < 2200 && percx > 2085 && percy < 2300 && percy > 2245 && MicImage.title == "OlympusFront.png")||
         (percx < 2000 && percx > 1900 && percy < 2345 && percy > 2250 && MicImage.title == "OlympusRight.png")||
         (percx < 2265 && percx > 2230 && percy < 2430 && percy > 2405 && MicImage.title == "NikonFront.png")||
         (percx < 2070 && percx > 2020 && percy < 2340 && percy > 2310 && MicImage.title == "NikonRight.png")||
         (percx < 1965 && percx > 1930 && percy < 2375 && percy > 2340 && MicImage.title == "LeicaFront.png")||
         (percx < 1480 && percx > 1440 && percy < 2215 && percy > 2180 && MicImage.title == "LeicaRight.png") 
    ){ //The field diaphragm centering knobs right are clicked
        console.log("centering field Diaphragm right")
         FDcentreR = true;
    } else if ( 
         (percx < 1595 && percx > 1425 && percy < 2010 && percy > 1950 && MicImage.title == "ZeissLeft.png")||
         (percx < 1915 && percx > 1515 && percy < 2380 && percy > 2285 && MicImage.title == "ZeissFront.png")|| 
         (percx < 1865 && percx > 1470 && percy < 2230 && percy > 2165 && MicImage.title == "ZeissRight.jpg")|| //
         (percx < 1590 && percx > 1555 && percy < 1825 && percy > 1800 && MicImage.title == "OlympusLeft.png")||//
         (percx < 2040 && percx > 1750 && percy < 1745 && percy > 1725 && MicImage.title == "OlympusLeft.png")||//
         (percx < 2020 && percx > 1550 && percy < 2315 && percy > 2230 && MicImage.title == "OlympusFront.png")||//
         (percx < 1615 && percx > 1320 && percy < 2230 && percy > 2125 && MicImage.title == "OlympusRight.png")||//
         (percx < 2405 && percx > 2190 && percy < 2335 && percy > 2285 && MicImage.title == "NikonLeft.png")||//
         (percx < 2270 && percx > 1915 && percy < 2490 && percy > 2435 && MicImage.title == "NikonFront.png")||//
         (percx < 2020 && percx > 1810 && percy < 2385 && percy > 2305 && MicImage.title == "NikonRight.png")||//
         (percx < 2455 && percx > 2155 && percy < 2350 && percy > 2260 && MicImage.title == "LeicaLeft.png")||
         (percx < 2060 && percx > 1685 && percy < 2325 && percy > 2275 && MicImage.title == "LeicaFront.png")||//
         (percx < 1545 && percx > 1335 && percy < 2175 && percy > 2140 && MicImage.title == "LeicaRight.png")
    ){ //The condensor diaphragm knobs are clicked
        console.log("changing condensor diaphragm")
         CDcentre = true;
    }
    //console.log(`Image was mousedowned! at x=${percx.toFixed(1)}, y= ${percy.toFixed(1)}, focus =${Focus}, ${DFDragging} , ${FDFocus}, ${IntDrag}`) ;
});

document.addEventListener('touchmove', (e) => ) {
  distanceY=mouseDownY-e.clientY; //always starts at 0,0 compared to where we clicked
  distanceX=mouseDownX-e.clientX;
  //console.log("mousemove "+xoffsetFD+", "+yoffsetFD+", "+cAS);
  //console.log(assignmentNumber);
  if (DFDragging) { // If the mouse is  being dragged we need to add the field diaphragm
    //console.log(Math.abs(distanceY/20));
    // it needs to be above 2.2 and below 30?. But when it is clicked it needs to start at the current value
    //console.log('pre '+cAS+','+AS);
    cAS=Math.max(1.5*myMagnifications[objectiveCount],Math.min(30,AS+(distanceY/5))); // cannot be more than 15, and cannot be less than 2.2
    //this works the first time, and starts ok the second time, however the min and max are not implemented
    //console.log(cAS);  
    FDImage.style.transform = "translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px) scale("+cAS+")";
    //FDImage.style.transform = "scale("+cAS+")"; this does not work as it always resets to the centre
  } else if (Focus){
      //console.log(cFS+','+FS+',');
    cFS=Math.max(-10,Math.min(10,FS-distanceY/20)); // cannot be more than 10, and cannot be less than -10
    cFDF=Math.min(10,FDF+Math.abs(distanceY/50));
    SampleImage.style.filter = "blur("+Math.abs(cFS)+"px)";
    FDImage.style.filter = "blur("+cFDF+"px)";
  } else if (FDFocus){
    cFDF=Math.min(10,Math.abs(FDF-distanceY/20)); // cannot be more than 10, and cannot be less than 0
    //console.log("FDF"+cFDF);
    FDImage.style.filter = "blur("+cFDF+"px)";
  } else if (sampleDragging){
    //console.log(distanceY+SampleImageDisplaceY);
    SampleImage.style.transform="translateY("+(distanceY+SampleImageDisplaceY)+"px) translateX("+(distanceX+SampleImageDisplaceX)+"px) scale("+myMagnifications[objectiveCount]+")";

    //need to log the already made translation
  } else if (FDcentre){
      //Order of transformation needs to be the same in all applications!
    FDImage.style.transform="translateX("+(xoffsetFD+distanceX)+"px) translateY("+(yoffsetFD-distanceX)+"px) scale("+cAS+")";
  } else if (FDcentreR){
      //Order of transformation needs to be the same in all applications!
    FDImage.style.transform="translateX("+(xoffsetFD+distanceX)+"px) translateY("+(yoffsetFD+distanceX)+"px) scale("+cAS+")";
  } else if (CDcentre){
    console.log(cCD*myCDScales[objectiveCount]);
    cCD=Math.max(0.8,Math.min(10.0/myCDScales[objectiveCount],CD+(distanceX/100.0))) // means it can be between 0.8 and 10. should be around 70%
    CDImage.style.transform = "scale("+myCDScales[objectiveCount]*cCD+")";
    // this also has an effect on the image. More closed is more contrast less resolution
    // More open is less contrast, more resolution
    //SampleImage.style.filter= "blur("+(12.8-cCD)/100+ "px)";
    condInt=(cCD*myCDScales[objectiveCount]-5)/10
    totInt=IntTF+condInt;
    SampleImage.style.filter="contrast("+(0.5+(10-cCD*myCDScales[objectiveCount])/10)+ ") brightness(" +totInt+") blur("+(7-cCD)/20+ "px)";
    console.log(`brightness +${totInt.toFixed(2)} condint +${condInt.toFixed(2)} ccd =${cCD.toFixed(2)}`)
    //cCont=0.5+(10-cCD*myCDScales[objectiveCount])/10;
        
  } else if (IntDrag){
    //console.log("Intensity drag");
    
    cIntTF=IntTF+(distanceY/50);
    totInt=IntTF+condInt;
    console.log("totInt "+totInt);
    SampleImage.style.filter = "brightness("+totInt+")";
  } 
}

document.addEventListener('mousemove', (e) => { // depending on where the image was mousedowned will act on what was clicked and what the dragging means for that component
  distanceY=mouseDownY-e.clientY; //always starts at 0,0 compared to where we clicked
  distanceX=mouseDownX-e.clientX;
  //console.log("mousemove "+xoffsetFD+", "+yoffsetFD+", "+cAS);
  //console.log(assignmentNumber);
  if (DFDragging) { // If the mouse is  being dragged we need to add the field diaphragm
    //console.log(Math.abs(distanceY/20));
    // it needs to be above 2.2 and below 30?. But when it is clicked it needs to start at the current value
    //console.log('pre '+cAS+','+AS);
    cAS=Math.max(1.5*myMagnifications[objectiveCount],Math.min(30,AS+(distanceY/5))); // cannot be more than 15, and cannot be less than 2.2
    //this works the first time, and starts ok the second time, however the min and max are not implemented
    //console.log(cAS);  
    FDImage.style.transform = "translateX("+xoffsetFD+"px) translateY("+yoffsetFD+"px) scale("+cAS+")";
    //FDImage.style.transform = "scale("+cAS+")"; this does not work as it always resets to the centre
  } else if (Focus){
      //console.log(cFS+','+FS+',');
    cFS=Math.max(-10,Math.min(10,FS-distanceY/20)); // cannot be more than 10, and cannot be less than -10
    cFDF=Math.min(10,FDF+Math.abs(distanceY/50));
    SampleImage.style.filter = "blur("+Math.abs(cFS)+"px)";
    FDImage.style.filter = "blur("+cFDF+"px)";
  } else if (FDFocus){
    cFDF=Math.min(10,Math.abs(FDF-distanceY/20)); // cannot be more than 10, and cannot be less than 0
    //console.log("FDF"+cFDF);
    FDImage.style.filter = "blur("+cFDF+"px)";
  } else if (sampleDragging){
    //console.log(distanceY+SampleImageDisplaceY);
    SampleImage.style.transform="translateY("+(distanceY+SampleImageDisplaceY)+"px) translateX("+(distanceX+SampleImageDisplaceX)+"px) scale("+myMagnifications[objectiveCount]+")";

    //need to log the already made translation
  } else if (FDcentre){
      //Order of transformation needs to be the same in all applications!
    FDImage.style.transform="translateX("+(xoffsetFD+distanceX)+"px) translateY("+(yoffsetFD-distanceX)+"px) scale("+cAS+")";
  } else if (FDcentreR){
      //Order of transformation needs to be the same in all applications!
    FDImage.style.transform="translateX("+(xoffsetFD+distanceX)+"px) translateY("+(yoffsetFD+distanceX)+"px) scale("+cAS+")";
  } else if (CDcentre){
    console.log(cCD*myCDScales[objectiveCount]);
    cCD=Math.max(0.8,Math.min(10.0/myCDScales[objectiveCount],CD+(distanceX/100.0))) // means it can be between 0.8 and 10. should be around 70%
    CDImage.style.transform = "scale("+myCDScales[objectiveCount]*cCD+")";
    // this also has an effect on the image. More closed is more contrast less resolution
    // More open is less contrast, more resolution
    //SampleImage.style.filter= "blur("+(12.8-cCD)/100+ "px)";
    condInt=(cCD*myCDScales[objectiveCount]-5)/10
    totInt=IntTF+condInt;
    SampleImage.style.filter="contrast("+(0.5+(10-cCD*myCDScales[objectiveCount])/10)+ ") brightness(" +totInt+") blur("+(7-cCD)/20+ "px)";
    console.log(`brightness +${totInt.toFixed(2)} condint +${condInt.toFixed(2)} ccd =${cCD.toFixed(2)}`)
    //cCont=0.5+(10-cCD*myCDScales[objectiveCount])/10;
        
  } else if (IntDrag){
    //console.log("Intensity drag");
    
    cIntTF=IntTF+(distanceY/50);
    totInt=IntTF+condInt;
    console.log("totInt "+totInt);
    SampleImage.style.filter = "brightness("+totInt+")";
  } 
});

MicImage.addEventListener('touchend', (e) => {
    // this happens before a click is registered
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
    if (sampleDragging){
    SampleImageDisplaceX=distanceX+SampleImageDisplaceX;
    SampleImageDisplaceY=distanceY+SampleImageDisplaceY;
    //console.log(SampleImageDisplaceX+", "+ SampleImageDisplaceY);
    }
    sampleDragging = false;
    if (FDcentre){
        xoffsetFD=distanceX+xoffsetFD;
        yoffsetFD=yoffsetFD-distanceX;
    }  
    FDcentre = false;
    if (FDcentreR){
        xoffsetFD=distanceX+xoffsetFD;
        yoffsetFD=yoffsetFD+distanceX;
        //console.log("pos "+xoffsetFD+", "+yoffsetFD );
    }  
    FDcentreR = false;

    if (CDcentre){
    CD=cCD;
    cont=cCont;
    IntTF=cIntTF;
    }
    CDcentre = false;
    if (IntDrag){
    IntTF=cIntTF;
    }
    IntDrag=false;
    //Here we can check if all is set correct
    if (!buttonclick){
        checkStatus();
    }   
    buttonclick=false;
});

MicImage.addEventListener('mouseup', (e) => { // once dragging is finished, settle all the final values, and check how far the kohlering process has come along
    // this happens before a click is registered
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
    if (sampleDragging){
    SampleImageDisplaceX=distanceX+SampleImageDisplaceX;
    SampleImageDisplaceY=distanceY+SampleImageDisplaceY;
    //console.log(SampleImageDisplaceX+", "+ SampleImageDisplaceY);
    }
    sampleDragging = false;
    if (FDcentre){
        xoffsetFD=distanceX+xoffsetFD;
        yoffsetFD=yoffsetFD-distanceX;
    }  
    FDcentre = false;
    if (FDcentreR){
        xoffsetFD=distanceX+xoffsetFD;
        yoffsetFD=yoffsetFD+distanceX;
        //console.log("pos "+xoffsetFD+", "+yoffsetFD );
    }  
    FDcentreR = false;

    if (CDcentre){
    CD=cCD;
    cont=cCont;
    IntTF=cIntTF;
    }
    CDcentre = false;
    if (IntDrag){
    IntTF=cIntTF;
    }
    IntDrag=false;
    //Here we can check if all is set correct
    if (!buttonclick){
        checkStatus();
    }   
    buttonclick=false;
});//0

function checkStatus(){
    if (sampleLoaded){ // we need a sample //1
    //        if (CDImage.style.visibility == "hidden"){// means we can see the sample and not the diaphragm //2 
            // check Focus
            //check FDFocus
            //check cd size
                if (cFS<0.5 && cFS>-0.5){ //check focus //3
                    console.log(cFS+" cfs");
                    if (!sampleFocussed){
                        setPositive();
                        toastr.clear();
                        toastr.success('Congratulations! You have loaded and focussed the sample');
                        setNegative();
                        sampleFocussed=true;
                    }
                    
                    if (cFDF<0.5 && cFDF>-0.5){ // check field Diaphragm focus //4
                        if (!FDFocussed){
                            setPositive();
                            toastr.clear();
                            toastr.success('Congratulations! You have loaded and focussed the sample, and you have focussed the field diafragm');
                            setNegative();
                            FDFocussed=true;
                        }
                        if (Math.abs(xoffsetFD)<10 &&Math.abs(yoffsetFD)<10){ //5
                            if (!FDCentered){
                                setPositive();
                                toastr.clear();
                                toastr.success('Congratulations! You have loaded and focussed the sample, and you have focussed and centered the field diafragm');
                                setNegative();
                                FDCentered=true;
                            } 
                            if (cAS>24.25 &&cAS<26){ //6
                                if (!FDCorrectSize){//7
                                    setPositive();
                                    toastr.clear();
                                    toastr.success('Congratulations! You have loaded and focussed the sample, and you have focussed and centered the field diafragm, as well as adjusted it to the correct size');
                                    setNegative();
                                    FDCorrectSize=true;
                                }//6
                                if (cCD*myCDScales[objectiveCount]>5.8 &&cCD*myCDScales[objectiveCount]<7.5 && SampleImage.style.visibility == "visible" && CDImage.style.visibility == "hidden"){ //7 // need to check as well is ocular is in again
                                    setPositive();
                                    toastr.clear();
                                    toastr.success('Congratulations! You have kohlered the microscope');
                                    setNegative();
                                } else {
                                    toastr.info('One more thing to do');
                                }//6
                                //console.log(cCD);
                                //console.log(SampleImage.style.visibility +', '+CDImage.style.visibility)
                            } else { //5//6
                                toastr.warning('Field Diaphragm is not the right size');
                                FDCorrectSize=false;
                                console.log(cAS);
                                //console.log(xoffsetFD+", "+yoffsetFD);
                            } //5
                        } else { //4//5
                            toastr.warning('Field Diaphragm is not centered');
                            FDCentered=false;
                        } //4
                    } else { //3//4
                        toastr.warning('Field Diaphragm is not focussed, please close the field diafragm to focus it');
                        FDFocussed=false;
                    } //3
                } else { //2//3
                    toastr.warning('Sample is not focussed');
                    sampleFocussed=false;
                } //2
            //console.log()
    //       } else {//1//2
            //         toastr.warning('You need a sample for kohlering');
            //   }//1
        }  else {//0//1
            toastr.warning('You need a sample for kohlering');
        }//0
}

MicImage.addEventListener('mouseleave', (e)=> { // happens when we leave the image and move the mouse outside the browser window. Stores the values that at that time.
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
    if (sampleDragging){
    SampleImageDisplaceX=distanceX+SampleImageDisplaceX;
    SampleImageDisplaceY=distanceY+SampleImageDisplaceY;
    console.log(SampleImageDisplaceX+", "+ SampleImageDisplaceY);
    }
    sampleDragging = false;
    if (FDcentre){
        xoffsetFD=distanceX+xoffsetFD;
        yoffsetFD=yoffsetFD-distanceX;
    }  
    FDcentre = false;
    if (FDcentreR){
        xoffsetFD=distanceX+xoffsetFD;
        yoffsetFD=yoffsetFD+distanceX;
        //console.log("pos "+xoffsetFD+", "+yoffsetFD );
    }  
    FDcentreR = false;

    if (CDcentre){
    CD=cCD;
    IntTF=cIntTF;
    }
    CDcentre = false;
    if (IntDrag){
    IntTF=cIntTF;
    }
    IntDrag=false;
    if (condSizeDrag){
        CD
    }
});

rotateLeft.addEventListener('click', function(){ //loads left view
    rotate('Left')
    },true);
rotateFront.addEventListener('click', function(){ //loads front view
    rotate('Front')
    },true);
rotateRight.addEventListener('click', function(){ // loads right view
    rotate('Right')
    },true);
ZB.addEventListener('click', function(){ // loads zeiss
    MicChange(3)}, true);
LB.addEventListener('click', function(){ // loads leica
    MicChange(0) },true);
NB.addEventListener('click', function(){ //loads nikon
    MicChange(1) },true);
OB.addEventListener('click', function(){ // loads olympus
    MicChange(2)}, true);
ocularButton.addEventListener('click', function(){ // take out or put in ocular
    changeOcular()},true);
zoomButton.addEventListener('click', function(){ // zoom in on the condensor for more detailed control
    zoomCondensor()},true);
function zoomCondensor(){ // the actual zoom in on condensor function that is called when the zoomButton is clicked
    if (!zoomC){
        MicImage.style.transform="scale(3) translateY(-50px) ";
        zoomButton.textContent="Zoom out from condensor"
        zoomC=true;
    } else {
        MicImage.style.transform="scale(1) translateY(0px) ";
        zoomButton.textContent="Zoom in on condensor"
        zoomC=false;
    }
}
function changeOcular(){// the actual function that is called to take out or put back the ocular, basically changing component visibilities
    if (CDImage.style.visibility == "hidden") {
        SampleImage.style.visibility = "hidden";
        FDImage.style.visibility = "hidden";
        CDImage.style.visibility = "visible";
        ocularButton.textContent='Put back ocular';
    } else {
        if (sampleLoaded){
            SampleImage.style.visibility = "visible";
        }
        FDImage.style.visibility = "visible";
        CDImage.style.visibility = "hidden";
        ocularButton.textContent='Take out ocular';
        checkStatus();
    }
}
sambut.addEventListener('click', function() { //  button to show the sample
     showSample()},true);
function showSample(){ // function to show/remove sample
    loadSample();
    console.log('Sample loaded')
    if(CDImage.style.visibility == "hidden") {
        if (SampleImage.style.visibility=="visible"){
            sampleLoaded=false;
            SampleImage.style.visibility = "hidden";
            sambut.textContent="Load Sample"
        } else {
            SampleImage.style.visibility = "visible";
            sampleLoaded=true;
            sambut.textContent="Remove Sample"
            setPositive();
            toastr.success('Congratulations! You have loaded a sample');
            setNegative();
        }
    }
}
function MicChange(br){ // function to change the microscope brand
    brand=br;
    MyIms=Titles[brand];
    rotate("Left");
    for (let i=0;i<4;i++){
        if (i==br){
            Mbuttons[i].style.backgroundColor='cyan'
        } else {
            Mbuttons[i].style.backgroundColor='lightgrey'
        }
    }
}
function rotate(newView) {// function to change left/front/right views
  if (newView == 'Left') {
    MicImage.src = "fotos/"+MyIms[0];
    MicImage.title=MyIms[0];
  } else if (newView == "Front") {
    MicImage.src = "fotos/"+MyIms[1];
    MicImage.title=MyIms[1];
  } else {
    MicImage.src = "fotos/"+MyIms[2];
    MicImage.title=MyIms[2];
  }
}