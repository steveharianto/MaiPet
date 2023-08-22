import { Iklan } from "../pages/Home";

interface Props {
    iklan: Iklan;
}

export default function CardDog(props: Props) {
    const { iklan } = props;
    return (
        <div className={`cardDog cardBackground_${iklan.rank}`} key={iklan.id}>
            <img src={`dogLogo-${iklan.jenis}.png`} className="img-fluid cardPic" alt="..." style={{ objectFit: "cover", height: "8rem", width: "100%" }}></img>

            <div className={`cardBody cardBackground_${iklan.rank}`} style={{ padding: "0.5rem" }}>
                <h6 className="cardDog-title">
                    <b>{iklan.judul}</b>
                </h6>
                <p className="cardDog-subtitle mb-2 text-muted" style={{ color: "white" }}>
                    <i className="bi bi-geo-alt-fill me-1" />
                    {iklan.lokasi}
                </p>
            </div>
        </div>
    );
}
