(function() {
  function initNativeShell() {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform || !window.Capacitor.isNativePlatform()) {
      return;
    }

    var plugins = window.Capacitor.Plugins || {};
    var statusBar = plugins.StatusBar;
    if (statusBar) {
      statusBar.hide().catch(function() {});
      statusBar.setBackgroundColor({ color: '#000000' }).catch(function() {});
    }

    var adsRemoved = localStorage.getItem('neuron_ads_removed') === '1';
    var adMob = plugins.AdMob;
    if (adMob && !adsRemoved) {
      adMob.initialize({ initializeForTesting: true });
    }

    var purchases = plugins.RevenueCatPurchases;
    if (!purchases) {
      return;
    }

    var rcKey = /android/i.test(navigator.userAgent)
      ? 'YOUR_REVENUECAT_GOOGLE_API_KEY'
      : 'YOUR_REVENUECAT_APPLE_API_KEY';

    purchases.configure({ apiKey: rcKey });
    purchases.getCustomerInfo().then(function(info) {
      if (info.customerInfo.entitlements.active.remove_ads) {
        localStorage.setItem('neuron_ads_removed', '1');
      }
    }).catch(function() {});
  }

  document.addEventListener('DOMContentLoaded', initNativeShell);
})();