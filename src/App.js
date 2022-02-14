import { useState } from 'react';
import './App.css';
import Month from './components/Month';
import Modal from './components/Modal/Modal.js'
import LoginForm from './components/Login/LoginForm';
import Logout from './components/Logout';

const now = new Date()

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

  const [showModal, setShowModal] = useState(true)
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
      monthKey: monthKey,
      monthName,
      daysOfMonth,
      startsOn
    }
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setYear(parseInt(evt.target.year.value))
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className='App'>
      <Logout setShowModal={setShowModal} />
      <div className='header'>Calendario Anual de reservas villa del dique</div>
      <span className='m5'>Elegir año</span>
      <form onSubmit={handleSubmit}>
        <input name='year' defaultValue={initialYear} />
        <button>Aceptar</button>
      </form>
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
      {showModal && <Modal onClose={handleClose}><LoginForm handleClose={handleClose} /></Modal>}
    </div>
  );
}

export default App;
