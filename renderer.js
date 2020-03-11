const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    database: 'sakila'

});  

conexion.connect(function(error){
    if (error){
        console.log("La conexion no puede ser establecida");
        return;
    }
    console.log("Conexion Exitosa");
})

const txtBusqueda = document.getElementById("txt-busqueda");
const formFiltrar = document.getElementById("form-filtrar");
const resultado = document.getElementById("resultados")
formFiltrar.addEventListener("submit", function(e){
    e.preventDefault();
});

txtBusqueda.addEventListener("keyup", function(evt){
   //console.log(evt.code); 
   if(evt.code === "Enter"){
      
       //Realizar busqueda en la base de datos
       conexion.query(`SELECT * FROM actor WHERE first_name LIKE ?`, [`%${txtBusqueda.value}%`], function(err, filas, campos){
           if(err){
               console.log(`Algo salio mal: ${err}`);
           }
        let html = '<div class="resultado">';
        for(let fila of filas){
            html += `<h4>${fila.first_name} ${fila.last_name}</h4>`;
        //console.log(fila.first_name);
         }
         html += "</div>"
         resultado.innerHTML = html;
       })
       conexion.query(`SELECT * FROM film WHERE title LIKE ?`, [`%${txtBusqueda.value}%`], function(err, filas, campos){
        if(err){
            console.log(`Algo salio mal: ${err}`);
        }
        let html = '<div class="resultado">';
        for(let fila of filas){
             html += `<h3>${fila.title}</h3>`;
             html += `<h4>${fila.description}</h4>`;
        //console.log(fila.first_name);
        }
        html += "</div>"
        resultado.innerHTML = html;
        })
        conexion.query(`SELECT * FROM film WHERE description LIKE ?`, [`%${txtBusqueda.value}%`], function(err, filas, campos){
        if(err){
            console.log(`Algo salio mal: ${err}`);
        }
        let html = '<div class="resultado">';
        for(let fila of filas){
            html += `<h3>${fila.title}</h3>`;
            html += `<h4>${fila.description}</h4>`;
        //console.log(fila.first_name);
        }
        html += "</div>"
        resultado.innerHTML = html;
        })
   }
})