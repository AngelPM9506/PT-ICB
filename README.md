# PT-ICB T3 App

Lista la creación de una pequeña tienda virtual con carrito simple, con todas las bondades de utilizar T3-APP
Donde se utiliza: 
<ul>
    <li> NextJS (Framwork de React) </li>
    <li> Prisma (Con PostgrSQL) </li>
    <li> TRPC (Conexion entre back y front) </li>
    <li> Tailwind (Estilos)</li>
    <li> TypeScript </li>
</ul>

Para utilizar esta pequeña demostración solo se tiene que cambiar la siguiente variable de entorno a una url de una base de datos de PostgreSQL.

 ```sh
  DATABASE_URL=postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}
  ```
  ### Posterior a esto
  
  Ejecutar los siguientes comandos en orden y ya se podrá observar en el host designado, si es localhost se podrá interactuar con el puerto 3000
  
   ```sh
  yarn pushDB
  yarn dev
  ```
  
  Si no se tiene un manejador de mases de datos puedes usar el siguiente comendo para interactuar directamente con la base de datos
  
  ```sh
  yarn studioDB
  ```
