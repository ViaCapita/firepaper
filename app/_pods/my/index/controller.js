import Ember from 'ember';
import computed from 'ember-new-computed';

const inject = Ember.inject;
const alias  = computed.alias;

export default Ember.Controller.extend({
  sessionManager: inject.service(),
  person: alias('sessionManager.person')
  
});
