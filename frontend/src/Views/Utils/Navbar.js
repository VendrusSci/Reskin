import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { menuItems } from './MenuItems';
import { MenuItem } from './MenuItem';
import '../CSS/Navbar.css'

export function Navbar(){

    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

    return(
        <nav className="navigation">
            <span className="brand-name">
                reSKIN
            </span>
            <button className="hamburger" onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}>
            <FontAwesomeIcon icon={faBars} size='xl'/>
            </button>
            <div className={isNavbarExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                <nav>
                    <ul>
                        {menuItems.map((menu, index) => {
                            const depthLevel = 0;
                            return <MenuItem items={menu} key={index} depthLevel={depthLevel} setIsNavbarExpanded={setIsNavbarExpanded}/>;
                        })}
                    </ul>
                </nav>
            </div>
        </nav>
    );
}