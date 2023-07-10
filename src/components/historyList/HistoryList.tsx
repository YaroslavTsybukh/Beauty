import { useContext , useEffect } from "react";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function HistoryList() {
	const {allAppointments , getAppointments , loadingStatus} = useContext(AppointmentsContext)

	useEffect(() => {
		getAppointments()
	}, [])

	if(loadingStatus == "loading") {
		return <Spinner />
	} else if(loadingStatus == "error") {
		return (
			<>
				<Error />
				<button className="schedule__reload" onClick={getAppointments}>
					Try to reload
				</button>
			</>
		)
	}


	return (
		<>
			{
				allAppointments.map(appointment => (
					<AppointmentItem key={appointment.id} {...appointment} />
				))
			}
		</>
	);
}

export default HistoryList;
