import RecommendedSpecific from "./RecommendedSpecific";

const Recommended = () => {
    

    return (
        <> 
            <h5>Your recommended products</h5>
            <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>
                Products here
                {/* {
                    props.data.map((promo) => (
                        <RecommendedSpecific key={promo.id} data={promo} />
                    ))
                } */}
            </div>
        </>
    );
};

export default Recommended