# Implementación Árbol General de Nodos

Este proyecto es una implementación de un servicio RESTful en TypeScript y NestJS para gestionar un árbol general de nodos. La aplicación permite realizar operaciones CRUD en nodos y obtener el nodo raíz desde cualquier nodo. Utiliza MongoDB como base de datos y está configurado con Docker y Docker Compose.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Scripts de Seed](#scripts-de-seed)

## Requisitos

- Node.js (v14 o superior)
- Docker
- Docker Compose

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/diegovaldesjr/node-tree.git
   cd node-tree
   ```

## Configuración

1. **Configura el archivo `.env`:**
    
    Crea un archivo `.env` en la raíz del proyecto, aquí un ejemplo:
    
    ```
    MONGO_URI=mongodb://mongo:27017/nodes_data
    PORT=3000
    ```
    
    Este archivo define la URL de conexión a MongoDB, con `mongo` como el nombre del servicio definido en `docker-compose.yml`.
    

## Uso

1. **Inicia los contenedores Docker:**
    
    Construye las imágenes y levanta los contenedores para la aplicación y MongoDB con:
    
    ```bash
    docker-compose up --build
    ```
    
2. **Accede a la aplicación:**
    
    La aplicación estará disponible en http://localhost:PORT.
    

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
    - **scripts/**: Contiene scripts para tareas como el seeding de la base de datos (`seed.ts`).
    - **nodes/**: Contiene la lógica y servicios relacionados con los nodos.
    - **app.module.ts**: Configuración del módulo principal de la aplicación.
- **docker-compose.yml**: Configuración de Docker Compose para la aplicación y MongoDB.
- **Dockerfile**: Archivo para construir la imagen Docker de la aplicación.
- **.env**: Archivo para definir las variables de entorno.
- **seed-data.json**: Archivo JSON con datos iniciales para la base de datos.

## Endpoints

- **POST /nodes**: Inserta un nuevo nodo.

```json
//Body
{
	"name": "node",
	"parentId": "" //Campo opcional
}
```

- **PUT /nodes/:id**: Edita un nodo existente.

```json
//Body
{
	"name": "node"
}
```

- **DELETE /nodes/:id**: Elimina un nodo y sus hijos.
- **GET /nodes/root/:id**: Obtiene el nodo raíz desde un nodo dado.
- **GET /nodes/:id**: Obtiene un nodo por su ID.
- **GET /nodes/**: Obtiene todos los nodos.

## Scripts de Seed

Para llenar el árbol con datos iniciales, asegúrate de que el archivo `seed-data.json` esté en la raíz del proyecto. Luego, ejecuta el script de seed con:

```bash
npm run seed
```

Este comando leerá los datos de `seed-data.json` y los insertará en la base de datos.

### Formato de archivo JSON

Es un archivo formato JSON donde el árbol empieza desde *nodes*, cada nodo tendrá su campo *name* y *children*, en el cual tendría los hijos del nodo. Acá, les dejo un ejemplo:

```json
{
  "nodes": [
    {
      "name": "node-1",
      "children": [
        {
          "name": "node-3"
        }
      ]
    },
    {
      "name": "node-2"
    }
  ]
}
```