import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../contexts/RestaurantsContext';

const AddRestaurant = () => {
  // manage the states of the form
  const {restaurants, addRestaurant} = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault()  // DO not reload the page as it would lose the states
    try {
      const response = await RestaurantFinder.post("/", {
        // body here
        name,
        location,
        price_range: priceRange  // use the state value!
      })
      console.log(response.data.data.restaurant);
      // update the list
      addRestaurant(response.data.data.restaurant);
      // reset states
      setName("")
      setLocation("")
      setPriceRange("Price Range")
    } catch (err) {
      
    }
  }

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
            <div className="row">
                <div className="col-4">
                    <input 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type="text"
                      className='form-control'
                      placeholder='Name'/>
                </div>
                <div className="col-5">
                    <input 
                      type="text" 
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className='form-control' 
                      placeholder='Location'/>
                </div>
                <div className="col-2">
                    <select
                      value={priceRange}
                      onChange={e => setPriceRange(e.target.value)} 
                      className='form-select' 
                      aria-label='Default select example'>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} className="col-1 btn btn-primary">Add</button>
            </div>
            
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
