import {useRef, useEffect, useState , useContext} from "react";
import {Portal} from "../portal/Portal";
import {CSSTransition} from "react-transition-group";
import useAppointmentService from "../../services/AppointmentService";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";

import "./modal.scss";

interface IModalProps {
	handleClose: (state:boolean) => void,
	selectedId: number,
	open: boolean
}

function CancelModal({handleClose , selectedId , open}: IModalProps) {
	const [isDisabled , setDisabled] = useState<boolean>(false)
	const [cancelStatus , setCancelStatus] = useState<boolean | null>(null)
	const refNode = useRef<HTMLDivElement>(null)
	const ref = useRef<boolean | null>(null)
	const {changedCanceledProperty} = useAppointmentService()
	const {getActiveAppointments} = useContext(AppointmentsContext)

	useEffect(() => {
		document.body.addEventListener('keydown' , closeModalWithEscape)

		return () => {
			document.body.removeEventListener('keydown' , closeModalWithEscape)
		}
	} , [])

	useEffect(() => {
		ref.current = cancelStatus
	}, [cancelStatus])

	const handleClickOnOk = () => {
		setDisabled(true)
		changedCanceledProperty(selectedId)
			.then(() => {
				setCancelStatus(true)
			}).catch(() => {
				setCancelStatus(false)
				setDisabled(false)
		})
	}

	const handleCloseModal = () => {
		handleClose(false)

		if(cancelStatus || ref.current) {
			getActiveAppointments()
		}
	}

	const closeModalWithEscape = (e: KeyboardEvent) => {
		if(e.key == "Escape") {
			handleCloseModal()
		}
	}

	return (
		<Portal>
			<CSSTransition nodeRef={refNode} timeout={{enter: 500, exit:500}} in={open} unmountOnExit classNames="modal">
				<div className="modal" ref={refNode}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? #{selectedId}
						</span>
						<div className="modal__btns">
							<button className="modal__ok" onClick={handleClickOnOk} disabled={isDisabled}>Ok</button>
							<button className="modal__close" onClick={handleCloseModal}>Close</button>
						</div>
						<div className="modal__status">
							{cancelStatus == null ?
								"" :
								cancelStatus ? "Success" :
									"Oops, error"
							}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
