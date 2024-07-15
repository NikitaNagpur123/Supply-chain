import React from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {}

interface HeaderState {}

export default class Header extends React.Component<any, any> {
  constructor(props: HeaderProps) {
    super(props);
    //this.state = { :  };
  }
  render(): React.ReactNode {
    {
      return (
        <>
          <nav className="navbar navbar-default">
            <div
              className="container-fluid"
              style={{ justifyContent: "start" }}
            >
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  Supply Plan
                </a>
              </div>
              <ul className="nav navbar-nav" style={{ flexDirection: "row" }}>
                <li className="active">
                  <NavLink to={"/Home"}>Home</NavLink>
                </li>

                <li className="active">
                  <NavLink to={"/NewOrderCycle"}>NewOrderCycle</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </>
      );
    }
  }
}
