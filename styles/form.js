import { primaryColor } from './../constants';

export default formStyles = {
  formHeader: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: 40
  },
  formHeaderText: {
    textAlign: 'center',
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: 22
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
