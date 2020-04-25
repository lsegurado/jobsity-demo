# Ejercicio - Agenda (frontend)

Realizar una aplicación del tipo "Agenda de Contactos" que incluya un acceso seguro a través de formulario de login con usuario y contraseña. 

Una vez en el sistema listar los contactos mostrando información básica (por ejemplo, solo nombre y apellido).  hacer click en el contacto, desplegar mayor información. 


## Aclaraciones:

* La aplicación web debe estar desarrollada con React.js

* No es necesario crear una API de servicios propia. Se recomienda utilizar https://reqres.in/ o algún servicio similar. 

* Se pueden utilizar las librerías de npm que considere necesario


## Se valorará:

* Manejo de errores.

* Orden y estructura en el código.

* Diseño, estética y UX de la aplicación.


## Requerimientos:


### Formulario de Login:

* Campos de login con validación: 
    * email: requerido. Solo formato de correo válido 
    * password: requerido
* Campo de password con posibilidad de hacer visible la contraseña ingresada
* Botón de acceso


### Pantalla de Lista de contactos:

* Mostrar el nombre del usuario logeado. 

* Obtener del servicio un listado de contactos y mostrar información reducida. 

* Al hacer click o interactuar con cada contacto, se debe mostrar mayor información. Por ejemplo: foto de perfil, email, etc.