define(['backbone', 'template!templates/users/page', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
	function(Backbone, userPageTemplate, FuelUxDataSource){
		
		var modifyUserPage = Backbone.View.extend({
			el: '.page',
			initialize: function(){},
			events: {},
			render: function(){
				this.$el.html(userPageTemplate);
				
				var SampleData = [
					 {
						"firstName": "Super",
						"lastName": "Admin",
						"userId": "100",
						"email": "super@loondrisurvey.com",
						"designation": "Department Head",
						"accessLevel": "superadmin",
						"permissions": {
							"isC_Post": true,
							"isR_Get": true,
							"isU_Put": true,
							"isD_Delete": true
						},
						"permissionsOn": {
							"canCrudUsers": true,
							"canCrudSurveys": true
						}
					},
					{
						"firstName": "Super",
						"lastName": "Admin",
						"userId": "100",
						"email": "super@loondrisurvey.com",
						"designation": "Department Head",
						"accessLevel": "superadmin",
						"permissions": {
							"isC_Post": true,
							"isR_Get": true,
							"isU_Put": true,
							"isD_Delete": true
						},
						"permissionsOn": {
							"canCrudUsers": true,
							"canCrudSurveys": true
						}
					},
					{
						"firstName": "Super",
						"lastName": "Admin",
						"userId": "100",
						"email": "super@loondrisurvey.com",
						"designation": "Department Head",
						"accessLevel": "superadmin",
						"permissions": {
							"isC_Post": true,
							"isR_Get": true,
							"isU_Put": true,
							"isD_Delete": true
						},
						"permissionsOn": {
							"canCrudUsers": true,
							"canCrudSurveys": true
						}
					},
					{
						"firstName": "Super",
						"lastName": "Admin",
						"userId": "100",
						"email": "super@loondrisurvey.com",
						"designation": "Department Head",
						"accessLevel": "superadmin",
						"permissions": {
							"isC_Post": true,
							"isR_Get": true,
							"isU_Put": true,
							"isD_Delete": true
						},
						"permissionsOn": {
							"canCrudUsers": true,
							"canCrudSurveys": true
						}
					},
					{
						"firstName": "Normal",
						"lastName": "Admin",
						"userId": "101",
						"email": "admin@loondrisurvey.com",
						"designation": "Manager",
						"accessLevel": "admin",
						"permissions": {
							"isC_Post": true,
							"isR_Get": true,
							"isU_Put": true,
							"isD_Delete": true
						},
						"permissionOn": {
							"canCrudUsers": false,
							"canCrudSurveys": true
						}
					},
					{
						"firstName": "Normal",
						"lastName": "User",
						"userId": "102",
						"email": "user@loondrisurvey.com",
						"designation": "WebDev Analyst",
						"accessLevel": "user",
						"permissions": {
							"isC_Post": false,
							"isR_Get": true,
							"isU_Put": true,
							"isD_Delete": false
						},
						"permissionOn": {
							"canCrudUsers": false,
							"canCrudSurveys": false
						}
					}
				
				];
				
				var DataSource = new FuelUxDataSource({
						columns: [
							{
								property: "firstName",
								label: "Username",
								sortable: true
							},
							{
								property: "userId",
								label: "Employee Id",
								sortable: true
							},
							{
								property: "email",
								label: "Email",
								sortable: true
							},
							{
								property: "designation",
								label: "Designation",
								sortable: true
							},
							{
								property: "accessLevel",
								label: "Access",
								sortable: true
							}],
							data: SampleData,
							delay: 250
				});
				
				this.$('#MyGrid').datagrid({
					dataSource: DataSource,
					dataOptions:{
						pageIndex: 0,
						pageSize: 5
					},
					stretchHeight: false
				})
				
				
				
			}
		});
		
		return modifyUserPage;
	
	});
	