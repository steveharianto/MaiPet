import { auth, provider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const googleLogo = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
        </svg>
    );

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/");
    };
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            const errorMsg = (error as Error).message;

            if (errorMsg.includes("invalid-email")) {
                setErrorMessage("Invalid email format");
            } else if (errorMsg.includes("wrong-password")) {
                setErrorMessage("Invalid password");
            } else {
                setErrorMessage("An error occurred during login");
            }

            console.error("Error logging in:", (error as Error).message);
        }
    };

    return (
        <div className="loginPage">
            <p style={{ fontWeight: "bold" }}>LOGIN</p>
            <div className="loginPage-input-container">
                <input className="loginPage-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {errorMessage.includes("email") && <div className="loginPage-error">{errorMessage}</div>}
            <div className="loginPage-input-container">
                <input className="loginPage-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage.includes("password") && <div className="loginPage-error">{errorMessage}</div>}
            <div style={{ display: "flex", justifyContent: "space-between", width: "20em", margin: "1em 0 0 0" }}>
                <button style={{ margin: "0 2em 0 2em", backgroundColor: "#00bf8f", color: "white" }} className="loginPage-google" onClick={handleLogin}>
                    Login
                </button>
                <Link style={{ margin: "0 2em 0 2em", textDecoration: "none" }} className="loginPage-google" to="/Register">
                    Register
                </Link>
            </div>
            <div style={{ width: "20em" }}>
                <button style={{ margin: "1em auto 0 auto" }} onClick={signInWithGoogle} className="loginPage-google">
                    {googleLogo}Continue With Google
                </button>
            </div>

            <Link to="/" style={{ margin: "2em 0 0 0", textDecoration: "none" }}>
                Kembali
            </Link>
        </div>
    );
}
