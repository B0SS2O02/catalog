module.exports.rout_back = (route,count=1) => {
    const elements = route.slice(1).split('/')
    let result = ''
    for (let i = 0; i < elements.length - count; i++) {
        const element = elements[i];
        result += '/' + element
    }
    return result
}

module.exports.toJSON = (value) => {
    return JSON.parse(JSON.stringify(value))
}