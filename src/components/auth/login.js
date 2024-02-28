import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const submitHandler = (data) => {
        console.log('logging in', data);

        navigate("/");
    }

    return (
        <div className="auth-container">
            <p className="auth-title">login</p>

            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className="form-control" {...register("username", { required: true })} />
                    {errors.username && <p className="auth-warning-text">Username is required</p>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" {...register("password", { required: true })} />
                    {errors.password && <p className="auth-warning-text">Password is required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <Link to="/signup" className="auth-link">Signup</Link>
        </div>
    );
}