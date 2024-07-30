import { useQuery, useQueryClient } from "@tanstack/react-query";
import {getBookings} from '../../services/apiBookings';
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
export function useBookings(){ // getting data from supabase
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    
    // FILTER
    const filterValue = searchParams.get('status'); // all by default
    const filter = !filterValue || filterValue === 'all'? 
        null : 
        {field: 'status', value: filterValue};

    // SORT
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = {field, direction};

    // PAGINATION
    const page = !searchParams.get('page')? 1 : Number(searchParams.get('page'));

    const {isLoading, 
        data: {data: bookings, count} = {}, 
        error} = useQuery({
        queryKey: ['bookings', filter, sortBy, page], // 2nd and 3rd argument is the dependency array
        queryFn: () => getBookings({filter, sortBy, page})
    
      });

    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if(page > 1){
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page - 1], // 2nd and 3rd argument is the dependency array
        queryFn: () => getBookings({filter, sortBy, page: page - 1})
      });
    }
    if(page < pageCount){
      queryClient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page + 1], // 2nd and 3rd argument is the dependency array
        queryFn: () => getBookings({filter, sortBy, page: page + 1})
      });
    }



    return {isLoading, bookings, error, count };
}