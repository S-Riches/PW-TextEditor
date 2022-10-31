// ------------- DropDown Code -------------
// basic show/hide on click for the dropdown
const editFile = document.getElementById("editFile");
const createFile = document.getElementById("createFile");

const createOptions = document.getElementById("hiddenCreateOptions");
const editOptions = document.getElementById("hiddenEditOptions");
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

const editGoTo = document.getElementById("submitBtnEdit");
const createGoTo = document.getElementById("submitBtnCreate");

editGoTo.addEventListener("click", () => {
    goToTextEditor("test");
});
createGoTo.addEventListener("click", () => {
    goToTextEditor("test");
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
    };
    // specify that you should read the file as text
    reader.readAsText(file);
};

// we look for change (selecting a file) and then act on that change
existingFile.addEventListener("change", (e) => {
    // runs the read file function by taking in the first file in the file list (which is always only one file)
    const dataToLoad = readFile(e.target.files[0]);
});

// ------------- Line counter logic -------------

// create an array of numbers depending on the length of the text area
const createLines = () => {
    const lineCounter = document.getElementById("lineCounter");
    let numStr = "";
    for (let i = 1; i < textArea.value.split("\n").length; i++) {
        numStr += i + "\r\n";
    }
    console.log(numStr);
    lineCounter.value = numStr;
    lineCounter.scrollTop = textArea.scrollHeight;
};

textArea.addEventListener("input", () => {
    createLines();
});
textArea.addEventListener("scroll", () => {
    lineCounter.scrollTop = textArea.scrollHeight;
});
