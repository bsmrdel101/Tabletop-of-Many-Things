import React from "react";
import { toggleMenu } from "../scripts/menuManager";
import Button from "./Library/Button";


interface Props {
  name: string;
  onLocationClick: any;
  location: string;
  children: any;
}

export default function Menu({ name, onLocationClick, location, children }: Props) {
  return (
    <div className="menu hidden" id={`${name}-menu`}>
      <Button className="menu__btn menu__btn--close" onClick={() => toggleMenu(name)}>X</Button>
      <div className="menu__filepath">
        {location.split('/').map((loc, i) => {
          const isLast = i === location.split('/').length - 1;

          return (
            <React.Fragment key={i}>
              <p onClick={() => onLocationClick(loc)} className="menu__filepath--link">{ loc }</p>
              <p>{!isLast && '/'}</p>
            </React.Fragment>
          );
        })}
      </div>
      <div className="menu__body">
        { children }
      </div>
    </div>
  );
}
