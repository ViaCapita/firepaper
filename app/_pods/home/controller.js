import Ember from 'ember';
import computed from 'ember-new-computed';

const inject = Ember.inject;
const alias = computed.alias;

export default Ember.Controller.extend({
  i18n:           inject.service(),
  sessionManager: inject.service(),
  application:    inject.controller(), 
  displayTitle:   alias('application.displayTitle'),
  person: alias('sessionManager.person'),
  homeRoute: 'account.details',
  actions: {
    signIn(provider) {
      this.set('signingIn', true);
      this.get('sessionManager').signIn(provider);
      Ember.run.later(this, function() {
        const previousTransition = this.get('sessionManager.previousTransition.targetName');
        if (previousTransition) {
          this.set('sessionManager.previousTransition', null);
          console.log(previousTransition);
          this.transitionToRoute(previousTransition);
        } else {
          // Default back to homepage
          this.set('signingIn', false);
          this.transitionToRoute(this.get('homeRoute'));
        }
      }, 3000);
    },
    toggleOpen(obj) {
      obj.set('open', !obj.get('open'));
    },
    toggle(param) {
      this.set(param, !this.get(param));
    },
    goTo(route) {
      this.transitionToRoute(route);
    }
  }
});



