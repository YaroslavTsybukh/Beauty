import {IAppointment} from "../../shared/appointment.interface";
import {useState , useEffect , memo} from "react";
import dayjs from 'dayjs';
import {Optional} from "utility-types";

import "./appointmentItem.scss";

type Appointment = Optional<IAppointment , "canceled"> & {
	handleOpen: (state: number) => void
	getActiveAppointments: () => void
}

const AppointmentItem = memo (({id , name , service , phone , date , canceled , handleOpen , getActiveAppointments}: Appointment) => {
	const [timeLeft , changeTimeLeft] = useState<string | null>(null)

	const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm")

	useEffect(() => {
		changeTimeLeft(`${dayjs(date).diff(undefined, "h")}:${dayjs(date).diff(undefined, "m") % 60}`)

		const intervalId = setInterval(() => {
			if(dayjs(date).diff(undefined, "m") % 60 <= 0) {
				getActiveAppointments()
				clearInterval(intervalId)
			} else {
				changeTimeLeft(`${dayjs(date).diff(undefined, "h")}:${dayjs(date).diff(undefined, "m") % 60}`)
			}
		}, 60000)

		return () => {
			clearInterval(intervalId)
		}

	} , [date])

	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">{formattedDate}</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>

			{!canceled &&
				<>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button
						className="appointment__cancel"
						onClick={() => {
							handleOpen(id)
						}}>
							Cancel
					</button>
				</>
			}

			{canceled &&
				<div className="appointment__canceled">Canceled</div>
			}
		</div>
	);
})

export default AppointmentItem;
