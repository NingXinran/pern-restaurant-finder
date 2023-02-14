import React from 'react'
import StarRating from './StarRating'

const Review = ({reviews}) => {
    console.log(reviews)
  return (
    <div className="row mb-2">
        {reviews && reviews.map((review) => {
            return(
                        <div key={review.id} 
                            className="card text-white bg-primary m-2" style={{maxWidth: "30%"}}>
                            <div className="card-header d-flex justify-content-between">
                                <span>{review.name}</span>
                                <span><StarRating rating={review.rating}/></span>
                            </div>
                            <div className="card-body">
                                <p className="class-tag">{review.body}</p>
                            </div>
                        </div> 
                    )
        })}
    </div>
    // <div className='row row-cols-3 mb-2'>
    //     {reviews.map((review) => {
    //         return(
    //             <div className="card text-white bg-primary m-2" style={{maxWidth: "30%"}}>
    //                 <div className="card-header d-flex justify-content-between">
    //                     <span>{review.name}</span>
    //                     <span><StarRating rating={review.rating}/></span>
    //                 </div>
    //                 <div className="card-body">
    //                     <p className="class-tag">{review.body}</p>
    //                 </div>
    //             </div> 
    //         )
    //     })}
      
    // </div>
  )
}

export default Review
