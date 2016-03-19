import Ember from 'ember';
import DS from 'ember-data';
import computed from 'ember-new-computed';

const get = Ember.get;
const inject = Ember.inject;

export default DS.Model.extend({

  systemUser: DS.attr('boolean'),
  //anonymous:  DS.attr('boolean'),
  uid:            DS.attr('string'),
  provider:       DS.attr('string'),
  username:       DS.attr('string'),
  website:        DS.attr('string'),
  online:         DS.attr('boolean'),
  dob:            DS.attr('date'),
  nameStartsWith: DS.attr('string'),
  firstName:      DS.attr('string'),
  lastName:       DS.attr('string'),
  primaryEmail:   DS.attr('string'),
  phone:          DS.attr('string'),
  secondaryEmail: DS.attr('string'),
  email:          computed.alias('primaryEmail'),  

  gender: DS.attr('string'),
  biograpy: DS.attr('string'),
  location: DS.attr('string'),

  profileImage:      DS.belongsTo('image', {async: true}),
  // contacts:          DS.hasMany('contact', {async: true, inverse: 'contactee'}),

  initial: computed('firstName', function() {
    return this.get('firstName') ? this.get('firstName').toUpperCase().substring(0,1) : '';
  }),
  avatar:   DS.attr('string', {defaultValue: 'avatar1'}),
  avatarUrl: computed('avatar', function() {
    return '/assets/icons/' + this.get('avatar') + '.png';
  }),

  fullNameLocation: computed('firstName', 'lastName', 'location', function() {
    let location = this.get('location') ? this.get('location') : 'Unknown';
    return this.get('firstName') + ' ' + this.get('lastName') + ' (' + location + ')';
  }),

  fullName: computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),

  // defaultLocale: function() {
  //   this.store.peekRecord('country', defaultLocaleId);
  // },

  setNameStartsWith: function() {
    const nsw = this.get('firstName') + '   ';
    this.set('nameStartsWith', nsw.toUpperCase().substring(0, 4));
  },


  setFromSession(session) {
    const self = this;
    const profile = get(session, 'currentUser.cachedUserProfile');
    this.set('uid', get(session, 'uid'));
    this.set('provider', get(session, 'provider'));
    this.set('locale', 'en');
    
    // Very Important
    this.set('firstName', get(profile, 'given_name'));
    this.set('lastName', get(profile, 'family_name'));

    this.set('gender', get(profile, 'gender'));
    // ~Important but Network Specific
    this.set('googleAvatar', get(profile, 'picture'));
  }
});





