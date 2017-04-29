export const baseUrl = 'https://tripsplit.herokuapp.com/api/v1';
// export const baseUrl = 'http://0.0.0.0:3000/api/v1';
export const primaryColor = '#3F98BD';
export const secondaryColor = blendColors(primaryColor, '#FFFFFF', 0.2);
export const dangerColor = '#D0182F';
export const grayColor = '#8d8d8d';
export const borderColor = '#cdcdcd';

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}
