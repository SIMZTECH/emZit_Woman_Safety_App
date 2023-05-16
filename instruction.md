#How to create an apk file
- cd android
-  ./gradlew bundleRelease

#now generate apk from .aab
- npx react-native run-android --mode=release