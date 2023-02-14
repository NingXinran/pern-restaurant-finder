import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // define state for each of these inputs
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('Price Range');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await RestaurantFinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            })
            navigate('/')
        } catch (err) {
            console.log(err)
        }
       
        
    }

    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`)
            console.log(response.data)
            // set values to states
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData();
    }, [])

    // return the form with three fields and a button
    return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                        type="text" id="name" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)}
                        type="text" id="location" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <select
                      value={priceRange}
                      onChange={e => setPriceRange(e.target.value)}
                      id="price_range"
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
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant
