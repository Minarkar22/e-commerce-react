import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext.jsx";


export default function Register() {
    const {getUserInfo} = useContext(AuthContext);
    const [form, setForm] = useState({
        name : "",
        email : "",
        phone : "",
        address : "",
        password: "",
    })
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const userRegister = async (e) => {
     e.preventDefault();
     console.log("form ", form);
     try{
         let response = await axios.post("http://localhost:8000/api/users", form, {});
         console.log(response);
         if (response.status === 201){
             const token = response.data.token;
             // console.log(token);
             localStorage.setItem("token", token);
             getUserInfo(token)
             navigate("/");
         }
     } catch(e){
         setError(e.response.data.errors);
         // console.log(error);
     }
    }

    return (
        <div className="my-10 flex items-center">
            <div
                className="border-[1px] border-black/20 rounded-lg w-[40%] mx-auto py-[40px] px-[40px]"
            >
                <div className="flex items-end gap-2 mb-8">
                    <h1 className="text-[50px] leading-[0.8] text-primary font-bold">
                        Register
                    </h1>
                    <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
                </div>
                <form className="flex flex-col gap-5" onSubmit={userRegister}>
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Name</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Email</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="text"
                            placeholder="Enter your Email"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                        />
                        { error?.email && <p className="text-sm text-red-500 mt-1">{error.email}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Phone</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="text"
                            placeholder="Enter your phone"
                            value={form.phone}
                            onChange={e => setForm({...form, phone: e.target.value})}
                        />
                        { error?.phone && <p className="text-sm text-red-500 mt-1">{error.phone}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Address</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="text"
                            placeholder="Enter your address"
                            value={form.address}
                            onChange={e => setForm({...form, address: e.target.value})}
                        />
                        { error?.address && <p className="text-sm text-red-500 mt-1">{error.address}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-sm">Password</label>
                        <input
                            className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})}
                        />
                        { error?.password && <p className="text-sm text-red-500 mt-1">{error.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 text-white font-bold text-xl rounded-full bg-primary block"
                    >
                        Register
                    </button>
                    <p className="text-sm text-center font-semibold">
                        Already have an account? Login
                        <Link className="text-primary underline" to="/login">here.</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}