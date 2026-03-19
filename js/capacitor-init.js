(function() {
  var TEST_INTERSTITIAL_IDS = {
    android: 'ca-app-pub-3940256099942544/1033173712',
    ios: 'ca-app-pub-3940256099942544/4411468910'
  };
  var INTERSTITIAL_DISMISSED_EVENT = 'interstitialAdDismissed';
  var INTERSTITIAL_FAILED_TO_SHOW_EVENT = 'interstitialAdFailedToShow';

  function createCustomEvent(name, detail) {
    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(name, { detail: detail });
    }
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, detail);
    return evt;
  }

  function getMonetizationConfig() {
    var root = window.NEURON_CONFIG || {};
    return root.monetization || {};
  }

  function getStorageKeys() {
    var cfg = getMonetizationConfig().localStorageKeys || {};
    return {
      adsRemoved: cfg.adsRemoved || 'neuron_ads_removed',
      roundsUntilInterstitial: cfg.roundsUntilInterstitial || 'neuron_rounds_until_interstitial'
    };
  }

  function getPlugins() {
    return (window.Capacitor && window.Capacitor.Plugins) || {};
  }

  function getPlatform() {
    if (window.Capacitor && typeof window.Capacitor.getPlatform === 'function') {
      return window.Capacitor.getPlatform();
    }
    return /android/i.test(navigator.userAgent) ? 'android' : 'ios';
  }

  function getStatusBarPlugin() {
    return getPlugins().StatusBar || null;
  }

  function getAdMobPlugin() {
    return getPlugins().AdMob || null;
  }

  function getPurchasesPlugin() {
    var plugins = getPlugins();
    return plugins.Purchases || plugins.RevenueCatPurchases || null;
  }

  function isNativeApp() {
    return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  }

  function isPlaceholder(value) {
    return !value || /^YOUR_/i.test(value) || /REPLACE/i.test(value);
  }

  function readBoolStorage(key) {
    return localStorage.getItem(key) === '1';
  }

  function writeBoolStorage(key, value) {
    localStorage.setItem(key, value ? '1' : '0');
  }

  function clampInterval(value, fallback) {
    return typeof value === 'number' && value >= 1 ? Math.floor(value) : fallback;
  }

  function getAdIntervalRange() {
    var cfg = getMonetizationConfig();
    var min = clampInterval(cfg.interstitialRoundsMin, 2);
    var max = clampInterval(cfg.interstitialRoundsMax, 3);
    if (max < min) {
      max = min;
    }
    return { min: min, max: max };
  }

  function pickNextInterstitialRounds() {
    var range = getAdIntervalRange();
    return range.min + Math.floor(Math.random() * (range.max - range.min + 1));
  }

  function readRoundsUntilInterstitial() {
    var key = getStorageKeys().roundsUntilInterstitial;
    var parsed = parseInt(localStorage.getItem(key) || '', 10);
    if (!isNaN(parsed) && parsed >= 1) {
      return parsed;
    }
    return 0;
  }

  function persistRoundsUntilInterstitial(value) {
    localStorage.setItem(getStorageKeys().roundsUntilInterstitial, String(value));
  }

  function getRevenueCatApiKey() {
    var monetization = getMonetizationConfig();
    var revenueCat = monetization.revenueCat || {};
    var apiKey = revenueCat.apiKey || {};
    var platform = getPlatform();
    var key = apiKey[platform] || '';
    return isPlaceholder(key) ? '' : key;
  }

  function shouldUseTestAds() {
    var monetization = getMonetizationConfig();
    return !((monetization.admob || {}).useTestAds === false);
  }

  function getInterstitialAdUnitId() {
    var monetization = getMonetizationConfig();
    var adMob = monetization.admob || {};
    var platform = getPlatform();
    var configuredId = ((adMob.interstitialAdUnitId || {})[platform]) || '';

    if (shouldUseTestAds()) {
      return TEST_INTERSTITIAL_IDS[platform];
    }

    return isPlaceholder(configuredId) ? '' : configuredId;
  }

  function removeListenerHandles(handles) {
    if (!handles || !handles.length) {
      return;
    }
    for (var i = 0; i < handles.length; i++) {
      if (handles[i] && typeof handles[i].remove === 'function') {
        handles[i].remove().catch(function() {});
      }
    }
  }

  function dispatchAdsRemovedChanged() {
    window.dispatchEvent(createCustomEvent('neuron:ads-removed-changed', {
      adsRemoved: monetizationState.adsRemoved
    }));
  }

  function applyAdsRemovedState(isRemoved) {
    var nextValue = !!isRemoved;
    if (monetizationState.adsRemoved === nextValue) {
      writeBoolStorage(getStorageKeys().adsRemoved, nextValue);
      return nextValue;
    }

    monetizationState.adsRemoved = nextValue;
    writeBoolStorage(getStorageKeys().adsRemoved, nextValue);

    if (nextValue) {
      monetizationState.interstitialReady = false;
      monetizationState.interstitialLoading = false;
      scheduleNextInterstitial();
    }

    dispatchAdsRemovedChanged();
    return nextValue;
  }

  function getEntitlementId() {
    return getMonetizationConfig().removeAdsEntitlementId || 'remove_ads';
  }

  function getRemoveAdsProductId() {
    return getMonetizationConfig().removeAdsProductId || 'remove_ads_299';
  }

  function extractCustomerInfo(payload) {
    if (payload && payload.customerInfo) {
      return payload.customerInfo;
    }
    return payload || null;
  }

  function hasActiveRemoveAdsEntitlement(payload) {
    var customerInfo = extractCustomerInfo(payload);
    if (!customerInfo || !customerInfo.entitlements || !customerInfo.entitlements.active) {
      return false;
    }
    return !!customerInfo.entitlements.active[getEntitlementId()];
  }

  function applyCustomerInfo(payload) {
    return applyAdsRemovedState(hasActiveRemoveAdsEntitlement(payload));
  }

  function scheduleNextInterstitial() {
    monetizationState.roundsUntilInterstitial = pickNextInterstitialRounds();
    persistRoundsUntilInterstitial(monetizationState.roundsUntilInterstitial);
    return monetizationState.roundsUntilInterstitial;
  }

  function canUseAdMob() {
    return isNativeApp() && !monetizationState.adsRemoved && !!getAdMobPlugin() && !!getInterstitialAdUnitId();
  }

  function canUsePurchases() {
    return isNativeApp() && !!getPurchasesPlugin() && !!getRevenueCatApiKey();
  }

  function initializeAdMob() {
    var adMob = getAdMobPlugin();

    if (!canUseAdMob() || !adMob) {
      return Promise.resolve(false);
    }
    if (monetizationState.adMobInitialized) {
      return Promise.resolve(true);
    }

    return adMob.initialize({
      initializeForTesting: shouldUseTestAds()
    }).then(function() {
      monetizationState.adMobInitialized = true;
      return prepareInterstitial();
    }).then(function() {
      return true;
    }).catch(function(err) {
      monetizationState.adMobInitialized = false;
      console.warn('AdMob initialization failed:', err);
      return false;
    });
  }

  function prepareInterstitial() {
    var adMob = getAdMobPlugin();

    if (!canUseAdMob() || !adMob) {
      return Promise.resolve(false);
    }
    if (monetizationState.interstitialReady || monetizationState.interstitialLoading) {
      return Promise.resolve(monetizationState.interstitialReady);
    }

    monetizationState.interstitialLoading = true;
    monetizationState.interstitialReady = false;

    return adMob.prepareInterstitial({
      adId: getInterstitialAdUnitId(),
      isTesting: shouldUseTestAds(),
      npa: true
    }).then(function() {
      monetizationState.interstitialLoading = false;
      monetizationState.interstitialReady = true;
      return true;
    }).catch(function(err) {
      monetizationState.interstitialLoading = false;
      monetizationState.interstitialReady = false;
      console.warn('Interstitial preload failed:', err);
      return false;
    });
  }

  function showInterstitial() {
    var adMob = getAdMobPlugin();

    if (!canUseAdMob() || !adMob || !monetizationState.interstitialReady) {
      prepareInterstitial();
      return Promise.resolve(false);
    }

    monetizationState.interstitialReady = false;

    return new Promise(function(resolve) {
      var listenerHandles = [];
      var settled = false;
      var timeoutId = null;

      function finish(didShow) {
        if (settled) {
          return;
        }
        settled = true;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        removeListenerHandles(listenerHandles);
        prepareInterstitial();
        resolve(!!didShow);
      }

      Promise.all([
        adMob.addListener(INTERSTITIAL_DISMISSED_EVENT, function() {
          finish(true);
        }),
        adMob.addListener(INTERSTITIAL_FAILED_TO_SHOW_EVENT, function() {
          finish(false);
        })
      ]).then(function(handles) {
        listenerHandles = handles || [];
        timeoutId = setTimeout(function() {
          finish(false);
        }, 15000);
        return adMob.showInterstitial();
      }).catch(function(err) {
        console.warn('Interstitial show failed:', err);
        finish(false);
      });
    });
  }

  function syncCustomerInfo() {
    var purchases = getPurchasesPlugin();

    if (!canUsePurchases() || !purchases) {
      return Promise.resolve(monetizationState.adsRemoved);
    }

    return purchases.getCustomerInfo().then(function(info) {
      return applyCustomerInfo(info);
    }).catch(function(err) {
      console.warn('RevenueCat customer info sync failed:', err);
      return monetizationState.adsRemoved;
    });
  }

  function initializePurchases() {
    var purchases = getPurchasesPlugin();
    var apiKey = getRevenueCatApiKey();

    if (!canUsePurchases() || !purchases || !apiKey) {
      return Promise.resolve(false);
    }
    if (monetizationState.purchasesConfigured) {
      return syncCustomerInfo().then(function() {
        return true;
      });
    }

    return purchases.configure({ apiKey: apiKey }).then(function() {
      monetizationState.purchasesConfigured = true;
      if (typeof purchases.addCustomerInfoUpdateListener === 'function') {
        return purchases.addCustomerInfoUpdateListener(function(customerInfo) {
          applyCustomerInfo(customerInfo);
        }).catch(function() {});
      }
    }).then(function() {
      return syncCustomerInfo();
    }).then(function() {
      return true;
    }).catch(function(err) {
      monetizationState.purchasesConfigured = false;
      console.warn('RevenueCat configuration failed:', err);
      return false;
    });
  }

  function findRemoveAdsPackage(offerings) {
    var availablePackages = offerings && offerings.current && offerings.current.availablePackages
      ? offerings.current.availablePackages
      : [];
    var productId = getRemoveAdsProductId();
    var i;

    for (i = 0; i < availablePackages.length; i++) {
      if (availablePackages[i] && availablePackages[i].storeProduct && availablePackages[i].storeProduct.identifier === productId) {
        return availablePackages[i];
      }
    }
    for (i = 0; i < availablePackages.length; i++) {
      if (availablePackages[i] && availablePackages[i].packageType === 'LIFETIME') {
        return availablePackages[i];
      }
    }
    if (availablePackages.length === 1) {
      return availablePackages[0];
    }
    return null;
  }

  function wasPurchaseCancelled(err) {
    return !!(err && (err.userCancelled || err.code === '1' || err.code === 1));
  }

  function purchaseRemoveAds() {
    var purchases = getPurchasesPlugin();

    if (!canUsePurchases() || !purchases) {
      return Promise.reject(new Error('Purchases are not configured for this build.'));
    }

    return initializePurchases().then(function() {
      return purchases.getOfferings();
    }).then(function(offerings) {
      var pkg = findRemoveAdsPackage(offerings);
      if (!pkg) {
        throw new Error('Remove Ads package is not available in the current RevenueCat offering.');
      }
      return purchases.purchasePackage({ aPackage: pkg });
    }).then(function(result) {
      return applyCustomerInfo(result);
    });
  }

  function restorePurchases() {
    var purchases = getPurchasesPlugin();

    if (!canUsePurchases() || !purchases) {
      return Promise.reject(new Error('Purchases are not configured for this build.'));
    }

    return initializePurchases().then(function() {
      return purchases.restorePurchases();
    }).then(function(result) {
      return applyCustomerInfo(result);
    });
  }

  function handleRoundCompleted(onContinue) {
    var continueFn = typeof onContinue === 'function' ? onContinue : function() {};

    if (!isNativeApp() || monetizationState.adsRemoved) {
      continueFn();
      return Promise.resolve(false);
    }

    return initializeAdMob().then(function() {
      if (!canUseAdMob()) {
        continueFn();
        return false;
      }

      if (monetizationState.roundsUntilInterstitial > 1) {
        monetizationState.roundsUntilInterstitial -= 1;
        persistRoundsUntilInterstitial(monetizationState.roundsUntilInterstitial);
        prepareInterstitial();
        continueFn();
        return false;
      }

      scheduleNextInterstitial();
      return showInterstitial().then(function(didShow) {
        continueFn();
        return didShow;
      });
    }).catch(function(err) {
      console.warn('Round monetization flow failed:', err);
      continueFn();
      return false;
    });
  }

  function initNativeShell() {
    if (!isNativeApp()) {
      return;
    }

    var statusBar = getStatusBarPlugin();
    if (statusBar) {
      statusBar.hide().catch(function() {});
      statusBar.setBackgroundColor({ color: '#000000' }).catch(function() {});
    }

    if (!monetizationState.roundsUntilInterstitial) {
      monetizationState.roundsUntilInterstitial = readRoundsUntilInterstitial() || scheduleNextInterstitial();
    }

    initializePurchases();
    initializeAdMob();
  }

  var monetizationState = {
    adsRemoved: readBoolStorage(getStorageKeys().adsRemoved),
    roundsUntilInterstitial: readRoundsUntilInterstitial(),
    adMobInitialized: false,
    interstitialReady: false,
    interstitialLoading: false,
    purchasesConfigured: false
  };

  if (!monetizationState.roundsUntilInterstitial) {
    monetizationState.roundsUntilInterstitial = scheduleNextInterstitial();
  }

  window.NEURON_MONETIZATION = {
    isNativeApp: isNativeApp,
    hasRemovedAds: function() {
      return monetizationState.adsRemoved;
    },
    canPurchaseRemoveAds: canUsePurchases,
    handleRoundCompleted: handleRoundCompleted,
    purchaseRemoveAds: purchaseRemoveAds,
    restorePurchases: restorePurchases,
    syncCustomerInfo: syncCustomerInfo,
    wasPurchaseCancelled: wasPurchaseCancelled
  };

  document.addEventListener('DOMContentLoaded', initNativeShell);
})();
