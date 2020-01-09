const path = require('path')

module.exports = {
    "entry": "./src/index.js",
    "output": {
        "filename": "main.js",
        "path": path.resolve(__dirname, "dist"),
        "publicPath": "/dist/"
    },
    "module": {
        "rules": [
            {
                "test": /\.js$/i,
                "exclude": /(node_modules|bower_components)/,
                "use": {
                    "loader": "babel-loader"
                }
            },
            {
                "test": /\.css$/i,
                "use": ["style-loader", "css-loader"]
            },
            {
                "test": /\.(png|jpg|gif|svg|eot|ttf|woff)/,
                "use": "file-loader"
            }
        ]
    },
    "mode": "development",
    "devServer": {
        "hot": true,
        "port": 3000,
        "contentBase": "./public"
    }

}