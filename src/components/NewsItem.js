import React from 'react'

const NewsItem=(props) => {

    let {title,description,imgUrl} = props;
    return (
      <div className='my3'>

            <div className="card">
            <img src={imgUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title.slice(0,45)}...</h5>
                <p className="card-text">{description.slice(0,88)}...</p>
                <a href="/" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>

      </div>
    )
}

export default NewsItem; 