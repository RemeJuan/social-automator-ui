import { h, Component } from 'preact';
import { SocialForm, SocialHeadings } from './components';
import browser from 'detect-browser';

import style from './style';

const API_URL = 'API_URL';
const browserName = browser.name.toLowerCase();
const networkModel = {
  network: '',
  media: '',
  text: '',
  dateTime: ''
};

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      instagram: [{
        '_id' : '58bfcc3ac88c91768e8e2fe3',
        'network' : 'instagram',
        'media' : 'http://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg',
        'text' : 'Random Tiger Phot #tiger #random #photo',
        'dateTime' : '2017-03-22T04:00:00.000Z',
        'posted' : false,
        '__v' : 0
      }],
      twitter: [{
        '_id' : '58bfcc3ac88c91768e8e2fe3',
        'network' : 'twitter',
        'media' : 'https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png',
        'text' : 'Random Cat Photo #cat #phot #random',
        'dateTime' : '2017-03-22T04:00:00.000Z',
        'posted' : false,
        '__v' : 0
      }],
      model: {
        ...networkModel
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleSubmit(data) {
    // fetch(API_URL, {
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // })
    Promise.resolve(data)
    // .then(res => res.json())
    .then(this.updateState)
    .catch(err => console.log(err));
  }

  updateState(data) {
    const {network} = data;
    const excluded = this.state[network].filter(obj => obj._id !== data._id);

    const updatedState = {
      ...this.state,
      [network]: [
        ...excluded,
        ...data
      ]
    };

    this.setState(updatedState);
  }

  handleCopy(data) {
    delete data._id;
    this.setState({ model: data });
  }

  componentWillMount() {
    // fetch(API_URL)
    Promise.resolve(this.state)
    // .then(res => res.json())
    .then(res => this.setState(res));
  }

  render() {
    const {twitter, instagram, model} = this.state;

    return (
      <div class={style.home}>
        {browserName !== 'chrome' && <h3>This application is intended for use in Google Chrome ONLY!</h3>}
        <div className="network-container">
          <h3>Add Sheduled item</h3>
          <SocialForm formData={model} submit={this.handleSubmit} />
        </div>
        <div className="network-container network-container--twitter">
          <h3>Twitter</h3>
          <SocialHeadings />
          {twitter.map(data => (
            <SocialForm formData={data} submit={this.handleSubmit} copy={this.handleCopy} />
          ))}
        </div>
        <div className="network-container network-container--instagram">
          <h3>Instagram</h3>
          <SocialHeadings />
          {instagram.map(data => (
            <SocialForm formData={data} submit={this.handleSubmit} copy={this.handleCopy} />
          ))}
        </div>
        </div>
    );
  }
}
