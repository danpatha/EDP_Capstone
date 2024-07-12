import Promotion from "./Promotion";

const Featured = (props) => {
    return (
        <> 
            <h5>Featured Sportings Goods</h5>
            <div className="card-container d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>

                {
                    props.data.map((promo) => (
                        <Promotion key={promo.id} data={promo} />
                    ))
                }
            </div>
        </>
    );
};

export default Featured