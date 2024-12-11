import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MultiDropdown = () => {
    const [dropdowns, setDropdowns] = useState([
        {
            title: 'Dropdown 1',
            nested: ['Nested 1-1', 'Nested 1-2', 'Nested 1-3'],
            isOpen: false,
            nestedOpen: false,
        },
        {
            title: 'Dropdown 2',
            nested: ['Nested 2-1', 'Nested 2-2', 'Nested 2-3'],
            isOpen: false,
            nestedOpen: false,
        },
        {
            title: 'Dropdown 3',
            nested: ['Nested 3-1', 'Nested 3-2', 'Nested 3-3'],
            isOpen: false,
            nestedOpen: false,
        },
    ]);

    const toggleDropdown = (index) => {
        setDropdowns((prev) =>
            prev.map((dropdown, i) => ({
                ...dropdown,
                isOpen: i === index ? !dropdown.isOpen : false,
                nestedOpen: false, // Close nested dropdowns when the main one is toggled
            }))
        );
    };

    const toggleNestedDropdown = (index) => {
        setDropdowns((prev) =>
            prev.map((dropdown, i) => ({
                ...dropdown,
                nestedOpen: i === index ? !dropdown.nestedOpen : false,
            }))
        );
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown')) {
            setDropdowns((prev) =>
                prev.map((dropdown) => ({
                    ...dropdown,
                    isOpen: false,
                    nestedOpen: false,
                }))
            );
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Wrapper>
            <div className="multi-dropdown-container">
                {dropdowns.map((dropdown, index) => (
                    <div className="dropdown" key={index}>
                        <button className="dropdown-toggle" onClick={() => toggleDropdown(index)}>
                            {dropdown.title}
                        </button>
                        <ul className={`dropdown-menu ${dropdown.isOpen ? 'show' : ''}`}>
                            {dropdown.nested.map((nested, nestedIndex) => (
                                <li key={nestedIndex}>
                                    <button className="nested-dropdown-toggle" onClick={() => toggleNestedDropdown(index)}>
                                        {nested}
                                    </button>
                                    <ul className={`nested-dropdown-menu ${dropdown.nestedOpen ? 'show' : ''}`}>
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
};

export default MultiDropdown;


const Wrapper = styled.section`
.multi-dropdown-container {
    padding: 20px;
}

.dropdown {
    position: relative;
    margin-bottom: 15px;
}

.dropdown-toggle {
    padding: 8px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.dropdown-toggle:hover {
    background-color: #0056b3;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
    display: none;
    margin-top: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.dropdown-menu.show {
    display: block;
}

.nested-dropdown-toggle {
    padding: 5px;
    border: none;
    background-color: #6c757d;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    width: 100%; /* Make the button full width */
    text-align: left; /* Align text to the left */
}

.nested-dropdown-toggle:hover {
    background-color: #5a6268;
}

.nested-dropdown-menu {
    display: none;
    margin-top: 5px;
}

.nested-dropdown-menu.show {
    display: block;
    position: relative;
    background-color: #f8f9fa; /* Different background for nested menu */
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px; /* Add some padding */
}

.nested-dropdown-menu li {
    margin: 5px 0; /* Space between nested items */
}

.nested-dropdown-menu a {
    text-decoration: none;
    color: #007bff; /* Link color */
}

.nested-dropdown-menu a:hover {
    text-decoration: underline; /* Underline on hover */
}

`
