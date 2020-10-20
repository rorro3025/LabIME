console.log("si jala");
const f1 = document.querySelector('#singup-form');

f1.addEventListener('submit', function sent() {
    const singup_email = document.querySelector('#singup-mail').value;
    const singup_pass = document.querySelector('#singup-pass').value;
    
    auth.createUserWithEmailAndPassword(singup_email,singup_pass).then(function validar() {
        alert("no ce we");
    });
});
