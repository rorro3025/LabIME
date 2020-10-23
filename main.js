// prueba de conexion
console.log("si jala");

// registro de usuario 

const f1 = document.querySelector('#singup-form');

f1.addEventListener('submit', (e) => {
    e.preventDefault();
    const singup_email = document.querySelector('#singup-mail').value;
    const singup_pass = document.querySelector('#singup-pass').value;

    // objeto auth perteneciente a librerias de firebase 

    auth
        .createUserWithEmailAndPassword(singup_email,singup_pass)
        .then(userCredencial => {
                f1.reset();
                $('#singup-window').modal('hide');
                console.log("registrado");
            })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
              alert('El correo ya a sido utilizado');
              $('#singup-window').modal('hide');
            } else {
              alert(errorMessage);
              $('#singup-window').modal('hide');
            }
            console.log(error);
          });
});

// login

const siginForm = document.querySelector('#login-form');

siginForm.addEventListener('submit', e => {
    e.preventDefault();
    const singin_email = document.querySelector('#login-mail').value;
    const singin_pass = document.querySelector('#login-pass').value;
    
    // objeto auth perteneciente a librerias de firebase 

    auth
        .signInWithEmailAndPassword(singin_email,singin_pass)
        .then(function () {
                $('#singin-window').modal('hide');
                alert("signin");
               })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/user-not-found') {
              alert('Usuario no registrado');
              $('#singin-window').modal('hide');
            } else {
              alert(errorMessage);
              $('#singin-window').modal('hide');
            }
            console.log(error);
          });
})

// cerrar sesion 

const logout = document.querySelector('#logout');

logout.addEventListener('click', e =>{
    e.preventDefault();
    auth
        .signOut()
        .then(() =>{
            alert("Cerraste sesion");
                });
});

// consulta BD 

const ls = document.querySelector('.ls_alumnos');


// eventos (sesion iniciada o no )

auth.onAuthStateChanged(user =>{
    if (user){
        console.log("sesion on");
    }else{
        console.log("sesion cerrada");
    }
})