import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Icon from '../icon';
import cn from 'classnames';


const renderField = ({input, type, label, handleChange}) =>
  <FormControl
    {...input}
    type={type}
    autoComplete='off'
    onChange={e => {input.onChange(e); handleChange(e.target.value);}}
    placeholder="HAKU" />;


class SearchForm extends Component {
  render() {
    const {handleSubmit, pristine, submitting, enableButton, onChange} = this.props;

    return (
      <form className="global-search-form" onSubmit={handleSubmit}>
        <InputGroup className="global-search" bsSize="sm">
          <InputGroup.Addon>
            <Icon name="search" />
          </InputGroup.Addon>
          <Field name="search" component={renderField} handleChange={onChange} type='text' />
        </InputGroup>
      </form>
    );
  }
}

SearchForm = reduxForm({form: 'globalSearch'})(SearchForm);

export default SearchForm;


