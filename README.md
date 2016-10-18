# Salesforce development support for Visual Studio Code

[![Build Status](https://travis-ci.org/coveo/vsforce.svg?branch=master)](https://travis-ci.org/coveo/vsforce)
[![devDependency Status](https://david-dm.org/coveo/vsforce/dev-status.svg)](https://david-dm.org/coveo/vsforce#info=devDependencies)
[![license](https://img.shields.io/github/license/coveo/vsforce.svg)](https://github.com/coveo/vsforce/blob/master/LICENSE)

# Configuration

For most cases, vsforce needs a live connection to Salesforce to work. To link the extention to an existing organization, simply add the settings bellow in you `.settings` file for a project base configuration or in your user settings.

See [User and Workspace Settings](https://code.visualstudio.com/Docs/customization/userandworkspace) for an in depth explanation.
```json
{
  "vsforce.organization.username": "username",
  "vsforce.organization.password": "password",
  "vsforce.organization.securityToken": "token",
}
```

Optionally you can specify the `loginUrl` (if you're in a sandbox) and your default namespace
```json
  "vsforce.organization.customNamespace": "namespace",            
  "vsforce.organization.loginURL": "http://login.salesforce.com/" 
```

# Features

## Visualforce auto-completion

Basic Visualforce language support with code highlithing, code completion and go to definition.

<img src='./doc/auto-completion.gif' />

## Compare with Salesforce

Lets you compare your local changes with what's currenlty in your Salesforce.

<img src='./doc/compare.gif' />

## Run SOQL query command

Lets you run queries on Salesforce and displays the result directly in Visual Studio Code.

<img src='./doc/soql-query.gif' />

## And many more
- Show logs command
- Retrieve/Deploy package
- Push file to Salesforce on save (to come)
- Apex auto-completion (to come)
- Aura support (to come)


# Contributing

Please read our [Contributing guidelines](.github/CONTRIBUTING.md).
