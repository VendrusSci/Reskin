import { MenuItem } from "./MenuItem";

export function Dropdown (props){

    let depthLevel = props.depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

    return (
        <ul className={`dropdown ${dropdownClass} ${props.dropdown ? "show" : ""}`}>
            {props.submenus.map((submenu, index) => (
                <MenuItem items={submenu} key={index} depthLevel={depthLevel} setIsNavbarExpanded={props.setIsNavbarExpanded}/>
            ))}
        </ul>
    );
  };