import {IAppointment , ActiveAppointment} from "../../shared/appointment.interface";

export enum ActionsTypes {
    SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    FETCHING_STATUS = "FETCHING_STATUS",
    ERROR_FETCHING_STATUS = "ERROR_FETCHING_STATUS"
}

export type AppointmentAction = {
        type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
        payload: ActiveAppointment[]
    }
    |
    {
        type: ActionsTypes.SET_ALL_APPOINTMENTS,
        payload: IAppointment[]
    }
    |
    {
        type: ActionsTypes.FETCHING_STATUS
    }
    |
    {
        type: ActionsTypes.ERROR_FETCHING_STATUS
    }