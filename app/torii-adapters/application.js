import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

const inject = Ember.inject;

export default ToriiFirebaseAdapter.extend({
  firebase: inject.service()
});
