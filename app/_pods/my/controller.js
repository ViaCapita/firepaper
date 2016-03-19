import Ember from 'ember';
import computed from 'ember-new-computed';

const inject = Ember.inject;
const alias = computed.alias;

export default Ember.Controller.extend({ 
  i18n: inject.service(),
  sessionManager: inject.service(), 
  person: alias('sessionManager.person'), 
  locale: alias('sessionManager.i18n.locale'),

  application:    inject.controller(), 
  displayTitle:   alias('application.displayTitle'),

  supportedCountries: alias('sessionManager.supportedCountries'),  

  activeContact: alias('sessionManager.activeContact'),

  // __contacts: [],
  // contacts: computed('person.contacts', function() {
  //   const self = this;
  //   this.get('person.contacts').forEach(function(contact) {
  //     if(self.get('person.id') !== contact.get('person.id') && !self.get('__contacts').contains(contact)) {
  //       self.get('__contacts').pushObject(contact);
  //     }
  //   });
  //   return this.get('__contacts');
  // }),

  actions: {
    toggleOpen(obj) {
      obj.set('open', !obj.get('open'));
    },
    toggle(param) {
      this.set(param, !this.get(param));
    },
    openConversation(contact) {
      const streamId = contact.get('stream.id');
      if(streamId) {
        this.set('activeContact', contact);
        this.transitionToRoute('contacts.messages', streamId);
      }
      else {
        console.log("No stream ID");
      }
    },
    viewTimeline(username) {
      this.transitionToRoute('profile.timeline', username);
    },
    viewMap(username) {
      this.transitionToRoute('profile.map', username);
    },
    viewProfile(username) {
      this.transitionToRoute('profile.index', username);
    },
    editLanguage(language) {
      this.transitionToRoute('languages.edit', language.get('id'));
    },
    goTo(route) {
      this.transitionToRoute(route);
    },
    changeLocale(country) {
      this.get("sessionManager").changeLocale(country);
    },
    signOut() {
      this.get("sessionManager").signOut();    
      Ember.run.later(this, function() {
        this.transitionToRoute('home.index');
      }, 3000);
    }
  }
});
