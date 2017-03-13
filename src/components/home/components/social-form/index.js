import { h, Component } from 'preact';

import style from './style';

export default class SocialForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...props.formData};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    this.props.submit(this.state);
    event.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.formData);
  }

  render() {
    const { network, media, text, dateTime } = this.state;
    const { submit } = this.props;
    const btnValue = this.state._id ? 'Update' : 'Create';

    return (
      <div class={style['twitter-form']}>
        <form className="row" onSubmit={this.handleSubmit}>
          <select name="network" class="col-xs-1" value={network} required onChange={this.handleChange}>
            <option selected value="">Select</option>
            <option value="instagram" selected={network === 'instagram'}>Instagram</option>
            <option value="twitter" selected={network === 'twitter'}>Twitter</option>
          </select>
          <div className="col-xs-3">
            <input name="media" type="url" placeholder="Image URL" value={media} required onChange={this.handleChange} />
          </div>
          <div className="col-xs-5">
            <input name="text" type="text" placeholder="Message" value={text} required onChange={this.handleChange} size={this.state.network === 'twitter' ? 130 : ''} />
          </div>
          <div className="col-xs-2">
            <input name="dateTime" type="datetime-local" placeholder="Date & Time" required value={dateTime.replace('Z', '')} onChange={this.handleChange} />
          </div>
          <div className="col-xs-1">
            <button className="btn btn-primary">{btnValue}</button>
          </div>
        </form>
      </div>
    );
  }
}
