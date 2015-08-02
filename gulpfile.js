var gulp = require('gulp');
var gls = require('gulp-live-server');

var server = gls.new(['--harmony', 'app.js']);

gulp.task('server', function() {
    server.start();
});

gulp.task('watch', ['server'], function() {
    function reload() {
        server.notify.apply(server, arguments);
    }
    //use gulp.watch to trigger server actions(notify, start or stop) 
    gulp.watch(['public/**/*'], reload);
    gulp.watch(['views/**/*'], reload);
    gulp.watch('app.js', server.start.bind(server)); //restart my server 
});

gulp.task('default', ['watch']);