import {useHttp} from "../hooks/http.hook";
import {hasRequiredFields} from "../utils/hasRequiredFields";
import {IAppointment , ActiveAppointment} from "../shared/appointment.interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

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

    const createAppointment = async(body: IAppointment) => {
        const id = new Date().getTime()

        body.id = id
        body.date = dayjs(body.date , "DD/MM/YYYY HH:mm").format("YYYY-MM-DDTHH:mm")
        return await request({
            url: _apiBase,
            method: 'POST',
            body: JSON.stringify(body),
        })
    }

    return {getAllAppointments , getAllActiveAppointments , changedCanceledProperty , createAppointment , status}
}

export default useAppointmentService
