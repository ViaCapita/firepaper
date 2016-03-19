import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  url:      DS.attr('string'),
  filename: DS.attr('string'),
  size:     DS.attr('number'),
  width:    DS.attr('number'),
  height:   DS.attr('number'),
  ready:    DS.attr('boolean', {defaultValue: false}),
  person:     DS.belongsTo('person', {
    inverse: 'profileImage'
  }),
  // cvrProfiles:  DS.hasMany('cvr-profile', {
  //   inverse: 'profileImage'
  // }),

  imageReceived: function (file) {
    this.set('url', file.url);
    this.set('filename', file.filename);
    this.set('size', Math.round((file.size / 1024 + 0.00001) * 100) / 100);
  },

  sizeReceived: function (metadata) {
    this.set('width', metadata.width);
    this.set('height', metadata.height);
  },

  profileUrl: function(){
    var u = this.get('url');

    if(u) {
      return u + "/convert?width=140&height=140&fit=crop";
    } else {
      return false;
    }
  }.property('url'),

  thumbUrl: function(){
    var u = this.get('url');

    if(u) {
      return u + "/convert?width=50&height=50&fit=crop";
    } else {
      return false;
    }
  }.property('url'),

// computed properties to get converted images
  thumbImageUrl: (function () {
    // tack on conversion properties for small image
    var params = {};
    params = this.addWidth(params, 50);
    params = this.addHeight(params, 50);
    return this.buildUrl(this.get('url'), params);
  }).property('url'),

  mediumImageUrl: (function () {
    // tack on conversion properties for cacheable
    // medium image watermarked with Filepicker's logo
    var params = {};
    params = this.addHeight(params, 140);
    params = this.addWatermark(params);
    return this.buildUrl(this.get('imageUrl'), params);
  }).property('imageUrl'),

  // the width to use for a mediumImage
  // so it holds its place before the image itself is loaded
  mediumWidth: (function () {
    return Math.round(this.get('width') * 140 / this.get('height'));
  }).property('width'),

  buildUrl: function (originalUrl, params) {
    params.rotate = 'exif';
    params.cache = true;
    return originalUrl + '/convert?' + Ember.$.param(params);
  },

  addWidth: function (params, width) {
    params.w = width;
    return params;
  },

  addHeight: function (params, height) {
    params.h = height;
    return params;
  },

  addWatermark: function (params, watermarkUrl) {
    params.watermark = watermarkUrl ||  'https://www.filepicker.io/api/file/9IphiAATxeAnAbHJDhe3';
    params.waterposition = 'bottom,right';
    return params;
  }

});


  
// });




