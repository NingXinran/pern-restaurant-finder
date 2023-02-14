import React, {useState, createContext} from 'react'

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);  //default is empty array
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    // function to add a restaurant
    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants, restaurant])
    }

    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurant,
                                             selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}
