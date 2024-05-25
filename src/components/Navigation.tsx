import s from '../style/components/Navigation.module.scss';
import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (
        <div className={s.navigation}>
            <NavLink to="/dasv" className={({ isActive }) => isActive ? `${s.navigation__link} ${s.active}` : s.navigation__link}>
                ДАСВ
            </NavLink>
            <NavLink to="/dask" className={({ isActive }) => isActive ? `${s.navigation__link} ${s.active}` : s.navigation__link}>
                ДАСК
            </NavLink>
            <button className={s.navigation__pwa} id={'pwa'}>PWA</button>
        </div>
    );
};
