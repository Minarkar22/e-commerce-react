import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext.jsx";



export default function Login() {
    let {getUserInfo} = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const userLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post("http://localhost:8000/api/login", loginData, {});
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                getUserInfo(response.data.token);
                navigate("/");
            };
        } catch(error) {
            console.log(error.response.data.errors);
            setErrorMessage(error.response.data.errors);
        }
    }
    return (
        <div className="my-10 flex items-center">
            <div
                className="border-[1px] border-black/20 rounded-lg w-[40%] mx-auto py-[40px] px-[40px]"
            >
                <div className="flex items-end gap-2 mb-8">
                    <h1 className="text-[50px] leading-[0.8] text-primary font-bold">
                        Login
                    </h1>
                    <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
                </div>
                <form className="flex flex-col gap-5" onSubmit={userLogin}>
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Email</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="text"
                            placeholder="Enter your Email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                        { errorMessage?.email && <p className="text-sm text-red-500 py-1">{errorMessage.email}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Password</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 text-white font-bold text-xl rounded-full bg-primary block"
                    >
                        Login
                    </button>
                    <p className="text-sm text-center font-semibold">
                        You don't have account? Register
                        <Link className="text-primary underline" to="/register">here.</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}