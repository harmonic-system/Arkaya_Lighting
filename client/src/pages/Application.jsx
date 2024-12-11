import styled from "styled-components"
import { useProductContext } from "../context/product-context"

const Application = () => {

  const { application } = useProductContext()

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="title">
            <h1>Our <strong className="black">Applications</strong></h1>
            <span>Lighting solutions designed for every space and purpose</span>
          </div>
          <div className="grid grid-tem-view">
            {
              application.map((application) => {
                return <div className="card" key={application._id}>
                  <figure>
                    <img src={application.applicationfile.url} alt="Application 1" />
                    <figcaption className="caption"><b>{application.heading}</b></figcaption>
                  </figure>

                  <div className="card-data">
                    <div className="card-data-flex">
                      <h3>{name}</h3>
                      <p>{application.about}</p>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </Wrapper >
    </>
  )
}

export default Application

const Wrapper = styled.section`
padding: 9rem 0;

figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.4);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
      border-radius:1rem;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;

    .card-data {
      padding: 0 1rem;
    }

    .card-data-flex {
      margin: 2rem;
    }

    p {
      color: black;
      text-align: justify;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }
`