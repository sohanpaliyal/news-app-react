import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Routes>
              <Route path="/" element={<News key="general" pageSize={5} category="general" country="in"/>}>
                
              </Route>
              <Route path="/sports" element={<News key="sports" pageSize={5} category="sports" country="in"/>}>
                
              </Route>
              <Route path="/business" element={<News key="business" pageSize={5} category="business" country="in"/>}>
              </Route>
              <Route path="/entertainment" element={<News key="entertainment" pageSize={5} category="entertainment" country="in"/>}>
              </Route>
              <Route path="/health" element={<News key="health" pageSize={5} category="health" country="in"/>}>
              </Route>
              <Route path="/science" element={<News key="science" pageSize={5} category="science" country="in"/>}>
                
              </Route>
              <Route path="/technology" element={<News key="technology" pageSize={5} category="technology" country="in"/>}>
              </Route>
        </Routes>
        </div>
      </Router>
    )
  }
}
