#!/usr/bin/env node

const fs = require("fs"); //file system
const path = require("path");
const colors = require("colors");

// Estos son los parametros de la función mdLinks

const userRoute = process.argv[2]; // guarda la ruta ingresada por el usuario
const option = process.argv[3]; // guarda la opción ingresada por el usuario
console.log("Ruta ingresada por le usuario: ".green + userRoute);
console.log("Option: ".red + option);

// 1- Verificar si la ruta es absoluta, si no lo es cambiar a absoluta (FUNCIÓN 2)
const absoluteRoute = (userRoute) => {
  const pathAbsolute = path.isAbsolute(userRoute);
  if (pathAbsolute === false) {
    const changedPath = path.resolve(userRoute);
    return changedPath;
  }
  return userRoute;
};
console.log("Ruta aboluta: ".cyan + absoluteRoute(userRoute).cyan);

// 2- Verificar si es un directorio o un archivo


//Lee el archivo con una ruta absoluta
// const text = fs.readFileSync(absoluteRoute(userRoute), "utf-8");
// console.log("Texto encontrado en el archivo".green + text.inverse);

//index.js: Desde este archivo debes exportar una función (mdLinks).
// const mdLinks = (path, option) => {
//   // ...
// };

// module.export = {mdLinks}