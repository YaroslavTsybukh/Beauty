import {useContext , useEffect , useState , useCallback} from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

function AppointmentList() {
	const [isOpen , setOpen] = useState<boolean>(false)
	const {calendarDate , activeAppointments , getActiveAppointments , loadingStatus} = useContext(AppointmentsContext)
	const [selectedId , selectId] = useState<number>(0)

	useEffect(() => {
		getActiveAppointments()
	}, [calendarDate])

	const openModal = useCallback((id: number) => {
		setOpen(true)
		selectId(id)
	}, [])

	if(loadingStatus == "loading") {
		return <Spinner />
	} else if (loadingStatus == "error") {
		return (
			<>
				<Error msg="error"
					   version="1.1"
					   viewBox="0 0 499.973 391.157"
					   xmlns="http://www.w3.org/2000/svg"
					   style={{
						   width: "100px",
						   height: "100px",
						   display: "block",
						   margin: "0 auto",
					   }}/>
				<button className="schedule__reload" onClick={getActiveAppointments}>
					Try again
				</button>
			</>
		)
	}

	return (
		<>
			{ activeAppointments.length > 0 ?
				activeAppointments.map(obj => (
					<AppointmentItem key={obj.id} {...obj} handleOpen={openModal} getActiveAppointments={getActiveAppointments}/>
				)) : <h2>Нет записей на эту дату...</h2>
			}
			<CancelModal open={isOpen} handleClose={setOpen} selectedId={selectedId}/>
		</>
	);
}

export default AppointmentList;
