import React, {Component} from 'react';
import cn from 'classnames';

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="items">
          <div>
            <img src='https://sotakuva-api.herokuapp.com/images/588c8ce5dfa87d48afea2bd7/file?size=large' alt='' className="img-setting"/>
          </div>
          <div className='front-text-panel'><h3 >Talvisota</h3></div>
        </div>
        <div className="items">
          <div>
            <img src='https://sotakuva-api.herokuapp.com/images/588cb5899b350e5298dbfefe/file?size=large' alt='' className="img-setting"/>
          </div>
          <div className='front-text-panel'><h3>Jatkosota</h3></div>
        </div>
        <div className="items">
          <div>
            <img src='https://sotakuva-api.herokuapp.com/images/588ce3860995b179635014c7/file?size=large' alt='' className="img-setting"/>
          </div>
          <div className="front-text-panel"><h3>Lapin sota</h3></div>
        </div>
      </div>
    );
  }
}
