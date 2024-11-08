import React from 'react'
import ProductDropdown from "./ProductDropdown"
import items from "./ProductListData.json"
import styled from "styled-components"

const ProductLists = ({ setIsOpen }) => {
  return (
    <ProductListsWrapper>
      <div className="sidebar">
        {items.map((item, index) => <ProductDropdown key={index} item={item} setIsOpen={setIsOpen} />)}
      </div>
    </ProductListsWrapper>
  )
}

export default ProductLists

const ProductListsWrapper = styled.section`
.sidebar{
  width: 280px;
  flex-shrink: 0;
  // background-color: rgba(22, 22, 22, 1);
  height: 100%;
  overflow: auto;
}


.sidebar-item{
  padding: .75em 1em;
  display: block;
  transition: background-color .15s;
  border-radius: 5px;
  cursor: pointer;
}
.sidebar-item:hover{
  background-color: rgba(255, 255, 255, .1);
}

.sidebar-title{
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
  background-color: #ffc221;
  padding: 1.2rem .5em;
  // padding: .5em;
  border-radius: 5px;
}
// .sidebar-title span i{
//   display: inline-block;
//   width: 1.5rem;
// }
.sidebar-title span {
  font-size: 1.5rem;
  font-weight: bold;
}
.sidebar-title .toggle-btn{
  cursor: pointer;
  transition: transform .3s;
}
.sidebar-item.open > .sidebar-title .toggle-btn{
  transform: rotate(180deg);
}
.sidebar-content{
  padding-top: .25em;
  height: 0;
  overflow: hidden;
}
.sidebar-item.open > .sidebar-content{
  height: auto;
}

.sidebar-item.plain{
  color: #000;
  text-decoration: none;
  // padding:2rem 0;
  font-size: 1.5rem;
}
.sidebar-item.plain:hover{
  background-color: #ffdd73;
  font-weight: 600;
}
// .sidebar-item.plain i{
//   display: inline-block;
//   width: 1.5rem;
// }
`