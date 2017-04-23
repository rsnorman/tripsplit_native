import { primaryColor, secondaryColor } from './../constants';

export default formStyles = {
  formHeader: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 25,
    flexDirection: 'row'
  },
  formHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  modalButton: {
    color: primaryColor,
    padding: 10,
    fontSize: 16
  },
  submitModalButton: {
    fontWeight: 'bold'
  },
  disabledModalButton: {
    color: secondaryColor,
    opacity: 0.7
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 30,
    marginTop: 60
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 15
  },
  input: {
    height: 36,
    padding: 4,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 8,
    color: primaryColor
  },
  multiLineInput: {
    height: 108,
    padding: 4,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 8,
    color: primaryColor
  }
};
