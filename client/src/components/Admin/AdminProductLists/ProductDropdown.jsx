import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useCategoryContext } from '../../../context/category-context';

const ProductDropdown = ({ item, setIsOpen }) => {
    const [open, setOpen] = useState(false)
    const { setCategoryinlocalStorage } = useCategoryContext()

    const handleClick = (category) => {
        setCategoryinlocalStorage(category)
    }


    if (item?.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title" onClick={() => setOpen(!open)} >
                    <span>
                        {item?.title}
                    </span>
                    <FaChevronDown className="toggle-btn" />

                </div>
                <div className="sidebar-content">
                    {item?.childrens.map((child, index) => <ProductDropdown key={index} item={child} />)}
                </div>
            </div>
        )
    } else {
        return (
            <Link to={item?.path} className="sidebar-item plain" onClick={() => { handleClick(item?.category); setIsOpen(false) }}>
                {item.title}
            </Link>
        )
    }
}

export default ProductDropdown