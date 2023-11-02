import { ReactElement, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { UserRole } from '../../../types/types';

interface ProtectedRouterProps {
    children: ReactElement<any, any> | null;
}

const ProtectedRouter = ({ children }: ProtectedRouterProps) => {
    const location = useLocation();
    const { role } = useContext(AuthContext);

    if (role !== UserRole.admin && role !== UserRole.editor && role !== UserRole.operator) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRouter;