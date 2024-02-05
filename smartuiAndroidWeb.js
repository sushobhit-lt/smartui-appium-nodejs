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
  deviceName: ".*",
  platformName: "Android",
  isRealMobile: true,
  video: true,
  visual: false,
  "smartUI.project": "real-device-full-page-stage-testing",
  "smartUI.build": "dev-android"    
};
let url = `https://${username}:${accessKey}@mobile-hub-sushobhit-real-dev.lambdatestinternal.com/wd/hub`
// url = `https://${username}:${accessKey}@stage-mobile-hub.lambdatestinternal.com/wd/hub`
const driver = wd.promiseRemote(url);

/**
 * Run an Android Web test.
 */

async function runSmartUIAndroidWebTest() {
  try {
    console.log(" url : ", url);

    await driver.init(desiredCapabilities);
    await driver.get("https://alvarotrigo.com/fullPage/docs/");

    let config = {
      fullPage: true,
      screenshotName:"fullPage-docs"
    }
    let output = await driver.execute(`smartui.takeScreenshot`, config);
    console.log(" output : ", output);
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

