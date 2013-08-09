define(['jquery', 'underscore','views/app', 'backbone', 'core','events','jqueryCookie'], function ($, _,AppView, Backbone, Core,Events) {

    var AppRouter = Backbone.Router.extend({
        initialize:function(){
            Events.on('page:navigate', this._navigatePage, this);
            Events.on('redirectHome', this._navigateHome, this);
            this.currentId=null;
        },
        _navigatePage:function(navigationData){
            console.log("in the navigate routeer function.");
            console.log(navigationData);
            this.idHash = (navigationData.options.idHash!==undefined)?navigationData.options.idHash:[null,null,null,null];
            console.log(this.idHash);
            this.navigate(navigationData.path, navigationData.options);
        },
        _navigateHome:function(options){
            var appView = Core.create({}, 'AppView', AppView,{skipAuthCheck:true});
            appView.render();
            if(options!==undefined && options.targetView!==undefined){
                // var targetView=new options.targetView(options.targetOptions);
                // targetView.render();
                this.navigate("listSurvey",{trigger:true});
            }else{
                this.navigate("listSurvey",{trigger:true});
            }
        },
        routes: {
            // Pages
            '':'login',
            'about': 'about',
            'contact': 'contact',
            'help': 'help',
            'user': 'user',
            'login': 'login',
            'wizard/:step':'newSurvey',
            'surveyDetailed':'surveyDetailed',
            'surveyUserDetailed':'surveyUserDetailed',
            'listSurvey':'listSurvey',
            'logout':'logout',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        /* ==========================================================================
           =Survey
           ========================================================================== */

        router.on('route:newSurvey', function(step) {
            require(['views/survey/newSurvey','models/survey/survey'], function(NewSurvey,SurveyModel) {
                console.log(step);
                surveyModel=new SurveyModel();
                var newSurvey = Core.create(appView, 'NewSurvey', NewSurvey,{model:surveyModel,step:step,idHash:router.idHash});
                newSurvey.render();
            });
        });

        router.on('route:surveyDetailed', function() {
            require(['views/survey/surveyDetailed','models/survey/survey'], function(SurveyDetailed,SurveyModel) {
                surveyModel=new SurveyModel();
                var surveyDetailed = Core.create(appView, 'SurveyDetailed', SurveyDetailed,{model:surveyModel});
                surveyDetailed.render();
            });
        });

        router.on('route:surveyUserDetailed', function() {
            require(['views/survey/surveyUserDetailed','models/survey/survey'], function(SurveyUserDetailed,SurveyModel) {
                surveyUserModel=new SurveyModel();
                var surveyUserDetailed = Core.create(appView, 'SurveyUserDetailed', SurveyUserDetailed,{model:surveyUserModel});
                surveyUserDetailed.render();
            });
        });

        router.on('route:listSurvey', function() {
            console.log("in listSurvey");
            require(['views/survey/listSurvey', 'collections/survey/survey'], function(ListSurvey, SurveyCollection) {
                var surveyCollection=new SurveyCollection();
                var listSurvey = Core.create(appView, 'ListSurvey', ListSurvey, {collection:surveyCollection});
                listSurvey.render();
            });
        });

        router.on('route:defaultAction', function (actions) {
            require(['views/home/homeView'], function (HomePage) {
                var homePage = Core.create(appView, 'HomePage', HomePage);
                homePage.render();
            });
        });

        router.on('route:about', function () {
            require(['views/about/aboutView'], function (AboutPage) {
                var aboutPage = Core.create(appView, 'AboutPage', AboutPage);
                aboutPage.render();
            });
        });

        router.on('route:contact', function () {
            require(['views/contact/contactView'], function (ContactPage) {
                var contactPage = Core.create(appView, 'ContactPage', ContactPage);
                contactPage.render();
            });
        });

        router.on('route:user', function () {
            require(['views/users/userView','views/users/modifyView','models/user/userModel'], function (userPage, modifyUserPage, UserModel) {
                var userModel = new UserModel();
                var userPage = Core.create(appView, 'userPage', userPage, {model: userModel });
                userPage.render();
            });
        });

        router.on('route:help', function () {
            require(['views/help/helpView'], function (HelpPage) {
                var helpPage = Core.create(appView, 'HelpPage', HelpPage);
                helpPage.render();
            });
        });

        router.on('route:login', function () {
            require(['views/login/loginView','models/login/loginModel'], function (LoginPage, LoginModel) {
                var loginModel=new LoginModel();
                var loginPage = Core.create(appView, 'LoginPage', LoginPage,{model:loginModel,skipAuthCheck:true});
                loginPage.render();
            });
        });

        router.on('route:logout', function () {
            $.removeCookie('isAuthenticated');
            Events.trigger("view:navigate", {
                path: "login",
                options: {
                    trigger: true,
                    skipAuthCheck:true
                }
            });
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
