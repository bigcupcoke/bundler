const log = console.log.bind(console);

const glob = require('glob')

const entryFromPath = (path) => {
    const files = glob.sync(path);
    const entry = {};
    files.forEach(filepath => {
        const name = filepath.split('src/').pop().split('.')[0];
        // log('filepath', filepath);
        entry[name] = filepath;
    });
    return entry;
}

// 测试
const test = () => {
    const path1 = 'src/views/**/*.js';
    const path2 = 'src/views/**/*.css';
    const path3 = 'src/views/**/*';
    const arr = [path1, path2, path3];
    arr.forEach((p, i) => log(i + 1, entryFromPath(p)));
}

if (require.main === module) {
    test();
}

module.exports = {
    log,
    entryFromPath,
}