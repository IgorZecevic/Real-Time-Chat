import { Field } from 'formik';
import { TextField as FormikTextField } from 'formik-mui';
import PropTypes from 'prop-types';

const FormikField = ({ name, label, type = 'text', ...otherProps }) => (
  <Field
    component={FormikTextField}
    name={name}
    label={label}
    fullWidth
    type={type}
    {...otherProps}
  />
);

FormikField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};
export default FormikField;
