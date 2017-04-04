import { primaryColor } from './../constants';

export default formButtonStyles = {
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabledButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#99d9f4',
    borderColor: '#99d9f4',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
};
