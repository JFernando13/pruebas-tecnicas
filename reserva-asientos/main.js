function showTheater(theater) {
  console.log('-'.repeat(20) + ' ESCENARIO ' + '-'.repeat(20) + '\n')
  theater.forEach(row => console.log(`|${' '.repeat(14)} ${row} ${' '.repeat(13)} |\n`))
} 

const stateSeat = {
  BUSY: 'X',
  FREE: 'L'
}

const initialTheater = Array(10).fill(null).map(() => Array(10).fill(stateSeat.FREE));

let attemps = 0
let currentAmountSeats = 0
const userAmountSeats = prompt('Cuantos asientos desea comprar?')

function reserveSeat() {
  showTheater(initialTheater)
  const seatRow = prompt('En que fila deseas sentarte?')
  const seatColumn = prompt("En que silla de esa fila deseas?")

  // intentos comprando un asiento ocupado
  if (attemps === 2) {
    currentAmountSeats = userAmountSeats
    console.log('Lo siento, ha exedido el limite de intento. Vuelva a intentarlo mas tarde')
    return
  }
  
  // Si todos los asientos estan llenos
  if (initialTheater.every(([seat]) => seat === stateSeat.BUSY)) {
    console.log('todos los asientos estan llenos')
    return
  }

  if (initialTheater[seatRow - 1][seatColumn - 1] === stateSeat.BUSY) {
    console.log('Lo siento ese asiento ya esta ocupado elige uno nuevo')
    attemps++
    reserveSeat()
  }
  
  // Si el asiento elegido esta disponible
  if (initialTheater[seatRow - 1][seatColumn - 1] === stateSeat.FREE) {
    initialTheater[seatRow - 1][seatColumn - 1] = stateSeat.BUSY
    showTheater(initialTheater)
    console.log(`Usted se ha sentado en el asiento f:${seatRow} - c:${seatColumn}`)
    currentAmountSeats++
  }

  // Vuelve a ejecutar la funcion si todavia tiene asientos por comprar
  if (currentAmountSeats < userAmountSeats) {
    console.log('Elige tu nuevo asiento')
    reserveSeat()
  }
}

reserveSeat()
