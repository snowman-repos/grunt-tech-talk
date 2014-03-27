title: GruntJS - Profero Tech Talk
author:
  name: Darryl Snow
  email: darryl.snow@profero.com
output: index.html
style: presentation.css
controls: false

--

# Intro to GruntJS
## Profero Tech Talk
*Friday 17<sup>th</sup> January, 2014*

--

# ![Profero](profero-logo.png) + ![GruntJS](grunt-logo.png)

--

### Developers often have to do boring / difficult / repetitive things

* Concatonate small bits of CSS & JS
* Compress / minify CSS & JS
* Optimise images
* Compile stuff
* Move / copy / rename files
* Test code
* Grab & hook up dependencies

Let's call these things "tasks"

--

### Enter Grunt

Grunt = a task runner.

It's 1 (JavaScript) configuration file to do all these things for you.

--

### So, why?

* Saves time
* Let's you concentrate on the code (fewer distractions)
* *Thousands* of plugins available online
* Ensures important tasks are always done
* Everyone knows and can run JavaScript so it's easy
* Everyone's using it! (large community)

--

### Oh yeah, who?

Twitter, jQuery, Wordpress, Wallmart, BBC, Sky, Guardian, me :)

--

### Do I need it?

##### I don't need the things Grunt does
You probably do actually. Some of the boring tasks are really important for the project's success and everyone involved is responsible for making sure they get done.

--

### Do I need it?

##### Grunt runs on NodeJS... I don't know Node...
You don't need to know Node, just like you don't need to know C++ to run Microsoft Word.

--

### Do I need it?

##### Grunt is a command line tool... scary...
You don't need to be a CL expert. You just need to:
* navigate to your project directory
* type `grunt` and hit return`

--

### Install

You will need:
* [NodeJS](http://nodejs.org/)

In your project folder create a file `package.json`that looks like this:

	{
	  "name": "your-project",
	  "version": "0.1.0",
	  "devDependencies": {
	    "grunt": "~0.4.1"
	  }
	}

--

### Install

In your terminal
* navigate to your project directory
* run `npm install`to install Grunt for your project - you should then get a `node_modules` sub-folder.

![The easy way to navigate to your project directory](http://media.24ways.org/2013/coyier/drag-folder.gif)

--

### Install - Final step!

Still in the terminal, run:

	npm install -g grunt
	
This will make the `grunt` command available on your system.

--

### Example: Concatonate some files

In your project you have:
* jQuery
* oridomi.js - a jQuery plugin
* main.js - your website's JS code

1 file = 1 HTTP request = faster website. Let Grunt do it.

--

### Example: Concatonate some files
#### Step 1 - install a plugin

Google search reveals a Grunt plugin for running this task - [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat). Install it by running:

	npm install grunt-contrib-concat --save-dev
	
Installs the plugin for your project AND updates your `package.json` file! Sharability!

--

### Example: Concatonate some files
#### Step 2 - setup the task

Now we tell Grunt what do to. Create a file `Gruntfile.js` in the project directory:

	module.exports = function(grunt) {
	
		// 1. All configuration goes here 
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
	
			concat: {
				// 2. Configuration for concatinating files goes here.
			}
	
		});
	
		// 3. Where we tell Grunt we plan to use this plug-in.
		grunt.loadNpmTasks('grunt-contrib-concat');
	
		// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
		grunt.registerTask('default', ['concat']);
	
	};

--

### Example: Concatonate some files
#### Step 2 - setup the task

	concat: {   
		dist: {
			src: [
				'js/libs/*.js', // All JS in the libs folder
				'js/global.js'  // This specific file
			],
			dest: 'js/build/production.js',
		}
	}

--

### Example: Concatonate some files
#### Step 3 - run the task

In the terminal, in your project root folder, run:

	grunt
	
You should now have a `js/build/production.js` file containing the 3 other files!

--

### Example: Minify some JavaScript

* Install a plugin: `npm install grunt-contrib-uglify --save-dev`
* Load the plugin in Gruntfile.js: `grunt.loadNpmTasks('grunt-contrib-uglify');`
* Configure it:


	uglify: {
		build: {
			src: 'js/build/production.js',
			dest: 'js/build/production.min.js'
		}
	}
* Update the default task: `grunt.registerTask('default', ['concat', 'uglify']);`
* Run it: `grunt
	
Easy! That production.min.js file is what we would load up for use in our index.html file!

--

### Example: Optimise some images

`npm install grunt-contrib-imagemin --save-dev`

`grunt.loadNpmTasks('grunt-contrib-imagemin');`

	imagemin: {
		dynamic: {
			files: [{
				expand: true,
				cwd: 'images/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'images/build/'
			}]
		}
	}

`grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);`

--

### Automation & better workflow

Do you always have to run `grunt` *every* time you change something? Does it always run all the tasks?

Of course not!

--

### Automation & better workflow

1) Run tasks automatically when they should

2) Run only the tasks needed, e.g.
* concatonate and minify JS only when JS changes
* optimise images when a new image is added or when existing one changes

3) Run a server with livereload

--

### Automation & better workflow
#### Watch

`npm install grunt-contrib-watch --save-dev`

`grunt.loadNpmTasks('grunt-contrib-watch');`

	watch: {
		scripts: {
			files: ['js/*.js'],
			tasks: ['concat', 'uglify'],
			options: {
				spawn: false,
			},
		} 
	}

--

### And much much more!

* Add vendor prefixes
* Running unit tests
* Build image sprites automatically
* Start & run a testing server
* Check for code problems - JS Hint, CSS Lint etc.
* Validate your HTML
* Commit or push to a github repo
* Add version numbers to your assets
* Deploy to a staging / production environment
* Setup a Wordpress theme template
* etc.
* etc.

--

### Summary

* Install NodeJS
* Navigate to project folder
* Install Grunt globally (`npm install -g grunt`)
* Install Grunt for your project (`npm install grunt --save-dev`)
* Find a Grunt plugin to do what you want
* Learn the configuration style of that plugin
* Load the plugin in `Gruntfile.js`
* Write the configuration into `Gruntfile.js`
* Run `grunt`

--

### Further Reading & Resources

* [GruntJS/getting started](http://gruntjs.com/getting-started)
* [GruntJS/plugins](http://gruntjs.com/plugins) - search for Grunt plugins
* [NodeJS](http://nodejs.org)
* [NPM](https://npmjs.org/) - search for Grunt plugins
* [Screencast: First moments with Grunt](http://css-tricks.com/video-screencasts/130-first-moments-grunt/) - *33 mins*
* [Chris Coyier's Grunt Boilerplate](https://github.com/chriscoyier/My-Grunt-Boilerplate/)
* [Mark McDonnel's Grunt Boilerplate](http://www.integralist.co.uk/Grunt-Boilerplate.html)
* [Grunt Tips & Tricks](http://blog.ponyfoo.com/2013/11/13/grunt-tips-and-tricks)
* Organise your Grunt file by [splitting it up into smaller files](https://github.com/cowboy/wesbos/commit/5a2980a7818957cbaeedcd7552af9ce54e05e3fb)
* Check out Gruntfiles for other projects (try searching on github)

Any questions or problems, ask me.