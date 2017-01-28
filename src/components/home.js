import React, {Component} from 'react';

export default class Welcome extends Component {
  render() {
    const {
      activateEra
    } = this.props;

    return (
      <div className='items-container'>
        <div className='items' onClick={ _ => activateEra({era: 1, title: 'Talvisota'})}>
          <div className='img-setting' style={{backgroundImage: 'url(\'https://sotakuva-api.herokuapp.com/images/588c8ce5dfa87d48afea2bd7/file?size=thumbnail\')'}}>
          </div>
          <div className='front-text-panel'><h3 >Talvisota</h3></div>
        </div>
        <div className='items' onClick={ _ => activateEra({era: 2, title: 'Jatkosota'})}>
          <div className='img-setting' style={{backgroundImage: 'url(\'https://sotakuva-api.herokuapp.com/images/588cb5899b350e5298dbfefe/file?size=thumbnail\')'}}>
          </div>
          <div className='front-text-panel'><h3>Jatkosota</h3></div>
        </div>
        <div className='items' onClick={ _ => activateEra({era: 3, title: 'Lapin sota'})}>
          <div className='img-setting' style={{backgroundImage: 'url(\'https://sotakuva-api.herokuapp.com/images/588ce3860995b179635014c7/file?size=thumbnail\')'}}>
          </div>
          <div className='front-text-panel'><h3>Lapin sota</h3></div>
        </div>
      </div>
    );
  }
}
