import { useCallback, useEffect, useState } from "react";

const now = new Date()
const INITIAL_RESERVATIONS = [
  {
    owner: ["Tomas"],
    date: new Date(now),
    endDate: new Date(now.setDate(now.getDate() + 5))
  },
  {
    owner: ["Tomas", "Ana Laura"],
    initialDate: new Date(now.setDate(now.getDate() + 10)),
    endDate: new Date(now.setDate(now.getDate() + 2))
  }
]

export default function useReservedDay({ monthKey, year }) {
  const [reservedDays, setReservedDays] = useState([])
  const [reservations] = useState(INITIAL_RESERVATIONS)

  const getDays = useCallback(() => {
    reservations
      .filter(reservation => reservation.initialDate.getMonth() + 1 === monthKey && reservation.initialDate.getFullYear() === year)
      .forEach(reservation => {
        var currentDate = reservation.initialDate
        while (currentDate <= reservation.endDate) {
          // console.log('loop reserv')
          const reserv = {
            day: currentDate.getDate(),
            year: currentDate.getFullYear(),
            owner: reservation.owner
          }
          // console.log(reserv)
          setReservedDays(prev => prev.concat(reserv))
          // dateArray.concat(reserv)
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
        }
      })
  }, [monthKey, reservations, year])

  useEffect(() => {
    getDays()
  }, [])

  return {
    reservedDays
  }
}