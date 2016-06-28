package com.example.plugin;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by jcooper on 6/27/16.
 */
public class CrashAndroid extends CordovaPlugin {

    public static final String TAG = "Example";
    public static final String ACTION_EXAMPLE = "action";

    /**
     * Constructor.
     */
    public CrashAndroid() {
    }

    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Log.v(TAG, "Init TouchID");
    }

    public boolean execute(final String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.v(TAG, "ACTION received:" + action);

        // throw exception to crash the app
        Runnable r = new Runnable() {
            @Override
            public void run() {
                int fail[] = new int[2];

                fail[2] = 3;
            }
        };

        Thread thread = new Thread(r);
        thread.start();

        return true;
    }


}
