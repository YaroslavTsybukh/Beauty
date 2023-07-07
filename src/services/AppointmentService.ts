import {useHttp} from "../hooks/http.hook";
import {hasRequiredFields} from "../utils/hasRequiredFields";
import {IAppointment , ActiveAppointment} from "../shared/appointment.interface";
import dayjs from "dayjs";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

const useAppointmentService = () => {
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
        const newArr: ActiveAppointment[] = res
            .filter((obj) => {
                return !obj.canceled && dayjs(obj.date).diff(undefined, "m") % 60 > 0
            })
            .map((obj) => {
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

    const changedCanceledProperty = async(id: number) => {
        const res = await request({
            url: `${_apiBase}/${id}`,
            method: "PATCH",
            body: JSON.stringify({
                canceled: true
            })
        })

        return res
    }

    return {getAllAppointments , getAllActiveAppointments , changedCanceledProperty , status}
}

export default useAppointmentService
