define(['backbone','modelValidator'], function(Backbone) {

    var UserModel = Backbone.Model.extend({
		defaults: {
			title: 'users'
		},
		url: function(){
			return "http://ygaikwad-w2k8:8080/UiPiggy/getAllSurvey";
			//return "http://maps.googleapis.com/maps/api/directions/json?origin=Pune&destination=Mumbai&sensor=false";
		},
		parse: function(response) {

			return response;
			
		},
		initialize: function(){
			console.log('model initalized');
		},
		validation:{
			userName:{
				required: true,
				msg: 'Please enter username.'
			},
			userId: {
				required: true,
				pattern: 'number',
				msg: 'Please enter valid userid.'
			},
			userEmail:[{
					required: true,
					msg: 'Please enter email.'
				},
				{
					pattern: '^[a-z0-9_-]{3,15}$',
					msg: 'Email is not correct.'
				}
			]
		}
    });

    return UserModel;

});