(function() {
  var existing = window.NEURON_CONFIG || {};
  var existingMonetization = existing.monetization || {};
  var existingAdMob = existingMonetization.admob || {};
  var existingInterstitialIds = existingAdMob.interstitialAdUnitId || {};
  var existingRevenueCat = existingMonetization.revenueCat || {};
  var existingRevenueCatKeys = existingRevenueCat.apiKey || {};
  var existingStorageKeys = existingMonetization.localStorageKeys || {};

  window.NEURON_CONFIG = Object.assign({}, existing, {
    feedbackSupabaseUrl: existing.feedbackSupabaseUrl || 'https://amyxocqdfcaeieerqllv.supabase.co',
    feedbackSupabaseAnonKey: existing.feedbackSupabaseAnonKey || 'sb_publishable_uvng-9IdwolvuiCG9pQTIQ_1gyaKOVH',
    monetization: Object.assign({}, existingMonetization, {
      removeAdsProductId: existingMonetization.removeAdsProductId || 'remove_ads_299',
      removeAdsEntitlementId: existingMonetization.removeAdsEntitlementId || 'remove_ads',
      interstitialRoundsMin: typeof existingMonetization.interstitialRoundsMin === 'number' ? existingMonetization.interstitialRoundsMin : 2,
      interstitialRoundsMax: typeof existingMonetization.interstitialRoundsMax === 'number' ? existingMonetization.interstitialRoundsMax : 3,
      localStorageKeys: Object.assign({
        adsRemoved: 'neuron_ads_removed',
        roundsUntilInterstitial: 'neuron_rounds_until_interstitial'
      }, existingStorageKeys),
      admob: Object.assign({
        // Keep this true while testing. Set to false and add your real ad unit IDs before release.
        useTestAds: typeof existingAdMob.useTestAds === 'boolean' ? existingAdMob.useTestAds : true,
        interstitialAdUnitId: Object.assign({
          android: '',
          ios: 'ca-app-pub-0897605867387651/8767324684'
        }, existingInterstitialIds)
      }, existingAdMob),
      revenueCat: Object.assign({
        apiKey: Object.assign({
          android: 'YOUR_REVENUECAT_GOOGLE_API_KEY',
          ios: 'YOUR_REVENUECAT_APPLE_API_KEY'
        }, existingRevenueCatKeys)
      }, existingRevenueCat)
    })
  });
})();
