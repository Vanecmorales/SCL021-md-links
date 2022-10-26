#!/usr/bin/env node

const fs = require("fs"); //file system
const path = require("path");
const colors = require("colors");
const markdownLinkExtractor = require("markdown-link-extractor");
const linkCheck = require("link-check");

// Estos son los parametros de la función mdLinks
const userRoute = process.argv[2]; // guarda la ruta ingresada por el usuario
const option = process.argv[3]; // guarda la opción ingresada por el usuario

// 1- Verificar si la ruta es absoluta, si no lo es cambiar a absoluta
const absoluteRoute =
  path.isAbsolute(userRoute) === true ? userRoute : path.resolve(userRoute);
console.log("1-La ruta aboluta es: ".cyan, absoluteRoute.yellow);

// 2- Comprobar si la ruta ingresada existe
const routeExist = () => fs.existsSync(absoluteRoute);
console.log("2-¿Es una ruta real?: ".cyan, routeExist());

// 3- Verificar si es un archivo o directorio
const fileOrDirectory = () => {
  const file = fs.statSync(absoluteRoute).isFile();
  file === true ? console.log("3-Sí, esto es un archivo".rainbow) : console.log("3-Esto es un directorio".red);
};
fileOrDirectory(absoluteRoute);

// 4- Obtener extensión de los archivos
const fileExtension = () => {
  return path.extname(absoluteRoute) === ".md";
};
console.log("4-¿La extensión del archivo es md?".cyan, fileExtension());

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

// 6- Extraer links de archivos .md (con la librería)

const extractLinks = (absoluteRoute) => {
  const markdownFile = fs.readFileSync(absoluteRoute, { encoding: "utf-8" });
  const { links } = markdownLinkExtractor(markdownFile);
  console.log("Estos son los links: ", links);
  return links;
};

// 6.1- Muestras todos los links de diferentes archivos en un solo arreglo
let urlResult = [];
readDirectory(absoluteRoute)
  .then((files) => {
    files.forEach((file) => {
      const rutaAbsolutaArchivo = path.resolve(__dirname, "test-files", file);
      console.log({ rutaAbsolutaArchivo });
      urlResult = [...urlResult, ...extractLinks(rutaAbsolutaArchivo)];
      //spread operator: permite que los elementos de uno o más arreglos se unan en uno nuevo
    });
  })
  .finally(() => {
    console.log({ urlResult });
  });