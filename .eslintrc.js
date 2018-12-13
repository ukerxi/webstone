module.exports = {
    "root": true,
    "extends": "google",
    "env": {
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "parser": "babel-eslint",
    "rules": {
        // enable additional rules
        "indent": "off",
        "linebreak-style": ["off", "unix"],
        "quotes": ["error", "single"],
        "require-jsdoc": "off",
        "max-len": "off",
        // disable rules from base configurations
        "no-console": "off",
        "camelcase": "off",
        "space-before-function-paren": "off",
        "valid-jsdoc": "off",
        "new-cap": "off",
        "comma-dangle": "off",
        "prefer-rest-params": "off",
        "semi": "off"
    }
};
