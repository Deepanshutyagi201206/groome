import useUserId from "../../customhooks/getuserid";

const Islogin = () => {

    const token = localStorage.getItem("token");
    if (token) {
        return true
    }
    else {
        return false
    }
}

export default Islogin