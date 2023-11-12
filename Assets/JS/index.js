document.getElementById("year").value = new Date().getFullYear() + (new Date().getMonth() >= 9 ? 1 : 0);
document.getElementById("showPasswordButton").addEventListener("click", function () {
    var passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        document.getElementById("showPasswordButton").innerHTML = "Hide Password";
    } else {
        passwordInput.type = "password";
        document.getElementById("showPasswordButton").innerHTML = "Show Password";
    }
});
var afterLoginDiv = document.getElementById("after-login");
var loginDiv = document.getElementById("login");
var schoolInput = document.getElementById("schoolInput");
var yearInput = document.getElementById("year");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginButton");
var logoutButton = document.getElementById("logoutButton");
function validateForm() {
    if (
        schoolInput.value.trim() !== "" &&
        yearInput.value.trim() !== "" &&
        usernameInput.value.trim() !== "" &&
        passwordInput.value.trim() !== ""
    ) {
        loginButton.removeAttribute("disabled");
    } else {
        loginButton.setAttribute("disabled", "true");
    }
}
function logout() {
    afterLoginDiv.style.display = "none";
    loginDiv.style.display = "block";
    schoolInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";
    localStorage.setItem("semel", "");
    localStorage.setItem("password", "");
    localStorage.setItem("username", "");
}

schoolInput.addEventListener("input", validateForm);
yearInput.addEventListener("input", validateForm);
usernameInput.addEventListener("input", validateForm);
passwordInput.addEventListener("input", validateForm);
logoutButton.addEventListener("click", logout)