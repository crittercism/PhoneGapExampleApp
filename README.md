PhoneGap Example App
=========================

To build and run:

```
cd sampleApp/

cordova platform update ios

cordova platform update android

cordova -d plugin add https://github.com/crittercism/PhoneGap.git \
  --variable IOS_APP_ID="Your Application ID" \
  --variable ANDROID_APP_ID="Your Application ID"

cordova build
```

