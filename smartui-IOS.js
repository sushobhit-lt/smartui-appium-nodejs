var wd = require("wd");
var assert = require("assert");
var asserter = wd.asserters;

username =
  process.env.LT_USERNAME == undefined
    ? "username" //Enter the username here
    : process.env.LT_USERNAME;
accesskey =
  process.env.LT_ACCESS_KEY == undefined
    ? "accesskey" //Enter the access_key here
    : process.env.LT_ACCESS_KEY;

desired_capabilities = {
// app: "lt://proverbial-android", //Enter the app_url here
  deviceName: "iPhone 12",
  platformVersion: "14",
  platformName: "iOS",
  isRealMobile: true,
  visual: true,
  video: true,
  build: "NodeJS Vanilla - iOS",
  name: "Sample Test - NodeJS",
  "smartUI.project": "smartui-appium-nodejs"     // Enter the smartui projectName here
  // "smartUI.build": ""    //Enter the build name here
};

driver = wd.promiseRemote(
  `https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`
);

async function SmartUIiOStest() {
  try {
    driver
      .init(desired_capabilities)
      .then(function () {
        driver.get("https://www.lambdatest.com");
        driver.execute(`smartui.takeScreenshot=lambdatest1`);
        console.log("screenshot captured");
      })
      .catch((error) => console.error(error));     
  } catch (e) {
    console.log(e);
    driver.quit();
  }
}
SmartUIiOStest();

  