import CardDog from "../components/CardDog";
import CategoryDog from "../components/CategoryDog";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
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
    const [filterInput, setFilterInput] = useState<string>("");

    const handleFilterChange = (event: { target: { value: SetStateAction<string> } }) => {
        setFilterInput(event.target.value);
    };

    const getIklan = async () => {
        const data = await getDocs(iklanRef);
        setIklanList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Iklan[]);
    };

    // useEffect(() => {
    //     getIklan();
    // }, []);
    // if (!iklanList) {
    //     return <div>Loading...</div>;
    // }
    // const filteredIklanList =
    //     existingFilters.length === 0
    //         ? iklanList // Include everything if existingFilters is empty
    //         : iklanList.filter((iklan) => existingFilters.includes(iklan.jenis));

    const categories = ["Akita", "Alaskan Malamute", "American Bully", "American Cocker Spaniel", "American Pit Bull Terrier", "Australian Shepherd", "Basenji", "Beagle", "Belgian Malinois", "Bernese Mountain Dog", "Bichon Frise", "Biewer Terrier", "Border Collie", "Bulldog", "Cane Corso", "Cavalier King Charles Spaniel", "Chihuahua", "Chow Chow", "Dalmatian", "Doberman Pinscher", "Dogo Argentino", "Dutch Shepherd", "English Cocker Spaniel", "French Bulldog", "Golden Retriever", "Great Dane", "Greyhound", "Herder / German Shepherd", "Jack Russell Terrier", "Japanese Chin", "Kintamani", "Labrador Retriever", "Maltese", "Miniature Pinscher", "Miniature Schnauzer", "Mixed Breed / Campuran", "Pekingese", "Pembroke Welsh Corgi", "Pomeranian", "Poodle", "Pug", "Rottweiler", "Samoyed", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu", "Siberian Husky", "Tekel / Dachshund", "West Highland White Terrier", "Yorkshire Terrier"];
    const filteredCategories = categories.filter((category) => category.toLowerCase().includes(filterInput.toLowerCase()));
    return (
        <>
            <Header />
            <div style={{ backgroundColor: "red", height: "20em", marginBottom: "1em" }}>
                <img src="header-pic.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
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
                    <div className="filterList">
                        {existingFilters?.map((filter) => (
                            <div className="filterList-object">{filter}</div>
                        ))}
                    </div>
                    <div className="dogList">
                        {/* {filteredIklanList?.map((iklan) => (
                            <CardDog iklan={iklan} key={iklan.id} />
                        ))} */}
                    </div>
                </div>
            </div>
        </>
    );
}
