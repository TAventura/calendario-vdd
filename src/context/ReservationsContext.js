import React, { useState } from "react"

const Context = React.createContext({})

export function ReservationsContextProvider({children}) {
    const [reservations, setReservations] = useState([])
    return <Context.Provider value={{reservations, setReservations}}>
        {children}
    </Context.Provider>
}

export default Context