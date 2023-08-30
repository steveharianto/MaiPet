import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

interface HeaderProps {
    togglePasang: () => void;
}

export default function Header({ togglePasang }: HeaderProps) {
    const navigate = useNavigate();
    const doLogout = async () => {
        await signOut(auth);
        navigate("/");
    };
    return (
        <div className="header">
            {/* Logo */}
            <div style={{ width: "20%", display: "flex" }}>
                <img src="MaiPet-Logo.png" alt="" style={{ marginLeft: "0.5em", height: "100%", marginTop: "auto", marginBottom: "auto" }} />
                <p style={{ fontSize: "2em", fontWeight: "bold", color: "#00bf8f", fontFamily: "'ADLaM Display', cursive", marginTop: "0.2em", marginBottom: "auto" }}>MaiPet</p>
            </div>
            {/* Items */}
            <div style={{ width: "60%", display: "flex", userSelect: "none" }}>
                <div className="header-item" onClick={togglePasang} style={{ backgroundColor: "#fae7a8", color: "#7b5533", textDecoration: "none" }}>
                    Pasang Iklan 🔥
                </div>
            </div>
            {/* Account */}
            <div style={{ width: "20%", display: "flex", justifyContent: "end", marginRight: "2em", borderRadius: "2em" }}>
                {!auth.currentUser ? (
                    <Link to="/Login" className="header-button" style={{ padding: "0.3em", borderRadius: "0.3em", margin: "0.4em", textDecoration: "none", color: "black" }}>
                        <img src={"profile-default.png"} alt="" style={{ borderRadius: "50%", height: "60%", margin: "auto 0 auto 0" }} />
                        <p style={{ margin: "auto 0 auto 0.7em", marginBottom: "auto", fontWeight: "bold" }}>Login / Register</p>
                    </Link>
                ) : (
                    <button onClick={doLogout} className="header-button" style={{ padding: "0.3em", borderRadius: "0.3em", margin: "0.4em", border: "none", backgroundColor: "white" }}>
                        <img src={auth.currentUser?.photoURL || "profile-default.png"} alt="" style={{ borderRadius: "50%", height: "60%", margin: "auto 0 auto 0" }} />
                        <p style={{ margin: "auto 0 auto 0.7em", marginBottom: "auto", fontWeight: "bold" }}>Logout</p>
                    </button>
                )}
            </div>
        </div>
    );
}
