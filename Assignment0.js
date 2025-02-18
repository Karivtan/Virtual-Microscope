console.log("Assignment 1 loaded");

// Constants for DOM elements
const counterDisplay = document.getElementById('Assignment'); // Displays assignment number
const rotateButton = document.getElementById('rotate'); // Rotates the microscope image
const loadButton = document.getElementById('loadButton'); // Loads/unloads sample
const ocularButton = document.getElementById('ocularButton'); // Toggles ocular view
const question = document.getElementById('question'); // Displays the current question
const myImage = document.getElementById('Microscope'); // The microscope image
const assignmentText = document.getElementById('counthead'); // Displays assignment title/instructions
const leftBottomButtons = document.getElementById('bottom-left-bottom'); // Container for bottom-left buttons
const CDImage = document.getElementById('CDImage');
const FDImage = document.getElementById('FDImage');
const newImage = document.getElementById('newImage');


// Variables for script logic
let questionNumber = 0; // Current question number

updateQuestion(); // Initialize the first question
console.log(assignmentNumber); // Log the initial assignment number

// Initialize the assignment display
function updateAssignment() {
    counterDisplay.textContent = "Assignment 1";
    counthead.textContent = "Please identify the microscope parts";
    question.style.visibility = "visible";
    questionNumber = 0;
}

// Event listener for bottom-left buttons (ocular and load)
leftBottomButtons.addEventListener('click', function(event) {
    if (assignmentNumber == 1) {
        if (event.target.id == "ocularButton") {
            if (CDImage.style.visibility == "hidden") {
                newImage.style.visibility = "hidden";
                FDImage.style.visibility = "hidden";
                CDImage.style.visibility = "visible";
            } else {
                if (sampleLoaded) {
                    newImage.style.visibility = "visible";
                }
                FDImage.style.visibility = "visible";
                CDImage.style.visibility = "hidden";
            }
        } else if (event.target.id == "loadButton") {
            if (CDImage.style.visibility == "hidden") {
                if (newImage.style.visibility == "visible") {
                    sampleLoaded = false;
                    newImage.style.visibility = "hidden";
                } else {
                    newImage.style.visibility = "visible";
                    sampleLoaded = true;
                }
            }
        }
    } else if (assignmentNumber == 2) {
        console.log("this place" + event.target.id);
        if (event.target.id == "ocularButton") {
            toastr.success('Correct!');
        } else {
            toastr.warning('Try again!');
        }
    }
});

// Function to dynamically create buttons
function addButton(container, text) {
    const newButton = document.createElement("button");
    newButton.id = text;
    newButton.textContent = text;
    newButton.classList.add("dynamic-button");
    container.appendChild(newButton);
    return newButton;
}

// Function to update the question text
function updateQuestion() {
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

    console.log(`Image was clicked! at x=${percx.toFixed(1)}, y= ${percy.toFixed(1)}`);

    // Check click location against defined regions for each question
    switch (questionNumber) {
        case 0: // on/off switch
            if (percx < 81 && percx > 75 && percy < 60 && percy > 54 && myImage.title == "MicRight.jpg") {
                console.log("you clicked on the on/off switch");
                questionNumber++;
                updateQuestion();
            } else {
                toastr.warning('Try again!');
            }
            break;
            case 1: // light intensity regulator
            if (percx<81&&percx>75&&percy<60&&percy>54&&myImage.title=="MicRight.jpg"){
              questionNumber++;
              updateQuestion();
            } else {
              toastr.warning('Try again!');
            }
            break;
            case 2: // focus button
            if (percx<32&&percx>13&&percy<76&&percy>61&&myImage.title=="MicLeft.jpg"){
              console.log("you clicked on the focus knob");
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
            if (percx<76&&percx>67.5&&percy<25&&percy>18&&myImage.title=="MicLeft.jpg"){
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
            if (percx<60&&percx>50&&percy<53&&percy>49&&myImage.title=="MicLeft.jpg"){
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
            if (percx<39.5&&percx>33&&percy<63.5&&percy>57.5&&myImage.title=="MicLeft.jpg"){
              questionNumber++;
              updateQuestion();
            } else {
              toastr.warning('Try again!');
            }
            break;
          case 6: // field diaphragm
            if (percx<62.5&&percx>47&&percy<79&&percy>70&&myImage.title=="MicLeft.jpg"){
              questionNumber++;
              updateQuestion();
      
            } else if (percx<49&&percx>35.5&&percy<79.5&&percy>68.5&&myImage.title=="MicRight.jpg"){
              questionNumber++;
              updateQuestion();
            } else {
              toastr.warning('Try again!');
            }
            break;
        case 7: // table control
            if (percx < 65 && percx > 58.5 && percy < 67 && percy > 57 && myImage.title == "MicLeft.jpg") {
                questionNumber++;
                toastr.options.timeOut = 5000;
                toastr.success('Congratulations! You have found all the components!');
                toastr.options.timeOut = 1000;
                window.location.href = "Assignment2.html";
            } else {
                toastr.warning('Try again!');
            }
    }
});

// Function to rotate the microscope image
function rotate() {
    if (myImage.title == "MicLeft.jpg") {
        myImage.src = "Primostar1.jpg";
    } else {
        myImage.src = "Primostar1_left.jpg";
        myImage.title = "MicLeft.jpg";
      }
    }

    rotateButton.addEventListener('click', rotate,true);
    