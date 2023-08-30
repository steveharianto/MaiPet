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
        "Irian Jaya Barat, Indonesia",
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
        "Luwuk (Sul-Teng), Indonesia",
        "Madiun, Indonesia",
        "Magelang, Indonesia",
        "Makassar, Indonesia",
        "Malang, Indonesia",
        "Maluku, Indonesia",
        "Mamuju, Indonesia",
        "Manado, Indonesia",
        "Mataram, Indonesia",
        "Medan, Indonesia",
        "Mojokerto, Indonesia",
        "Padang, Indonesia",
        "Palangkaraya, Indonesia",
        "Palembang, Indonesia",
        "Palu, Indonesia",
        "Pandaan, Indonesia",
        "Papua / Irian Jaya, Indonesia",
        "Pasuruan, Indonesia",
        "Pontianak, Indonesia",
        "Probolinggo, Indonesia",
        "Riau, Indonesia",
        "Samarinda, Indonesia",
        "Semarang, Indonesia",
        "Serpong Tangerang, Indonesia",
        "Solo, Indonesia",
        "Sukabumi, Indonesia",
        "Surabaya, Indonesia",
        "Tangerang, Indonesia",
        "Tanjung Pandan, Indonesia",
        "Tanjung Pinang, Indonesia",
        "Tarakan, Indonesia",
        "Tasikmalaya, Indonesia",
        "Ternate, Indonesia",
        "Thailand, Indonesia",
        "Timika, Indonesia",
        "Yogyakarta, Indonesia",
    ];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(iklanRef, iklan);
            console.log("Document written with ID: ", docRef.id);
            setIklan(initialIklan);
            togglePasang();
        } catch (error) {
            console.error("Error adding document: ", error);
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
    };

    // Progress Points
    useEffect(() => {
        const els = document.getElementsByClassName("step");
        const steps = Array.from(els); // Convert HTMLCollection to an array

        steps.forEach((step, index) => {
            step.addEventListener("click", () => {
                progress(index); // Call progress function with the 1-based step number
            });
        });

        function progress(stepNum: number) {
            setCurrentStep(stepNum);
            const p = stepNum * 33;
            const percentElement = document.getElementsByClassName("percent")[0] as HTMLElement;
            percentElement.style.width = `${p}%`;

            steps.forEach((e) => {
                if (e.id === stepNum.toString()) {
                    e.classList.add("selected");
                    e.classList.remove("completed");
                }
                if (parseInt(e.id, 10) < stepNum) {
                    e.classList.add("completed");
                }
                if (parseInt(e.id, 10) > stepNum) {
                    e.classList.remove("selected", "completed");
                }
            });
        }
    }, []);
    useEffect(() => {
        const els = document.getElementsByClassName("step");
        const steps = Array.from(els);
        const p = currentStep * 33;
        const percentElement = document.getElementsByClassName("percent")[0] as HTMLElement;
        percentElement.style.width = `${p}%`;

        steps.forEach((e) => {
            if (e.id === currentStep.toString()) {
                e.classList.add("selected");
                e.classList.remove("completed");
            }
            if (parseInt(e.id, 10) < currentStep) {
                e.classList.add("completed");
            }
            if (parseInt(e.id, 10) > currentStep) {
                e.classList.remove("selected", "completed");
            }
        });
    }, [currentStep]);

    // Functions to navigate to specific steps
    const goToStep1 = () => setCurrentStep(1);
    const goToStep2 = () => setCurrentStep(2);
    const goToStep3 = () => setCurrentStep(3);

    // File Upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const newFileName = `${iklan.id}.${file.name.split(".").pop()}`;
            setIklan({ ...iklan, gambar: newFileName });

            const fileRef = ref(storage, newFileName);

            // Upload File
            if (fileRef) {
                uploadBytes(fileRef, file).then(() => {
                    console.log("Uploaded a blob or file!");
                });
            }
        }
    };
    const categories = ["Akita", "Alaskan Malamute", "American Bully", "American Cocker Spaniel", "American Pit Bull Terrier", "Australian Shepherd", "Basenji", "Beagle", "Belgian Malinois", "Bernese Mountain Dog", "Bichon Frise", "Biewer Terrier", "Border Collie", "Bulldog", "Cane Corso", "Cavalier King Charles Spaniel", "Chihuahua", "Chow Chow", "Dalmatian", "Doberman Pinscher", "Dogo Argentino", "Dutch Shepherd", "English Cocker Spaniel", "French Bulldog", "Golden Retriever", "Great Dane", "Greyhound", "Herder / German Shepherd", "Jack Russell Terrier", "Japanese Chin", "Kintamani", "Labrador Retriever", "Maltese", "Miniature Pinscher", "Miniature Schnauzer", "Mixed Breed / Campuran", "Pekingese", "Pembroke Welsh Corgi", "Pomeranian", "Poodle", "Pug", "Rottweiler", "Samoyed", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu", "Siberian Husky", "Tekel / Dachshund", "West Highland White Terrier", "Yorkshire Terrier"];

    return (
        <form onSubmit={handleSubmit} className="pasangIklan">
            <div className="pasangIklan-card">
                <div className="infoDog-card-1">
                    <div className="infoDog-backbutton" onClick={togglePasang}>
                        <p style={{ margin: "0" }}>Kembali</p>
                    </div>
                </div>
                <div style={{ height: "100px", display: "flex" }}>
                    <div className="progressContainer">
                        <div className="progressbar">
                            <div className="percent"></div>
                        </div>
                        <div className="steps">
                            <div className="step selected" id="0"></div>
                            <div className="step" id="1"></div>
                            <div className="step" id="2"></div>
                            <div className="step" id="3"></div>
                        </div>
                    </div>
                </div>
                {/* Step 1 */}
                {currentStep == 0 && (
                    <div className="inputContainer" style={{ height: "475px", display: "flex", flexDirection: "column-reverse", padding: "2em" }}>
                        <button onClick={goToStep1} style={{ marginTop: "8em", height: "2em" }}>
                            Lanjutkan
                        </button>
                        <label>
                            <p style={{ width: "4em" }}>Lokasi</p>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                onSuggestionSelected={onSuggestionSelected}
                                getSuggestionValue={(suggestion) => suggestion}
                                renderSuggestion={(suggestion) => <div>{suggestion}</div>}
                                inputProps={{
                                    ...inputProps,
                                    className: "autosuggest-input",
                                    placeholder: "Masukkan Nama Kota",
                                }}
                                theme={{
                                    input: "",
                                    container: "autosuggest-container",
                                    suggestionsContainerOpen: "suggestions-container", // Apply custom class for the popup
                                    suggestionsList: "suggestions-list", // Apply custom class for the list
                                }}
                            />
                        </label>
                        <label>
                            <p style={{ width: "4em" }}>Kontak</p>
                            <input style={{ height: "2em", width: "80%" }} type="text" value={iklan.kontak} onChange={(e) => setIklan({ ...iklan, kontak: e.target.value })} placeholder="Nomor Telepon / Whatsapp" />
                        </label>
                        <label>
                            <p style={{ width: "4em" }}>Jenis</p>
                            <select style={{ height: "2em", width: "80%" }} value={iklan.jenis} onChange={(e) => setIklan({ ...iklan, jenis: e.target.value })}>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <p style={{ width: "4em" }}>Judul</p>
                            <input style={{ height: "2em", width: "80%" }} type="text" value={iklan.judul} onChange={(e) => setIklan({ ...iklan, judul: e.target.value })} />
                        </label>
                    </div>
                )}
                {/* Step 2 */}
                {currentStep == 1 && (
                    <div className="inputContainer" style={{ height: "400px", display: "flex", flexDirection: "column", padding: "0 2em 2em 2em" }}>
                        <label>
                            <p style={{ width: "4em" }}>Body</p>
                            <textarea
                                style={{ width: "80%" }}
                                value={iklan.body}
                                onChange={(e) => setIklan({ ...iklan, body: e.target.value })}
                                rows={13}
                                maxLength={1000} // Adjust the maximum character limit as needed
                            />
                        </label>
                        <div style={{ display: "flex" }}>
                            <label style={{ marginRight: "1em" }}>
                                <input type="checkbox" checked={iklan.microchip} onChange={(e) => setIklan({ ...iklan, microchip: e.target.checked })} />
                                <p style={{ marginLeft: "0.2em" }}>Microchip</p>
                            </label>
                            <label style={{ marginRight: "1em" }}>
                                <input type="checkbox" checked={iklan.obatCacing} onChange={(e) => setIklan({ ...iklan, obatCacing: e.target.checked })} />
                                <p style={{ marginLeft: "0.2em" }}>Obat Cacing</p>
                            </label>
                            <label style={{ marginRight: "1em" }}>
                                <input type="checkbox" checked={iklan.stambum} onChange={(e) => setIklan({ ...iklan, stambum: e.target.checked })} />
                                <p style={{ marginLeft: "0.2em" }}>Stambum</p>
                            </label>
                            <label style={{ marginRight: "1em" }}>
                                <input type="checkbox" checked={iklan.vaksin} onChange={(e) => setIklan({ ...iklan, vaksin: e.target.checked })} />
                                <p style={{ marginLeft: "0.2em" }}>Vaksin</p>
                            </label>
                        </div>

                        <label>
                            <p style={{ marginRight: "2em" }}>Gambar</p>
                            <input type="file" onChange={handleFileUpload} />
                        </label>
                        <button onClick={goToStep2} style={{ height: "2em" }}>
                            Lanjutkan
                        </button>
                    </div>
                )}
                {/* Step 3 */}
                {currentStep == 2 && (
                    <div className="inputContainer" style={{ height: "400px", display: "flex", flexDirection: "column", padding: "0 2em 0 2em" }}>
                        <button type="button" style={{ width: "30%" }} onClick={handleAddAnjing}>
                            Add Anjing
                        </button>
                        {iklan.Anjing.map((anjing, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                <p>Anjing {index + 1}</p>
                                <label style={{ display: "flex", flexDirection: "column", marginLeft: "2em" }}>
                                    <p style={{ fontSize: "0.8em", fontWeight: "normal" }}>DOB</p>
                                    <input style={{ width: "7em", height: "2em" }} type="datetime-local" value={anjing.DOB ? anjing.DOB.toDate().toISOString().slice(0, 16) : ""} onChange={(e) => handleAnjingInfoChange(index, "DOB", e.target.value)} />
                                </label>

                                <label style={{ display: "flex", flexDirection: "column", marginLeft: "2em" }}>
                                    <p style={{ fontSize: "0.8em", fontWeight: "normal" }}>Kelamin</p>
                                    <input style={{ width: "7em", height: "2em" }} type="text" value={anjing.kelamin} onChange={(e) => handleAnjingInfoChange(index, "kelamin", e.target.value)} />
                                </label>
                                <label style={{ display: "flex", flexDirection: "column", marginLeft: "2em" }}>
                                    <p style={{ fontSize: "0.8em", fontWeight: "normal" }}>Warna</p>
                                    <input style={{ width: "7em", height: "2em" }} type="text" value={anjing.warna} onChange={(e) => handleAnjingInfoChange(index, "warna", e.target.value)} />
                                </label>
                            </div>
                        ))}
                        <button onClick={goToStep3} style={{ height: "2em" }}>
                            Lanjutkan
                        </button>
                    </div>
                )}
                {/* Step 4 */}
                {currentStep == 3 && (
                    <div className="inputContainer" style={{ height: "400px", display: "flex", flexDirection: "column", padding: "0 2em 0 2em" }}>
                        <p>Plan</p>
                        <label style={{ display: "flex", flexDirection: "column" }}>
                            <label>
                                <input type="radio" value="Priority1" checked={iklan.rank === "Priority1"} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                                Priority 1 Bulan (50k)
                            </label>
                            <br />
                            <label>
                                <input type="radio" value="Priority3" checked={iklan.rank === "Priority3"} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                                Priority 3 Bulan (100k)
                            </label>
                            <br />
                            <label>
                                <input type="radio" value="Priority6" checked={iklan.rank === "Priority6"} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                                Priority 6 Bulan (175k)
                            </label>
                            <br />
                            <label>
                                <input type="radio" value="Basic1" checked={iklan.rank === "Basic1"} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                                Basic 1 Bulan (20k)
                            </label>
                            <br />
                            <label>
                                <input type="radio" value="Basic3" checked={iklan.rank === "Basic3"} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                                Basic 3 Bulan (50k)
                            </label>
                            <br />
                            <label>
                                <input type="radio" value="Basic6" checked={iklan.rank === "Basic6"} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                                Basic 6 Bulan (75k)
                            </label>
                        </label>
                        <button type="submit">Submit</button>
                    </div>
                )}
            </div>
        </form>
    );

    function handleAnjingInfoChange(index: number, property: keyof AnjingInfo, value: string) {
        const updatedAnjing = [...iklan.Anjing];
        if (property === "DOB") {
            // Convert the DOB value to a Firestore Timestamp
            const timestamp = value ? Timestamp.fromDate(new Date(value)) : null;
            updatedAnjing[index][property] = timestamp;
        } else {
            updatedAnjing[index][property] = value;
        }

        setIklan({ ...iklan, Anjing: updatedAnjing });
    }
}

export default PasangIklan;
