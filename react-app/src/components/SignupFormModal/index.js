import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password === confirmPassword) {
			const formData = new FormData();
			formData.append("email", email)
			formData.append("username", username)
			formData.append("profilePicture", profilePicture)
			formData.append("password", password)

			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(Object.values(data));
			} else {
				closeModal();
				history.push('/');
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<ul>
					{errors.map((error, idx) => (
						<li className="error" key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Profile Picture (Optional)
					<input
						type="file"
						accept="image/*"
						onChange={(e)=>setProfilePicture(e.target.files[0])}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
