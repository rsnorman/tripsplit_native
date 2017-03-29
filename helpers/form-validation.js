// @flow

function isCurrency(value) {
  if (isNaN(value)) return false;
  if (value.indexOf('.') === -1) {
    return true;
  } else {
    return value.split('.')[1].length === 2;
  }
}

export function isInvalidForm(state, fields): boolean {
  let _i, _len, _field, _fieldValue, _fieldType;

  for (_i = 0, _len = fields.length; _i < _len; _i++) {
    _field = fields[_i];
    if (typeof _field === 'string') {
      _fieldValue = state[_field];
      _fieldType = 'string';
    } else {
      _fieldValue = state[Object.keys(_field)[0]];
      _fieldType = Object.values(_field)[0];
    }

    if (!_fieldValue || _fieldValue === '') {
      return true;
    }

    switch (_fieldType) {
      case 'numeric':
        if (isNaN(_fieldValue * 1)) {
          return true;
        }
      case 'currency':
        if (!isCurrency(_fieldValue)) {
          return true;
        }
      default:
        break;
    }
  }

  return false;
}
