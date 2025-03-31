import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<{
        score: number;
        feedback: string;
    }>({ score: 0, feedback: "" });

    // Animation effect
    useEffect(() => {
        setTimeout(() => {
            setFormVisible(true);
        }, 100);
    }, []);

    // Password strength checker
    useEffect(() => {
        if (!password) {
            setPasswordStrength({ score: 0, feedback: "" });
            return;
        }

        // Simple password strength checker
        let score = 0;
        let feedback = "";

        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
                feedback = "Sangat lemah";
                break;
            case 1:
                feedback = "Lemah";
                break;
            case 2:
                feedback = "Sedang";
                break;
            case 3:
                feedback = "Kuat";
                break;
            case 4:
                feedback = "Sangat kuat";
                break;
            default:
                feedback = "";
        }

        setPasswordStrength({ score, feedback });
    }, [password]);

    const handleRegister = async () => {
        // Form validation
        if (!email || !password) {
            setError("Silakan isi semua field yang diperlukan");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok");
            return;
        }

        if (password.length < 8) {
            setError("Password harus minimal 8 karakter");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile if name is provided
            if (displayName && userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: displayName
                });
            }
            
            // Success alert
            alert("Akun berhasil dibuat!");
            navigate("/Login");
        } catch (error) {
            const errorMessage = (error as Error).message;

            if (errorMessage.includes("email-already-in-use")) {
                setError("Email sudah terdaftar, silakan gunakan email lain");
            } else if (errorMessage.includes("invalid-email")) {
                setError("Format email tidak valid");
            } else if (errorMessage.includes("weak-password")) {
                setError("Password terlalu lemah, gunakan minimal 6 karakter");
            } else {
                setError("Terjadi kesalahan saat registrasi");
            }
            
            console.error("Registration error:", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Strength bar color function
    const getStrengthColor = (score: number) => {
        switch (score) {
            case 0: return "#e0e0e0";
            case 1: return "#f44336";
            case 2: return "#ff9800";
            case 3: return "#2196f3";
            case 4: return "#4caf50";
            default: return "#e0e0e0";
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
                    }}>Buat Akun Baru</h2>
                    
                    <p style={{
                        fontSize: "0.95rem",
                        color: "#666",
                        margin: 0
                    }}>Daftar untuk mulai menjelajahi teman berbulu</p>
                </div>
                
                {/* Form content */}
                <div style={{ padding: "1.5rem 2rem 2rem" }}>
                    {/* Error message display */}
                    {error && (
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
                            {error}
                        </div>
                    )}
                    
                    {/* Name input */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "0.5rem"
                        }}>
                            Nama <span style={{ color: "#999", fontSize: "0.75rem" }}>(opsional)</span>
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
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Nama Anda"
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
                    
                    {/* Email input */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "0.5rem"
                        }}>
                            Email <span style={{ color: "#ff5757" }}>*</span>
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
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "0.5rem"
                        }}>
                            Password <span style={{ color: "#ff5757" }}>*</span>
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
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Buat password"
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
                        
                        {/* Password strength bar */}
                        {password && (
                            <div style={{ marginTop: "0.5rem" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "0.25rem"
                                }}>
                                    <div style={{
                                        height: "4px",
                                        width: "75%",
                                        backgroundColor: "#e0e0e0",
                                        borderRadius: "2px",
                                        overflow: "hidden"
                                    }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${passwordStrength.score * 25}%`,
                                            backgroundColor: getStrengthColor(passwordStrength.score),
                                            transition: "width 0.3s ease, background-color 0.3s ease"
                                        }}></div>
                                    </div>
                                    <div style={{
                                        fontSize: "0.75rem",
                                        color: getStrengthColor(passwordStrength.score) === "#e0e0e0" ? "#888" : getStrengthColor(passwordStrength.score),
                                        fontWeight: "500"
                                    }}>
                                        {passwordStrength.feedback}
                                    </div>
                                </div>
                                <p style={{
                                    fontSize: "0.75rem",
                                    color: "#888",
                                    margin: "0.25rem 0 0"
                                }}>
                                    Gunakan 8+ karakter dengan huruf besar, angka & simbol
                                </p>
                            </div>
                        )}
            </div>

                    {/* Confirm Password input */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#444",
                            marginBottom: "0.5rem"
                        }}>
                            Konfirmasi Password <span style={{ color: "#ff5757" }}>*</span>
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
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Konfirmasi password"
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 1rem 0.75rem 2.5rem",
                                    fontSize: "1rem",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    backgroundColor: "#f9f9f9",
                                    transition: "all 0.2s ease",
                                    outline: "none",
                                    borderColor: confirmPassword && password !== confirmPassword ? "#ff5757" : "#e0e0e0",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = confirmPassword && password !== confirmPassword ? "#ff5757" : "#00bf8f";
                                    e.target.style.backgroundColor = "#fff";
                                    e.target.style.boxShadow = confirmPassword && password !== confirmPassword 
                                        ? "0 0 0 3px rgba(255, 87, 87, 0.1)" 
                                        : "0 0 0 3px rgba(0, 191, 143, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = confirmPassword && password !== confirmPassword ? "#ff5757" : "#e0e0e0";
                                    e.target.style.backgroundColor = "#f9f9f9";
                                    e.target.style.boxShadow = "none";
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleRegister();
                                    }
                                }}
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <div style={{ 
                                    fontSize: "0.75rem", 
                                    color: "#ff5757", 
                                    marginTop: "0.25rem" 
                                }}>
                                    Password tidak cocok
                                </div>
                            )}
                        </div>
            </div>
                    
                    {/* Register button */}
                    <button
                        onClick={handleRegister}
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
                            "Daftar Akun"
                        )}
                </button>

                    {/* Login link */}
                    <div style={{
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "#666"
                    }}>
                        <span>Sudah punya akun? </span>
                        <Link 
                            to="/Login" 
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
                            Masuk Sekarang
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
                    <div style={{ marginBottom: "0.5rem" }}>
                        Dengan mendaftar, Anda menyetujui Syarat & Ketentuan MaiPet
                    </div>
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
