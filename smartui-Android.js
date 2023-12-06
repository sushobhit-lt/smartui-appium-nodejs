const wd = require("wd");

/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME || "username";

/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY || "accesskey";

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
  // app: 'lt://proverbial-android',    //Enter the app_url here
  build: "NodeJS - Android-1",
  name: "Sample Test NodeJS",
  deviceName: "Galaxy S20",
  isRealMobile: true,
  platformName: "android",
  platformVersion: "11",
  video: true,
  visual: true,
  "smartUI.project": "smartui-appium-nodejs"     // Enter the smartui projectName here
  // "smartUI.build": ""    //Enter the build name here
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);

/**
 * Run an android test.
 */
async function runAndroidSmartUITest() {
  try {
    driver
      .init(desiredCapabilities)
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
runAndroidSmartUITest();

 
 
 