import AppointmentList from "../../components/appointmentList/AppointmentList";
import Calendar from "../../components/calendar/Calendar";
import CAForm from "../../components/createAppointmentForm/CAForm";
import {useContext, useEffect} from "react";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";

import "./schedulePage.scss";

function SchedulePage() {
	const { changedCalendarDates } = useContext(AppointmentsContext)

	useEffect(() => {
		changedCalendarDates([null , null])
	},[])

	return (
		<section className="schedule">
			<div className="schedule__controls">
				<Calendar />
				<CAForm />
			</div>
			<div className="schedule__list">
				<AppointmentList />
			</div>
		</section>
	);
}

export default SchedulePage;
