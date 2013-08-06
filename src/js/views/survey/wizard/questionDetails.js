define(['backbone','events','views/BaseView','template!templates/survey/wizard/questionDetails','modelBinder','bootstrapAlert'],
    function(Backbone,Events,BaseView,questionDetailsTemplate) {

    return BaseView.extend({
        el: '#questionDetails',
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            console.log(this.options);
        },
        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },
        render: function() {
            this.$el.html(questionDetailsTemplate);
            this.$el.addClass("active");
            this._modelBinder.bind(this.model, this.el);
            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError,
                forceUpdate:true
            });
            return this;
        },
        postData: function() {
            console.log("In the post data function");
            console.log(this.model.toJSON());
            Events.trigger("alert:success",[{message:"Survey details saved successfully !!"}]);
            Events.trigger("change:wizardState",{id:100});
        }
    });
});