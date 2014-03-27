module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			javascript: {
				src: [
					'js/libs/**/*.js', // All JS in the libs folder
					'js/main.js'  // This specific file
				],
				dest: 'js/main.min.js'
			}
		},
		uglify: {
			minify: {
				src: 'js/main.min.js',
				dest: 'js/main.min.js'
			}
		},
		cssmin: {
			minify: {
				src: 'css/styles.css',
				dest: 'css/styles.min.css'
			}
		},
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['*.{png,jpg,gif}'],
					dest: 'images/optimised/'
				}]
			}
		},
		watch: {
			styles: {
				files: ['css/*.css'],
				tasks: ['cssmin', 'copy:styles'],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify', 'copy:scripts'],
				options: {
					spawn: false
				}
			},
			images: {
				files: ['images/*.{png,jpg,gif}'],
				tasks: ['imagemin', 'copy:images'],
				options: {
					spawn: false
				}
			}
		},
		copy: {
			styles: {
				files: [{
					expand: true,
					src: ['css/styles.min.css'],
					dest: 'public/'
				}]
			},
			scripts: {
				files: [{
					expand: true,
					src: ['js/main.min.js'],
					dest: 'public/'
				}]
			},
			images: {
				files: [{
					expand: true,
					src: ['*.{png,jpg,gif}'],
					cwd: 'images/',
					dest: 'public/images'
				}]
			},
			html: {
				files: [{
					expand: true,
					src: ['*.html'],
					dest: 'public'
				}]
			}
		}
	});

	// 2. Where we tell Grunt which plugins we plan to use
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);
	grunt.registerTask('deploy', ['copy']);

};