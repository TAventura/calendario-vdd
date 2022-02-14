import React from 'react'
import '../App.css'
import useReservedDay from '../hooks/useReservedDay'
import Day from './Day'

export default function Month(props) {
    const { monthKey, monthName, daysOfMonth, startsOn, weekDayNames, year } = props
    const { reservedDays, handleSelection } = useReservedDay({ monthKey, year })

    var arrayOfDays = [...Array(daysOfMonth).keys()].map(day => day+1)

    arrayOfDays = arrayOfDays.map(day => {
        const coincidence = reservedDays.find(reservedDay => new Date(reservedDay.date).getDate() === day)
        if (coincidence) {
            // console.log(coincidence)
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
                    return <Day key={day.date ? new Date(day.date).getDate() : day}
                        day={day.date ? new Date(day.date).getDate() : day}
                        owner={day.owner ? day.owner : null}
                        year={year === new Date(day?.date).getFullYear() ? new Date(day.date).getFullYear() : null}
                        startsOn={startsOn} handleClick={handleSelection} />
                })
            }</ol>
        </div>
    )
}

