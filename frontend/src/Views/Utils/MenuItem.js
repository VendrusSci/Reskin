import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Link } from 'react-router-dom';
import '../CSS/Nav.css'

export function MenuItem(props) {

    const [dropdown, setDropdown] = useState(false);
    let items = props.items;

    function onMouseEnter(){
        window.innerWidth > 960 && 
        setDropdown(true);
    };

    function onMouseLeave(){
        window.innerWidth > 960 && 
        setDropdown(false);
    };

    function toggleDropdown(){
        if(props.depthLevel > 0){
            setDropdown(false);
            props.setIsNavbarExpanded(false);
        }
        else
            setDropdown(!dropdown);
    }

    return (
        <li className="menu-items" onClick={toggleDropdown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {items.submenu ? (
            <>
                <button type="button" 
                    aria-haspopup="menu"
                    aria-expanded={dropdown ? 'true' : 'false'}
                >
                    {items.title}{' '}
                    {props.depthLevel > 0 &&
                        window.innerWidth < 960 ? null : props.depthLevel > 0 &&
                        window.innerWidth > 960 ? (
                        <span>&raquo;</span>
                        ) : (
                        <span className="arrow" />
                        )}
                </button>
                <Dropdown depthLevel={props.depthLevel}
                            submenus={items.submenu}
                            dropdown={dropdown} 
                            setIsNavbarExpanded={props.setIsNavbarExpanded}/>
            </>
            ) : (
                items.url ? <a href={items.url}>{items.title}</a>
                : <Link to={items.link}>{items.title}</Link>
            )}
        </li>
    );
};