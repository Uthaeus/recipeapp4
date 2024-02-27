import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    }

    return (
        <div className="auth-container">
            <p className="auth-title">signup</p>
            
            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username *</label>
                    <input type="text" id="username" className="form-control" {...register("username", { required: true })} />
                    {errors.username && <p className="auth-warning-text">Username is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input type="password" id="password" className="form-control" {...register("password", { required: true })} />
                    {errors.password && <p className="auth-warning-text">Password is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password *</label>
                    <input type="password" id="passwordConfirm" className="form-control" {...register("passwordConfirm", { required: true })} />
                    {errors.passwordConfirm && <p className="auth-warning-text">Confirm Password is required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <Link to="/login">Login</Link>
        </div>
    );
}