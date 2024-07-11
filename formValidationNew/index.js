// Query selectors

const form = document.querySelector('form');
const userAlias = document.getElementById('userAlias');
const userAliasError = document.getElementById('userAliasError');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const country = document.getElementById('country');
const countryError = document.getElementById('countryError');
const zipcode = document.getElementById('zipcode');
const zipcodeError = document.getElementById('zipcodeError');
const password = document.getElementById('password');
const passwordError = document.getElementById('passwordError');
const passwordConfirm = document.getElementById('passwordConfirm');
const passwordConfirmError = document.getElementById('passwordConfirmError');
const formError = document.getElementById('formError');

// Using the Constrain Validation API

userAlias.addEventListener("input", () => {
    let messages = messagesOptions();

    messages["tooShort"] = "Must be at least 5 characters long";
    messages["typeMismatch"] = "Only can be alphabetic characters";
    messages["patternMismatch"] = "Special Characters or spaces are not allowed"

    cleanFormError()
    errorWrapper(userAlias, userAliasError, messages);
});

email.addEventListener("input", () => {
    let messages = messagesOptions();

    messages["tooShort"] = "Must be at least 8 characters long.";
    messages["typeMismatch"] = "Invalid format.";
    messages["tooLong"] = "Can't be more than 30 characters long.";

    cleanFormError()
    errorWrapper(email, emailError, messages);
});

zipcode.addEventListener("input", () => {
    let messages = messagesOptions();

    messages["patternMismatch"] = "Only numbers allowed";
    messages["tooShort"] = "Must be at least 4 digits long.";
    messages["tooLong"] = "Can't be more than 4 digits long.";

    cleanFormError()
    errorWrapper(zipcode, zipcodeError, messages);
});

password.addEventListener("input", () => {
    let messages = messagesOptions();

    messages["tooShort"] = "Must be at least 8 characters long.";
    messages["tooLong"] = "Must be less than 16 characters long";

    cleanFormError()
    errorWrapper(password, passwordError, messages);
});

passwordConfirm.addEventListener("input", () => {
    let messages = messagesOptions();

    if (password.value != passwordConfirm.value) {
        passwordConfirm.setCustomValidity("The passwords do not match");
    } else {
        passwordConfirm.setCustomValidity("");
    }

    cleanFormError()
    errorWrapper(passwordConfirm, passwordConfirmError, messages);
});

form.addEventListener("submit", (event) => {
    let fields = [userAlias, email, country, zipcode, password, passwordConfirm];

    for (let field of fields) {
        if(field.validity.valid == false) {
            event.preventDefault();
            formError.classList.add("show");
            formError.textContent = "The are errors in the form"
        }
    }

});

function returnInvalids(validationTarget) {
    let validityArray = validationTarget.validity;
    let invalids = [];

    //Check validity for every option
    for(let key in validityArray) {
        if (validityArray[key]) {
            invalids.push(key);
        }
    }
    return invalids[0] == "valid" ? ( false) : ( invalids);
}

function messagesOptions() {
    return {
        valueMissing: "This field is required",
        typeMismatch: "Invalid sintax",
        patternMismatch: "Invalid pattern",
        tooLong: "This cant be more than 10 characters long",
        tooShort: "This has to be at least 10 characters long",
        rangeUnderflow: "The number is under the limit",
        rangeOverflow: "The number is over the limit",
        stepMismatch: "The step is invalid",
        badInput: "Value not recognized",
        customError: "The passwords do not match",
    }
};

function appendErrorMessages(errorSpan, messages) {
    let errorList = document.createElement("div");
    errorSpan.innerHTML = "";
    errorList.classList.add("errorMessages");

    for (let message in messages) {
        let errorItem = document.createElement("p");

        errorItem.textContent = messages[message];
        errorList.appendChild(errorItem);
    }
    errorSpan.appendChild(errorList);
};

function errorWrapper(validationTarget, errorSpan, messagesOptions) {
    let invalidKeys = returnInvalids(validationTarget);
    let messages = [];

    for (let index in invalidKeys) {
        messages.push(messagesOptions[invalidKeys[index]]);
    }

    appendErrorMessages(errorSpan, messages);
}

function cleanFormError() {
    formError.classList.remove("show");
}
