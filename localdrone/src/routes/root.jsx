import { useEffect } from "react";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getPilots } from "../pilots";
import { getMissions } from "../missions";
import drone from '../drone.svg';

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <div>
          <img src={drone} className="App-logo" alt="logo" />
        </div>
        <nav> 
          <NavLink to={`pilots`}>Pilots</NavLink>
          <NavLink to={`missions`}>Missions</NavLink>
        </nav>     
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
