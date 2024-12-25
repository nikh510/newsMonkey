import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route  
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  pageSize = 5;
  apiKey = "0540761f903e44c8b242309d538b483a"
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar  height={3} color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress.bind(this)}  apiKey = {this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;


