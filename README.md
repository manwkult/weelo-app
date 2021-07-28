# Weelo App

Aplicación Web para la administración de propiedades, con sus respectivas caracteristicas e imagenes de estas.
Debes de tener arriba el backend API Rest de Weelo para iniciar sesión y persistir los datos.


Este proyecto se creo con [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponibles

En el directorio del proyecto, puede ejecutar:

### `npm start`

Ejecuta la aplicación en el modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`. \
Agrupa correctamente React en el modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación se minimiza y los nombres de archivo incluyen los hash. \
¡Tu aplicación está lista para implementarse!

## Typescript

Se creo el proyecto para que fuera compatible con `typescript`.

## Antd - Ant Design

Libreria de diseño para `React`, compatible tanto con sus ultimas versiones como con `typescript`

## Store

Con `redux` se esta manejando el estado centralizado de la aplicación, se utiliza para almacenar las propiedades, validar su creación, eliminación y edición y tambien para almacenar los datos de la sesión como nombre de usuario y token `jwt` para la autorización de las solicitudes HTTP en el backend API Rest.