/* eslint-disable react/prop-types */
export default function CardDog(props) {
    return (
        <div className={`cardDog cardBackground_${props.rank}`}>
            <img src={`dogLogo-${props.dogType}.png`} className="img-fluid cardPic" alt="..." style={{ objectFit: "cover", height: "8rem", width: "100%" }}></img>

            <div className={`cardBody cardBackground_${props.rank}`} style={{ padding: "0.5rem" }}>
                <h6 className="cardDog-title">
                    <b>ANJING POMERANIAN MUNGIL GEMES</b>
                </h6>
                <p className="cardDog-subtitle mb-2 text-muted" style={{ color: "white" }}>
                    <i className="bi bi-geo-alt-fill me-1" />
                    Surabaya, Indonesia
                </p>
            </div>
        </div>
    );
}
