# whac-a-mole-pwa

Simple PWA con el juego de Whac-A-Mole.

## Ejecutar:

```
npm i
npm run start
```

## Enunciado:

Queremos que crees una app móvil web progresiva basada en el juego de “Toca al topo”. Si no lo conoces no pasa nada, a continuación te detallamos el funcionamiento del mismo.

La aplicación debe tener una primera vista “home” en la que el usuario introducirá su nombre para registrarse y empezar el juego. Esta primera vista deberá ser la ruta por defecto y cualquier acceso a una ruta que no exista debería redirigir a dicha vista.

La vista “home” contendrá al menos un campo de texto para introducir el nombre del jugador y un botón para iniciar el juego. El botón validará que se ha introducido un nombre de usuario válido antes de iniciar el juego.

Una vez se ha creado el usuario, se transiciona a la vista de juego “game” siendo ésta una nueva ruta dentro de la app.

La vista “game” mostrará el nombre del jugador, los puntos que tiene, la selección de nivel de dificultad “bajo” “medio” “alto” y un botón para comenzar el juego.

Cada vez que se haga click en el botón Play, se mostraran 9 cuadros donde aparecen de manera aleatoria un topo. Si el usuario consigue “matarlo” se actualizaran los puntos según el nivel de dificultad que tenga seleccionado

El nivel de dificultad influye en la velocidad del cambio de posición aleatoria de los topos.

La aplicación deberá funcionar offline, es decir, si en nuestro dispositivo activamos el modo avión y volvemos a la app tras haberla abierto al menos una vez, se podrá acceder a la misma sin problemas.

La aplicación deberá estar desplegada y disponible públicamente.

## Requisitos:

- La aplicación deberá contener funcionalmente, como mínimo, las instrucciones detalladas en el enunciado.
- El código debe ser público
- Se deberán realizar tests unitarios de las vistas y de los componentes de la aplicación.
- Se podrá utilizar cualquier infraestructura de alojamiento pública como, por ejemplo, Vercel, Netlify o Github Pages.
- Se debe subir un fichero README.md al repositorio con las instrucciones para hacer funcionar la aplicación en local. Puedes añadir cualquier otro dato que consideres necesario.

## Otras consideraciones:

- La calidad, claridad y limpieza del código.
- El uso de componentes reutilizables.
- La realización de otro tipo de tests.
- Herramientas de análisis estático y formateo de código que mejoren la experiencia del desarrollador.
- Mejoras en el flujo y la metodología de desarrollo, construcción y despliegue.
- Otras características que consideres importantes para una aplicación web progresiva.

## Entregable

Envíanos un enlace al repositorio en el que se encuentre el código de la aplicación y un enlace con la aplicación desplegada.

## Bonus points

- Mostrar varios topos a la vez (Puede seleccionarse desde la página Game - moleNumber)
- Incluir vibración en el dispositivo cada vez que el usuario mate un topo. (Añadida a través del método `Navigator: vibrate()`)
- Capacidad de seleccionar el número de celdas de la aplicación (desde la página Game - cellNumber)
