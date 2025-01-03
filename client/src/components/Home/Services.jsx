import React from 'react'
import styled from 'styled-components'

const Services = () => {
    return (
        <>
            <Wrapper>
                <div className="service">
                    <div className="container">
                        <div className="title">
                            <h1>Service <strong className="black">Process</strong></h1>
                            <span>Easy and effective way to get your lighting product</span>
                        </div>
                        <div className="grid grid-tem-view">

                            <div className="service-box">
                                <i><img alt='service1' src="icon/service1.png" /></i>
                                <h3>Fast service</h3>
                                <p className="text-justify" >Our commitment to fast service ensures minimal waiting and maximum satisfaction, delivering results swiftly and effectively.</p>
                            </div>


                            <div className="service-box">
                                <i><img alt='service2' src="icon/service2.png" /></i>
                                <h3>Secure payments</h3>
                                <p className="text-justify" >Enjoy peace of mind with our secure payment system, safeguarding your transactions with advanced encryption.</p>
                            </div>


                            <div className="service-box">
                                <i><img alt='service3' src="icon/service3.png" /></i>
                                <h3>Expert team</h3>
                                <p className="text-justify" >Our expert team brings years of industry experience and specialized knowledge to deliver exceptional results.</p>
                            </div>


                            <div className="service-box">
                                <i><img alt='service4' src="icon/service4.png" /></i>
                                <h3>Affordable services</h3>
                                <p className="text-justify" >Our affordable services ensure value and reliability, making excellence accessible to all.</p>
                            </div>


                            <div className="service-box">
                                <i><img alt='service5' src="icon/service5.png" /></i>
                                <h3>High build quality</h3>
                                <p className="text-justify" >Experience superior durability and craftsmanship with our high build quality products.</p>
                            </div>


                            <div className="service-box">
                                <i><img alt='service6' src="icon/service6.png" /></i>
                                <h3>Award winning</h3>
                                <p className="text-justify" >Proudly recognized for our excellence with prestigious industry awards, showcasing our commitment to quality.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default Services

const Wrapper = styled.section`
.service {
	background: #fff;
	padding-top: 90px;

    @media (max-width: 768px) {
        padding-top: 40px;
    }
}

.service .service-box {
	padding: 30px 20px;
	box-shadow: #00000040 0px 0px 19px 0px;
	margin-bottom: 30px;
	text-align: center;
    border-radius:20px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.service .service-box:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
}

.service .service-box i img {
	height: 88px;
}

.service .service-box h3 {
	font-weight: 500;
	font-size: 22px;
	line-height: 22px;
	color: #050000;
	padding: 20px 0px;
}

.service .service-box p {
	color: #0d0c0a;
	font-size: 17px;
	line-height: 28px;
}
`



// import React from 'react';
// import styled from 'styled-components';

// const Services = () => {
//   return (
//     <>
//       <Wrapper>
//         <div className="service">
//           <div className="container">
//             <div className="title">
//               <h1>
//                 Service <strong className="black">Process</strong>
//               </h1>
//               <span>Easy and effective way to get your lighting product</span>
//             </div>
//             <div className="grid">
//               <div className="service-box">
//                 <i>
//                   <img alt="service1" src="icon/service1.png" />
//                 </i>
//                 <h3>Fast service</h3>
//                 <p>
//                   Our commitment to fast service ensures minimal waiting and
//                   maximum satisfaction, delivering results swiftly and
//                   effectively.
//                 </p>
//               </div>

//               <div className="service-box">
//                 <i>
//                   <img alt="service2" src="icon/service2.png" />
//                 </i>
//                 <h3>Secure payments</h3>
//                 <p>
//                   Enjoy peace of mind with our secure payment system,
//                   safeguarding your transactions with advanced encryption.
//                 </p>
//               </div>

//               <div className="service-box">
//                 <i>
//                   <img alt="service3" src="icon/service3.png" />
//                 </i>
//                 <h3>Expert team</h3>
//                 <p>
//                   Our expert team brings years of industry experience and
//                   specialized knowledge to deliver exceptional results.
//                 </p>
//               </div>

//               <div className="service-box">
//                 <i>
//                   <img alt="service4" src="icon/service4.png" />
//                 </i>
//                 <h3>Affordable services</h3>
//                 <p>
//                   Our affordable services ensure value and reliability, making
//                   excellence accessible to all.
//                 </p>
//               </div>

//               <div className="service-box">
//                 <i>
//                   <img alt="service5" src="icon/service5.png" />
//                 </i>
//                 <h3>High build quality</h3>
//                 <p>
//                   Experience superior durability and craftsmanship with our high
//                   build quality products.
//                 </p>
//               </div>

//               <div className="service-box">
//                 <i>
//                   <img alt="service6" src="icon/service6.png" />
//                 </i>
//                 <h3>Award winning</h3>
//                 <p>
//                   Proudly recognized for our excellence with prestigious
//                   industry awards, showcasing our commitment to quality.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Wrapper>
//     </>
//   );
// };

// export default Services;

// const Wrapper = styled.section`
//   .service {
//     background: #fff;
//     padding: 90px 20px;
//     @media (max-width: 768px) {
//       padding: 40px 15px;
//     }
//   }

//   .service .grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 30px;

//     @media (max-width: 768px) {
//       grid-template-columns: repeat(2, 1fr);
//     }

//     @media (max-width: 480px) {
//       grid-template-columns: repeat(1, 1fr);
//     }
//   }

//   .service .service-box {
//     padding: 30px 20px;
//     box-shadow: 0 0 19px rgba(0, 0, 0, 0.2);
//     border-radius: 20px;
//     text-align: center;
//     transition: transform 0.3s, box-shadow 0.3s;
//     background: #fafafa;
//   }

//   .service .service-box:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
//   }

//   .service .service-box i img {
//     height: 88px;
//     margin-bottom: 15px;
//     transition: transform 0.3s;
//   }

//   .service .service-box:hover i img {
//     transform: scale(1.1);
//   }

//   .service .service-box h3 {
//     font-weight: 600;
//     font-size: 20px;
//     color: #333;
//     margin: 15px 0;
//   }

//   .service .service-box p {
//     font-size: 16px;
//     color: #666;
//     line-height: 1.5;
//   }
// `;
