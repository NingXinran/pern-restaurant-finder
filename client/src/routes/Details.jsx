import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Review from '../components/Review';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../contexts/RestaurantsContext';

const Details = () => {
  // get id from url
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async() => {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response.data)
        // set values to states
        setSelectedRestaurant(response.data.data)
    }
    fetchData();
}, [])

  console.log(selectedRestaurant)
  return (
    
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='font-weight-light display-1 text-center'>{selectedRestaurant.restaurant.name}</h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "()"}
            </span>
          </div>
          <div className="mt-3">
            <Review reviews={selectedRestaurant.reviews}/>
          </div>
          <AddReview />
        </>
      )}
    </div>
  )
}

export default Details