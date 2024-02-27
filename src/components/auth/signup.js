import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";

import { UserContext } from "../../store/userContext";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { initializeUser } = useContext(UserContext);
    const navigate = useNavigate();

    const submitHandler = (data) => {
        console.log('sigining in', data);

        initializeUser({...data});
        navigate('/');
    }

    return (
        <div className="auth-container">
            <p className="auth-title">signup</p>
            
            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <div className="form-group mb-3">
                    <label htmlFor="username">Username*</label>
                    <input type="text" id="username" className="form-control" {...register("username", { required: true })} />
                    {errors.username && <p className="auth-warning-text">Username is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password*</label>
                    <input type="password" id="password" className="form-control" {...register("password", { required: true })} />
                    {errors.password && <p className="auth-warning-text">Password is required</p>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="passwordConfirm">Confirm Password*</label>
                    <input type="password" id="passwordConfirm" className="form-control" {...register("passwordConfirm", { required: true })} />
                    {errors.passwordConfirm && <p className="auth-warning-text">Confirm Password is required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <Link to="/login" className="auth-link">Login</Link>
        </div>
    );
}