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
                        <h6 style={{ height: "2em", marginBottom: "1em", marginTop: "2em" }}>
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
                            {iklan.microchip && <div className="infoDog-icons-blue">MICROCHIP</div>}
                            {iklan.obatCacing && <div className="infoDog-icons">OBAT CACING</div>}
                            {iklan.stambum && <div className="infoDog-icons-blue">STAMBUM</div>}
                            {iklan.vaksin && <div className="infoDog-icons">VAKSIN</div>}
                        </div>
                    </div>
                </div>
                <div className="infoDog-card-3" style={{ whiteSpace: "pre-wrap", height: "100%", padding: "0 2em 0 2em", fontSize: "0.8em" }}>
                    <p>{iklan.body.replace(/\\n/g, "\n")}</p>
                </div>
            </div>
        </div>
    );
}
