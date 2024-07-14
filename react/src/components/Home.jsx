import Navigator from "./Navigator";
import SportingGoodsList from "./SportingGoodsList";

const Home = (props) => {
    // console.log(props,"Home")
    return (
        <>
        {!props.searchTerm && <Navigator setPage={props.setPage} page={props.page} /> 
}
        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {
                props.data.map((sock) => (
                    <SportingGoodsList key={sock._id} data={sock} handleDelete={props.handleDelete} />
                ))
            }
        </div>
        </>
    );
};

export default Home;