import styled from "styled-components"

const Brandpatner = () => {
    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="title">
                        <h1>Our <strong className="black">Valued Partners</strong></h1>
                        <span>Collaborating with leading brands to brighten your spaces</span>
                    </div>
                    <div className="grid grid-tem-view">
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                        <div className="contact-box">
                            <img src="./images/patner/patner.png" />
                            <h3>Address</h3>
                            <p className="text-justify" >B-22 Patpar Ganj, Mayur Vihar Phase-1, New Delhi</p>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default Brandpatner

const Wrapper = styled.section`
padding: 9rem 0;
.contact-box {
  padding: 30px 20px;
  /* box-shadow: #00000040 0px 0px 19px 0px; */
  /* box-shadow: black 0px 0px 19px 0px; */
  margin-bottom: 30px;
  text-align: center;
  background-color: #F6F8FA;
  border-radius: 1rem;

  img{
    width: 100%;
  }

  p {
   font-size: 1.4rem;
 }
}
`