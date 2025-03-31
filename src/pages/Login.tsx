import { auth, provider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Animation states
    const [formVisible, setFormVisible] = useState<boolean>(false);

    useEffect(() => {
        // Trigger animation after component mount
        setTimeout(() => {
            setFormVisible(true);
        }, 100);
    }, []);

    const googleLogo = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" width="20" height="20">
            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
        </svg>
    );

    const signInWithGoogle = async () => {
        try {
            setIsLoading(true);
        await signInWithPopup(auth, provider);
        navigate("/");
        } catch (error) {
            console.error("Google sign-in error:", error);
            setErrorMessage("Gagal masuk dengan Google");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Silakan isi email dan password");
            return;
        }

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            const errorMsg = (error as Error).message;

            if (errorMsg.includes("invalid-email")) {
                setErrorMessage("Format email tidak valid");
            } else if (errorMsg.includes("wrong-password") || errorMsg.includes("user-not-found")) {
                setErrorMessage("Email atau password salah");
            } else {
                setErrorMessage("Terjadi kesalahan saat login");
            }

            console.error("Error logging in:", (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #f5f7fa 0%, #e6f9f1 100%)",
            padding: "1rem"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "420px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transform: formVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                opacity: formVisible ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
            }}>
                {/* Header with logo */}
                <div style={{
                    padding: "2rem 2rem 1.5rem",
                    textAlign: "center",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.05)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.5rem"
                    }}>
                        <img 
                            src="MaiPet-Logo.png" 
                            alt="MaiPet Logo" 
                            style={{ height: "40px", marginRight: "0.75rem" }} 
                        />
                        <h1 style={{
                            color: "#00bf8f",
                            fontFamily: "'ADLaM Display', cursive",
                            fontSize: "1.8rem",
                            margin: 0
                        }}>MaiPet</h1>
                    </div>
                    
                    <h2 style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#333",
                        margin: "0 0 0.5rem"
                    }}>Selamat Datang Kembali</h2>
                    
                    <p style={{
                        fontSize: "0.95rem",
                        color: "#666",
                        margin: 0
                    }}>Masuk untuk menemukan teman berbulu terbaik Anda</p>
                </div>
                
                {/* Form content */}
                <div style={{ padding: "1.5rem 2rem 2rem" }}>
                    {/* Error message display */}
                    {errorMessage && (
                        <div style={{
                            padding: "0.75rem 1rem",
                            backgroundColor: "#fff0f0",
                            borderLeft: "3px solid #ff5757",
                            borderRadius: "4px",
                            marginBottom: "1.25rem",
                            fontSize: "0.875rem",
                            color: "#d92626",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <span style={{ marginRight: "0.5rem" }}>⚠️</span>
                            {errorMessage}
                        </div>
                    )}
                    
                    {/* Email input */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "0.5rem"
                        }}>
                            Email
                        </label>
                        <div style={{
                            position: "relative"
                        }}>
                            <div style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#aaa",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Anda"
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                                    fontSize: "1rem",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                    transition: "all 0.2s ease",
                                    outline: "none"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#00bf8f";
                                    e.target.style.backgroundColor = "#fff";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 191, 143, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e0e0e0";
                                    e.target.style.backgroundColor = "#f9f9f9";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Password input */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "0.5rem"
                        }}>
                            <label style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "#444"
                            }}>
                                Password
                            </label>
                            <a 
                                href="#" 
                                style={{ 
                                    fontSize: "0.75rem", 
                                    color: "#00bf8f", 
                                    textDecoration: "none",
                                    fontWeight: "500"
                                }}
                                onClick={(e) => e.preventDefault()}
                            >
                                Lupa Password?
                            </a>
                        </div>
                        <div style={{
                            position: "relative"
                        }}>
                            <div style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#aaa",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password Anda"
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 2.5rem 0.75rem 2.5rem",
                                    fontSize: "1rem",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                    transition: "all 0.2s ease",
                                    outline: "none"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#00bf8f";
                                    e.target.style.backgroundColor = "#fff";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(0, 191, 143, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#e0e0e0";
                                    e.target.style.backgroundColor = "#f9f9f9";
                                    e.target.style.boxShadow = "none";
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleLogin();
                                    }
                                }}
                            />
                            <div 
                                style={{
                                    position: "absolute",
                                    right: "1rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#aaa",
                                    cursor: "pointer"
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Login button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            padding: "0.875rem",
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#fff",
                            backgroundColor: "#00bf8f",
                            border: "none",
                            borderRadius: "8px",
                            cursor: isLoading ? "wait" : "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "1.5rem",
                            boxShadow: "0 4px 12px rgba(0, 191, 143, 0.2)"
                        }}
                        onMouseOver={(e) => {
                            if (!isLoading) {
                                e.currentTarget.style.backgroundColor = "#00a67d";
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 191, 143, 0.25)";
                            }
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#00bf8f";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 191, 143, 0.2)";
                        }}
                    >
                        {isLoading ? (
                            <div style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "50%",
                                borderTopColor: "#fff",
                                animation: "spin 1s linear infinite"
                            }}>
                                <style>{`
                                    @keyframes spin {
                                        0% { transform: rotate(0deg); }
                                        100% { transform: rotate(360deg); }
                                    }
                                `}</style>
            </div>
                        ) : (
                            "Masuk"
                        )}
                    </button>
                    
                    {/* Divider */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "1.5rem 0",
                        color: "#aaa",
                        fontSize: "0.875rem"
                    }}>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#e0e0e0"
                        }}></div>
                        <span style={{ margin: "0 0.75rem" }}>atau</span>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#e0e0e0"
                        }}></div>
            </div>
                    
                    {/* Google sign in button */}
                    <button
                        onClick={signInWithGoogle}
                        disabled={isLoading}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            backgroundColor: "#fff",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            color: "#333",
                            cursor: isLoading ? "wait" : "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            marginBottom: "1.5rem"
                        }}
                        onMouseOver={(e) => {
                            if (!isLoading) {
                                e.currentTarget.style.backgroundColor = "#f8f8f8";
                                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                            }
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
                        }}
                    >
                        <span style={{ marginRight: "0.75rem" }}>{googleLogo}</span>
                        <span>Lanjutkan dengan Google</span>
                </button>
                    
                    {/* Register link */}
                    <div style={{
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "#666"
                    }}>
                        <span>Belum punya akun? </span>
                        <Link 
                            to="/Register" 
                            style={{
                                color: "#00bf8f",
                                textDecoration: "none",
                                fontWeight: "500",
                                transition: "color 0.2s ease"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.textDecoration = "underline";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.textDecoration = "none";
                            }}
                        >
                            Daftar Sekarang
                </Link>
            </div>
            </div>

                {/* Footer */}
                <div style={{
                    backgroundColor: "#f9f9f9",
                    padding: "1rem",
                    textAlign: "center",
                    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                    fontSize: "0.75rem",
                    color: "#888"
                }}>
                    <Link 
                        to="/" 
                        style={{
                            color: "#666",
                            textDecoration: "none",
                            transition: "color 0.2s ease"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = "#00bf8f";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = "#666";
                        }}
                    >
                        Kembali ke Beranda
            </Link>
                </div>
            </div>
        </div>
    );
}
