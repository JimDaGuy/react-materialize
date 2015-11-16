import React from 'react';
import ReactDOM from 'react-dom';
import constants from './constants';
import cx from 'classnames';
import uuid from 'node-uuid';

class Input extends React.Component {
  componentDidMount() {
    if (this.props.type === 'select' && !this.props.browserDefault && typeof $ !== 'undefined') {
      $(ReactDOM.findDOMNode(this.refs.inputEl)).material_select();
    }
  }

  componentDidUpdate() {
    if (this.props.type === 'select' && !this.props.browserDefault && typeof $ !== 'undefined') {
      var $el = $(ReactDOM.findDOMNode(this.refs.inputEl));
      $el.material_select('destroy');
      $el.material_select();
    }
  }

  render() {
    let classes = {
      col: true,
      'input-field': true
    };
    let {placeholder, id, type, label, ...props} = this.props;
    constants.SIZES.forEach(size => {
      if (this.props[size]) {
        classes[size + this.props[size]] = true;
      }
    });
    if (id == null) {
      if (this.props.name == null) {
        id = uuid.v1();
      } else {
        id = this.props.name;
      }
    }
    let inputClasses = {
      validate: this.props.validate !== false
    };
    let C, inputType;
    switch (type) {
      case 'textarea':
        C = 'textarea';
        inputClasses['materialize-textarea'] = true;
        break;
      case 'select':
        C = 'select';
        inputClasses['browser-default'] = !!this.props.browserDefault;
        break;
      default:
        C = 'input';
        inputType = type || 'text';
    }
    let htmlLabel = <label htmlFor={id}>{label}</label>;
    return (
      <div className={cx(classes)}>
        {this.props.type === 'select' && this.props.browserDefault ? htmlLabel : null}
        <C ref="inputEl" {...props} type={inputType} placeholder={placeholder} id={id}
           className={cx(inputClasses)}/>
        {this.props.type !== 'select' ? htmlLabel : null}
      </div>
    );
  }
}

Input.propTypes = {
  s: React.PropTypes.number,
  m: React.PropTypes.number,
  l: React.PropTypes.number,
  label: React.PropTypes.node,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  validate: React.PropTypes.bool,
  browserDefault: React.PropTypes.bool
};

Input.defaultProps = {type: 'text'};

export default Input;
