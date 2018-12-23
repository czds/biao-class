module.exports = {
    entry: {
        home: './main.js',
        signup: './main.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    }
};