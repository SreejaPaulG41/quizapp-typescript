import { useMemo } from "react";
import { routerConfig } from './routerConfig';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

type configRouteType = {
    path: string;
    component: () => JSX.Element;
    name: string;
    privateRoute: boolean;
    adminCheck?: boolean;
}
const RouterRender = ()=>{
    // const routesConfigFiltered = useMemo(()=>{
    //     const filteredRoute = routerConfig.filter((item, index)=>{
    //             return item.privateRoute === true;
    //     })
    //     return filteredRoute;
    // },[])
    return (
        <Routes>
            {
                routerConfig.map((config: configRouteType, index)=>(
                    <Route key={index} path={config.path} 
                    element={
                        <ProtectedRoute Component={config.component} privateRoute={config.privateRoute} props={config}/>
                    }/>
                ))
            }
        </Routes>
    )
}
export default RouterRender;