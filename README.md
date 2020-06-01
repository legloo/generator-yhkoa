# generator-yhkoa 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A Restful API Server based on Koajs

## Dependencies

- [MongoDB](https://www.mongodb.com)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-yhkoa using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-yhkoa
```

Then generate your new project:

```bash
yo yhkoa [appName]
```

## Commands

- [Initialize App](#initialize-app)
- [Add API](#add-api)

## Initialize App

```bash
mkdir helloWorld
cd helloWorld
yo yhkoa [appName]
```

## Install Dependencies

```bash
yarn install
```
or
```bash
npm install
```

## Add API

```bash
yo yhkoa:api [apiName] [endpoint=/xxx/xxx] [--socket] [--image]
```



## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

