import Navigator from "./Navigator";
import SportingGoodsList from "./SportingGoodsList";
import Categories from "./Categories";
import { useEffect, useState } from "react";

const Home = (props) => {
const [categoryData, setCategoryData] = useState([]);
const [category, setCategory] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_SPORTS_API_URL}/categories`);
            if (!response.ok) {
              throw new Error('category data could not be fetched!');
            }
            const json_response = await response.json();
            setCategoryData(json_response);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchData();
      }, [category]);
    // console.log(props,"Home")
    return (
        <>
        {/* {!props.searchTerm && <Navigator setPage={props.setPage} page={props.page} />  */}

        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <Categories data={categoryData}/>
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