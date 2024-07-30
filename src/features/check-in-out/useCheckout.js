import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout(){
    const queryClient = useQueryClient();
    const {mutate: checkout, isLoading: isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-out',
        }),
        onSuccess: (data) => {
            toast.success(`Check-out booking #${data.id} successful!`);
            queryClient.invalidateQueries({active: true});
        },
        onError: (err) => toast.error(err.message),
    })
    return { isCheckingOut, checkout };
}