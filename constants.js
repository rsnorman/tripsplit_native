import blendColors from './helpers/color-blender';

const isRelease = true
export const baseUrl = isRelease ? 'https://www.tripsplit.io/api/v1' : 'http://0.0.0.0:3000/api/v1';
export const primaryColor = '#3F98BD';
export const secondaryColor = blendColors(primaryColor, '#FFFFFF', 0.3);
export const dangerColor = '#D0182F';
export const negativeColor = '#D0182F';
export const grayColor = '#8d8d8d';
export const lightGrayColor = '#cdcdcd';
export const borderColor = '#cdcdcd';
export const backgroundColor = '#E9E9EF';
