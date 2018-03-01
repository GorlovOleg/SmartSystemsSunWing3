# SmartSystemsSunWing3 - Angular 4, ASP.Net Core 2 SPA

## Project prototipe to demonstrate using .NET Core 2, Bootstrap 4, Web API2, Angular 4, PrimeNG 4.0, TypeScript, ECMAScript6, SCSS.[![Build status](https://ci.appveyor.com/api/projects/status/33srpo7owl1h3y4e?svg=true)]

Requirement and Enviroment for project : 
Windows 10 Home and above version.
VS Community  2017, SQL Server 2014 through SQL Server 2016 and Azure SQL Database

 Project build the Web API 2, MVC 6 Core 1,   using SPA REST architecture principles,  Angular 2, TypeScript, Bootstrap and support cross-platform framework for building modern mobile applications.
Dependency injection  and services in class startup.cs and inside the method “ConfigureServices(IServiceCollection services)


1. Script to create database folder - SQL 
2. Business Layer project for the interfaces folder - Controllers.
3. Controlers implementation WebAPI 2
4. Repository Layer project for interfaces to data context folder - DAL (Data Access Layer)
5. Presintation Layer Angular2  folder - ClientApp
6. Validations using  in this project:
6.1 View Layer:  validations   in presenation data view   added the Interfeces for  components of Angular 2 in TypeScript  files - company.component.ts , address.component.ts etc.  
6.2 Controller Business Layer: In implementing  of classes of controllers added functions  validations
6.3 In the data model added Class Attributes DataAnnotations the specify for individual fields . These attributes define common validation patterns, such as range checking and required fields - Required is ensures that the value must be provided to the model property, StringLength, Data Type ,  etc.
Added Custom validation class, for class Model sType,  with implementation. It used ValidationAttribute, and accept type information for addresses only  'L', 'M' or 'W'
6.4 Data Access Layer: Mapping Class EntityFrameworkCore.Metadata for properties.
6.5 Back End SQL using CONSTRAINT expression, Data Type, fields lengths etc.  
