import React from 'react';
import {showBaner} from '../util/baners';
import {withTranslation} from 'react-i18next';
import './Logo.css';
import PlantImage from '../images/plant.png';

class Logo extends React.Component {
  constructor(props) {
    super(props);

    this.appLanguage = { changed: false, langCode: 'en' };
    const { i18n } = this.props;
    const language = window.navigator.userLanguage || window.navigator.language;
    if (language.startsWith('es')) {
      i18n.changeLanguage('es');
      this.appLanguage.langCode = 'es';
    }

    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleLogoClick() {
    const { t, i18n } = this.props;
    if ( this.appLanguage.changed ) {
      if ( this.appLanguage.langCode === 'en' ) {
        i18n.changeLanguage('es');
        this.appLanguage.langCode = 'es';
      } else {
        i18n.changeLanguage('en');
        this.appLanguage.langCode = 'en';
      }
      showBaner(t('baners.lang_changed'), 1000);
    } else {
      showBaner(t('baners.click_again'), 1000);
      this.appLanguage.changed = true;
    }

    const plant = document.querySelector('.about .logo img');
    plant.classList.add('swirly-plant');
    setTimeout(() => {
      plant.classList.remove('swirly-plant');
    }, 2000); // swirly-plant animation is 1.5s
  }

  render() {
    return (
      <div className="logo">
        <img onClick={this.handleLogoClick} alt="plant" src={PlantImage}/>
      </div>
    );
  }
}

export default withTranslation()(Logo);
