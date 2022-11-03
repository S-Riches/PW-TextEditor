/*
    Title : Text editor
    Author : Sam Riches
    Date : 11/22
    Summary : A Text editor website that allows users to create .txt files and .md files, as well as edit pre-existing ones
*/

// ------------- DropDown Code -------------
// basic show/hide on click for the dropdown
const editFile = document.getElementById("editFile");
const createFile = document.getElementById("createFile");

const createOptions = document.getElementById("hiddenCreateOptions");
const editOptions = document.getElementById("hiddenEditOptions");
// needed to ensure that the function can see that the display is set to none.
createOptions.style.display = "none";
editOptions.style.display = "none";

const dropDownHideOrShow = (dropDownElement) => {
    if (dropDownElement.style.display == "none") {
        dropDownElement.style.display = "flex";
    } else if (dropDownElement.style.display == "flex") {
        dropDownElement.style.display = "none";
    }
};

createFile.addEventListener("click", () => {
    dropDownHideOrShow(createOptions);
});

editFile.addEventListener("click", () => {
    dropDownHideOrShow(editOptions);
});

// ------------- Load in Text editor Code -------------

const loginBox = document.querySelector("front");
const textEditor = document.querySelector("main");

const loadTextEditor = () => {
    loginBox.style.display = "none";
    textEditor.style.display = "flex";
};
const createGoTo = document.getElementById("submitBtnCreate");

// avoids users from creating a file without a title.
createGoTo.addEventListener("click", () => {
    if (document.getElementById("fileName").value != "") {
        setupNewFile();
    } else {
        alert("Please enter a title for the new file!");
    }
});

// ------------- File Handling Code -------------

// responsible for handling the loading of the text editor with the correct information
const goToTextEditor = (dataToLoad) => {
    loadTextEditor();
    formatFileContents(dataToLoad);
    createLines();
};
const existingFile = document.getElementById("existingFile");
const textArea = document.getElementById("textArea");
// needed as otherwise the file is just one long string for some reason.
const formatFileContents = (data) => {
    // splits the data at each new line char
    let formatArr = data.split("\n");
    // create a string to put out
    let outString = "";
    // for each line add \r\n which means we are explicitly wanting a new line
    for (x in formatArr) {
        outString += formatArr[x] + "\r\n";
    }
    // set the value as that
    textArea.value = outString;
};

const readFile = (file) => {
    // initialises a new file reader object
    const reader = new FileReader();
    // event listener that awaits the file to be read
    reader.onload = (e) => {
        // sends the file contents to the go to text editor function
        goToTextEditor(e.target.result);
        matchTitleToFileName();
    };
    // specify that you should read the file as text
    reader.readAsText(file);
};

// we look for change (selecting a file) and then act on that change
existingFile.addEventListener("change", (e) => {
    // runs the read file function by taking in the first file in the file list (which is always only one file)
    readFile(e.target.files[0]);
});

// ------------- Create new file Logic -------------
// when the user clicks the submit button this code runs, loads into the text editor and store the file name
const setupNewFile = () => {
    const newFileName = document.getElementById("fileName").value;
    loadTextEditor();
    document.getElementById("dynamicTitle").innerText = newFileName;
    createLines();
};

// ------------- Line counter logic -------------

// create an array of numbers depending on the length of the text area, if the length is less than 1, it is set to 1
const createLines = () => {
    const lineCounter = document.getElementById("lineCounter");
    let numStr = "";
    let lines = textArea.value.split("\n").length;
    for (let i = 1; i <= lines; i++) {
        numStr += i + "\r\n";
    }
    lineCounter.value = numStr;
    // TODO : need to make this work better so that it scrolls with the user scrolling.
    lineCounter.scrollTop = textArea.scrollHeight;
};

textArea.addEventListener("input", () => {
    createLines();
});
textArea.addEventListener("scroll", () => {
    lineCounter.scrollTop = textArea.scrollHeight;
});

// ------------- Dynamic Title logic -------------

// gets the name of the file from the input, then gets rid of the path, and sets it as the text editor title name
const matchTitleToFileName = () => {
    let fileName = existingFile.value;
    fileName = fileName.slice(fileName.lastIndexOf("\\") + 1);
    document.getElementById("dynamicTitle").innerText = fileName;
};

// ------------- Download file Logic -------------

const downloadFile = (fileContents, fileName) => {
    // reference the download button to use later on in the function
    const downloadButton = document.getElementById("saveButton");
    // create a new blob (file like data type), which contains the data and the file type of .txt
    let file = new Blob([fileContents], { type: "text/plain" });
    if (downloadButton.href !== null) {
        URL.revokeObjectURL(downloadButton.href);
    }
    downloadButton.href = URL.createObjectURL(file);
    // if the file doesn't have a .txt or .md in the file name
    if (String(fileName).includes(".txt")) {
        downloadButton.download = fileName;
        console.log(downloadButton);
    } else if (String(fileName).includes(".md")) {
        downloadButton.download = fileName;
        console.log(downloadButton);
    }
    // default it to a .txt
    else {
        fileName = fileName + ".txt";
        console.log(fileName);
        downloadButton.download = fileName;
        console.log(downloadButton);
    }
};

document.getElementById("saveButton").addEventListener("click", () => {
    downloadFile(
        textArea.value,
        document.getElementById("dynamicTitle").innerText
    );
});

// ------------- Refresh confirmation -------------
// adds an event listener that simply prevents the user from accidentally hitting refresh on their work - and asks them if they want to cancel the refresh.
window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "";
});
