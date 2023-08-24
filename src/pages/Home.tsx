import CardDog from "../components/CardDog";
import CategoryDog from "../components/CategoryDog";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
}

export default function Home() {
    const [iklanList, setIklanList] = useState<Iklan[] | null>(null);
    const iklanRef = collection(db, "iklan");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filterType = queryParams.get("filterType");
    const existingFilters = filterType ? filterType.split(",") : [];

    const getIklan = async () => {
        const data = await getDocs(iklanRef);
        setIklanList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Iklan[]);
    };

    useEffect(() => {
        getIklan();
    }, []);
    if (!iklanList) {
        return <div>Loading...</div>;
    }
    const filteredIklanList =
        existingFilters.length === 0
            ? iklanList // Include everything if existingFilters is empty
            : iklanList.filter((iklan) => existingFilters.includes(iklan.jenis));
    const categories = ["Akita", "Alaskan Malamute", "American Bully", "American Cocker Spaniel", "American Pit Bull Terrier", "Australian Shepherd", "Basenji", "Beagle", "Belgian Malinois", "Bernese Mountain Dog", "Bichon Frise", "Biewer Terrier", "Border Collie", "Bulldog", "Cane Corso", "Cavalier King Charles Spaniel", "Chihuahua", "Chow Chow", "Dalmatian", "Doberman Pinscher", "Dogo Argentino", "Dutch Shepherd", "English Cocker Spaniel", "French Bulldog", "Golden Retriever", "Great Dane", "Greyhound", "Herder / German Shepherd", "Jack Russell Terrier", "Japanese Chin", "Kintamani", "Labrador Retriever", "Maltese", "Miniature Pinscher", "Miniature Schnauzer", "Mixed Breed / Campuran", "Pekingese", "Pembroke Welsh Corgi", "Pomeranian", "Poodle", "Pug", "Rottweiler", "Samoyed", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu", "Siberian Husky", "Tekel / Dachshund", "West Highland White Terrier", "Yorkshire Terrier"];
    return (
        <>
            <div className="header"></div>
            <div className="content">
                <div className="content-left">
                    <div className="filter">
                        <p style={{ padding: "0.5em", margin: "0" }}>
                            <b>Jenis Anjing</b>
                        </p>
                        {categories.map((category, index) => (
                            <CategoryDog key={index} name={category} />
                        ))}
                    </div>
                </div>
                <div className="content-right">
                    <p>
                        <b style={{ marginBottom: "0.3rem" }}>Papan Iklan</b>
                    </p>
                    <div className="filterList">
                        <div className="filterList-object">Pomeranian</div>
                        <div className="filterList-object">Pomeranian</div>
                    </div>
                    <div className="dogList">
                        {filteredIklanList?.map((iklan) => (
                            <CardDog iklan={iklan} key={iklan.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
