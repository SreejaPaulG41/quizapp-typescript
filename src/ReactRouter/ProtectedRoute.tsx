import { Navigate } from 'react-router-dom';

type configRouteType = {
    path: string;
    component: () => JSX.Element;
    name: string;
    privateRoute: boolean;
    adminCheck?: boolean;
}

type protectedRouteType = {
    Component : () => JSX.Element;
    privateRoute: boolean;
    props: configRouteType;

}

const ProtectedRoute = ({Component, privateRoute, props} : protectedRouteType)=>{
    const token = localStorage.getItem("token");
    const userInformation = JSON.parse(localStorage.getItem("userInformation")!);
    const isUserAdmin = userInformation?.isAdmin;
    let presentUser = false;
    if(token){
        presentUser = true;
    }else{
        presentUser = false;
    }
    
    if(presentUser){
        if(privateRoute){
            const pathName = props.path;
            const willAdminCheck = props.adminCheck;
            // if(willAdminCheck){
            //     console.log("coming 1")
            //     if(isUserAdmin){
            //         console.log("coming 1-1")
            //         return <Component />
            //     }else{
            //         console.log("coming 1-2")
            //         return <Navigate to="/dashboard" />
            //     }
            // }else{
            //     console.log("coming 2")
            //     return <Component />
            // }
            if(isUserAdmin){
                if(willAdminCheck || pathName==="/dashboard"){
                    return <Component />
                }else{
                    return <Navigate to="/dashboard" />
                }
            }else {
                if(willAdminCheck !== undefined){
                    return <Navigate to="/dashboard" />
                }else{
                    return <Component />
                }
            }
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