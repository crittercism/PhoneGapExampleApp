PhoneGap Example App
=========================

1. Install PhoneGap Plugin:

    ```
    cordova platform add ios

    cordova platform add android

    cordova plugin add cordova-plugin-apteligent
    ```

2. Instantiate Crittercism SDK on 'deviceready' event

    ```
    Crittercism.init({ 'iosAppID' : 'YOUR_IOS_APP_ID',
                   'androidAppID' : 'YOUR_ANDROID_APP_ID'});
    ```
  
3. Build your app:

    ```
    cordova build
    ```

