'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pluralize = require('pluralize');
var fs = require('fs');
var _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    if (!this.config.get('appName')) {
      this.log(chalk.yellow('App dir not found!'));
      process.exit(0);
    }

    this.argument('apiName', {
      type: String,
      required: false
    });
    this.option('endpoint');
    this.option('socket');
    this.option('image');

    if (this.apiName) {
      this.endpoint = this.options.endpoint || '/api/' + pluralize(this.apiName);
      this.withImage = this.options.image;
      this.withSocket = this.options.socket;
    }
  }

  prompting() {
    if (!this.apiName) {
      var prompts = [
        {
          type: 'input',
          name: 'apiName',
          message: 'API Name:',
          default: 'thing'
        },
        {
          type: 'input',
          name: 'endpoint',
          message: 'endpoint:',
          default: function (response) {
            return '/api/' + pluralize(response.apiName);
          }
        },
        {
          type: 'confirm',
          name: 'withImage',
          message: 'with image upload:',
          default: false
        },
        {
          type: 'confirm',
          name: 'withSocket',
          message: 'with socket.io:',
          default: false
        }
      ];

      return this.prompt(prompts).then(function (props) {
        this.apiName = props.apiName;
        this.endpoint = props.endpoint;
        this.withImage = props.withImage;
        this.withSocket = props.withSocket;
      }.bind(this));
    }
  }

  writing() {
    var dest = this.destinationPath('src/api/' + this.apiName);
    if (fs.existsSync(dest)) {
      return this.log(chalk.yellow(`API ${this.apiName} already exists`));
    }

    var tpl;
    if (this.withSocket && this.withImage) {
      tpl = this.templatePath('imageWithSocket');
    } else if (this.withSocket) {
      tpl = this.templatePath('socket');
    } else if (this.withImage) {
      tpl = this.templatePath('image');
    } else {
      tpl = this.templatePath('simple');
    }

    this.className = _.capitalize(_.camelCase(this.apiName));

    this.fs.copyTpl(tpl, dest, {
      className: this.className,
      classNamePlural: pluralize(this.className),
      apiName: this.apiName,
      endpoint: this.endpoint
    });
  }
}
