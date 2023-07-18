import { useContext , useEffect } from "react";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import dayjs from "dayjs";

function HistoryList() {
	const {calendarDate , allAppointments , getAppointments , loadingStatus} = useContext(AppointmentsContext)

	allAppointments.sort((a ,b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())

	useEffect(() => {
		getAppointments()
	}, [calendarDate])

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
			{ 	allAppointments.length > 0 ?
				allAppointments.map(appointment => (
					<AppointmentItem key={appointment.id} {...appointment} />
				)) : <h2>Нет записей на эту дату...</h2>
			}
		</>
	);
}

export default HistoryList;
