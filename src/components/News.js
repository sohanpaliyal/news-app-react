import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    
    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general'
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }

    constructor(){
        super()
        this.state = {
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
        // debugger
    }
    componentDidMount(){
        
        this.getData() 
    }
  
   async getData(){
        console.log('hello there');
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3475e6ca49564591ac350193eb456e9a&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(60);
        console.log(parsedData);
            this.setState({articles:parsedData.articles,
                          totalResults:parsedData.totalResults,
                          loading:false})
          this.props.setProgress(100);
    
    }
    handlePrevClick = async()=>{
        console.log('handlePrevClick');
        this.setState({page :this.state.page-1 })
        this.getData();
    }

    fetchMoreData = async () => {
      this.setState({page:this.state.page + 1})
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3475e6ca49564591ac350193eb456e9a&page=${this.state.page}&pageSize=${this.props.pageSize}`
            // this.setState({loading:true})
            let data = await fetch(url)
            let parsedData = await data.json() 
            console.log(parsedData);
                this.setState({articles:this.state.articles.concat(parsedData.articles) ,
                            totalResults:parsedData.totalResults,
                            loading:false})
      };

    handleNextClick = async ()=>{
        console.log(this.state.page);
        console.log('handleNextClick');
        if( this.state.page + 1 > Math.ceil(this.state.totalResults/ this.props.pageSize)){
            alert('no more data available');
        }else{
            this.setState({page : this.state.page + 1 })
            this.getData();
        }
    }

  render() {
    return (
      <div className='container my-3'>
          <h2 className='text-center my-5'>
               NewsApp - Top Headlines
          </h2>
          {this.state.loading &&  <Spinner></Spinner>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="container">

            <div className="row">
                {
                    this.state.articles.map((element,index)=>{
                        return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title ? element.title:''}
                                            description={element.description ?element.description:''}
                                            imgUrl={element.urlToImage? element.urlToImage:'https://images.hindustantimes.com/img/2022/06/26/1600x900/Aditya_Roy_Kapur_1656250985399_1656250993819.jpg'}
                                            newsUrl={element.url? element.url:''}/>
                            </div>
                    })
                }
            </div>
        </div>
          </InfiniteScroll>
          
      </div>
    )
  }
}
