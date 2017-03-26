import React, {Component} from 'react';

export default class Welcome extends Component {
  render() {
    const {
      activateEra
    } = this.props;

    return (
      <div>
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
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <p>
              Rintamalla.fi -kuvapankki sisältää lähes 160 000 Suomen talvi-, jatko- ja Lapin sodan ajan valokuvaa.
              Kokoelmassa on kuvia maa-, meri- ja ilmavoimista sekä kotirintamalta.
            </p>

            <p>
              Kuvapankki on toteutettu satavuotiaan Suomen kunniaksi
              <a target="_blank" href="https://meiko.fi">Meiko</a> Hacks -tapahtumassa 27.1. - 28.1.2017
            </p>

            <p>Kuvat: <a target="_blank" href="http://sa-kuva.fi">sa-kuva.fi</a></p>
          </div>
        </div>
      </div>
    );
  }
}
