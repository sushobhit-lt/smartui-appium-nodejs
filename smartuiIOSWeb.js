const wd = require("wd");
var assert = require("assert");
var asserter = wd.asserters;

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
  deviceName: "iPhone 12",
  platformVersion: "14",
  platformName: "iOS",
  build: "NodeJS Vanilla - iOSWeb",
  name: "Sample Test - NodeJS",
  isRealMobile: true,
  video: true,
  visual: true,
  "smartUI.project": "Real-Device-Project-IOS-Web"     // Enter your smartUI Project name
  // "smartUI.build": ""    // Enter your smartUI build name
};

const driver = wd.promiseRemote(
  `https://${username}:${accessKey}@mobile-hub.lambdatest.com/wd/hub`
);

/**
 * Run an IOS Web test.
 */
 
async function runSmartUIIOSWebTest() {
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
 runSmartUIIOSWebTest();
 
 