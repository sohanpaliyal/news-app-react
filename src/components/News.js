import React,{useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)    
    
    useEffect(() => {
        getData() 
        // eslint-disable-next-line
    }, [])
    
   const getData = async ()=> {
        console.log('hello there');
        props.fixProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        // this.setState({loading:true})
        setLoading(true)
        let data = await fetch(url)
        props.fixProgress(30);
        let parsedData = await data.json()
        props.fixProgress(60);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
         
          props.fixProgress(100);
    
    }
//  const handlePrevClick = async()=>{
//         console.log('handlePrevClick');
//         // this.setState({page :this.state.page-1 })
//         setPage(page-1)
//         getData();
//     }

// const handleNextClick = async ()=>{
//     console.log(this.state.page);
//     console.log('handleNextClick');
//     if( page + 1 > Math.ceil(totalResults/ props.pageSize)){
//         alert('no more data available');
//     }else{
//         // this.setState({page : this.state.page + 1 })
//         setPage(page + 1)
//         getData();
//     }
// }

   const fetchMoreData = async () => {
    //   this.setState({page:this.state.page + 1})
        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
            // this.setState({loading:true})
            let data = await fetch(url)
            let parsedData = await data.json() 
            console.log(parsedData);
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setLoading(false);
      };

   

    return (
      <div className='container my-3 pt-3'>
          <h2 className='text-center my-5'>
               NewsApp - Top Headlines
          </h2>
          {loading &&  <Spinner></Spinner>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
            <div className="container">

            <div className="row">
                {
                    articles.map((element,index)=>{
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

News.defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
}

News.propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
}


export default News;