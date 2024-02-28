import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase-config";

function ProfileEdit() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [currentImage, setCurrentImage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        reset({
            username: auth.currentUser.displayName ? auth.currentUser.displayName : '',
            image: auth.currentUser.photoURL ? auth.currentUser.photoURL : '',
            email: auth.currentUser.email 
        })
        if (auth.currentUser.photoURL) {
            setCurrentImage(auth.currentUser.photoURL);
        }
    })

    const imageChangeHandler = (event) => {
        setCurrentImage(event.target.files[0]);
    }

    const submitHandler = async (data) => {
        if (data.username !== '' && data.username !== auth.currentUser.displayName) {
            updateProfile(auth.currentUser, {
                displayName: data.username
            })
            .then(() => {
                updateDoc(doc(db, "users", auth.currentUser.uid), {
                    username: data.username
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', errorCode, errorMessage);
                // ..
            });
        }
        if (data.image !== '' && data.image !== auth.currentUser.photoURL) {
            const imageRef = ref(storage, `images/${auth.currentUser.uid}`);
            await uploadBytes(imageRef, currentImage);
            const downloadURL = await getDownloadURL(imageRef);
            updateDoc(doc(db, "users", auth.currentUser.uid), {
                image: downloadURL
            });
        }
        if (data.email !== '' && data.email !== auth.currentUser.email) {
            updateProfile(auth.currentUser, {
                email: data.email
            })
            .then(() => {
                updateDoc(doc(db, "users", auth.currentUser.uid), {
                    email: data.email
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', errorCode, errorMessage);
                // ..
            });
        }
        navigate('/');
    }

    return (
        <div className="auth-container">
            <p className="auth-title">profile edit</p>

            <form onSubmit={handleSubmit(submitHandler)} className="auth-form">
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" className="form-control" {...register("username", { required: true })} />
                    {errors.username && <p className="auth-warning-text">Username is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
                    {errors.email && <p className="auth-warning-text">Email is required</p>}
                </div>

                <div className="form-group mb-3">
                    <img src={currentImage} alt="" />
                    <label htmlFor="image">Profile Image</label>
                    <input type="file" id="image" className="form-control" onChange={imageChangeHandler} />
                    {errors.image && <p className="auth-warning-text">Image is required</p>}
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-control" {...register("password")} />
                            {errors.password && <p className="auth-warning-text">Password is required</p>}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input type="password" id="passwordConfirm" className="form-control" {...register("passwordConfirm")} placeholder="re-enter if you are changing password" />
                            {errors.passwordConfirm && <p className="auth-warning-text">Password is required</p>}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>

            <Link to="/" className="auth-link">Back to home</Link>
        </div>
    );
}

export default ProfileEdit;