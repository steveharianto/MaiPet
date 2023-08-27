import { Iklan } from "../pages/Home";

interface Props {
    iklan: Iklan;
    hideAnjing: () => void;
}

export default function InfoDog(props: Props) {
    const { iklan } = props;
    return (
        <div className="infoDog">
            <div className="infoDog-card">
                <div className="infoDog-card-1">
                    <div className="infoDog-backbutton" onClick={props.hideAnjing}>
                        <p style={{ margin: "0" }}>Kembali</p>
                    </div>
                </div>
                <div className="infoDog-card-2">
                    <div style={{ height: "100%", width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src="dogLogo-Pomeranian.png" style={{ height: "90%", width: "90%", objectFit: "cover", borderRadius: "1em" }} alt="" />
                    </div>
                    <div style={{ height: "100%", width: "50%", padding: "1em", fontSize: "0.9em" }}>
                        <h6>
                            <b>{iklan.judul}</b>
                        </h6>
                        <p>
                            <i className="bi bi-geo-alt-fill me-2" />
                            {iklan.lokasi}
                        </p>

                        <p>
                            <i className="bi bi-tag-fill me-2" />
                            {iklan.jenis}
                        </p>
                        <p>
                            <i className="bi bi-telephone-fill me-2"></i>
                            {iklan.kontak}
                        </p>
                        <div style={{ height: "auto", width: "100%", display: "flex" }}>
                            {iklan.microchip && (
                                <div className="infoDog-icons" style={{ color: "#FF5733", backgroundColor: "#FFC983", border: "none" }}>
                                    MICROCHIP
                                </div>
                            )}
                            {iklan.obatCacing && (
                                <div className="infoDog-icons" style={{ color: "#42A5F5", backgroundColor: "#DAF0F7", border: "none" }}>
                                    OBAT CACING
                                </div>
                            )}
                            {iklan.stambum && <div className="infoDog-icons">STAMBUM</div>}
                            {iklan.vaksin && (
                                <div className="infoDog-icons" style={{ color: "#9C27B0", backgroundColor: "#D9C4EC", border: "none" }}>
                                    VAKSIN
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="infoDog-card-3">
                    <p>{iklan.body}</p>
                </div>
            </div>
        </div>
    );
}
