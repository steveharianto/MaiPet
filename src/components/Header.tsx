import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

interface HeaderProps {
    togglePasang: () => void;
}

export default function Header({ togglePasang }: HeaderProps) {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuHover, setMenuHover] = useState(false);
    
    // Add scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);
    
    const doLogout = async () => {
        await signOut(auth);
        navigate("/");
    };
    
    return (
        <div style={{
            height: "3.75rem",
            backgroundColor: "#ffffff",
            display: "flex",
            boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "0 2px 10px rgba(0, 0, 0, 0.08)",
            zIndex: 100,
            position: "sticky",
            top: 0,
            transition: "all 0.3s ease",
            padding: "0 1.5rem",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {/* Logo */}
            <Link to="/" style={{ 
                display: "flex", 
                alignItems: "center",
                textDecoration: "none",
                transition: "transform 0.2s ease",
                transform: `scale(${scrolled ? 0.95 : 1})`,
            }}>
                <img 
                    src="MaiPet-Logo.png" 
                    alt="MaiPet" 
                    style={{ 
                        height: "2.5rem", 
                        marginRight: "0.75rem",
                        transition: "all 0.2s ease"
                    }} 
                />
                <p style={{ 
                    fontSize: "1.75rem", 
                    fontWeight: "bold", 
                    color: "#00bf8f", 
                    fontFamily: "'ADLaM Display', cursive", 
                    margin: 0,
                    letterSpacing: "-0.5px",
                    textShadow: "0 1px 2px rgba(0, 191, 143, 0.2)"
                }}>
                    MaiPet
                </p>
            </Link>
            
            {/* Navigation/Menu Items */}
            <div style={{ 
                display: "flex", 
                alignItems: "center",
                gap: "1rem"
            }}>
                <div 
                    onClick={togglePasang} 
                    onMouseEnter={() => setMenuHover(true)}
                    onMouseLeave={() => setMenuHover(false)}
                    style={{ 
                        backgroundColor: menuHover ? "#fae086" : "#fae7a8", 
                        color: "#7b5533", 
                        padding: "0.5rem 1.2rem",
                        borderRadius: "2rem",
                        fontWeight: menuHover ? "600" : "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        boxShadow: menuHover ? "0 4px 12px rgba(250, 231, 168, 0.5)" : "0 2px 6px rgba(250, 231, 168, 0.3)",
                        transition: "all 0.2s ease",
                        transform: menuHover ? "translateY(-2px)" : "translateY(0)",
                        fontSize: "0.95rem"
                    }}
                >
                    <span style={{ marginRight: "0.5rem" }}>Pasang Iklan</span>
                    <span style={{ 
                        backgroundColor: "#fff", 
                        borderRadius: "50%",
                        width: "1.25rem",
                        height: "1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ff6b6b",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}>
                        🔥
                    </span>
                </div>
                
                {!auth.currentUser ? (
                    <Link to="/Login" style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        borderRadius: "2rem",
                        textDecoration: "none",
                        color: "#333",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #eaeaea",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                        fontSize: "0.9rem",
                        fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e9ecef";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.04)";
                    }}
                    >
                        <img 
                            src={"profile-default.png"} 
                            alt="" 
                            style={{ 
                                width: "1.75rem", 
                                height: "1.75rem",
                                borderRadius: "50%", 
                                marginRight: "0.5rem",
                                border: "2px solid #fff",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }} 
                        />
                        Login / Register
                    </Link>
                ) : (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem"
                    }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.25rem 0.5rem 0.25rem 0.25rem",
                            backgroundColor: "#f0f9f4",
                            borderRadius: "2rem",
                            border: "1px solid #e0f2e9",
                            color: "#00bf8f",
                            fontSize: "0.85rem",
                            fontWeight: "500"
                        }}>
                            <span style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50%",
                                backgroundColor: "#00bf8f",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "0.5rem",
                                fontSize: "0.7rem",
                                fontWeight: "bold"
                            }}>
                                {auth.currentUser.email?.[0].toUpperCase() || "U"}
                            </span>
                            {auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || "User"}
                        </div>
                        
                        <button 
                            onClick={doLogout} 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "0.5rem 1rem",
                                borderRadius: "2rem",
                                backgroundColor: "#fff",
                                border: "1px solid #e6e6e6",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "500",
                                color: "#666",
                                transition: "all 0.2s ease",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#f5f5f5";
                                e.currentTarget.style.color = "#333";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#fff";
                                e.currentTarget.style.color = "#666";
                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.04)";
                            }}
                        >
                            <img 
                                src={auth.currentUser?.photoURL || "profile-default.png"} 
                                alt="" 
                                style={{ 
                                    width: "1.5rem", 
                                    height: "1.5rem",
                                    borderRadius: "50%", 
                                    marginRight: "0.5rem",
                                    objectFit: "cover",
                                    border: "2px solid #fff"
                                }} 
                            />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
