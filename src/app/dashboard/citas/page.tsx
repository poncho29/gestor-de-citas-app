import { getAppointments } from '@/actions'

import { MyCalendar } from './components/MyCalendar'

export default async function page() {
    const { data } = await getAppointments();

    return (
        <>
            <MyCalendar appointments={data?.appointments || []} />
        </>
    )
}
