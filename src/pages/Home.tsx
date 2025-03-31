import CardDog from "../components/CardDog";
import CategoryDog from "../components/CategoryDog";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PasangIklan from "../components/PasangIklan";
import InfoDog from "../components/InfoDog";

export interface AnjingInfo {
    DOB: Timestamp | null;
    kelamin: string;
    warna: string;
}
export interface Iklan {
    id: string;
    judul: string;
    jenis: string;
    kontak: string;
    lokasi: string;
    microchip: boolean;
    obatCacing: boolean;
    stambum: boolean;
    vaksin: boolean;
    rank: string;
    Anjing: AnjingInfo[];
    body: string;
    status: string;
    gambar: string;
}

export default function Home() {
    const [iklanList, setIklanList] = useState<Iklan[] | null>(null);
    const iklanRef = collection(db, "iklan");
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const filterType = queryParams.get("filterType");
    const existingFilters = filterType ? filterType.split(",") : [];
    const [filterInput, setFilterInput] = useState<string>("");
    const [showPasang, setShowPasang] = useState<boolean>(false);
    const [showAnjing, setShowAnjing] = useState<boolean>(false);
    const [currentIklan, setCurrentIklan] = useState<Iklan | null>(null);
    const [loadingText, setLoadingText] = useState("Mengambil anjing-anjing...");

    const togglePasang = () => {
        setShowPasang(!showPasang);
    };

    const hideAnjing = () => {
        setShowAnjing(false);
    };

    const showAnjingDetail = (id: string) => {
        const selectedIklan = iklanList ? iklanList.find((iklan) => iklan.id === id) : null;
        if (selectedIklan) {
            setCurrentIklan(selectedIklan);
            setShowAnjing(true);
        }
    };

    const handleFilterChange = (event: { target: { value: SetStateAction<string> } }) => {
        setFilterInput(event.target.value);
    };

    const removeFilter = (filterToRemove: string) => {
        const updatedFilters = existingFilters.filter(f => f !== filterToRemove);
        const updatedFilterType = updatedFilters.join(",");
        navigate(`/?filterType=${updatedFilterType}`);
    };

    const getIklan = async () => {
        const data = await getDocs(iklanRef);
        setIklanList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Iklan[]);
    };

    useEffect(() => {
        getIklan();
    }, []);

    useEffect(() => {
        if (!iklanList) {
            const loadingMessages = [
                "Mengambil anjing-anjing...",
                "Menyiapkan kandang virtual...",
                "Mengumpulkan foto-foto lucu...",
                "Menghitung ekor yang digoyang...",
                "Mempersiapkan teman-teman berbulu...",
                "Menuangkan makanan anjing...",
                "Mengajak anjing-anjing jalan-jalan..."
            ];
            
            const interval = setInterval(() => {
                setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
            }, 3000);
            
            return () => clearInterval(interval);
        }
    }, [iklanList]);

    if (!iklanList) {
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #e6f9f1 100%)",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999
            }}>
                {/* CSS for animations */}
                <style>
                    {`
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-20px); }
                        }
                        
                        @keyframes pawAnimation {
                            0% { transform: scale(1); opacity: 0.8; }
                            50% { transform: scale(1.2); opacity: 1; }
                            100% { transform: scale(1); opacity: 0.8; }
                        }
                        
                        @keyframes walkAnimation {
                            0% { transform: translateX(-150px); }
                            50% { transform: translateX(0); }
                            100% { transform: translateX(150px); }
                        }
                        
                        @keyframes fadeInOut {
                            0% { opacity: 0.5; }
                            50% { opacity: 1; }
                            100% { opacity: 0.5; }
                        }
                        
                        @keyframes dotAnimation {
                            0%, 20% { transform: translateY(0); }
                            40% { transform: translateY(-10px); }
                            60%, 100% { transform: translateY(0); }
                        }
                    `}
                </style>
                
                {/* Logo area */}
                <div style={{
                    marginBottom: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <img 
                        src="MaiPet-Logo.png" 
                        alt="MaiPet Logo" 
                        style={{
                            height: "80px",
                            animation: "bounce 2s infinite ease-in-out",
                            marginRight: "1rem"
                        }}
                    />
                    <h1 style={{
                        color: "#00bf8f",
                        fontFamily: "'ADLaM Display', cursive",
                        fontSize: "3rem",
                        margin: 0
                    }}>MaiPet</h1>
                </div>
                
                {/* Paw prints loading animation */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "2rem",
                    position: "relative",
                    width: "300px",
                    height: "80px"
                }}>
                    {/* Dog silhouette */}
                    <div style={{
                        position: "absolute",
                        animation: "walkAnimation 4s infinite ease-in-out",
                        top: "-15px"
                    }}>
                        <svg width="60" height="40" viewBox="0 0 512 512" fill="#00bf8f">
                            <path d="M256,160c-97.2,0-176,78.8-176,176c0,97.2,78.8,176,176,176c97.2,0,176-78.8,176-176C432,238.8,353.2,160,256,160z
                            M292,328c0,4.4-3.6,8-8,8h-56c-4.4,0-8-3.6-8-8v-48c0-4.4,3.6-8,8-8h56c4.4,0,8,3.6,8,8V328z M356,241.7
                            c-3,4.3-7.9,6.6-12.9,6.6c-3.1,0-6.3-1-9.1-2.9l-51.5-36.1c-7.1-5-8.9-14.9-3.9-22c5-7.1,14.9-8.9,22-3.9l51.5,36.1
                            C359.2,224.7,361,234.6,356,241.7z M158.9,245.4c-3.1,0-6.3-1-9.1-2.9c-7.1-5-8.9-14.9-3.9-22l51.5-73.6c5-7.1,14.9-8.9,22-3.9
                            c7.1,5,8.9,14.9,3.9,22l-51.5,73.6C168.9,243,163.9,245.4,158.9,245.4z"/>
                        </svg>
                    </div>
                    
                    {/* Paw prints */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div 
                            key={i} 
                            style={{
                                position: "absolute",
                                left: `${i * 60}px`,
                                animation: `pawAnimation 1.5s infinite ease-in-out ${i * 0.2}s`,
                                opacity: 0.8
                            }}
                        >
                            <svg width="30" height="30" viewBox="0 0 512 512" fill="#00bf8f">
                                <path d="M256,224c-11,0-20,9-20,20s9,20,20,20s20-9,20-20S267,224,256,224z M327.2,168c-12.2,0-22,9.8-22,22s9.8,22,22,22
                                s22-9.8,22-22S339.3,168,327.2,168z M184.8,168c-12.2,0-22,9.8-22,22s9.8,22,22,22s22-9.8,22-22S196.9,168,184.8,168z
                                M359.2,84c0-12.8-10.2-23-23-23c-12.8,0-23,10.2-23,23s10.2,23,23,23C349,107,359.2,96.8,359.2,84z M152.8,84
                                c0-12.8-10.2-23-23-23c-12.8,0-23,10.2-23,23s10.2,23,23,23C142.6,107,152.8,96.8,152.8,84z M370.8,203.3
                                c-24.7-26.9-20.6-48.7-14.2-64c10.4-24.7,33.4-43.2,33.4-84c0-30.4-31.8-55.3-70.9-55.3c-26.5,0-50.2,12.2-63.1,31.1
                                c0,0-21,43.1,0,69.6c21,26.5,8.4,48.7,0,60.9c-8.4,12.2-50.2,31.1-50.2,31.1c-31.8,21-13.4,48.7-6.7,57.1
                                c6.7,8.4,8.4,48.7,75.3,39c29.4-4.2,50.9-18.9,64-31.1c7.5-8.5,34.3-14.8,37.4,5.6c1.3,8.4,0.2,37.8,35.1,56.4
                                c17.9,9.5,54.9,12.6,73.2-6.7C484.2,300.2,423.3,260.4,370.8,203.3z M141.2,203.3c-52.4,57.1-113.4,96.9-113.4,109.1
                                c0,12.2,37.6,31.1,73.2,6.7c35-18.7,33.9-48,35.1-56.4c3.1-20.3,29.9-14.1,37.4-5.6c13.1,12.2,34.7,26.9,64,31.1
                                c66.9,9.7,68.5-30.6,75.3-39c6.7-8.4,25.2-36.1-6.7-57.1c0,0-41.8-18.9-50.2-31.1c-8.4-12.2-21-34.3,0-60.9
                                c21-26.5,0-69.6,0-69.6C243.1,12.2,219.3,0,192.8,0c-39.1,0-70.9,24.9-70.9,55.3c0,40.8,23,59.4,33.4,84
                                C161.8,154.7,165.9,176.4,141.2,203.3z"/>
                            </svg>
                        </div>
                    ))}
                </div>
                
                {/* Loading text */}
                <div style={{
                    fontSize: "1.2rem",
                    color: "#333",
                    fontWeight: "500",
                    textAlign: "center",
                    animation: "fadeInOut 2s infinite ease-in-out",
                    marginBottom: "1rem",
                    fontFamily: "'Quicksand', sans-serif",
                    maxWidth: "80%"
                }}>
                    {loadingText}
                </div>
                
                {/* Animated dots */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px"
                }}>
                    {[0, 1, 2].map((i) => (
                        <div 
                            key={i} 
                            style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: "#00bf8f",
                                borderRadius: "50%",
                                animation: `dotAnimation 1.5s infinite ease-in-out ${i * 0.2}s`
                            }}
                        ></div>
                    ))}
                </div>
                
                {/* Progress bar */}
                <div style={{
                    width: "200px",
                    height: "4px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "2px",
                    marginTop: "1.5rem",
                    overflow: "hidden",
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "30%",
                        backgroundColor: "#00bf8f",
                        borderRadius: "2px",
                        animation: "progressAnimation 2s infinite ease-in-out"
                    }}></div>
                    <style>
                        {`
                            @keyframes progressAnimation {
                                0% { width: 0%; left: 0; }
                                50% { width: 70%; }
                                100% { width: 0%; left: 100%; }
                            }
                        `}
                    </style>
                </div>
            </div>
        );
    }

    const categories = ["Akita", "Alaskan Malamute", "American Bully", "American Cocker Spaniel", "American Pit Bull Terrier", "Australian Shepherd", "Basenji", "Beagle", "Belgian Malinois", "Bernese Mountain Dog", "Bichon Frise", "Biewer Terrier", "Border Collie", "Bulldog", "Cane Corso", "Cavalier King Charles Spaniel", "Chihuahua", "Chow Chow", "Dalmatian", "Doberman Pinscher", "Dogo Argentino", "Dutch Shepherd", "English Cocker Spaniel", "French Bulldog", "Golden Retriever", "Great Dane", "Greyhound", "Herder / German Shepherd", "Jack Russell Terrier", "Japanese Chin", "Kintamani", "Labrador Retriever", "Maltese", "Miniature Pinscher", "Miniature Schnauzer", "Mixed Breed / Campuran", "Pekingese", "Pembroke Welsh Corgi", "Pomeranian", "Poodle", "Pug", "Rottweiler", "Samoyed", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu", "Siberian Husky", "Tekel / Dachshund", "West Highland White Terrier", "Yorkshire Terrier"];
    const filteredCategories = categories.filter((category) => category.toLowerCase().includes(filterInput.toLowerCase()));
    const filteredIklanList = existingFilters.length === 0 ? iklanList.filter((iklan) => iklan.status === "Active") : iklanList.filter((iklan) => existingFilters.includes(iklan.jenis) && iklan.status === "Active");

    return (
        <>
            <div className={showPasang || showAnjing ? "blur" : ""}>
                <Header togglePasang={togglePasang} />
                <div style={{ height: "20em", marginBottom: "1em" }}>
                    <img src="header-pic.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}></img>
                    <p style={{ position: "absolute", top: "25%", left: "25%", transform: "translateX(-50%)", fontFamily: "'Quicksand', sans-serif", fontSize: "3em", lineHeight: "1.2", color: "#fff", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", padding: "0.5em" }}>
                        Let your paw-some <br />
                        connection begin!
                    </p>
                </div>
                <div className="content">
                    <div className="content-left">
                        <div className="filter">
                            <p style={{ padding: "0.5em", margin: "0" }}>
                                <b>Jenis Anjing</b>
                            </p>
                            <div className="searchBar">
                                <input type="text" onChange={handleFilterChange} placeholder="Cari Jenis Anjing" className="filterList-input" />
                            </div>
                            {filteredCategories.map((category, index) => (
                                <CategoryDog key={index} name={category} />
                            ))}
                        </div>
                    </div>
                    <div className="content-right">
                        <p>
                            <b style={{ marginBottom: "0.3rem" }}>Papan Iklan</b>
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem" }}>
                            {existingFilters.length > 0 ? (
                                existingFilters.map((filter, index) => (
                                    <div 
                                        key={index}
                                        style={{
                                            backgroundColor: "#e6f9f1",
                                            color: "#00a57a",
                                            border: "1px solid #00bf8f",
                                            borderRadius: "2em",
                                            marginRight: "0.7em",
                                            marginBottom: "0.5em",
                                            fontWeight: 600,
                                            padding: "0.4em 1em",
                                            fontSize: "0.85rem",
                                            display: "flex",
                                            alignItems: "center",
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                            transition: "all 0.2s ease",
                                            cursor: "pointer",
                                            animation: "popupAnimation 0.1s ease-out",
                                            position: "relative"
                                        }}
                                        onClick={() => removeFilter(filter)}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = "#d1f5e6";
                                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,191,143,0.2)";
                                            e.currentTarget.style.transform = "scale(1.05)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = "#e6f9f1";
                                            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        {filter}
                                        <span style={{ 
                                            marginLeft: "0.5em", 
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "18px",
                                            height: "18px",
                                            borderRadius: "50%",
                                            backgroundColor: "#00bf8f",
                                            color: "white",
                                            fontSize: "0.7rem",
                                            fontWeight: "bold",
                                            transition: "all 0.2s ease",
                                            transform: "translateZ(0)"
                                        }}>×</span>
                                    </div>
                                ))
                            ) : (
                                <div style={{ 
                                    color: "#666", 
                                    fontSize: "0.9rem", 
                                    fontStyle: "italic",
                                    marginBottom: "0.5em" 
                                }}>
                                    Tidak ada filter yang diterapkan. Pilih jenis anjing dari menu.
                                </div>
                            )}
                        </div>
                        <div className="dogList">
                            {filteredIklanList?.map((iklan) => (
                                <CardDog iklan={iklan} key={iklan.id} showAnjing={showAnjingDetail} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showPasang && <PasangIklan togglePasang={togglePasang} />}
            {showAnjing && currentIklan && <InfoDog iklan={currentIklan} hideAnjing={hideAnjing} />}
        </>
    );
}
