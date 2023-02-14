import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { RestaurantsContextProvider } from './contexts/RestaurantsContext';
import Details from './routes/Details';
import Home from './routes/Home';
import Update from './routes/Update';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/restaurants/:id/update" element={<Update/>} />
                        <Route exact path="/restaurants/:id" element={<Details/>} />
                    </Routes>
                </Router>
            </div> 
        </RestaurantsContextProvider>
    )
}

export default App;