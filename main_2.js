// prueba de conexion
console.log("keep it taco");

// registro de profesores
const save_teacher = (Nombre,Email,Password) =>
fs.collection('teachers').doc().set({
    Nombre,
    Email,
    Password
});

const form_prof = document.querySelector("#professor-form");
form_prof.addEventListener('submit', async e =>{
    e.preventDefault();
    const name_form = document.querySelector('#name_form_prof');
    const email_form = document.querySelector('#email_form_prof');
    const pass_form = document.querySelector('#pass_form_prof');
    await save_teacher(name_form.value,email_form.value,pass_form.value);
    console.log("name "+name_form.value+" pass "+ pass_form.value+" email "+ email_form.value);
    form_prof.reset();
    name_form.focus();
})

// impresion de datos
const teachers_list = document.querySelector('.ls_teach');
const setup_teach = data => {
    if(data.length){
        let html = '';
        data.forEach((doc) => {
            const teacher = doc.data();
            const li = `
            <li class="list-group-item list-group-item-action">
              <h5>${teacher.Nombre}</h5>
              <p>${teacher.Email}</p>
            </li>
          `;
        html += li;
        });
        teachers_list.innerHTML = html;
    }else{
        teachers_list.innerHTML = '<h1> Inicia sesion por favor </h1>';
    }
}
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

// estado del usuario y ventana 


auth.onAuthStateChanged(user =>{
    if (user){
        fs.collection('teachers')
        .get()
        .then((snapshot) =>{
            setup_teach(snapshot.docs);
        });
    }else{
        setup_teach([]);
    }
})