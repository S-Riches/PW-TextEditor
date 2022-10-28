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
const goToTextEditor = (fileName) => {
    loadTextEditor();
};

// ------------- File Handling Code -------------
