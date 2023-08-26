import { Iklan } from "../pages/Home";

interface Props {
    iklan: Iklan;
}

export default function CardDog(props: Props) {
    const { iklan } = props;
    return (
        <div className={`cardDog cardBackground_${iklan.rank}`}>
            <img src={`dogLogo-${iklan.jenis}.png`} className="img-fluid cardPic" alt="..." style={{ objectFit: "cover", height: "8rem", width: "100%" }}></img>

            <div className={`cardBody cardBackground_${iklan.rank}`} style={{ padding: "0.5rem" }}>
                <h6 className="cardDog-title">
                    <b>{iklan.judul}</b>
                </h6>
                <p className="cardDog-subtitle mb-2 " style={{ color: "#FF2216" }}>
                    <i className="bi bi-geo-alt-fill me-1" />
                    {iklan.lokasi}
                </p>
                <div className="cardDog-icon">
                    {iklan.microchip && (
                        <div className="cardDog-icons" style={{ color: "#FF5733", backgroundColor: "#FFC983", border: "none" }}>
                            MICROCHIP
                        </div>
                    )}
                    {iklan.obatCacing && (
                        <div className="cardDog-icons" style={{ color: "#42A5F5", backgroundColor: "#DAF0F7", border: "none" }}>
                            OBAT CACING
                        </div>
                    )}
                    {iklan.stambum && <div className="cardDog-icons">STAMBUM</div>}
                    {iklan.vaksin && (
                        <div className="cardDog-icons" style={{ color: "#9C27B0", backgroundColor: "#D9C4EC", border: "none" }}>
                            VAKSIN
                        </div>
                    )}
                </div>
                <div className="cardDog-extra"></div>
            </div>
        </div>
    );
}
