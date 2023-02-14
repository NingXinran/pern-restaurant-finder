import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState('Rating');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addreview`, {
                name,
                body,
                rating
            })
            window.location.reload(true)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='mb-2'>
      <form action="">
        <div className="row mb-2">
            <div className="col-8">
                <label htmlFor="name" className='form-label'>Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                    id="name" type="text" className="form-control" placeholder='Name'/>
            </div>
            <div className="col-4">
                <label htmlFor="rating" className='form-label'>Rating</label>
                <select value={rating} onChange={e => setRating(e.target.value)}
                    id="rating" className="form-control custom-select">
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <div className="row mb-2">
            <label htmlFor="Body" className='form-label'>Review</label>
            <textarea value={body} onChange={e => setBody(e.target.value)}
                id="body" cols="30" rows="8" className='form-control'></textarea>
        </div>
        <button onClick={e => submitHandler(e)} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddReview
