import React from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useAlert } from 'react-alert';



const Content = ({ content, col}) => {

    return (

        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className=" card card p-3 rounded">
                <Link to={`/content/${content._id}`}><img className="card-img-top mx-auto" src={content.images[0].url} alt='' /></Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/content/${content._id}`}>{content.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(content.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({content.numOfReviews} đánh giá)</span>
                    </div>
                    <p className="card-text">{(content.price).toLocaleString()}đ</p>
                    <div className="container">
                        <div className="row">
                            <Link to={`/content/${content._id}`} id="view_btn" className="btn btn-block"><i className="fa fa-eye" aria-hidden="true"><span>&nbsp;</span></i>Xem chi tiết</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Content
