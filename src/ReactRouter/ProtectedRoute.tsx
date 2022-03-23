import { Navigate } from 'react-router-dom';

type configRouteType = {
    path: string;
    component: () => JSX.Element;
    name: string;
    privateRoute: boolean;
}

type protectedRouteType = {
    Component : () => JSX.Element;
    privateRoute: boolean;
    props: configRouteType;

}

const ProtectedRoute = ({Component, privateRoute, props} : protectedRouteType)=>{
    const token = localStorage.getItem("token");
    let presentUser = false;
    if(token){
        presentUser = true;
    }else{
        presentUser = false;
    }
    
    if(presentUser){
        if(privateRoute){
            return <Component />
        }else{
            const pathName = props.path;
            if(pathName === "/login" || pathName === "/signup"){
                return <Navigate to="/dashboard" />
            }else{
                return <Component />
            }
        }
    }else{
        const pathName = props.path;
        if(pathName === "/" || pathName === "/login" || pathName === "/signup"){
            return <Component />
        }else{
            return <Navigate to="/login" />
        }
    }
}

export default ProtectedRoute;