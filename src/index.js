#!/usr/bin/env node

const fs = require("fs"); //file system
const path = require("path");
const colors = require("colors");

// Estos son los parametros de la función mdLinks
const userRoute = process.argv[2]; // guarda la ruta ingresada por el usuario
const option = process.argv[3]; // guarda la opción ingresada por el usuario

// 1- Verificar si la ruta es absoluta, si no lo es cambiar a absoluta
const absoluteRoute = 
  path.isAbsolute(userRoute) === true ? userRoute : path.resolve(userRoute);
console.log("1-La ruta aboluta es: ".green, absoluteRoute.yellow);

// 2- Comprobar si la ruta ingresada existe
const routeExist = () => fs.existsSync(absoluteRoute);
console.log("2-¿Es una ruta real?: ".green, routeExist());

// 3- Verificar si es un archivo o directorio
const fileOrDirectory = () => {
  const file = fs.statSync(absoluteRoute).isFile();  
  file === true ? console.log("3-Sí, esto es un archivo".rainbow) : console.log("3-Esto es un directorio".red)
  // const stats = fs.statSync(absoluteRoute);
  // const file = stats.isFile();
    // if (file === true){
  //   return console.log("3-Sí es un archivo".rainbow)
  // }
  // return console.log("3-Lo siento, esto es un directorio".red)
};
fileOrDirectory(absoluteRoute);

// 4- Obtener extensión de los archivos
const fileExtension = () => {
  return path.extname(absoluteRoute) === ".md";
};
console.log("4-¿La extensión del archivo es md?".green, fileExtension());

// 5- Buscar archivos .md en un directorio
const readDirectory = (absoluteRoute) => {
  return new Promise((resolve, reject) => {
    const arrFiles = [];
    fs.readdir(absoluteRoute, "utf8", (err, files) => {
      if (err) {
        reject("Error".red, err);
      }
      files.forEach((file) => {
        if (path.extname(file) === ".md") {
          console.log("Archivo válido encontrado: ".green, file.yellow);
          arrFiles.push(file);
        }
      });
      resolve(arrFiles);
    });
  });
};
console.log("5-Archivos encontrados".cyan, readDirectory(absoluteRoute));

// 0- Leer el archivo
// const readContent = fs.readFile(absoluteRoute, "utf-8", (error, data) => {
//     if (error) {
//       console.log("0-Ha ocurrido un error: ".red, error);
//     }
//     console.log("0-El contenido del archivo es: ".green, data.red);
//   }
// );
// console.log(readContent);

//index.js: Desde este archivo debes exportar una función (mdLinks).
// const mdLinks = (absoluteRoute, option) => {
//   // ...
// };

// module.export = { mdLinks };