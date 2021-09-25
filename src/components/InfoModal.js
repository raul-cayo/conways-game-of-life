import React from 'react';
import Modal from './Modal';
import { withTranslation } from 'react-i18next';

class InfoModal extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <Modal id="info-modal" title={t("info.modal_title")}>
        <p>{t('info.game_description')}</p>
        <br/>
        <p>{t('info.rules')}:</p>
        <ol>
          <li>{t('info.rule_1')}</li>
          <li>{t('info.rule_2')}</li>
          <li>{t('info.rule_3')}</li>
          <li>{t('info.rule_4')}</li>
        </ol>
        <br/>
        <p>{t('info.resources')}:</p>
        <ul>
          <li><a href={t('info.wikipedia_link')} target="_blank" rel="noreferrer">Wikipedia</a></li>
          <li><a href="https://bitstorm.org/gameoflife/lexicon/" target="_blank" rel="noreferrer">Lexicon</a></li>
          <li><a href={t('info.youtube_link')} target="_blank" rel="noreferrer">Youtube</a></li>
        </ul>
      </Modal>
    );
  }
}

export default withTranslation()(InfoModal);
