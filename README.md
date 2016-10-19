# Salesforce development support for Visual Studio Code

[![Build Status](https://travis-ci.org/coveo/vsforce.svg?branch=master)](https://travis-ci.org/coveo/vsforce)
[![license](https://img.shields.io/github/license/coveo/vsforce.svg)](https://github.com/coveo/vsforce/blob/master/LICENSE)

# Configuration

In most cases, vsforce needs a live connection to Salesforce to work.

To link the extension to an existing organization, simply add the settings below in your `.settings` file for a project-based configuration or in your user settings.

```json
{
  "vsforce.organization.username": "username",
  "vsforce.organization.password": "password",
  "vsforce.organization.securityToken": "token",
}
```

For an in depth explanation on how to do this, see [User and Workspace Settings](https://code.visualstudio.com/Docs/customization/userandworkspace).

Optionally, when in a sandbox environment, you can specify the `loginUrl` and your default namespace
```json
  "vsforce.organization.customNamespace": "namespace",            
  "vsforce.organization.loginURL": "http://login.salesforce.com/" 
```

# Features

Here are some of the vsforce extension features.

## Visualforce auto-completion

Basic Visualforce language support with code highlighting, code completion, and go-to definition.

<img src='./doc/auto-completion.gif' />

## Compare with Salesforce

Lets you compare your local changes with what is currently in your Salesforce.

<img src='./doc/compare.gif' />

## Run SOQL query command

Lets you run queries on Salesforce and displays the result directly in Visual Studio Code.

<img src='./doc/soql-query.gif' />

## And many more
- Show logs command
- Retrieve/Deploy package
- Push file to Salesforce on save (upcoming)
- Apex auto-completion (upcoming)
- Aura support (upcoming)

# Contributing

Please read our [Contributing guidelines](.github/CONTRIBUTING.md).
