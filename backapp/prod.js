
/**
 * Used modules
 */
const fs      = require('fs');
const fsExtra = require('fs-extra');
const path    = require('path');

/**
 * Variables
 */
const jsBuildPath  = './build/static/js';
const cssBuildPath = './build/static/css';
const prodPath     = './../backend/web/backend/assets';
const layout       = './../backend/backend/views/layouts/main.php';

console.log("\x1b[33m", 'Run Production process');
let startTime = Date.now();


/**
 * Find and return filename by extension in given directory
 * @param {string} startPath 
 * @param {string} filter 
 * @returns {string}
 */
function fromDir(startPath, filter){

    if (!fs.existsSync(startPath)){
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for ( let i = 0; i < files.length; i++){
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
		else if (filename.indexOf('.map') >= 0) continue;
		else if (filename.indexOf(filter) >= 0) {
			return files[i];
		}
    };
};

/**
 * Replaces old builds name by new names
 * @param {string} path - Path to php layout 
 * @param {string} jsName - New js-build name
 * @param {string} cssName - New css-build name
 */
function replaceNames(path, jsName, cssName) {
	let layoutContent = fs.readFileSync(path, 'utf8');
	layoutContent = layoutContent.replace(
		/<!--!scripts-->[\s\S]+?<!--\/scripts-->/,
		`<!--!scripts--><script type="text/javascript" src="/backend/assets/${jsName}"></script><!--/scripts-->`
	);
	layoutContent = layoutContent.replace(
		/<!--!styles-->[\s\S]+?<!--\/styles-->/,
		`<!--!styles--><link href="/backend/assets/${cssName}" rel="stylesheet" type="text/css"><!--/styles-->`
	);

	fs.writeFileSync(layout, layoutContent);

	let endTime = Date.now() - startTime;

	console.log("\x1b[32m",'Production build is ready');
	console.log("\x1b[32m", `It took - ${endTime}ms`);
}

const jsFile  = fromDir(jsBuildPath, '.js');
const cssFile = fromDir(cssBuildPath, '.css');

fsExtra.copySync(path.resolve(__dirname,`${jsBuildPath}/${jsFile}`), `${prodPath}/${jsFile}`);
fsExtra.copySync(path.resolve(__dirname,`${cssBuildPath}/${cssFile}`), `${prodPath}/${cssFile}`);

replaceNames(layout, jsFile, cssFile);


