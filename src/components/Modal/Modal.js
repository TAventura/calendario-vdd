import reactDom from "react-dom"
import './Modal.css'

function Modal({ children }) {
    return <div className="modal">
        <div className="modal-content">
            {children}
        </div>
    </div>
}

export default function ModalPortal({ children }) {
    return reactDom.createPortal(
        <Modal>
            {children}
        </Modal>,
    document.getElementById('modal-root'))
}