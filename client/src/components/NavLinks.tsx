import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

interface NavLinksProps {
  toggleSidebar: () => void
}

const NavLinks: FunctionComponent<NavLinksProps> = ({toggleSidebar}: NavLinksProps) => {

  return (
    <div className="nav-links">
      { links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink 
            to={path} 
            key={id} 
            onClick={toggleSidebar}
            className={({isActive}) => 
            isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      }) }
    </div>
  )
}

export default NavLinks;