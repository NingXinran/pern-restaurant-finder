import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../contexts/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'

const RestaurantList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const navigate = useNavigate();

    useEffect(() => {
        // To not have a promise inside useEffect, define a separate function to do it
        const fetchData = async() => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response)
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
        
    }, [])  // only runs when the page is first loaded, ie when the component mounts


    const handleUpdate = (e, id) => {
        e.stopPropagation()
        try {
            // tell react router to nagivate to the update page
            navigate(`/restaurants/${id}/update`)  // push into history stack
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            await RestaurantFinder.delete(`/${id}`);
            // update restaurants context
            setRestaurants(restaurants.filter(elem => {
                return elem.id !== id
            }))
        } catch (err) {
            console.log(err);
        }
    }

    const handleSelect = async (id) => {
        navigate(`/restaurants/${id}`)
    }

    const renderRating = (elem) => {
        if (!elem.count) {
            return <span className="text-warning">0 reviews</span>
        } 
        return (<>
            <StarRating rating={elem.average_rating} />
            <span className="text-warning ml-1"> ({elem.count})</span>
        </>)
    }

  return (
    <div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(elem => {
                    return (
                        <tr onClick={()=> handleSelect(elem.id)} key={elem.id}>
                            <td>{elem.name}</td>
                            <td>{elem.location}</td>
                            <td>{'$'.repeat(elem.price_range)}</td>
                            <td>{renderRating(elem)}</td>
                            <td><button 
                                    onClick={(e) => handleUpdate(e, elem.id)}
                                    className="btn btn-warning">Update</button></td>
                            <td><button 
                                    onClick={(e) => handleDelete(e, elem.id)}
                                    className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                    
                })}
                {/* <tr>
                    <td>Chop Chop</td>
                    <td>uTown</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
            </tbody>
        </table>
      
    </div>
  )
}

export default RestaurantList
