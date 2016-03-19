import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  countryCode: DS.attr('string'),
  countryName: DS.attr('string'),
  currencyCode: DS.attr('string'),
  population: DS.attr('string'),
  fipsCode: DS.attr('string'),
  isoNumeric: DS.attr('string'),
  north: DS.attr('string'),
  south: DS.attr('string'),
  east: DS.attr('string'),
  west: DS.attr('string'),
  latitude: DS.attr('string'),
  longitude: DS.attr('string'),
  capital: DS.attr('string'),
  continentName: DS.attr('string'),
  continent: DS.attr('string'),
  areaInSqKm: DS.attr('string'),
  languages: DS.attr('string'),
  supported: DS.attr('boolean'),
  isoAlpha3: DS.attr('string'),
  geonameID: DS.attr('string'),
  flagUrl: Ember.computed('countryCode', function() {
    return '/assets/flags/' + this.get('countryCode') + '.png';
  }),
  name: Ember.computed.alias('countryName')

});


