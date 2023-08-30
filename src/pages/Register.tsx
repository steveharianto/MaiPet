import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            setError(null); // Clear any previous errors
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Berhasil Membuat Akun");
            navigate("/Login"); // Redirect to home page after successful registration
        } catch (error) {
            const errorMessage = (error as Error).message;

            if (errorMessage.includes("invalid-email")) {
                setError("Invalid email format");
            } else if (errorMessage.includes("wrong-password")) {
                setError("Invalid password");
            } else {
                setError("An error occurred during login");
            }
        }
    };

    return (
        <div className="loginPage">
            <p style={{ fontWeight: "bold" }}>Register Page</p>

            <div className="loginPage-input-container">
                <input className="loginPage-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {error?.includes("email") && <div className="loginPage-error">{error}</div>}
            <div className="loginPage-input-container">
                <input className="loginPage-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error?.includes("password") && <div className="loginPage-error">{error}</div>}
            {!error?.includes("password") && !error?.includes("email") && <div className="loginPage-error">{error}</div>}

            <div style={{ display: "flex", justifyContent: "space-between", width: "20em", margin: "1em 0 0 0" }}>
                <button style={{ margin: "0 2em 0 2em", backgroundColor: "#00bf8f", color: "white" }} className="loginPage-google" onClick={handleRegister}>
                    Register
                </button>

                <Link to="/Login" style={{ margin: "0 2em 0 2em", textDecoration: "none" }} className="loginPage-google">
                    Login
                </Link>
            </div>
            <Link to="/" style={{ margin: "2em 0 0 0", textDecoration: "none" }}>
                Kembali
            </Link>
        </div>
    );
}
