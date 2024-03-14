/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */

import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from 'sweetalert';



import picture from "../../assets/logo.png"
import { useContext } from "react";
import { AuthContext } from "./Firebase/AuthProvider";





const SignIn = () => {
    const { signInUser, SignInWithGoogle } = useContext(AuthContext)
    const location = useLocation()



    const navigate = useNavigate()

    const hendleSignIn = e => {
       

        e.preventDefault()
        const email = e.target.email.value

        const password = e.target.password.value
        signInUser(email, password)
                .then(result => {
                    console.log(result.user);
                    if (result.user) {
                        swal("Good job!", "You are sign in!", "success");

                    }

                    navigate(location?.state ? location?.state : "/")
                })
                .catch(error => {
                    
                    if(error){
                        swal("Error!", "Invalid email or password" ,    "error");
                    }
                     
                    
                })



        console.log(email, password);



    }
    const hendleGoogle = () => {

        SignInWithGoogle()
            .then(result => {
                console.log(result.user)
                if (result.user) {
                    swal("Good job!", "You are sign in with google!", "success");

                }
                if (result.user) {
                    navigate(location?.state ? location?.state : "/")
                }


            })
            .catch(error => {
                console.log(error.massage);
                if (error.massage) {
                    swal("Error!", `{${error.massage}}`, "error");
                }
            });

    }




    return (
       <div className="lg:flex justify-around items-center  mx-auto lg:px-36">
        <img className="h-[600px] pr-52 hidden lg:blockgit" src={picture} alt="" />
         <div>
            <div className="mt-10">
            <div className="card w-96 glass flex-shrink-0  max-w-sm mx-auto lg:mx-0  ">
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#9CDEDD] to-[#84e2e1] bg-clip-border text-white shadow-lg shadow-[#9CDEDD]">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                        Sign In
                    </h3>
                </div>
                <form
                    onSubmit={hendleSignIn}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-tr from-[#9CDEDD] to-[#84e2e1] border-none text-white shadow-lg shadow-[#79c0be]">Sign In</button>
                    </div>
                </form>
                {/* <h1 className="text-center ">Don't have an account? <span className="font-bold text-[#4eafae] "><Link to={"/Register"} >Register</Link> </span></h1> */}
                <h1 className="text-center text-2xl font-semibold">or</h1>
                <span className="flex justify-center items-center mt-4 mb-10  gap-1">
                    <h1 onClick={hendleGoogle} className="text-2xl cursor-pointer">
                        <span className="text-[#4285F4] font-semibold">G</span>
                        <span className="text-[#EA4335] font-semibold">o</span>
                        <span className="text-[#FBBC05] font-semibold">o</span>
                        <span className="text-[#4285F4] font-semibold">g</span>
                        <span className="text-[#34A853] font-semibold">l</span>
                        <span className="text-[#EA4335] font-semibold">e</span>
                    </h1>

                </span>


            </div>
        </div>
        </div>
       </div>
    );
};

export default SignIn;