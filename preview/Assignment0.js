console.log("Index loaded");

// Constants for DOM elements
const myImage = document.getElementById('Microscope'); // The microscope image
const LeicaTitles = ["LeicaLeft.png","LeicaFront.png","LeicaRight.png"];
const NikonTitles =["NikonLeft.png","NikonFront.png","NikonRight.png"];
const OlympusTitles =["OlympusLeft.png","OlympusFront.png","OlympusRight.png"];
const ZeissTitles =["ZeissLeft.png","ZeissFront.png","ZeissRight.jpg" ];
const MicBrand=["Leica","Nikon","Olympus","Zeiss"];
// Variables for script logic
let questionNumber = 0; // Current question number
let brandnr=Math.floor(Math.random()*4);
let brand=MicBrand[brandnr];
let Titles=[LeicaTitles,NikonTitles,OlympusTitles,ZeissTitles];
let MyIms=Titles[brandnr];
let cTitle=MyIms[0];
MicChange(brandnr);

// Function to rotate the microscope image
function rotate(newView) {
  myImage.src = "fotos/"+MyIms[newView];
}

function MicChange(br){
    brand=br;
    MyIms=Titles[brand];
    rotate(Math.floor(Math.random()*3));
}
