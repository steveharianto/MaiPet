import CardDog from "../components/CardDog";
import CategoryDog from "../components/CategoryDog";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
interface AnjingInfo {
    DOB: string;
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

    const getIklan = async () => {
        const data = await getDocs(iklanRef);
        setIklanList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Iklan[]);
    };

    useEffect(() => {
        getIklan();
    }, []);

    return (
        <>
            <div className="header"></div>
            <div className="content">
                <div className="content-left">
                    <div className="filter">
                        <p>
                            <b>Jenis Anjing</b>
                        </p>
                        <CategoryDog name="Pomeranian" />
                        <CategoryDog name="Akita" />
                        <CategoryDog name="Beagle" />
                        <CategoryDog name="Bulldog" />
                        <CategoryDog name="Pug" />
                        <CategoryDog name="Labrador Retriever" />
                    </div>
                </div>
                <div className="content-right">
                    <p>
                        <b style={{ marginBottom: "0.3rem" }}>Papan Iklan</b>
                    </p>
                    <div className="dogList">
                        {iklanList?.map((iklan) => (
                            <CardDog iklan={iklan} key={iklan.id} />
                        ))}
                        {/* <CardDog dogType={"Pomeranian"} rank={"Gold"} />
                        <CardDog dogType={"Pomeranian"} rank={"Gold"} />
                        <CardDog dogType={"Pomeranian"} rank={"Gold"} />
                        <CardDog dogType={"Pomeranian"} rank={"Blue"} />
                        <CardDog dogType={"Pomeranian"} rank={"Blue"} />
                        <CardDog dogType={"Pomeranian"} rank={"Blue"} />
                        <CardDog dogType={"Pomeranian"} rank={"Blue"} />
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} />
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} />
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} />
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} />
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} />
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} /> */}
                    </div>
                </div>
            </div>
        </>
    );
}
