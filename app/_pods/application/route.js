import Ember from 'ember';
import computed from 'ember-new-computed';
import moment from 'moment';

const inject = Ember.inject;
const alias  = computed.alias;

export default Ember.Route.extend({
  i18n:           inject.service(),
  sessionManager: inject.service(),
  sessionUid:     alias('session.uid'), 

  createAnonymousUser: function() {
    return this.get('store').createRecord('person', {
      online: true,
      anonymous: true
    });
  },
  createNewUserFromSession: function(session) {
    const person = this.get('store').createRecord('person', {
      online: true,
      anonymous: false
    });    
    person.setFromSession(session);
    return person.save().then(function(newPerson) {
      newPerson.ref().child('online').onDisconnect().set(false);  
      return newPerson;
    });  
  },

  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },

  model: function() {
    const self = this;
    if(!this.get('sessionUid')) {
      return this.createAnonymousUser();
    } 
    else {
      return this.get('store').query('person', { orderBy: 'uid', equalTo: this.get('sessionUid') })
      .then(function(people) {
        if(!people.get('length')) {
          return self.createNewUserFromSession(self.get('session'));
        }
        else {
          people.get('firstObject').set('online', true);
          return people.get('firstObject').save().then(function(person) {
            person.ref().child('online').onDisconnect().set(false); 
            return person;            
          }); 
        }  
      });    
    }
  },

  afterModel: function(model) {
    const self = this;
    const countryId = model.get('locale') && model.get('locale.content') ? model.get('locale.content.id') : null;
    if(countryId) {
      this.store.findRecord('country', countryId).then(function(country) {
        self.set('i18n.locale', country.get('defaultLocale.id'));
        moment.locale(country.get('defaultLocale.id'));
      });      
    }
  },

  setupController: function(controller, model) {
    const sessionManager = this.get('sessionManager');
    sessionManager.set('person', model);
    sessionManager.set('session', this.get("session"));
    if(!sessionManager.get('applicationDataLoaded')) {
      sessionManager.loadApplicationData();
      // sessionManager.loadUserData(model);       
    }
  },

  actions: {
   willTransition() {
    this.controller.set('showHelp', true);
    Ember.$('.scroll-top').scrollTop(0);
    window.scrollTo(0,0);
    return true;
    }   
  }
});