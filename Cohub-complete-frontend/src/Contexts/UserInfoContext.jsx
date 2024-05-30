import { useContext, useState, createContext } from "react";
import userApiService from "../../apiServices/user.apiService";

const UserContext = createContext();

export const useInfo = () => useContext(UserContext);

export const UserInfoProvider = ({ children }) => {
    const [userinfo, setUserInfo] = useState(null);

    const addUserInfo = async () => {
        const data = await userApiService.getUserInfo();
        console.log(data);
        if (data) {
            setUserInfo(data);
        }
    }

    return (
        <UserContext.Provider value={{ userinfo, setUserInfo, addUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
