import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import {useCabins} from '../cabins/useCabins';
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from '../check-in-out/TodayActivity'
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;



export default function DashboardLayout() {
  const {bookings, isLoading} = useRecentBookings();
  const {cabins, isLoading: isLoading3} = useCabins();
  const {stays, numDays, confirmedStays, isLoading: isLoading2} = useRecentStays();
  if(isLoading || isLoading2) return <Spinner/>;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} 
      confirmedStays={confirmedStays}
      numDays={numDays} cabinCount={cabins?.length} />
      <TodayActivity/>
      <DurationChart confrimedStay={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
