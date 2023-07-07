import {useContext , useEffect , useState , useCallback} from "react";

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";

function AppointmentList() {
	const [isOpen , setOpen] = useState<boolean>(false)
	const {activeAppointments , getActiveAppointments , loadingStatus} = useContext(AppointmentsContext)
	const [selectedId , selectId] = useState<number>(0)

	useEffect(() => {
		getActiveAppointments()
	}, [])

	const openModal = useCallback((id: number) => {
		setOpen(true)
		selectId(id)
	}, [])

	if(loadingStatus == "loading") {
		return <Spinner />
	} else if (loadingStatus == "error") {
		return (
			<>
				<Error />
				<button className="schedule__reload" onClick={getActiveAppointments}>
					Try again
				</button>
			</>
		)
	}

	return (
		<>
			{
				activeAppointments.map(obj => (
					<AppointmentItem key={obj.id} {...obj} handleOpen={openModal} getActiveAppointments={getActiveAppointments}/>
				))
			}
			<CancelModal open={isOpen} handleClose={setOpen} selectedId={selectedId}/>
		</>
	);
}

export default AppointmentList;
