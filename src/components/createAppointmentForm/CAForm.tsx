import {ChangeEvent, FormEvent, useState , useContext} from "react";
import {IAppointment} from "../../shared/appointment.interface";
import useAppointmentService from "../../services/AppointmentService";
import {AppointmentsContext} from "../../context/appointments/AppointmentsContext";
import "./caform.scss";

function CAForm() {
	const [formData , setFormData] = useState<IAppointment>({
		"id": 1,
		"date": "",
		"name": "",
		"service": "",
		"phone": "",
		"canceled": false
	})
	const {getActiveAppointments} = useContext(AppointmentsContext)
	const {createAppointment} = useAppointmentService()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {value , name} = e.target

		setFormData(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		createAppointment(formData)
			.then(res => {
				setFormData({
					"id": 1,
					"date": "",
					"name": "",
					"service": "",
					"phone": "",
					"canceled": false
				})
				getActiveAppointments()
			})
			.catch(() => alert('Ошибка'))
	}

	return (
		<form className="caform" onSubmit={handleSubmit}>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				required
				value={formData.name}
				onChange={handleChange}
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				required
				value={formData.service}
				onChange={handleChange}
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
				title="Format should be +1 804 944 567"
				required
				value={formData.phone}
				onChange={handleChange}
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				required
				value={formData.date}
				onChange={handleChange}
			/>
			<button>Create</button>
		</form>
	);
}

export default CAForm;
