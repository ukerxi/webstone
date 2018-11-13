/**
 * 通用views 控制层
 */

const async = require('async');

function View(req, res, next) {
    if (!req) {
        throw new Error('Error: Express request object is required.');
    }
    this.res = res;
    this.req = req;
    this.next = next;
    this.initQueue = []; // executed first in series
}

module.exports = View;

View.prototype.on = function (on, callback) {
    if (on === 'init') {
        this.initQueue.push(callback);
    }
    return this;
};

View.prototype.render = function (viewPath, locals) {
    const self = this;
    const renderFn = function () {
        if (typeof locals === 'undefined') {
            locals = this.res.locals;
        }
        locals.layout = false;
        this.res.render(viewPath, locals);
    }.bind(this);
    async.eachSeries(self.initQueue, function (i, next) {
        if (Array.isArray(i)) {
            // process nested arrays in parallel
            async.parallel(i, next);
        } else if (typeof i === 'function') {
            // process single methods in series
            i(next);
        } else {
            throw new Error('View.render() events must be functions.');
        }
    }, function (err) {
        renderFn();
    });
};

