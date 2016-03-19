import Ember from 'ember';

export default Ember.Route.extend({
  title: 'Account Information',
  renderTemplate() {
    this.render('account.sidebar', {   // the template to render
      into: 'my',                // the template to render into
      outlet: 'sidebar',              // the name of the outlet in that template
      controller: 'my'        // the controller to use for the template
    });   
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
