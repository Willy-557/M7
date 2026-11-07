import { Outlet } from 'react-router'

export default function Member() {
    return (<>
        <div>
            <p>Setup Jadwal</p>
            <p>Incoming Bookings</p>
            <p>My Programs</p>
            <p>My Trainings</p>
        </div>
        <Outlet></Outlet>
    </>)
}