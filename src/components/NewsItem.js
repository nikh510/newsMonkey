import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let  {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://play-lh.googleusercontent.com/XKpIJApesGkiUv5uDoybpeq3-EAh53KYGRvxheJes7F0x0Qn_Bfqm7RI9jKoexo7UE8":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={ newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>  
      </div>
    )
  }
}

export default NewsItem
