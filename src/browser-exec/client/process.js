(function(window, nextTick, process, prefixes, i, p, fnc) {
    p = window[process] || (window[process] = {});
    while (!fnc && i < prefixes.length) {
        fnc = window[prefixes[i++] + 'equestAnimationFrame'];
    }
    p[nextTick] = p[nextTick] || (fnc && fnc.bind(window)) || window.setImmediate || window.setTimeout;
})(window, 'nextTick', 'process', 'r webkitR mozR msR oR'.split(' '), 0);
