module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset",
    [
      "@vue/babel-preset-jsx",
      {
        "injectH": false
      }
    ]
  ],
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}