import React, { useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { Iklan, AnjingInfo } from "../pages/Home";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Autosuggest from "react-autosuggest";

interface PasangProps {
    togglePasang: () => void;
}

function PasangIklan({ togglePasang }: PasangProps) {
    const initialAnjingInfo: AnjingInfo = {
        DOB: null,
        kelamin: "",
        warna: "",
    };
    const uuid = uuidv4();
    const initialIklan: Iklan = {
        id: uuid,
        judul: "",
        jenis: "",
        kontak: "",
        lokasi: "",
        microchip: false,
        obatCacing: false,
        stambum: false,
        vaksin: false,
        rank: "",
        Anjing: [initialAnjingInfo],
        body: "",
        status: "Pending",
        gambar: "",
    };
    const [iklan, setIklan] = useState(initialIklan);
    const iklanRef = collection(db, "iklan");
    const [currentStep, setCurrentStep] = useState(0);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
    const [animateStep, setAnimateStep] = useState(false);

    // Animation effect
    useEffect(() => {
        setTimeout(() => {
            setFormVisible(true);
        }, 100);
    }, []);

    // Step animation effect
    useEffect(() => {
        setAnimateStep(false);
        setTimeout(() => {
            setAnimateStep(true);
        }, 50);
    }, [currentStep]);

    const cities = [
        "Aceh, Indonesia",
        "Bali, Indonesia",
        "Balikpapan, Indonesia",
        "Bandung, Indonesia",
        "Bangka Belitung, Indonesia",
        "Banjarmasin, Indonesia",
        "Banten, Indonesia",
        "Batam, Indonesia",
        "Bekasi, Indonesia",
        "Bengkulu, Indonesia",
        "Blitar, Indonesia",
        "Bogor, Indonesia",
        "Bontang, Indonesia",
        "Cibubur, Indonesia",
        "Cilacap, Indonesia",
        "Cirebon, Indonesia",
        "Depok, Indonesia",
        "Garut, Indonesia",
        "Gorontalo, Indonesia",
        "Jakarta, Indonesia",
        "Jambi, Indonesia",
        "Jawa Tengah, Indonesia",
        "Jawa Timur, Indonesia",
        "Jember, Indonesia",
        "Karawaci, Indonesia",
        "Karawang, Indonesia",
        "Kediri, Indonesia",
        "Kendari, Indonesia",
        "Kepulauan Riau, Indonesia",
        "Klaten, Indonesia",
        "Kudus, Indonesia",
        "Kupang, Indonesia",
        "Lampung, Indonesia",
        "Lombok, Indonesia",
        "Madiun, Indonesia",
        "Magelang, Indonesia",
        "Makassar, Indonesia",
        "Malang, Indonesia",
        "Maluku, Indonesia",
        "Manado, Indonesia",
        "Medan, Indonesia",
        "Palembang, Indonesia",
        "Palu, Indonesia",
        "Papua / Irian Jaya, Indonesia",
        "Pekanbaru, Indonesia",
        "Pontianak, Indonesia",
        "Samarinda, Indonesia",
        "Semarang, Indonesia",
        "Solo, Indonesia",
        "Surabaya, Indonesia",
        "Tangerang, Indonesia",
        "Yogyakarta, Indonesia",
    ];

    const categories = [
        "Akita", "Alaskan Malamute", "American Bully", "American Cocker Spaniel", 
        "American Pit Bull Terrier", "Australian Shepherd", "Basenji", "Beagle", 
        "Belgian Malinois", "Bernese Mountain Dog", "Bichon Frise", "Biewer Terrier", 
        "Border Collie", "Bulldog", "Cane Corso", "Cavalier King Charles Spaniel", 
        "Chihuahua", "Chow Chow", "Dalmatian", "Doberman Pinscher", "Dogo Argentino", 
        "Dutch Shepherd", "English Cocker Spaniel", "French Bulldog", "Golden Retriever", 
        "Great Dane", "Greyhound", "Herder / German Shepherd", "Jack Russell Terrier", 
        "Japanese Chin", "Kintamani", "Labrador Retriever", "Maltese", "Miniature Pinscher", 
        "Miniature Schnauzer", "Mixed Breed / Campuran", "Pekingese", "Pembroke Welsh Corgi", 
        "Pomeranian", "Poodle", "Pug", "Rottweiler", "Samoyed", "Shetland Sheepdog", 
        "Shiba Inu", "Shih Tzu", "Siberian Husky", "Tekel / Dachshund", 
        "West Highland White Terrier", "Yorkshire Terrier"
    ];

    const validateStep = (step: number): boolean => {
        const errors: {[key: string]: string} = {};
        
        switch(step) {
            case 0:
                if (!iklan.judul.trim()) errors.judul = "Judul harus diisi";
                if (!iklan.jenis) errors.jenis = "Jenis anjing harus dipilih";
                if (!iklan.kontak.trim()) errors.kontak = "Kontak harus diisi";
                if (!iklan.lokasi.trim()) errors.lokasi = "Lokasi harus diisi";
                break;
            case 1:
                if (!iklan.body.trim()) errors.body = "Deskripsi harus diisi";
                if (!iklan.gambar) errors.gambar = "Gambar harus diunggah";
                break;
            case 2:
                // Optional animal info, no validation
                break;
            case 3:
                if (!iklan.rank) errors.rank = "Paket iklan harus dipilih";
                break;
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!validateStep(3)) return;
        
        try {
            setIsSubmitting(true);
            const docRef = await addDoc(iklanRef, iklan);
            console.log("Document written with ID: ", docRef.id);
            setIklan(initialIklan);
            
            // Show success message
            alert("Iklan berhasil dipasang dan sedang menunggu persetujuan!");
            togglePasang();
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Terjadi kesalahan saat memasang iklan. Silakan coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    function handleAddAnjing() {
        if (iklan.Anjing.length < 5) {
            setIklan((prevIklan) => ({
                ...prevIklan,
                Anjing: [
                    ...prevIklan.Anjing,
                    {
                        DOB: null,
                        kelamin: "",
                        warna: "",
                    },
                ],
            }));
        }
    }

    function handleRemoveAnjing(index: number) {
        if (iklan.Anjing.length > 1) {
            setIklan((prevIklan) => ({
                ...prevIklan,
                Anjing: prevIklan.Anjing.filter((_, i) => i !== index)
            }));
        }
    }

    const getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : cities.filter((city) => city.toLowerCase().includes(inputValue));
    };

    const onSuggestionsFetchRequested = ({ value }: Autosuggest.SuggestionsFetchRequestedParams) => {
        const limitedSuggestions = getSuggestions(value).slice(0, 5); // Limit to 5 suggestions
        setSuggestions(limitedSuggestions);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (_event: React.FormEvent<HTMLInputElement>, { suggestionValue }: Autosuggest.SuggestionSelectedEventData<string>) => {
        setIklan({ ...iklan, lokasi: suggestionValue });
    };

    const inputProps: Autosuggest.InputProps<string> = {
        value: iklan.lokasi,
        onChange: (_event, { newValue }: Autosuggest.ChangeEvent) => {
            setIklan({ ...iklan, lokasi: newValue });
        },
        placeholder: "Masukkan Nama Kota",
        className: "",
    };

    // File Upload Handler
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            
            const newFileName = `${iklan.id}.${file.name.split(".").pop()}`;
            setIklan({ ...iklan, gambar: newFileName });

            const fileRef = ref(storage, newFileName);

            // Upload File
            if (fileRef) {
                uploadBytes(fileRef, file).then(() => {
                    console.log("Uploaded a blob or file!");
                    // Clear validation error if any
                    setValidationErrors(prev => {
                        const newErrors = {...prev};
                        delete newErrors.gambar;
                        return newErrors;
                    });
                });
            }
        }
    };

    // Next step function with validation
    const goToNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    // Previous step function
    const goToPrevStep = () => {
        setCurrentStep(prev => Math.max(0, prev - 1));
    };

    function handleAnjingInfoChange(index: number, property: keyof AnjingInfo, value: string) {
        const updatedAnjing = [...iklan.Anjing];
        if (property === "DOB") {
            // Convert the DOB value to a Firestore Timestamp
            const timestamp = value ? Timestamp.fromDate(new Date(value)) : null;
            updatedAnjing[index][property] = timestamp;
        } else {
            updatedAnjing[index][property] = value as any;
        }

        setIklan({ ...iklan, Anjing: updatedAnjing });
    }

    // Shared style for section headers
    const sectionHeaderStyle = {
        fontSize: '1.25rem',
        fontWeight: '600' as const,
        color: '#333',
        marginBottom: '1.25rem',
        padding: '0 0 0.5rem 0',
        borderBottom: '1px solid #eee'
    };

    // Shared style for input fields
    const inputStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        fontSize: '0.95rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        transition: 'all 0.2s ease',
        outline: 'none'
    };

    // Shared style for form labels
    const labelStyle = {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: '500' as const,
        color: '#444',
        marginBottom: '0.5rem'
    };

    // Shared button style
    const buttonStyle = {
        backgroundColor: '#00bf8f',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '0.75rem 1.5rem',
        fontSize: '0.95rem',
        fontWeight: '600' as const,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0, 191, 143, 0.2)'
    };

    return (
        <div className="pasangIklan" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <form onSubmit={handleSubmit} style={{
                width: '100%',
                maxWidth: '800px',
                maxHeight: '85vh',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transform: formVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                opacity: formVisible ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="MaiPet-Logo.png" alt="MaiPet" style={{ height: '30px', marginRight: '0.75rem' }} />
                        <h2 style={{ 
                            margin: 0, 
                            fontSize: '1.5rem', 
                            fontWeight: 700,
                            color: '#333'
                        }}>
                            Pasang Iklan
                        </h2>
                    </div>
                    
                    <button 
                        type="button" 
                        onClick={togglePasang}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#888',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                            e.currentTarget.style.color = '#333';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#888';
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Progress Stepper */}
                <div style={{ 
                    padding: '1.5rem 2rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative'
                }}>
                    {/* Progress Bar */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '2.5rem',
                        right: '2.5rem',
                        height: '3px',
                        backgroundColor: '#e0e0e0',
                        zIndex: 1
                    }}></div>
                    
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '2.5rem',
                        height: '3px',
                        backgroundColor: '#00bf8f',
                        width: `${currentStep * 33.33}%`,
                        zIndex: 2,
                        transition: 'width 0.5s ease'
                    }}></div>
                    
                    {[0, 1, 2, 3].map((step) => (
                        <div key={step} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: currentStep >= step ? '#00bf8f' : '#fff',
                            border: `2px solid ${currentStep >= step ? '#00bf8f' : '#e0e0e0'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            color: currentStep >= step ? '#fff' : '#888',
                            position: 'relative',
                            zIndex: 3,
                            transition: 'all 0.3s ease'
                        }}>
                            {currentStep > step ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                step + 1
                            )}
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                marginTop: '8px',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                color: currentStep === step ? '#00bf8f' : '#888',
                                width: '80px',
                                textAlign: 'center',
                                left: '-20px'
                            }}>
                                {step === 0 && 'Informasi Dasar'}
                                {step === 1 && 'Deskripsi & Foto'}
                                {step === 2 && 'Detail Anjing'}
                                {step === 3 && 'Pilih Paket'}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Content Area - Scrollable */}
                <div style={{
                    padding: '3rem 2rem 1.5rem',
                    overflowY: 'auto',
                    flexGrow: 1,
                    marginTop: '1rem'
                }}>
                    <div style={{
                        opacity: animateStep ? 1 : 0,
                        transform: animateStep ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease'
                    }}>
                        {/* Step 1: Basic Information */}
                        {currentStep === 0 && (
                            <div>
                                <h3 style={sectionHeaderStyle}>Informasi Dasar</h3>
                                
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={labelStyle}>
                                        Judul Iklan <span style={{ color: '#ff5757' }}>*</span>
                                    </label>
                                    <input
                                        style={{
                                            ...inputStyle,
                                            borderColor: validationErrors.judul ? '#ff5757' : '#e0e0e0'
                                        }}
                                        type="text"
                                        value={iklan.judul}
                                        onChange={(e) => {
                                            setIklan({ ...iklan, judul: e.target.value });
                                            if (e.target.value.trim()) {
                                                setValidationErrors(prev => {
                                                    const newErrors = {...prev};
                                                    delete newErrors.judul;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        placeholder="Contoh: Golden Retriever Jantan 3 Bulan"
                                    />
                                    {validationErrors.judul && (
                                        <div style={{ color: '#ff5757', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            {validationErrors.judul}
                                        </div>
                                    )}
                                </div>
                                
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={labelStyle}>
                                        Jenis Anjing <span style={{ color: '#ff5757' }}>*</span>
                                    </label>
                                    <select
                                        style={{
                                            ...inputStyle,
                                            borderColor: validationErrors.jenis ? '#ff5757' : '#e0e0e0'
                                        }}
                                        value={iklan.jenis}
                                        onChange={(e) => {
                                            setIklan({ ...iklan, jenis: e.target.value });
                                            if (e.target.value) {
                                                setValidationErrors(prev => {
                                                    const newErrors = {...prev};
                                                    delete newErrors.jenis;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    >
                                        <option value="">-- Pilih Jenis Anjing --</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {validationErrors.jenis && (
                                        <div style={{ color: '#ff5757', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            {validationErrors.jenis}
                                        </div>
                                    )}
                                </div>
                                
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={labelStyle}>
                                        Kontak <span style={{ color: '#ff5757' }}>*</span>
                                    </label>
                                    <input
                                        style={{
                                            ...inputStyle,
                                            borderColor: validationErrors.kontak ? '#ff5757' : '#e0e0e0'
                                        }}
                                        type="text"
                                        value={iklan.kontak}
                                        onChange={(e) => {
                                            setIklan({ ...iklan, kontak: e.target.value });
                                            if (e.target.value.trim()) {
                                                setValidationErrors(prev => {
                                                    const newErrors = {...prev};
                                                    delete newErrors.kontak;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        placeholder="Nomor Telepon / WhatsApp"
                                    />
                                    {validationErrors.kontak && (
                                        <div style={{ color: '#ff5757', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            {validationErrors.kontak}
                                        </div>
                                    )}
                                </div>
                                
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={labelStyle}>
                                        Lokasi <span style={{ color: '#ff5757' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                                            onSuggestionSelected={onSuggestionSelected}
                                            getSuggestionValue={(suggestion) => suggestion}
                                            renderSuggestion={(suggestion) => (
                                                <div style={{
                                                    padding: '10px',
                                                    borderBottom: '1px solid #eee',
                                                    cursor: 'pointer'
                                                }}>
                                                    {suggestion}
                                                </div>
                                            )}
                                            inputProps={{
                                                ...inputProps,
                                                style: {
                                                    ...inputStyle,
                                                    borderColor: validationErrors.lokasi ? '#ff5757' : '#e0e0e0'
                                                },
                                                onChange: (_event, { newValue }) => {
                                                    setIklan({ ...iklan, lokasi: newValue });
                                                    if (newValue.trim()) {
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.lokasi;
                                                            return newErrors;
                                                        });
                                                    }
                                                }
                                            }}
                                            theme={{
                                                container: {
                                                    position: 'relative',
                                                    width: '100%'
                                                },
                                                suggestionsContainer: {
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: 0,
                                                    right: 0,
                                                    zIndex: 10,
                                                    maxHeight: '200px',
                                                    overflowY: 'auto',
                                                    backgroundColor: '#fff',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                    marginTop: '5px'
                                                },
                                                suggestionsList: {
                                                    margin: 0,
                                                    padding: 0,
                                                    listStyleType: 'none'
                                                },
                                                suggestion: {
                                                    cursor: 'pointer'
                                                },
                                                suggestionHighlighted: {
                                                    backgroundColor: '#f0f9f5'
                                                }
                                            }}
                                        />
                                    </div>
                                    {validationErrors.lokasi && (
                                        <div style={{ color: '#ff5757', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            {validationErrors.lokasi}
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                                        Pilih lokasi dari daftar untuk hasil terbaik
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Description & Photos */}
                        {currentStep === 1 && (
                            <div>
                                <h3 style={sectionHeaderStyle}>Deskripsi & Foto</h3>
                                
                                {/* Feature checkboxes */}
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={labelStyle}>Fitur</label>
                                    <div style={{ 
                                        display: 'flex', 
                                        flexWrap: 'wrap', 
                                        gap: '0.75rem',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input 
                                                type="checkbox" 
                                                id="microchip"
                                                checked={iklan.microchip} 
                                                onChange={(e) => setIklan({ ...iklan, microchip: e.target.checked })}
                                                style={{ marginRight: '0.5rem' }}
                                            />
                                            <label htmlFor="microchip" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Microchip</label>
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input 
                                                type="checkbox" 
                                                id="obatCacing"
                                                checked={iklan.obatCacing} 
                                                onChange={(e) => setIklan({ ...iklan, obatCacing: e.target.checked })}
                                                style={{ marginRight: '0.5rem' }}
                                            />
                                            <label htmlFor="obatCacing" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Obat Cacing</label>
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input 
                                                type="checkbox" 
                                                id="stambum"
                                                checked={iklan.stambum} 
                                                onChange={(e) => setIklan({ ...iklan, stambum: e.target.checked })}
                                                style={{ marginRight: '0.5rem' }}
                                            />
                                            <label htmlFor="stambum" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Stambum</label>
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input 
                                                type="checkbox" 
                                                id="vaksin"
                                                checked={iklan.vaksin} 
                                                onChange={(e) => setIklan({ ...iklan, vaksin: e.target.checked })}
                                                style={{ marginRight: '0.5rem' }}
                                            />
                                            <label htmlFor="vaksin" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Vaksin</label>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Description textarea */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={labelStyle}>
                                        Deskripsi <span style={{ color: '#ff5757' }}>*</span>
                                    </label>
                                    <textarea
                                        style={{
                                            ...inputStyle,
                                            minHeight: '150px',
                                            resize: 'vertical',
                                            borderColor: validationErrors.body ? '#ff5757' : '#e0e0e0'
                                        }}
                                        value={iklan.body}
                                        onChange={(e) => {
                                            setIklan({ ...iklan, body: e.target.value });
                                            if (e.target.value.trim()) {
                                                setValidationErrors(prev => {
                                                    const newErrors = {...prev};
                                                    delete newErrors.body;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        placeholder="Deskripsikan anjing Anda secara detail seperti usia, karakter, kebiasaan, dan informasi penting lainnya..."
                                    />
                                    {validationErrors.body && (
                                        <div style={{ color: '#ff5757', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                            {validationErrors.body}
                                        </div>
                                    )}
                                    <div style={{ 
                                        fontSize: '0.8rem', 
                                        color: '#888', 
                                        marginTop: '0.5rem',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <span>Jelaskan detail tentang anjing yang akan dijual</span>
                                        <span>{iklan.body.length}/1000 karakter</span>
                                    </div>
                                </div>
                                
                                {/* Image upload */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={labelStyle}>
                                        Foto Utama <span style={{ color: '#ff5757' }}>*</span>
                                    </label>
                                    
                                    <div style={{ 
                                        border: `2px dashed ${validationErrors.gambar ? '#ff5757' : '#ddd'}`,
                                        borderRadius: '8px',
                                        padding: '1.5rem',
                                        textAlign: 'center',
                                        backgroundColor: '#fafafa',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        position: 'relative'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = '#00bf8f';
                                        e.currentTarget.style.backgroundColor = '#f0f9f5';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = validationErrors.gambar ? '#ff5757' : '#ddd';
                                        e.currentTarget.style.backgroundColor = '#fafafa';
                                    }}
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                        />
                                        
                                        {filePreview ? (
                                            <div style={{ position: 'relative' }}>
                                                <img 
                                                    src={filePreview} 
                                                    alt="Preview" 
                                                    style={{ 
                                                        maxWidth: '100%', 
                                                        maxHeight: '200px',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                                    }} 
                                                />
                                                <div style={{ 
                                                    marginTop: '0.75rem',
                                                    color: '#00bf8f',
                                                    fontWeight: 500,
                                                    fontSize: '0.9rem'
                                                }}>
                                                    Klik untuk mengganti gambar
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 0.75rem' }}>
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                    <polyline points="21 15 16 10 5 21"></polyline>
                                                </svg>
                                                <div style={{ 
                                                    fontSize: '1rem', 
                                                    fontWeight: 500,
                                                    color: '#666',
                                                    marginBottom: '0.5rem'
                                                }}>
                                                    Unggah Foto Anjing
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                                                    Klik untuk pilih gambar atau tarik-dan-lepas di sini
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '1rem' }}>
                                                    Format: JPG, PNG, GIF (Maks. 5MB)
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {validationErrors.gambar && (
                                        <div style={{ color: '#ff5757', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                            {validationErrors.gambar}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Dog Details */}
                        {currentStep === 2 && (
                            <div>
                                <h3 style={sectionHeaderStyle}>Detail Anjing</h3>
                                
                                <div style={{ marginBottom: '0.75rem' }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginBottom: '1rem'
                                    }}>
                                        <span style={{ fontWeight: 500 }}>Data Anjing ({iklan.Anjing.length}/5)</span>
                                        
                                        <button 
                                            type="button" 
                                            onClick={handleAddAnjing}
                                            disabled={iklan.Anjing.length >= 5}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '0.5rem 0.75rem',
                                                backgroundColor: iklan.Anjing.length >= 5 ? '#e0e0e0' : '#e6f9f1',
                                                color: iklan.Anjing.length >= 5 ? '#999' : '#00bf8f',
                                                border: `1px solid ${iklan.Anjing.length >= 5 ? '#ccc' : '#00bf8f'}`,
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                fontWeight: 500,
                                                cursor: iklan.Anjing.length >= 5 ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            Tambah Anjing
                                        </button>
                                    </div>
                                    
                                    {iklan.Anjing.map((anjing, index) => (
                                        <div 
                                            key={index} 
                                            style={{
                                                border: '1px solid #eee',
                                                borderRadius: '8px',
                                                padding: '1rem',
                                                marginBottom: '1rem',
                                                backgroundColor: '#fafafa'
                                            }}
                                        >
                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '1rem'
                                            }}>
                                                <h4 style={{ 
                                                    margin: 0, 
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    color: '#333'
                                                }}>
                                                    Anjing #{index + 1}
                                                </h4>
                                                
                                                {iklan.Anjing.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveAnjing(index)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            color: '#ff5757',
                                                            fontSize: '0.85rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '0.25rem 0.5rem',
                                                            borderRadius: '4px'
                                                        }}
                                                        onMouseOver={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#fff0f0';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                        }}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div style={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                gap: '1rem'
                                            }}>
                                                <div>
                                                    <label style={{
                                                        ...labelStyle,
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        Tanggal Lahir
                                                    </label>
                                                    <input
                                                        style={{
                                                            ...inputStyle,
                                                            fontSize: '0.9rem'
                                                        }}
                                                        type="date"
                                                        value={anjing.DOB ? anjing.DOB.toDate().toISOString().split('T')[0] : ''}
                                                        onChange={(e) => handleAnjingInfoChange(index, "DOB", e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label style={{
                                                        ...labelStyle,
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        Jenis Kelamin
                                                    </label>
                                                    <select
                                                        style={{
                                                            ...inputStyle,
                                                            fontSize: '0.9rem'
                                                        }}
                                                        value={anjing.kelamin}
                                                        onChange={(e) => handleAnjingInfoChange(index, "kelamin", e.target.value)}
                                                    >
                                                        <option value="">-- Pilih Jenis Kelamin --</option>
                                                        <option value="Jantan">Jantan</option>
                                                        <option value="Betina">Betina</option>
                                                    </select>
                                                </div>
                                                
                                                <div>
                                                    <label style={{
                                                        ...labelStyle,
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        Warna
                                                    </label>
                                                    <input
                                                        style={{
                                                            ...inputStyle,
                                                            fontSize: '0.9rem'
                                                        }}
                                                        type="text"
                                                        value={anjing.warna}
                                                        onChange={(e) => handleAnjingInfoChange(index, "warna", e.target.value)}
                                                        placeholder="Contoh: Coklat, Hitam, dll"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div style={{ 
                                    backgroundColor: '#f0f9f5', 
                                    padding: '1rem', 
                                    borderRadius: '8px',
                                    marginTop: '1rem',
                                    fontSize: '0.9rem',
                                    color: '#00a67d',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.75rem', flexShrink: 0 }}>
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    <span>
                                        Info detail anjing bersifat opsional, namun sangat membantu calon pembeli dalam memutuskan.
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Payment Plans */}
                        {currentStep === 3 && (
                            <div>
                                <h3 style={sectionHeaderStyle}>Pilih Paket Iklan</h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    {validationErrors.rank && (
                                        <div style={{ 
                                            color: '#ff5757', 
                                            fontSize: '0.9rem', 
                                            marginBottom: '0.75rem',
                                            backgroundColor: '#fff0f0',
                                            padding: '0.5rem 0.75rem',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                            </svg>
                                            {validationErrors.rank}
                                        </div>
                                    )}
                                    
                                    <div style={{ marginBottom: '1rem' }}>
                                        <h4 style={{ 
                                            margin: '0 0 0.75rem 0', 
                                            fontSize: '1.1rem', 
                                            color: '#333',
                                            fontWeight: 600
                                        }}>
                                            Paket Premium
                                        </h4>
                                        
                                        <div style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                            gap: '1rem'
                                        }}>
                                            {/* Priority 1 month */}
                                            <label style={{
                                                display: 'block',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                border: iklan.rank === 'Priority1' ? '2px solid #00bf8f' : '1px solid #e0e0e0',
                                                backgroundColor: iklan.rank === 'Priority1' ? '#f0f9f5' : '#fff',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: iklan.rank === 'Priority1' ? '0 2px 8px rgba(0, 191, 143, 0.2)' : 'none',
                                            }}>
                                                <input
                                                    type="radio"
                                                    value="Priority1"
                                                    checked={iklan.rank === "Priority1"}
                                                    onChange={(e) => {
                                                        setIklan({ ...iklan, rank: e.target.value });
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.rank;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    style={{ 
                                                        position: 'absolute',
                                                        opacity: 0
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <div style={{ 
                                                        backgroundColor: '#00bf8f', 
                                                        color: 'white',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        PREMIUM 1 BULAN
                                                    </div>
                                                    <div style={{ 
                                                        fontWeight: 700, 
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.25rem',
                                                        color: '#333'
                                                    }}>
                                                        Rp 50.000
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#666',
                                                    }}>
                                                        Tampil di urutan teratas
                                                    </div>
                                                </div>
                                                {iklan.rank === 'Priority1' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#00bf8f',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                            </label>
                                            
                                            {/* Priority 3 months */}
                                            <label style={{
                                                display: 'block',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                border: iklan.rank === 'Priority3' ? '2px solid #00bf8f' : '1px solid #e0e0e0',
                                                backgroundColor: iklan.rank === 'Priority3' ? '#f0f9f5' : '#fff',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: iklan.rank === 'Priority3' ? '0 2px 8px rgba(0, 191, 143, 0.2)' : 'none',
                                            }}>
                                                <input
                                                    type="radio"
                                                    value="Priority3"
                                                    checked={iklan.rank === "Priority3"}
                                                    onChange={(e) => {
                                                        setIklan({ ...iklan, rank: e.target.value });
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.rank;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    style={{ 
                                                        position: 'absolute',
                                                        opacity: 0
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <div style={{ 
                                                        backgroundColor: '#00bf8f', 
                                                        color: 'white',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        PREMIUM 3 BULAN
                                                    </div>
                                                    <div style={{ 
                                                        fontWeight: 700, 
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.25rem',
                                                        color: '#333'
                                                    }}>
                                                        Rp 100.000
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#666',
                                                    }}>
                                                        Hemat Rp 50.000
                                                    </div>
                                                </div>
                                                {iklan.rank === 'Priority3' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#00bf8f',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                                
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    right: '-10px',
                                                    backgroundColor: '#ff5757',
                                                    color: '#7b5533',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '1rem',
                                                    transform: 'rotate(5deg)'
                                                }}>
                                                    POPULER
                                                </div>
                                            </label>
                                            
                                            {/* Priority 6 months */}
                                            <label style={{
                                                display: 'block',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                border: iklan.rank === 'Priority6' ? '2px solid #00bf8f' : '1px solid #e0e0e0',
                                                backgroundColor: iklan.rank === 'Priority6' ? '#f0f9f5' : '#fff',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: iklan.rank === 'Priority6' ? '0 2px 8px rgba(0, 191, 143, 0.2)' : 'none',
                                            }}>
                                                <input
                                                    type="radio"
                                                    value="Priority6"
                                                    checked={iklan.rank === "Priority6"}
                                                    onChange={(e) => {
                                                        setIklan({ ...iklan, rank: e.target.value });
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.rank;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    style={{ 
                                                        position: 'absolute',
                                                        opacity: 0
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <div style={{ 
                                                        backgroundColor: '#00bf8f', 
                                                        color: 'white',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        PREMIUM 6 BULAN
                                                    </div>
                                                    <div style={{ 
                                                        fontWeight: 700, 
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.25rem',
                                                        color: '#333'
                                                    }}>
                                                        Rp 175.000
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#666',
                                                    }}>
                                                        Hemat Rp 125.000
                                                    </div>
                                                </div>
                                                {iklan.rank === 'Priority6' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#00bf8f',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                                
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    right: '-10px',
                                                    backgroundColor: '#ffc107',
                                                    color: '#7b5533',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '1rem',
                                                    transform: 'rotate(5deg)'
                                                }}>
                                                    TERBAIK
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <h4 style={{ 
                                            margin: '0 0 0.75rem 0', 
                                            fontSize: '1.1rem', 
                                            color: '#333',
                                            fontWeight: 600
                                        }}>
                                            Paket Standar
                                        </h4>
                                        
                                        <div style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                            gap: '1rem'
                                        }}>
                                            {/* Basic 1 month */}
                                            <label style={{
                                                display: 'block',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                border: iklan.rank === 'Basic1' ? '2px solid #00bf8f' : '1px solid #e0e0e0',
                                                backgroundColor: iklan.rank === 'Basic1' ? '#f0f9f5' : '#fff',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: iklan.rank === 'Basic1' ? '0 2px 8px rgba(0, 191, 143, 0.2)' : 'none',
                                            }}>
                                                <input
                                                    type="radio"
                                                    value="Basic1"
                                                    checked={iklan.rank === "Basic1"}
                                                    onChange={(e) => {
                                                        setIklan({ ...iklan, rank: e.target.value });
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.rank;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    style={{ 
                                                        position: 'absolute',
                                                        opacity: 0
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <div style={{ 
                                                        backgroundColor: '#aaa', 
                                                        color: 'white',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        STANDAR 1 BULAN
                                                    </div>
                                                    <div style={{ 
                                                        fontWeight: 700, 
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.25rem',
                                                        color: '#333'
                                                    }}>
                                                        Rp 20.000
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#666',
                                                    }}>
                                                        Tampil standar
                                                    </div>
                                                </div>
                                                {iklan.rank === 'Basic1' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#00bf8f',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                            </label>
                                            
                                            {/* Basic 3 months */}
                                            <label style={{
                                                display: 'block',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                border: iklan.rank === 'Basic3' ? '2px solid #00bf8f' : '1px solid #e0e0e0',
                                                backgroundColor: iklan.rank === 'Basic3' ? '#f0f9f5' : '#fff',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: iklan.rank === 'Basic3' ? '0 2px 8px rgba(0, 191, 143, 0.2)' : 'none',
                                            }}>
                                                <input
                                                    type="radio"
                                                    value="Basic3"
                                                    checked={iklan.rank === "Basic3"}
                                                    onChange={(e) => {
                                                        setIklan({ ...iklan, rank: e.target.value });
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.rank;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    style={{ 
                                                        position: 'absolute',
                                                        opacity: 0
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <div style={{ 
                                                        backgroundColor: '#aaa', 
                                                        color: 'white',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        STANDAR 3 BULAN
                                                    </div>
                                                    <div style={{ 
                                                        fontWeight: 700, 
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.25rem',
                                                        color: '#333'
                                                    }}>
                                                        Rp 50.000
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#666',
                                                    }}>
                                                        Hemat Rp 10.000
                                                    </div>
                                                </div>
                                                {iklan.rank === 'Basic3' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#00bf8f',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                            </label>
                                            
                                            {/* Basic 6 months */}
                                            <label style={{
                                                display: 'block',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                border: iklan.rank === 'Basic6' ? '2px solid #00bf8f' : '1px solid #e0e0e0',
                                                backgroundColor: iklan.rank === 'Basic6' ? '#f0f9f5' : '#fff',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                boxShadow: iklan.rank === 'Basic6' ? '0 2px 8px rgba(0, 191, 143, 0.2)' : 'none',
                                            }}>
                                                <input
                                                    type="radio"
                                                    value="Basic6"
                                                    checked={iklan.rank === "Basic6"}
                                                    onChange={(e) => {
                                                        setIklan({ ...iklan, rank: e.target.value });
                                                        setValidationErrors(prev => {
                                                            const newErrors = {...prev};
                                                            delete newErrors.rank;
                                                            return newErrors;
                                                        });
                                                    }}
                                                    style={{ 
                                                        position: 'absolute',
                                                        opacity: 0
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <div style={{ 
                                                        backgroundColor: '#aaa', 
                                                        color: 'white',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        marginBottom: '0.5rem'
                                                    }}>
                                                        STANDAR 6 BULAN
                                                    </div>
                                                    <div style={{ 
                                                        fontWeight: 700, 
                                                        fontSize: '1.1rem',
                                                        marginBottom: '0.25rem',
                                                        color: '#333'
                                                    }}>
                                                        Rp 75.000
                                                    </div>
                                                    <div style={{ 
                                                        fontSize: '0.8rem', 
                                                        color: '#666',
                                                    }}>
                                                        Hemat Rp 45.000
                                                    </div>
                                                </div>
                                                {iklan.rank === 'Basic6' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#00bf8f',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ 
                                    padding: '1rem', 
                                    backgroundColor: '#f7f7f7',
                                    borderRadius: '8px',
                                    marginTop: '1rem'
                                }}>
                                    <h4 style={{ 
                                        margin: '0 0 0.75rem 0', 
                                        fontSize: '1rem', 
                                        color: '#333',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="16" x2="12" y2="12"></line>
                                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                        </svg>
                                        Perbedaan Paket
                                    </h4>
                                    
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00bf8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span><strong>Premium</strong>: Tampil di urutan teratas dengan highlight khusus</span>
                                        </div>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00bf8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span><strong>Standar</strong>: Tampil secara normal berdasarkan tanggal</span>
                                        </div>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center'
                                        }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00bf8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            <span>Semakin lama durasi, semakin hemat biaya</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Navigation Buttons */}
                <div style={{
                    padding: '1rem 2rem',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#fafafa'
                }}>
                    {currentStep > 0 ? (
                        <button
                            type="button"
                            onClick={goToPrevStep}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.75rem 1.25rem',
                                backgroundColor: '#f0f0f0',
                                color: '#666',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#e6e6e6';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#f0f0f0';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Sebelumnya
                        </button>
                    ) : (
                        <div></div> // Empty div to maintain layout
                    )}
                    
                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={goToNextStep}
                            style={{
                                ...buttonStyle,
                                padding: '0.75rem 1.5rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#00a67d';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 191, 143, 0.25)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#00bf8f';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 191, 143, 0.2)';
                            }}
                        >
                            Selanjutnya
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.5rem' }}>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                ...buttonStyle,
                                padding: '0.75rem 2rem',
                                backgroundColor: isSubmitting ? '#b3b3b3' : '#00bf8f',
                                cursor: isSubmitting ? 'wait' : 'pointer'
                            }}
                            onMouseOver={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.backgroundColor = '#00a67d';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 191, 143, 0.25)';
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = isSubmitting ? '#b3b3b3' : '#00bf8f';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 191, 143, 0.2)';
                            }}
                        >
                            {isSubmitting ? (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '18px',
                                        height: '18px',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        borderTopColor: '#fff',
                                        animation: 'spin 1s linear infinite',
                                        marginRight: '0.5rem'
                                    }}></div>
                                    <style>{`
                                        @keyframes spin {
                                            0% { transform: rotate(0deg); }
                                            100% { transform: rotate(360deg); }
                                        }
                                    `}</style>
                                    Sedang Memproses...
                                </div>
                            ) : (
                                "Pasang Iklan Sekarang"
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default PasangIklan;