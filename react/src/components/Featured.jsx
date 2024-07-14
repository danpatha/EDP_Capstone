import FeaturedSpecific from "./FeaturedSpecific";

const Featured = (props) => {
    return (
        <> 
            <h5>Our Most Popular Items</h5>
            <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>

                {
                    props.data.map((promo) => (
                        <FeaturedSpecific key={promo.id} data={promo} />
                    ))
                }
            </div>
        </>
    );
};

export default Featured