import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App=()=> {
 const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)

  // state = {
  //   progress : 0
  // }
 const fixProgress = (progress)=>{
    // this.setState({progress:progress})
    setProgress(progress)
  }

    return (
      <Router>
        <div>
          <NavBar/>
          <LoadingBar
          height={3}
          color='#f11946'
        progress={progress}
      />
          <Routes>
              <Route path="/" element={<News fixProgress={fixProgress} apiKey={apiKey} key="general" pageSize={5} category="general" country="in"/>}>
                
              </Route>
              <Route path="/sports" element={<News fixProgress={fixProgress} apiKey={apiKey} key="sports" pageSize={5} category="sports" country="in"/>}>
                
              </Route>
              <Route path="/business" element={<News fixProgress={fixProgress} apiKey={apiKey} key="business" pageSize={5} category="business" country="in"/>}>
              </Route>
              <Route path="/entertainment" element={<News fixProgress={fixProgress} apiKey={apiKey} key="entertainment" pageSize={5} category="entertainment" country="in"/>}>
              </Route>
              <Route path="/health" element={<News fixProgress={fixProgress} apiKey={apiKey} key="health" pageSize={5} category="health" country="in"/>}>
              </Route>
              <Route path="/science" element={<News fixProgress={fixProgress} apiKey={apiKey} key="science" pageSize={5} category="science" country="in"/>}>
                
              </Route>
              <Route path="/technology" element={<News fixProgress={fixProgress} apiKey={apiKey} key="technology" pageSize={5} category="technology" country="in"/>}>
              </Route>
        </Routes>
        </div>
      </Router>
    )
}

export default App;