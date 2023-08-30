import { Iklan } from "../pages/Home";
import { storage } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

interface Props {
    iklan: Iklan;
    showAnjing: (id: string) => void;
}

export default function CardDog(props: Props) {
    const { iklan } = props;
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const getImageUrl = async () => {
            try {
                const imageRef = ref(storage, iklan.gambar);
                const url = await getDownloadURL(imageRef);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        };

        getImageUrl();
    }, [iklan.gambar]);
    return (
        <div className={`cardDog`} onClick={() => props.showAnjing(iklan.id)}>
            <img src={`${imageUrl}`} className="img-fluid cardPic" alt="..." style={{ objectFit: "cover", height: "8rem", width: "100%" }}></img>
            <div className={`cardBody cardBackground_${iklan.rank}`} style={{ padding: "0.6rem" }}>
                <h6 className="cardDog-title">
                    <b>{iklan.judul}</b>
                </h6>
                <p className="cardDog-subtitle mb-2 ">
                    <i className="bi bi-geo-alt-fill me-1" />
                    {iklan.lokasi}
                </p>
                <div className="cardDog-icon">
                    {iklan.microchip && <div className="infoDog-icons-blue">MICROCHIP</div>}
                    {iklan.obatCacing && <div className="infoDog-icons">OBAT CACING</div>}
                    {iklan.stambum && <div className="infoDog-icons-blue">STAMBUM</div>}
                    {iklan.vaksin && <div className="infoDog-icons">VAKSIN</div>}
                </div>
                <div className="cardDog-extra"></div>
            </div>
        </div>
    );
}
