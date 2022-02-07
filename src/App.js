import { useContext, useEffect, useState } from 'react';
import './App.css';
import Month from './components/Month';
import ReservationsContext from './context/ReservationsContext';

const now = new Date()
// const INITIAL_RESERVATIONS = [
//   {
//     owner: "Tomas",
//     initialDate: new Date(now),
//     endDate: new Date(now.setDate(now.getDate() + 5))
//   },
//   {
//     owner: "Lucas",
//     initialDate: new Date(now.setDate(now.getDate() + 10)),
//     endDate: new Date(now.setDate(now.getDate() + 2))
//   }
// ]

const initialYear = now.getFullYear()
const locale = 'es'
//intl son para internacionalizar el formato (idiomas)
const intlMonth = new Intl.DateTimeFormat(locale, {
  month: 'long'
})
const intlWeekDay = new Intl.DateTimeFormat(locale, {
  weekday: 'long'
})

function App() {
  const [year, setYear] = useState(initialYear)
  // const {reservations, setReservations} = useContext(ReservationsContext)

  const weekdays = [...Array(7).keys()] //0...6
  const week = weekdays.map(weekDay => {
    const weekDayName = intlWeekDay.format(new Date(2021, 10, weekDay + 1)) //tiene que ser un mes que comience en lunes
    return weekDayName
  })

  const months = [...Array(12).keys()] //0...11
  const calendar = months.map(monthKey => {
    const monthName = intlMonth.format(new Date(year, monthKey)) //nombre del mes segun idioma

    const nextMonthIndex = monthKey + 1
    //obtenemos la cantidad de dias del mes, usando el id del siguiente mes y obteniendo el dia 0 (el ultimo dia del mes anterior)
    const daysOfMonth = new Date(year, nextMonthIndex, 0).getDate()

    const startsOn = new Date(year, monthKey, 1).getDay();

    return {
      monthKey: monthKey + 1,
      monthName,
      daysOfMonth,
      startsOn
    }
  })

  useEffect(() => {
    // setReservations(INITIAL_RESERVATIONS)
  }, [])

  const handleSumbit = (evt) => {
    evt.preventDefault()
    setYear(evt.target.year.value)
  }

  return (
    <div className='App'>
      <div>
        <span>Calendario Anual de reservas villa del dique</span>
        <span>Elegir año</span>
        <form onSubmit={handleSumbit}>
          <input name='year' defaultValue={initialYear} />
          <button>Aceptar</button>
        </form>
      </div>
      <div className='main'>
        {
          calendar.map(month => {
            return (
              <Month key={calendar.indexOf(month)}
                {...month}
                weekDayNames={week}
                year={year}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
