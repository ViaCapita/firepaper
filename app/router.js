import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

    this.route('home', { path: '/' }, function() {     
        this.route('showcase');
        this.route('about');
        this.route('faq');
        this.route('company');
        this.route('terms');
        this.route('privacy');
        this.route('team');
        this.route('contact');     
 
    }); 

    this.route('my', { path: '/my' }, function() {   
        this.route('signout');   

        this.route('account', { resetNamespace: true }, function() {
            this.route('details');
            this.route('settings');
            this.route('permissions');
            this.route('avatar');           
        }); 

        this.route('contacts', { resetNamespace: true }, function() {
            this.route('messages', { path: '/:stream_id' });
        });       
    });  
});

export default Router;
