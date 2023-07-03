import {useHttp} from "../hooks/http.hook";
import {hasRequiredFields} from "../utils/hasRequiredFields";
import {IAppointment , ActiveAppointment} from "../shared/appointment.interface";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

export const useAppointmentService = () => {
    const {status , request} = useHttp()
    const _apiBase = "http://localhost:3001/appointments";

    const getAllAppointments = async(): Promise<IAppointment[]> => {
        const res = await request({url: _apiBase})
        if(res.every((field: IAppointment ) => hasRequiredFields(field , requiredFields))) {
            return res
        } else {
            throw new Error("Data doesnt have all the fields");
        }
    }

    const getAllActiveAppointments = async() => {
        const res = await getAllAppointments()
        const newArr: ActiveAppointment[] = res.map((obj) => {
            return {
                "id": obj.id,
                "date": obj.date,
                "name": obj.name,
                "service": obj.service,
                "phone": obj.phone
            }
        })

        return newArr
    }

    return {getAllAppointments , getAllActiveAppointments}
}
