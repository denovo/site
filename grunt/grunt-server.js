/// *--------------------------------------------------------------------------------*\
//         == server - Default grunt watch task ==
//
//         To run type: 'grunt server' which will set up a server,
//                       and run compass watch and jekyll watch
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
		grunt.registerTask('server', function (target) {

				// if (target === 'dist') {
				//     return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
				// }

				grunt.task.run([
						'clean:before_build',
						'replace:local',
						'compilejs',
						'compilecss',
						'copy:oldstyleguide',
						'concurrent:server',
						'connect:livereload',
						'open:root',
						'watch'
				]);
		});

};








