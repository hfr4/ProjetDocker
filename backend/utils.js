const base64UrlStringToBuffer = (str) => {
    return Buffer.from(str.split(',')[1], 'base64')
}

module.exports = {
    base64UrlStringToBuffer
}
