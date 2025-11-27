const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const form = document.getElementById('registration-form');

form.addEventListener('submit', function (e) {
    // when we want the page to don't get refreshed 
    e.preventDefault();

    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormvalid = isRequiredValid;
    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordMatch = checkPasswordMatch(password, confirmPassword);
        isFormvalid = isUsernameValid && isEmailValid && isPasswordMatch && isPasswordValid;
    }

    if (isFormvalid) {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll('.form-group').forEach((group) => {
            group.className = "form-group";
        })
    }
})

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(email) {
    //it's count the regex values that hold the email chech or not actually
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "Email is not valid");
        return false;
    }
}

function checkPasswordMatch(password, confirmPassword) {
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "passwords do not match..");
        return false;
    } else {
        return true;
    }
}

function checkRequired(inputarray) {
    let isValid = true;
    inputarray.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${formatFieldName(input)} is required`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

function formatFieldName(input) {
    //return the text of the this id but after the first item is changed to captial letter 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    // if we have an error it will remove the form-group class from the div that have the label and the input and put this class instead of it 
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;

}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success"

}