import { Iklan } from "../pages/Home";
import { useEffect, useState } from "react";

interface Props {
    iklan: Iklan;
    hideAnjing: () => void;
}

export default function InfoDog(props: Props) {
    const { iklan } = props;
    const [isLoading, setIsLoading] = useState(true);

    // Image loading handlers
    const handleImageLoad = () => setIsLoading(false);
    const handleImageError = () => setIsLoading(false);

    return (
        <div className="infoDog" style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "0 1rem"
        }}>
            <div className="infoDog-card" style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "800px",
                maxHeight: "90vh",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                animation: "fadeIn 0.3s ease-out",
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Header with back button */}
                <div className="infoDog-header" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #f0f0f0"
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#333"
                    }}>
                        Detail Anjing
                    </h2>
                    <button 
                        onClick={props.hideAnjing}
                        style={{
                            backgroundColor: "#f0f0f0",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Kembali
                    </button>
                </div>

                {/* Main content */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "1.5rem",
                    gap: "2rem",
                    flexWrap: "wrap"
                }}>
                    {/* Image section */}
                    <div style={{
                        flex: "1 1 300px",
                        position: "relative",
                        minHeight: "300px"
                    }}>
                        {isLoading && (
                            <div style={{ 
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center",
                                backgroundColor: "#f0f0f0",
                                borderRadius: "0.5rem"
                            }}>
                                <div className="loading-spinner"></div>
                            </div>
                        )}
                        <img 
                            src={iklan.gambar || "https://via.placeholder.com/600x400?text=No+Image+Available"} 
                            style={{ 
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", 
                                borderRadius: "0.5rem",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                display: isLoading ? "none" : "block"
                            }}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            alt={iklan.judul}
                        />
                    </div>

                    {/* Info section */}
                    <div style={{
                        flex: "1 1 300px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem"
                    }}>
                        <h1 style={{
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                            color: "#333",
                            marginBottom: "0.5rem",
                            lineHeight: 1.2
                        }}>
                            {iklan.judul}
                        </h1>

                        <div style={{ marginBottom: "0.5rem" }}>
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                                marginBottom: "1rem"
                            }}>
                                {iklan.microchip && (
                                    <div style={{
                                        backgroundColor: "#e3f2fd",
                                        color: "#1976d2",
                                        padding: "0.3rem 0.8rem",
                                        borderRadius: "1rem",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                        MICROCHIP
                                    </div>
                                )}
                                {iklan.obatCacing && (
                                    <div style={{
                                        backgroundColor: "#e8f5e9",
                                        color: "#2e7d32",
                                        padding: "0.3rem 0.8rem",
                                        borderRadius: "1rem",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                        OBAT CACING
                                    </div>
                                )}
                                {iklan.stambum && (
                                    <div style={{
                                        backgroundColor: "#e3f2fd",
                                        color: "#1976d2",
                                        padding: "0.3rem 0.8rem",
                                        borderRadius: "1rem",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                        STAMBUM
                                    </div>
                                )}
                                {iklan.vaksin && (
                                    <div style={{
                                        backgroundColor: "#e8f5e9",
                                        color: "#2e7d32",
                                        padding: "0.3rem 0.8rem",
                                        borderRadius: "1rem",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <i className="bi bi-check-circle-fill me-1"></i>
                                        VAKSIN
                                    </div>
                                )}
                    </div>
                </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            backgroundColor: "#f9f9f9",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            marginBottom: "1rem"
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <i className="bi bi-geo-alt-fill" style={{
                                    color: "#f44336",
                                    marginRight: "0.75rem",
                                    fontSize: "1.25rem"
                                }}></i>
                                <span style={{
                                    fontSize: "0.9rem",
                                    color: "#555"
                                }}>
                                    {iklan.lokasi}
                                </span>
                            </div>

                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <i className="bi bi-tag-fill" style={{
                                    color: "#2196f3",
                                    marginRight: "0.75rem",
                                    fontSize: "1.25rem"
                                }}></i>
                                <span style={{
                                    fontSize: "0.9rem",
                                    color: "#555"
                                }}>
                                    {iklan.jenis}
                                </span>
                            </div>

                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <i className="bi bi-telephone-fill" style={{
                                    color: "#4caf50",
                                    marginRight: "0.75rem",
                                    fontSize: "1.25rem"
                                }}></i>
                                <a 
                                    href={`tel:${iklan.kontak}`}
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "#00bf8f",
                                        textDecoration: "none",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {iklan.kontak}
                                </a>
                            </div>
                    </div>

                        <a 
                            href={`https://wa.me/${iklan.kontak}?text=Halo, saya tertarik dengan anjing ${iklan.judul} yang Anda pasang di MaiPet.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: "#25D366",
                                color: "white",
                                padding: "0.75rem",
                                borderRadius: "0.5rem",
                                textDecoration: "none",
                                textAlign: "center",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                marginTop: "auto",
                                transition: "all 0.2s ease"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#128C7E"}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#25D366"}
                        >
                            <i className="bi bi-whatsapp" style={{ fontSize: "1.25rem" }}></i>
                            Hubungi via WhatsApp
                        </a>
                        </div>
                    </div>

                {/* Description section */}
                <div style={{
                    padding: "0 1.5rem 1.5rem 1.5rem"
                }}>
                    <h3 style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        marginBottom: "0.75rem",
                        color: "#333",
                        borderBottom: "1px solid #f0f0f0",
                        paddingBottom: "0.5rem"
                    }}>
                        Deskripsi
                    </h3>
                    <div style={{
                        whiteSpace: "pre-wrap",
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                        color: "#555",
                        backgroundColor: "#fafafa",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        maxHeight: "200px",
                        overflowY: "auto"
                    }}>
                        {iklan.body.replace(/\\n/g, "\n")}
                </div>
                </div>
            </div>
        </div>
    );
}
