import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = [
            {
              "source": {"id": "bbc-sport","name": "BBC Sport"},
              "author": null,
              "title": "Ravichandran Ashwin retires: India spinner quits international cricket at 38",
              "description": "India off-spinner Ravichandran Ashwin retires from international cricket as the seventh-highest Test wicket-taker of all time.",
              "url": "http://www.bbc.co.uk/sport/cricket/articles/cy89jww8g7lo",
              "urlToImage": "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/a626/live/7c506b30-bd16-11ef-a2ca-e99d0c9a24e3.jpg",
              "publishedAt": "2024-12-18T08:37:24.8756021Z",
              "content": "Ashwin took 156 wickets at 33.20 apiece in 116 one-day internationals and 72 at an average of 23.22 in 65 T20s.\r\nHe was part of the squad that won the 2011 World Cup in India, although he played only… [+766 chars]"
            },
            {
              "source": {"id": "news-com-au","name": "News.com.au"},
              "author": "Matthew Sullivan",
              "title": "Test series rocked by sudden retirement",
              "description": "India’s Ravichandran Ashwin has announced his retirement from international cricket effective immediately.",
              "url": "https://www.news.com.au/sport/cricket/indian-cricket-star-announces-snap-retirement-after-gabba-test/news-story/fe53eda976c2cb8119109bd986eba8f4",
              "urlToImage": "https://content.api.news/v3/images/bin/bf6c900f5331866126957d2531b5f2bc",
              "publishedAt": "2024-12-18T06:17:00Z",
              "content": "India’s Ravichandran Ashwin has announced his retirement from international cricket effective immediately. \r\nThe veteran offspinner revealed the news alongside Indian captain Rohit Sharma in the post… [+2400 chars]"
            },
            {
              "source": {"id": "espn-cric-info","name": "ESPN Cric Info"},
              "author": null,
              "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
              "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
              "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
              "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
              "publishedAt": "2020-04-27T11:41:47Z",
              "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
            },
            {
              "source": {"id": "espn-cric-info","name": "ESPN Cric Info"},
              "author": null,
              "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
              "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
              "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
              "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
              "publishedAt": "2020-03-30T15:26:05Z",
              "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
            }
        ]
    constructor(){
        super();
        this.state = {
            articles: this.articles,
            loading: false

        }
    }  
    async componentDidMount(){
      console.log("cdm")
      let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0540761f903e44c8b242309d538b483a";
      let data = await fetch(url);
      let parsedData = await  data .json()
      console.log(parsedData)
      this.setState({articles: parsedData.articles})

    }
    render() {
        return (
        <div className="container my-3">
            <h1>NewsMonkey - Top HeadLines</h1>
            <div className="row">
            {this.state.articles.map((element)=>{
               return <div className="col-md-4" key={element.url}>
                        <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div> 
                   })}
            </div>
        </div>
    )
  }
}

export default News
