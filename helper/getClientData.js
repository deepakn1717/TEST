const client = require('../client');

function getClinetData(data, version) {
    const updatedData = data.replace('0000', ' ').replace('000', ' ');
    const dataList = updatedData.split(' ');
    const firstName = version === 'v2' ? dataList[0] : dataList[0]+'0000';
    const lastName = version === 'v2' ? dataList[1] : dataList[1]+'000';
    const clientId = version === 'v2' ? dataList[2].slice(0, 3) + '-' + dataList[2].slice(3) : dataList[2];
    return Object.freeze({firstName, lastName, clientId});
}

module.exports = getClinetData;