import styled from 'styled-components';
import { useAuthContext } from '../../../context/auth-context';
import { Button } from '../../../styles/Button';
import { Link } from 'react-router-dom';

const AdminButton = () => {

    const { user } = useAuthContext();

    if (!user || !user?.isAdmin) {
        return null;
    }  // If the user is not an admin, return null to hide the button

    return (
        <>
            <AdminButtonWrapper>
                <Link to="/admin">
                    <Button className='adminButton'>Admin Section</Button>
                </Link>
            </AdminButtonWrapper>
        </>
    )
}

export default AdminButton

const AdminButtonWrapper = styled.section`
.adminButton {
  position: fixed;
  opacity: 1;
  left: 15px;
  bottom: 15px;
  z-index: 4;
  background-color: #ffc221;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: all 0.4s;
}
`