import { useContext } from "react"
import UserContext from "../../context/UserContext"

const FAMILIARES = [
    "Tomas",
    "Lucas",
    "Benjamon",
    "Sofia",
    "Ana Laura",
    "Andrea",
    "Ana",
    "Pablo",
    "Gaston"
]

export default function LoginForm({handleClose}) {
    const { setUser } = useContext(UserContext)

    const handleChange = (evt) => {
        setUser(evt.target.value)
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault()
        handleClose()
    }

    return <div>
        <h4>Seleccionar Usuario</h4>
        <form onSubmit={handleSubmit}>
            <select onChange={handleChange}>
                {FAMILIARES.map(familiar => <option key={familiar} value={familiar}>{familiar}</option>)}
            </select>
            <br></br>
            <button>Iniciar Sesion</button>
        </form>
        </div>
    
}