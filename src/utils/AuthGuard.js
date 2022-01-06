import {isLoggedIn} from '../utils/Auth/user'

export default(to, from , next) => {
    // const publicPages = ['/','/user/signin','/user/signup'];
    // const authRequired = !publicPages.includes(to.path);
    if(!isLoggedIn.value){
        return next("/user/signin")
    }else{
        next();
    }
}