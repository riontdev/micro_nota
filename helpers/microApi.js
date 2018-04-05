const request = require('request-promise');

let testApi = (req, res, next) => {

    const options = {
        method: 'GET',
        uri: 'https://jsonplaceholder.typicode.com/posts',
        json: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return request(options)
        .then((response) => {
            req = response;
            return next();
        })
        .catch((err) => { return next(err); });
};

if (process.env.NODE_ENV === 'test') {
    testApi = (req, res, next) => {
        req.user = 1;
        return next();
    };
}

module.exports = {
    testApi,
};