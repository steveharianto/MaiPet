import { Iklan } from "../pages/Home";
import { useEffect, useState } from "react";

interface Props {
    iklan: Iklan;
    showAnjing: (id: string) => void;
}

export default function CardDog(props: Props) {
    const { iklan } = props;
    const [isLoading, setIsLoading] = useState(true);

    // Define priority and basic styles with different accent colors
    const isPriority = iklan.rank.includes("Priority");
    const cardBorderColor = isPriority ? "#00bf8f" : "#e0e0e0";
    const cardAccentColor = isPriority ? "#00bf8f" : "#42a5f5";
    
    // Simple image loading state handler
    const handleImageLoad = () => {
        setIsLoading(false);
    };
    
    const handleImageError = () => {
        setIsLoading(false);
    };
    
    return (
        <div 
            className={`cardDog`} 
            onClick={() => props.showAnjing(iklan.id)}
            style={{ 
                border: `2px solid ${cardBorderColor}`,
                transition: "all 0.2s ease-in-out"
            }}
        >
            <div className="card-image-container" style={{ position: "relative", height: "8rem", width: "100%" }}>
                {isLoading && (
                    <div style={{ 
                        height: "100%", 
                        width: "100%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        borderTopLeftRadius: "0.8rem",
                        borderTopRightRadius: "0.8rem"
                    }}>
                        <div className="loading-spinner"></div>
                    </div>
                )}
                
                <img 
                    src={iklan.gambar || "https://via.placeholder.com/300x200?text=No+Image+Available"} 
                    className="img-fluid cardPic" 
                    alt={iklan.judul} 
                    style={{ 
                        objectFit: "cover", 
                        height: "8rem", 
                        width: "100%",
                        borderTopLeftRadius: "0.8rem",
                        borderTopRightRadius: "0.8rem",
                        display: isLoading ? "none" : "block"
                    }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                
                {/* Priority badge */}
                {isPriority && (
                    <div style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        backgroundColor: "#00bf8f",
                        color: "white",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "1rem",
                        fontSize: "0.6rem",
                        fontWeight: "bold"
                    }}>
                        PREMIUM
                    </div>
                )}
            </div>
            
            <div className={`cardBody`} style={{ 
                padding: "0.8rem", 
                backgroundColor: "#ffffff",
                borderBottomLeftRadius: "0.8rem",
                borderBottomRightRadius: "0.8rem"
            }}>
                <h6 className="cardDog-title" style={{ 
                    fontWeight: "bold", 
                    marginBottom: "0.3rem",
                    color: "#333333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>
                    {iklan.judul}
                </h6>
                
                <p className="cardDog-subtitle mb-2" style={{ 
                    display: "flex", 
                    alignItems: "center",
                    color: "#666666" 
                }}>
                    <i className="bi bi-geo-alt-fill me-1" style={{ color: cardAccentColor }} />
                    <span style={{ 
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {iklan.lokasi}
                    </span>
                </p>
                
                <div className="cardDog-breed" style={{ 
                    fontSize: "0.7rem", 
                    backgroundColor: "#f5f5f5",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.3rem",
                    display: "inline-block",
                    marginBottom: "0.5rem"
                }}>
                    <i className="bi bi-tag-fill me-1" style={{ color: cardAccentColor }} />
                    {iklan.jenis}
                </div>
                
                <div className="cardDog-icon" style={{ display: "flex", flexWrap: "wrap", gap: "0.2rem" }}>
                    {iklan.microchip && <div className="infoDog-icons-blue">MICROCHIP</div>}
                    {iklan.obatCacing && <div className="infoDog-icons">OBAT CACING</div>}
                    {iklan.stambum && <div className="infoDog-icons-blue">STAMBUM</div>}
                    {iklan.vaksin && <div className="infoDog-icons">VAKSIN</div>}
                </div>
            </div>
        </div>
    );
}
