import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
export function useCabins(){ // getting data from supabase
    const {isLoading, data: cabins, error} = useQuery({
        queryKey: ['cabin'],
        queryFn: getCabins
    
      });
    return {isLoading, cabins, error };
}