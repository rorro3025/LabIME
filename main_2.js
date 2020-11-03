// estado del formulario
let status = false;
let id_global = '';
// prueba de conexion
console.log("keep it taco");

// registro de profesores
const save_teacher = (Nombre, Email, Password) =>
    fs.collection('teachers').doc().set({
        Nombre,
        Email,
        Password
    });

const form_prof = document.querySelector("#professor-form");
form_prof.addEventListener('submit', async e => {
    e.preventDefault();
    const name_form = document.querySelector('#name_form_prof');
    const email_form = document.querySelector('#email_form_prof');
    const pass_form = document.querySelector('#pass_form_prof');
    if (!status) {
        await save_teacher(name_form.value, email_form.value, pass_form.value);
        console.log("Profesor(a) " + name_form.value + " registrado(a)");
    }else{
        await updateTeacher(id_global,{
            Nombre: name_form.value,
            Email: email_form.value,
            Password: pass_form.value
        });
        status = false
        form_prof["btn-action"].innerHTML = "Registrar";
    }
    form_prof.reset();
    name_form.focus();
})
// eliminar profesor 
const deleteTeacher = id => fs.collection("teachers").doc(id).delete();
// editar profesor 
const getTeach = (id) => fs.collection("teachers").doc(id).get();
// actualizar profesor
const updateTeacher = (id,teacher_up) => fs.collection("teachers").doc(id).update(teacher_up);
// mostar profesor
const teachers_list = document.querySelector('.ls_teach');
const setup_teach = data => {
    if (data.length) {
        let html = '';
        data.forEach((doc) => {
            const teacher = doc.data();
            var id_bot = doc.id;
            const li = `
            <li class="list-group-item list-group-item-action">
              <h5>${teacher.Nombre}</h5>
              <p>${teacher.Email}</p>
              <button class="btn btn-primary borrar_bot" data-id="${id_bot}">Eliminar</button>
              <button class="btn btn-secondary update_bot" data-id="${id_bot}">Editar</button>
            </li>
          `;
            html += li;
        });
        teachers_list.innerHTML = html;
    } else {
        teachers_list.innerHTML = '<h1> Inicia sesion por favor </h1>';
    }
}
// cerrar sesion 

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth
        .signOut()
        .then(() => {
            alert("Cerraste sesion");
        });
});

// estado del usuario y ventana 

// on get teacher
const onGetTeacher = (callback) => fs.collection('teachers').onSnapshot(callback);
auth.onAuthStateChanged(user => {
    if (user) {
        onGetTeacher((querySnapshot) => {
            setup_teach(querySnapshot.docs);
            setListenersDelete();
            setListenersUpdate();
        })
    } else {
        setup_teach([]);
    }
})

function setListenersDelete() {
    var array_bot = document.querySelectorAll('.borrar_bot');
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', () => {
            deleteTeacher(array_bot[index].getAttribute('data-id'));
            console.log("Se elimino dato");
        });
    }
}

function setListenersUpdate() {
    var array_bot = document.querySelectorAll('.update_bot');
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', async () => {
            var id_num = array_bot[index].getAttribute('data-id');
            var doc = await getTeach(id_num);
            const teacher = doc.data();
            form_prof['name_form_prof'].value = teacher.Nombre;
            form_prof['email_form_prof'].value = teacher.Email;
            form_prof['pass_form_prof'].value = teacher.Password;
            status = true;
            id_global = id_num;
            alert(id_global);
            form_prof["btn-action"].innerHTML = "actualizar";
        });
    }
}
