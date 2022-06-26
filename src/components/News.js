import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor(){
        super()
        this.state = {
            articles:[],
            loading:false,
            page:1,
            totalResults:20
        }
        // debugger
    }
  async  componentDidMount(){
      console.log('hello there');
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3475e6ca49564591ac350193eb456e9a&page=${this.state.page}&pageSize=20`
        let data = await fetch(url)
        let parsedData = await data.json() 
        console.log(parsedData);
            this.setState({articles:parsedData.articles})
    }
  
    handlePrevClick = async()=>{
        console.log('handlePrevClick');
        this.setState({page :this.state.page-1 })
        this.componentDidMount();
    }

    handleNextClick = async ()=>{
        console.log('handleNextClick');
        if(this.stage.page+1 > Math.ceil(this.state.totalResults/20)){
            alert('no more data available');
        }else{
            this.setState({page :this.state.page + 1 })
            this.componentDidMount();
        }
    }

  render() {
    return (
      <div className='container my-3'>
          <h2>
               NewsApp - Top Headlines
          </h2>
          <div className="row">
              {
                  this.state.articles.map((element)=>{
                   return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title:''}
                                         description={element.description ?element.description:''}
                                         imgUrl={element.urlToImage? element.urlToImage:'https://images.hindustantimes.com/img/2022/06/26/1600x900/Aditya_Roy_Kapur_1656250985399_1656250993819.jpg'}
                                         newsUrl={element.url? element.url:''}/>
                         </div>
                  })
              }
          </div>
          <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &laquo; prev</button>
          <button type="button"  className="btn btn-dark"  onClick={this.handleNextClick}> next &raquo;</button>
          </div>
      </div>
    )
  }
}
