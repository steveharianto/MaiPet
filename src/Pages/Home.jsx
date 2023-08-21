import CardDog from "../Components/CardDog";
import CategoryDog from "../Components/CategoryDog";

export default function Home() {
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
                        <b style={{ marginBottom: "0.3rem" }}>Anjing Dijual</b>
                    </p>
                    <div className="dogList">
                        <CardDog dogType={"Pomeranian"} rank={"Gold"} />
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
                        <CardDog dogType={"Pomeranian"} rank={"Silver"} />
                    </div>
                </div>
            </div>
        </>
    );
}
