import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Iklan, AnjingInfo } from "../pages/Home";
import { addDoc, collection } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
interface PasangProps {
    togglePasang: () => void;
}
function PasangIklan({ togglePasang }: PasangProps) {
    const initialAnjingInfo: AnjingInfo = {
        DOB: null,
        kelamin: "",
        warna: "",
    };

    const initialIklan: Iklan = {
        id: "",
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
    };

    const [iklan, setIklan] = useState(initialIklan);
    const iklanRef = collection(db, "iklan");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(iklanRef, iklan);
            console.log("Document written with ID: ", docRef.id);
            setIklan(initialIklan);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    function handleAddAnjing() {
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

    // Progress Points
    useEffect(() => {
        const els = document.getElementsByClassName("step");
        const steps: HTMLElement[] = [];

        Array.prototype.forEach.call(els, (e: HTMLElement) => {
            steps.push(e);
            e.addEventListener("click", (event) => {
                if (event.target instanceof HTMLElement) {
                    progress(event.target.id);
                }
            });
        });

        function progress(stepNum: string) {
            const p = parseInt(stepNum, 10) * 33;
            const percentElement = document.getElementsByClassName("percent")[0] as HTMLElement;
            percentElement.style.width = `${p}%`;

            steps.forEach((e) => {
                if (e.id === stepNum) {
                    e.classList.add("selected");
                    e.classList.remove("completed");
                }
                if (parseInt(e.id, 10) < parseInt(stepNum, 10)) {
                    e.classList.add("completed");
                }
                if (parseInt(e.id, 10) > parseInt(stepNum, 10)) {
                    e.classList.remove("selected", "completed");
                }
            });
        }
    }, []);
    return (
        <div className="pasangIklan">
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
                            <div className="step" id="0"></div>
                            <div className="step" id="1"></div>
                            <div className="step" id="2"></div>
                            <div className="step" id="3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="pasangIklan">
            <h2>Pasang Iklan</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Judul:
                    <input type="text" value={iklan.judul} onChange={(e) => setIklan({ ...iklan, judul: e.target.value })} />
                </label>
                <label>
                    Jenis:
                    <input type="text" value={iklan.jenis} onChange={(e) => setIklan({ ...iklan, jenis: e.target.value })} />
                </label>
                <label>
                    Kontak:
                    <input type="text" value={iklan.kontak} onChange={(e) => setIklan({ ...iklan, kontak: e.target.value })} />
                </label>
                <label>
                    Lokasi:
                    <input type="text" value={iklan.lokasi} onChange={(e) => setIklan({ ...iklan, lokasi: e.target.value })} />
                </label>
                <label>
                    Microchip:
                    <input type="checkbox" checked={iklan.microchip} onChange={(e) => setIklan({ ...iklan, microchip: e.target.checked })} />
                </label>
                <label>
                    Obat Cacing:
                    <input type="checkbox" checked={iklan.obatCacing} onChange={(e) => setIklan({ ...iklan, obatCacing: e.target.checked })} />
                </label>
                <label>
                    Stambum:
                    <input type="checkbox" checked={iklan.stambum} onChange={(e) => setIklan({ ...iklan, stambum: e.target.checked })} />
                </label>
                <label>
                    Vaksin:
                    <input type="checkbox" checked={iklan.vaksin} onChange={(e) => setIklan({ ...iklan, vaksin: e.target.checked })} />
                </label>
                <label>
                    Rank:
                    <input type="text" value={iklan.rank} onChange={(e) => setIklan({ ...iklan, rank: e.target.value })} />
                </label>
                {/* Input fields for Anjing array */}
                {iklan.Anjing.map((anjing, index) => (
                    <div key={index}>
                        <h3>Anjing {index + 1}</h3>
                        <label>
                            DOB:
                            <input type="datetime-local" value={anjing.DOB ? anjing.DOB.toDate().toISOString().slice(0, 16) : ""} onChange={(e) => handleAnjingInfoChange(index, "DOB", e.target.value)} />
                        </label>

                        <label>
                            Kelamin:
                            <input type="text" value={anjing.kelamin} onChange={(e) => handleAnjingInfoChange(index, "kelamin", e.target.value)} />
                        </label>
                        <label>
                            Warna:
                            <input type="text" value={anjing.warna} onChange={(e) => handleAnjingInfoChange(index, "warna", e.target.value)} />
                        </label>
                    </div>
                ))}
                {/* Button to add a new Anjing */}
                <button type="button" onClick={handleAddAnjing}>
                    Add Anjing
                </button>
                <button type="submit">Submit</button>
            </form>
        </div>
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
