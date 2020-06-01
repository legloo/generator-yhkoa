'use strict';
const Generator = require('yeoman-generator');

const chalk = require('chalk');

const yosay = require('yosay');


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    if (this.config.get('appName')) {
      this.log(chalk.yellow('App already exists in current dir!'));
      process.exit(0);
    }
    this.argument('appName', {
      type: String,
      required: false
    });
  }

  prompting() {
    if (!this.appName) {
      this.log(yosay(
        'Welcome to the awe-inspiring ' + chalk.red('generator-yhkoa') + ' generator!'
      ));

      var prompts = [
        {
          type: 'input',
          name: 'appName',
          message: 'APP Name:',
          default: 'helloWorld'
        }
      ];

      return this.prompt(prompts).then(function (props) {
        this.appName = props.appName;
      }.bind(this));
    }
  }

  configuring() {
    this.config.set('appName', this.appName);
    this.config.save();
  }

  writing() {
    var self = this;
    var statics;
    var templates;

    statics = [
      'src',
      'static',
      'swagger-ui',
      // '.gitignore',
      'gulpfile.js',
      'tsconfig.json',
      'package.json',
      'pm2.conf.json',
      'README.md'
    ];

    templates = [
      'src/config/environment.ts',
      'src/config/mongodb.ts'
    ]

    // self.sourceRoot(path.join(self.templatePath(), '../../../typescript'));

    statics.forEach(function (glob) {
      self.fs.copy(
        self.templatePath(glob),
        self.destinationPath(glob)
      );
    });
    templates.forEach(function (glob) {
      self.fs.copyTpl(
        self.templatePath(glob),
        self.destinationPath(glob),
        {
          appName: self.appName
        }
      );
    });
  }

  install() {
    this.log(chalk.green('Everything is ready!'));
    this.log(chalk.yellow('Run') + ' yarn ' + chalk.yellow('or') + ' npm install ' + chalk.yellow('to install dependencies.'));
  }
}
