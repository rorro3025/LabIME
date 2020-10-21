// prueba de conexion
console.log("si jala");

// registro de usuario 

const f1 = document.querySelector('#singup-form');

f1.addEventListener('submit', (e) => {
    e.preventDefault();
    const singup_email = document.querySelector('#singup-mail').value;
    const singup_pass = document.querySelector('#singup-pass').value;

    // objeto auth perteneciente a librerias de firebase 

    auth.createUserWithEmailAndPassword(singup_email,singup_pass).then(userCredencial => {
        f1.reset();
        $('#singup-window').modal('hide');
        console.log("registrado");
    });
});

// login

const siginForm = document.querySelector('#login-form');

siginForm.addEventListener('submit', e => {
    e.preventDefault();
    const singin_email = document.querySelector('#login-mail').value;
    const singin_pass = document.querySelector('#login-pass').value;
    
    // objeto auth perteneciente a librerias de firebase 

    auth.signInWithEmailAndPassword(singin_email,singin_pass).then(function () {
      $('#singin-window').modal('hide');
      console.log("signin");
    });
})