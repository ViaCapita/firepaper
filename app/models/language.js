import DS from 'ember-data';
import computed from 'ember-new-computed';

export default DS.Model.extend({
  name: DS.attr('string'), 
  nativeName: DS.attr('string'),
  // countries: DS.hasMany('country', {async: true}),
  // defaultLocales: DS.hasMany('country', {async: true}),
  system: DS.attr('boolean'),
  displayName: computed('name', function() {
    return this.get('name').split(/[ ,;]+/)[0];
  })
});