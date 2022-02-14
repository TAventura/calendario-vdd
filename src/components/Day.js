export default function Day(props) {
    const { day, owner, startsOn, year, handleClick } = props

    return <div onClick={() => handleClick(day, owner)}
        className='first-day day'
        style={day === 1 ? { '--first-day-start': startsOn } : null}>
        <div>{day}</div>
        <div className="owners">{
        // (owner && year) ? <span className="chip">{owner}</span> : null
        (owner && year) ? owner.map(o => <span key={o} className="chip">{o}</span>) : null
        }</div>
    </div>
}