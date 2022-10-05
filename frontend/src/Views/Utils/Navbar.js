import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

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
                <ul>
                    <li>
                        <a href="/">Upload Skin</a>
                    </li>
                    <li>
                        <a href="/selfservice">Self-Service Preview</a>
                    </li>
                    <li>
                        <a href="/scenes">Scene Preview</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="https://github.com/VendrusSci/Reskin">Source Code</a>
                    </li>
                    <li>
                        <a href="https://www1.flightrising.com/forums/gde/3157825">Guide</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}