import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin(){
    const queryClient = useQueryClient(); // replace with your own query client instance
    const navigate = useNavigate();
    const {mutate: login, isLoading} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user); //
            navigate('/dashboard', {replace: true}); // not allowed to go back
        },
        onError: (error) => {
            console.log('ERROR', error);
            toast.error('Provided email or password is incorrect');
        },
    });
    return {login, isLoading};
}