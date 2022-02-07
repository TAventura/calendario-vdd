import React from 'react'
import '../App.css'
import useReservedDay from '../hooks/useReservedDay'
import Day from './Day'

export default function Month(props) {
    const { monthKey, monthName, daysOfMonth, startsOn, weekDayNames, year } = props
    const { reservedDays } = useReservedDay({ monthKey, year })

    var arrayOfDays = [...Array(daysOfMonth).keys()]

    arrayOfDays = arrayOfDays.map(day => {
        const coincidence = reservedDays.find(reservation => reservation.day === day)
        if (coincidence) {
            console.log(coincidence)
            return coincidence
        } else {
            return day
        }
    })

    return (
        <div className='month'>
            <h4 className='Month-title'>{monthName} {year}</h4>
            <ol className='calendar-header'>{
                weekDayNames.map((day) => {
                    return (
                        <li key={day}>{day.substring(0, 1).toUpperCase()}</li>
                    )
                })
            }</ol>
            <ol className='calendar-body'>{
                arrayOfDays.map((day) => {
                    return <Day key={day.day ? day.day : day}
                    day={day.day ? day.day : day}
                    owner={day.owner ? day.owner : null}
                    year={year === day.year ? day.year : false}
                    startsOn={startsOn} />
                })
            }</ol>
        </div>
    )
}

