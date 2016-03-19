import Ember from 'ember';

export default Ember.Route.extend({
  firebase: Ember.inject.service(),
  i18n: Ember.inject.service(),
  sessionManager: Ember.inject.service(),
  currentUser: Ember.computed.alias('session.currentUser'),
  title: "Home",
  
  beforeModel: function(transition) {
    if(!this.get("session.isAuthenticated")) {
      this.set('sessionManager.previousTransition', transition);
      this.transitionTo('home.index');
    } 
  },  
  actions: {
   willTransition() {
    window.scrollTo(0,0);
    return true;
    }   
  }  
});