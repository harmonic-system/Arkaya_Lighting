import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../../components/User/UserNavbar'

const UserLayout = () => {

  return (
    <>
      <UserLayoutWrapper>
        <div className="container">
          <div className="user-layout">
            <div className="user-navbar">
              <UserNavbar />
            </div>
            <hr style={{ color: "#ddd", marginRight: "10px" }} />
            <div className="user-content">
              <Outlet />
            </div>
          </div>
        </div>
      </UserLayoutWrapper>
    </>
  )
}

export default UserLayout

const UserLayoutWrapper = styled.section`
.user-layout {
  display: flex;
  // height: 100vh;
  flex-direction: row;
  margin-top: 3rem;

  .user-navbar {
    flex: 0 0 200px;
    height: 100vh;
  }

  .user-content {
    flex: 1;
  }

  @media (min-width: 200px) and (max-width: 768px) {
    flex-direction: column;
  }
}
`