const wd = require("wd");

/**
 * Username to be used for running the test.
 */
const username = process.env.LT_USERNAME || "YOUR_LT_USERNAME";

/**
 * The access key to be used for running test test.
 */
const accessKey = process.env.LT_ACCESS_KEY || "YOUR_LT_ACCESS_KEY";

/**
 * Capabilities to be passed while running the test.
 */
const desiredCapabilities = {
  name: "Sample Test NodeJS-Web",
  build: "NodeJS - Android - Web",
  deviceName: "Galaxy S20",
  platformName: "Android",
  platformVersion: "11",
  isRealMobile: true,
  video: true,
  visual: true,
  "smartUI.project": "Real-Device-Project-Android-Web"   // Enter your smartUI Project name
  // "smartUI.build": ""    // Enter your smartUI build name
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);

/**
 * Run an Android Web test.
 */

async function runSmartUIAndroidWebTest() {
  try {
    await driver.init(desiredCapabilities);
    await driver.get("https://www.lambdatest.com");
    await driver.execute(`smartui.takeScreenshot=<Name of your Screenshot>`);
    console.log("Screenshot Captured");
    // Quit driver after successful execution
    driver.execute("lambda-status=passed");
    await driver.quit();
    console.log("Driver quit successfully.");
  } catch (e) {
    console.error(e);
    // Quit driver in case of error
    driver.execute("lambda-status=failed");
    await driver.quit();
    console.log("Driver quit after error.");
  }
}
runSmartUIAndroidWebTest();

