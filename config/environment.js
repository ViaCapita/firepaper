/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    podModulePrefix: 'firepaper/_pods',
    modulePrefix: 'firepaper',
    environment: environment,
    contentSecurityPolicy: {
      'default-src': "'none'",
      'child-src': "'self'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.google.com *.gstatic.com http://api.filepicker.io/v2/filepicker.js https://*.firebaseio.com/ http://*.googleapis.com",
      'font-src': "'self' http://*.gstatic.com/ *.gstatic.com *.googleapis.com https://*.gstatic.com/ https//fonts.googleapis.com https://fonts.googleapis.com http://maxcdn.bootstrapcdn.com/",
      'connect-src': "'self' wss://*.firebaseio.com/ https://auth.firebase.com/  http://api.giphy.com/v1/gifs/random https://*.filepicker.io https://example.com/ ",
      'img-src': "blob: data: 'self' https://cloudfront.net/ https://d1zyh3sbxittvg.cloudfront.net/ http://*.basemaps.cartocdn.com/ http://*.basemaps.cartocdn.com/* https://*.filepicker.io http://s3.amazonaws.com/giphygifs/media/ http://*.giphy.com/media/ http://*.gstatic.com http://*.googleapis.com",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline' http://*.googleapis.com  https://*.googleapis.com *.google.com *.googleapis.com http://maxcdn.bootstrapcdn.com/",
      'frame-src': "https://*.filepicker.io https://*.filepicker.io https://*.firebaseio.com/"
    },   
    firebase: 'https://firepaper.firebaseio.com/',
    torii: {
      sessionServiceName: 'session'
    },    
    preloader: {
      loadedClass: 'disappear',
      removeDelay: 250
    },    
    moment: {
      // Options:
      // 'all' - all years, all timezones
      // '2010-2020' - 2010-2020, all timezones
      // 'none' - no data, just timezone API
      includeTimezone: 'all',
      allowEmpty: true,
      includeLocales: ['en']
    },
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    // sassOptions: {
    //   includePaths: ['bower_components/material-design-lite/src']
    // },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.i18n = {
    defaultLocale: 'en'
  };


  return ENV;
};
