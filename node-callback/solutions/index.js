/* 1 - Arregla esta función para que el código posterior funcione como se espera: **/

import fs from 'node:fs'
import net from 'node:net'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    // return { time: process.hrtime(startTime), ip } <- Aqui no entra pq necesita un callback
    // Primer parametro: error, Segundo parametro: info
    callback(null, { time: process.hrtime(startTime), ip })
  })
  
  client.on('error', (err) => {
    client.end()
    callback(err)
    // throw err <- Lo vamos a manejar con un callback
  })
}

// ping('midu.dev', (err, info) => {
//   if (err) console.error(err)
//   console.log(info)
// })

/** 2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks: */

export function obtenerDatosPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' })
    }, 2000);
  })
}

/** 3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código. Si ves algo innecesario, elimínalo. Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad. */

// SIN PROMESAS
export function procesarArchivo(callback) {
  const handleWrite = error => {
    if (error) {
      console.error('Error guardando archivo:', error.message);
      return callback(error);
    } 

    callback(null, 'Archivo procesado y guardado con éxito')
  }

  const handleRead = (error, contenido) => {
    if (error) {
      console.log('Error leyendo archivo:', error.message)
      return callback(error) // Manejo de error y salida de la funcion
    }

    // Procesamiento de datos (si no hay error)
    const textoProcesado = contenido.toUpperCase();
    fs.writeFile('output.txt', textoProcesado, handleWrite);
  }

  fs.readFile('input.txt', 'utf8', handleRead)
}

// CON PROMESAS
export async function procesarArchivoPromise() {
  const contenido = await fs.promises.readFile('input.txt', 'utf8')  
    .catch(error => { throw `${error.message} on ${error.path}` })
  
  const textoProcesado = contenido.toUpperCase();

  await fs.promises.writeFile('output.txt', textoProcesado)
    .catch(error => { throw error.message })

  return 'Archivo procesado y guardado con éxito'
}

/** 4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario: */

export async function leerArchivos() {
  console.time('read files')
  // CASO 1: Sincrono
  // const archivo1 = fs.readFileSync('archivo1.txt', 'utf8');
  // const archivo2 = fs.readFileSync('archivo2.txt', 'utf8');
  // const archivo3 = fs.readFileSync('archivo3.txt', 'utf8');

  // CASO 2: Asincrono con await
  // const archivo1 = await fs.promises.readFile('archivo1.txt', 'utf8');
  // const archivo2 = await fs.promises.readFile('archivo2.txt', 'utf8');
  // const archivo3 = await fs.promises.readFile('archivo3.txt', 'utf8');

  // CASO 3: Asincrono con Promise.all
  // const [archivo1, archivo2, archivo3] = await Promise.all([
  //   fs.promises.readFile('archivo1.txt', 'utf8'),
  //   fs.promises.readFile('archivo.txt', 'utf8'),
  //   fs.promises.readFile('archivo3.txt', 'utf8')
  // ]).catch(err => console.error(err.message))

  // CASO 4: Asincrono con Promise.allSettled
  const archivos = await Promise.allSettled([
    fs.promises.readFile('archivo1.txt', 'utf8'),
    fs.promises.readFile('archivo.txt', 'utf8'),
    fs.promises.readFile('archivo2.txt', 'utf8'),
    fs.promises.readFile('archivo3.txt', 'utf8')
  ])

  const message = archivos
    .filter(({value}) => value !== undefined)
    .map(({value}) => value).join(' ')

  console.timeEnd('read files')
  return message
}

/** 5 - Escribe una funcion delay que retorne una promesa que se resuelva después de n milisegundos. */

export async function delay(time) {
  return new Promise((response) => {
    setTimeout(response, time)
  })
}

/** Vamos a crear nuestra propia utilidad `dotenv` en el archivo `dotenv.js` */
import dotenv from './dotenv'

dotenv.config('./config/.env.local')
console.log(process.env.PASSWORD_KEY)
console.log(process.env.LOCAL_VARIABLE)
