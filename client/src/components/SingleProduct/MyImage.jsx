import React, { useState } from "react";
import styled from "styled-components";

// const MyImage = ({ imgs = [{ url: "" }] }) => {

//   const [mainImage, setMainImage] = useState(imgs[0]);

//   return (
//     <Wrapper>
//       <div className="grid grid-four-column">
//         {imgs.map((curElm, index) => {
//           return (
//             <figure key={index} >
//               <img
//                 src={curElm.url}
//                 alt={curElm.filename}
//                 className="box-image--style"
//                 onClick={() => setMainImage(curElm)}
//               />
//             </figure>
//           );
//         })}
//       </div>

//       <div className="main-screen">
//         <img src={mainImage.url} alt={mainImage.filename} />
//       </div>
//     </Wrapper>
//   );
// };

// export default MyImage;

// const Wrapper = styled.section`
//   display: grid;
//   grid-template-columns: 0.4fr 1fr;
//   gap: 1rem;

//   .grid {
//     flex-direction: row;
//     justify-items: center;
//     align-items: center;
//     width: 100%;
//     gap: 1rem;
//     /* order: 2; */

//     img {
//       max-width: 100%;
//       max-height: 100%;
//       background-size: cover;
//       object-fit: contain;
//       cursor: pointer;
//       box-shadow: ${({ theme }) => theme.colors.shadow};
//       border-radius:1rem;
//     }
//   }

//   .main-screen {
//     display: grid;
//     place-items: center;
//     order: 1;
//     img {
//       max-width: 100%;
//       height: auto;
//       box-shadow: ${({ theme }) => theme.colors.shadow};
//       border-radius:1rem;
//     }
//   }
//   .grid-four-column {
//     grid-template-columns: 1fr;
//     grid-template-rows: repeat(4, 1fr);
//   }

//   @media (max-width: ${({ theme }) => theme.media.mobile}) {
//     display: flex;
//     flex-direction: column;
//     order: 1;

//     .grid-four-column {
//       grid-template-rows: 1fr;
//       grid-template-columns: repeat(4, 1fr);
//     }
//   }

// `;

const MyImage = ({ imgs }) => {

  return (
    <>
    <Wrapper>
        <img
          src={imgs}
          alt=""
          className="box-image--style"
        />
    </Wrapper>
    </>
    
  )
}
export default MyImage;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  
  .box-image--style{
   width: 100%;
   height: 100%;
   object-fit: contain;
   border-radius:1rem;
   cursor: pointer;
   box-shadow: ${({ theme }) => theme.colors.shadow};
   transition: transform 0.3s ease;
   &:hover {
     transform: scale(1.05);
   }}
`