# Salesforce development support for Visual Studio Code

[![Build Status](https://travis-ci.org/coveo/vsforce.svg?branch=master)](https://travis-ci.org/coveo/vsforce)
[![license](https://img.shields.io/github/license/coveo/vsforce.svg)](https://github.com/coveo/vsforce/blob/master/LICENSE)
[![Version](http://vsmarketplacebadge.apphb.com/version/coveo.vsforce.svg)](https://marketplace.visualstudio.com/items?itemName=coveo.vsforce)
[![Installs](http://vsmarketplacebadge.apphb.com/installs/coveo.vsforce.svg)](https://marketplace.visualstudio.com/items?itemName=coveo.vsforce)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating/coveo.vsforce.svg)](https://vsmarketplacebadge.apphb.com/rating/coveo.vsforce.svg)

## Introduction

**vsforce** adds support for Salesforce development to Visual Studio Code, providing features such as _syntax-highlighting_, _auto-completion_, _code deployment_ or _retrieval_, etc. The extension is freely available in the Visual Studio Code Marketplace (see the badges above).

Some features are still incomplete and/or missing, but already we find it quite useful for our day-to-day work. We encourage you to give it a spin, and report any issues you encounter. Even better, we'd be thrilled if you want to fork our repo and submit new functionalities & bugfixes!

## Installation

In Visual Studio Code, open the **Extensions** panel and search for **vsforce**. That's all there is to it!

## Configuration

For most features to work, **vsforce needs a live internet connection and the credentials for your Salesforce organization**.

Simply add the information in your `.settings` file, as per the sample below:

```json
{
  "vsforce.organization.username": "username",
  "vsforce.organization.password": "password",
  "vsforce.organization.securityToken": "token"
}
```

You can either enter the credentials in your per-project `.settings` file, or in your global user settings. For an in depth explanation on how to do this, see [User and Workspace Settings](https://code.visualstudio.com/Docs/customization/userandworkspace).

If needed (ex: when using a sandbox organization), you can also specify the `loginUrl` and your default namespace:

```json
{
  "vsforce.organization.namespace": "namespace",
  "vsforce.organization.loginUrl": "https://test.salesforce.com/"
}
```

When properly configured, a message will appear in the status bar informing you that the extension is logged to your Salesforce organization.

## Using the commands

Open the **Command Palette** and type `vsforce` to see the list of available commands.

Here are some examples of the features the extension provides:

### Visualforce auto-completion

Basic Visualforce language support with code highlighting, code completion, and go-to definition:

[![Compare](https://raw.githubusercontent.com/coveo/vsforce/master/doc/auto-completion.gif)](https://raw.githubusercontent.com/coveo/vsforce/master/doc/auto-completion.gif)

### Retrieve & deploy packages

Pulls or pushes your whole project to/from your Salesforce organization, based on your `package.xml` file you selected.

### Compare with Salesforce

Compare your local version with the version in your Salesforce organization:

[![Compare](https://raw.githubusercontent.com/coveo/vsforce/master/doc/compare.gif)](https://raw.githubusercontent.com/coveo/vsforce/master/doc/compare.gif)


### Run SOQL query command

Run SOQL queries on Salesforce and display the result directly in Visual Studio Code.

[![SOQL](https://raw.githubusercontent.com/coveo/vsforce/master/doc/soql-query.gif)](https://raw.githubusercontent.com/coveo/vsforce/master/doc/soql-query.gif)

#### And many more

- [x] Show logs command
- [ ] Push file to Salesforce on save (upcoming)
- [ ] Apex auto-completion (upcoming)
- [ ] Aura support (upcoming)
- [ ] Customizable HTML table/JSON view (SOQL) (upcoming)

## Contributing

Please read our [Contributing guidelines](CONTRIBUTING.md).
