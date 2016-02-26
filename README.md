PhoneGap Example App
=========================

1. Install PhoneGap Plugin:

    ```
    cordova platform add ios

    cordova platform add android

    cordova -d plugin add https://github.com/crittercism/PhoneGap.git
    ```

2. Instantiate Crittercism SDK on 'deviceready' event

    ```
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
       Crittercism.init({ 'iosAppID' : 'YOUR_IOS_APP_ID',
                      'androidAppID' : 'YOUR_ANDROID_APP_ID'});
    }
    ```
  
3. Build your app:

    ```
    cordova build
    ```

