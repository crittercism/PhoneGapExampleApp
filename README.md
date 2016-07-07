PhoneGap Example App
=========================

1. Install PhoneGap Plugin. From your command line, type:

    ```
    cordova platform add ios

    cordova platform add android

    cordova plugin add cordova-plugin-apteligent
    
    cordova plugin add ./native-crash-plugin
    ```

2. Instantiate Crittercism SDK on 'deviceready' event in your javascript file

    ```
    Crittercism.init({ 'iosAppID' : 'YOUR_IOS_APP_ID',
                   'androidAppID' : 'YOUR_ANDROID_APP_ID'});
    ```
  
3. Build your app from the command line:

    ```
    cordova build
    ```

