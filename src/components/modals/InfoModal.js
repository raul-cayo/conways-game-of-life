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
          <li><a href={t('info.wikipedia_link')} target="_blank" rel="noreferrer">{t('info.wikipedia_article')}</a></li>
          <li><a href={t('info.youtube_link')} target="_blank" rel="noreferrer">{t('info.youtube_video')}</a></li>
          <li>{t('info.lexicon_desc')} <a href="https://bitstorm.org/gameoflife/lexicon/" target="_blank" rel="noreferrer">Life Lexicon</a></li>
          <li>{t('info.github_desc')} <a href="https://github.com/raul-cayo/conways-game-of-life" target="_blank" rel="noreferrer">GitHub Repo</a></li>
        </ul>
      </Modal>
    );
  }
}

export default withTranslation()(InfoModal);
