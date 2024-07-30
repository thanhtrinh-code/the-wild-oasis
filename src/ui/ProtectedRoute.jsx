import { useNavigate } from 'react-router-dom';
import {useUser} from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({children}) {
    // 1. Load the authenticated user
    const {user, isLoading, isAuthenticated} = useUser();
    const navigate = useNavigate();

    // 3. If the user is not authenticated, RE-direct to the login page
    useEffect(function() {
        if(!isAuthenticated && !isLoading){
            navigate('/login');
        }
    }, [isAuthenticated, navigate, isLoading]);

    if(isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    );
    if(isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    );
    // 4. If the user is authenticated, render the children component
    if(isAuthenticated) return children;
}
