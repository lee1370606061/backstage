module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "space-before-function-paren": 0,
        "generator-star-spacing": "off",
        "no-mixed-operators": 0,
        "prettier/prettier": [0],
        "no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "none",
                ignoreRestSiblings: false
            }
        ],
        "vue/script-indent": ["error", 2, {
            "baseIndent": 0,
            "switchCase": 0,
            "ignores": []
        }],
        "vue/html-indent": ["error", 2, {
            "baseIndent": 1,
            "switchCase": 0,
            "ignores": []
        }],
    }
};