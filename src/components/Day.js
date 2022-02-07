export default function Day(props) {
    const { day, owner, startsOn, year } = props

    // return day===0
    // ? <div className='first-day day' style={{ '--first-day-start': startsOn }}>{day + 1}</div>
    // : <div className='day'>{day + 1}</div>

    return <div
        className='first-day day'
        style={day === 0 ? { '--first-day-start': startsOn } : null}>
        <div>{day + 1}</div>
        <div className="owners">{
        (owner && year) ? owner.map(o => <span className="chip">{o}</span>) : null
        }</div>
    </div>
}