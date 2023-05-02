package com.app;

// added manually
import com.reactnativecommunity.art.ARTPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.app.MySendSmsPackage;
// import com.github.reactnativecommunity.location.RNLocationPackage;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());

          packages.add( 
            new ARTPackage()
            // new ReactNativeContacts()
            );
          
          packages.add(new MySendSmsPackage());

          return packages;
        }



        // added manually
        // @Override
        // protected List<ReactPackage> getPackages() {
        //   @SuppressWarnings("UnnecessaryLocalVariable")
        //   List<ReactPackage> packages = new PackageList(this).getPackages();
          
          // packages.add(new ARTPackage());

        //   return packages;
        // }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

   // added manually
    //  @Override
    //   protected List<ReactPackage> getPackages() {
    //     @SuppressWarnings("UnnecessaryLocalVariable")
    //     List<ReactPackage> packages = new PackageList(this).getPackages();

    //     packages.add(new ARTPackage());

    //     return packages;
    //   }

      //addede additional package
      // @Override
      // protected List<ReactPackage> getPackages() {
      //     return Arrays.asList(
      //             new MainReactPackage(),
      //             new RNLocationPackage()
      //     );
      // }
    
 

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
