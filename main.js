console.log("si jala");
const f1 = document.querySelector('#singup-form');

f1.addEventListener('submit', function sent() {
    const singup_email = document.querySelector('#singup-mail').value;
    const singup_pass = document.querySelector('#singup-pass').value;

    // objeto auth perteneciente a librerias de firebase 

    auth.createUserWithEmailAndPassword(singup_email,singup_pass).catch(function (error) {
        var error_cod = error.code;
        var error_mess = error.message;
        console.log(error_cod+" "+error_mess);
    });
});

// login

const siginForm = document.querySelector('#login-form');

siginForm.addEventListener('submit', e => {
    e.preventDefault();
    const singup_email = document.querySelector('#login-mail').value;
    const singup_pass = document.querySelector('#login-pass').value;
    
    // objeto auth perteneciente a librerias de firebase 

    auth.signInWithEmailAndPassword(singup_email,singup_pass).then(function () {
      $('#singin-window').modal('hide');
      console.log("signin");
    });
})