import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

export default function useReservedDay({ monthKey, year }) {
	const { user } = useContext(UserContext)
	const [reservedDays, setReservedDays] = useState(JSON.parse(window.localStorage.getItem("reservedDays")) || [])
	const reservations = reservedDays
		.filter(reservation => new Date(reservation.date).getMonth() === monthKey
			&& new Date(reservation.date).getFullYear() === year)

	const handleSelection = (dayIndex, owners) => {
		console.log(dayIndex, owners, year, monthKey)
		if (owners && owners.includes(user)) {
			removeReservation(new Date(year, monthKey, dayIndex), user)
		} else {
			addReservation(new Date(year, monthKey, dayIndex), user)
		}
	}

	const addReservation = (date, newOwner) => {
		const match = reservedDays.findIndex(day => new Date(day.date).getTime() === date.getTime())
		if (match !== -1) { //agregar owner a la reserva
			var newState = [...reservedDays] //IMPORTANTISIMO USAR EL SPREAD SI QUEREMOS COPIAR EL STATE. caso contrario, no actualiza bien el estado luego
			newState[match].owner = newState[match].owner.concat(newOwner)
			window.localStorage.setItem("reservedDays", JSON.stringify(newState))
			setReservedDays(newState)
		} else { //crear nueva reserva
			const newState = reservedDays.concat({ owner: [newOwner], date })
			window.localStorage.setItem("reservedDays", JSON.stringify(newState))
			setReservedDays(newState)
		}
	}

	const removeReservation = (date, owner) => {
		const match = reservedDays.findIndex(reservedDay => new Date(reservedDay.date).getTime() === date.getTime())
		if (reservedDays[match].owner.length > 1) { //quitar owner de la lista
			var newState = [...reservedDays]
			const indexOwner = newState[match].owner.indexOf(owner)
			newState[match].owner.splice(indexOwner, 1)
			window.localStorage.setItem("reservedDays", JSON.stringify(newState))
			setReservedDays(newState)
		} else { //quitar reserva entera
			const newState = reservedDays.filter(reservedDay => new Date(reservedDay.date).getTime() !== date.getTime())
			window.localStorage.setItem("reservedDays", JSON.stringify(newState))
			setReservedDays(newState)
		}
	}

	return {
		reservedDays: reservations,
		handleSelection
	}
}