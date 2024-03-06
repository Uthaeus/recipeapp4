import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase-config";

import { UserContext } from "../../store/userContext";

function ProfileEdit() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { user } = useContext(UserContext);

    const [imageUrl, setImageUrl] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        reset({
            username: user.username ? user.username : '',
            email: user.email,
        })
    }, [ reset, user ]);

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        const imageRef = ref(storage, `images/${file.name}`);
    
        uploadBytes(imageRef, file)
            .then(() => {
                return getDownloadURL(imageRef);
            })
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submitHandler = async (data) => {
        if (data.password !== data.passwordConfirm) {
            alert('Passwords do not match');
            reset({
                password: '',
                passwordConfirm: ''
            });
            return;
        }
    
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const updateTasks = [];
    
        if (data.username === '' && user.username !== 'anonymous') {
            updateTasks.push(updateDoc(userDocRef, { username: 'anonymous' }));
        }
    
        if (data.username !== '' && data.username !== user.username) {
            updateTasks.push(updateDoc(userDocRef, { username: data.username }));
        }
    
        if (data.email !== '' && data.email !== user.email) {
            updateTasks.push(updateProfile(auth.currentUser, { email: data.email }));
            updateTasks.push(updateDoc(userDocRef, { email: data.email }));
        }
    
        if (data.password !== '') {
            updateTasks.push(updatePassword(auth.currentUser, data.password));
        }
    
        if (imageUrl !== '') {
            updateTasks.push(updateDoc(userDocRef, { image: imageUrl }));
        }
    
        try {
            await Promise.all(updateTasks);
        } catch (error) {
            console.error('Profile update error:', error);
            // Handle the error as needed
        }
    
        navigate('/');
    };

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
                    <img src={imageUrl} alt="" />
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