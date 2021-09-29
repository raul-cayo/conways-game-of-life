import React from 'react';
import NumberInput from './NumberInput';
import ColorPicker from './ColorPicker';
import ShapeSwitch from './ShapeSwitch';
import {withTranslation} from 'react-i18next';
import './ConfigController.css';

class ConfigController extends React.Component {
  render() {
    const { t } = this.props;
    const directionClass = this.props.flexDirection + '-direction';
    return (
      <div className={'config-controller ' + directionClass}>
        <div className="control">
          <NumberInput label={t('controls.rhythm')}
            units="MS" min={100} max={3000} step={50}
            value={this.props.rhythm}
            onChange={this.props.rhythmHandler}/> 
        </div>
        <div className="control">
          <NumberInput label={t('controls.cell_size')}
            units="PX" min={16} max={50} step={5}
            value={this.props.cellSize}
            onChange={this.props.cellSizeHandler}/>
        </div>
        <div className="control">
          <label>{t("controls.colors")}</label>
          <div className="colors">
            <ColorPicker 
              color="#404040"
              cssVar="--cell-off"
              title={t('controls.tooltips.off_color_picker')}/>
            <ColorPicker 
              color="#40BB6C"
              cssVar="--cell-on"
              title={t('controls.tooltips.on_color_picker')}/>
          </div>
        </div>
        <div className="control">
          <label>{t('controls.shape')}</label>
          <ShapeSwitch/>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ConfigController);
