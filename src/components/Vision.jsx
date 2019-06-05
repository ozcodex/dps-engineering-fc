import React from 'react';
import {Image,Col,Row,Container} from 'react-bootstrap';
import Background from './Background.jsx';
import Graph from './Graph.jsx';
const converter = require('number-to-words');
const firebase = require('../firebase.js');
const db = firebase.db;
const files = firebase.files;

const date_options = { weekday: 'long',/* year: 'numeric',*/ month: 'long', day: 'numeric' };

class Vision extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      image: '',
      time: '',
      date: '',
      counter:0
    }
    this.watchData = this.watchData.bind(this);
  }

  watchData(){
    var me = this;
    var img_collection = db.collection('images').orderBy('time','desc').limit(1);
    var observer = img_collection.onSnapshot(snap => {
      let data = snap.docs[0].data();
      console.log(data)
      if(data.filename){
      console.log(`Received query snapshot`);
        files.refFromURL('gs://images-path4').child(data.filename).getDownloadURL()
          .then(function(url) {
            console.log(url);
            let counter_words = converter.toWords(data.counter)
            let stamp = data.time.toDate()
            let date = stamp.toLocaleDateString("en-US", date_options)
            let time = stamp.toLocaleTimeString("en-US");
            me.setState({
              image:url,
              date:date,
              time:time,
              counter:counter_words
            });
          });
      } 
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  };

  componentDidMount(){
    this.watchData();
  }

  render(){
    return (
      <div>
        <Background />
        <Container>
          <Row>
            <Col className='p-3'></Col>
          </Row>
          <Row>
            <Col sm={12} md={{span:5, offset:1}}>
              <Image fluid rounded src={this.state.image} />
            </Col>
            <Col sm={12} md={{span:4, offset:1}} className="Banner text-center">
              <Row>
                <Col>Picture taken the {this.state.date} at {this.state.time} </Col>
              </Row>
              <Row>
                <Col>There are {this.state.counter} people on the picture</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className='p-3'></Col>
          </Row>
          <Graph />
          <Row>
            <Col className='p-3'></Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default Vision;
