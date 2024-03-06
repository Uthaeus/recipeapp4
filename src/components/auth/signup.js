import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

export default function Signup() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const submitHandler = (data) => {
        if (data.password !== data.passwordConfirm) {
            alert('passwords do not match');
            reset({
                password: '',
                passwordConfirm: ''
            });
            return;
        }
        console.log('sigining in', data);

        let enteredUsername = data.username !== '' ? data.username : 'anonymous';

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
            return setDoc(doc(db, "users", auth.currentUser.uid), {
                email: data.email,
                role: 'user',
                username: enteredUsername
            });
        })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error creating user', errorCode, errorMessage);
            // ..
        });
    }

    return (
        <div className="auth-container">
            <p className="auth-title">signup</p>
            
            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <div className="form-group mb-3">
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
                    {errors.email && <p className="auth-warning-text">Email is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className="form-control" {...register("username")} placeholder="optional" />
                    
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