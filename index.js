'use strict;'
/**
 * This module takes an array of file paths and loads the ones that exist.
 * The files are then merged in order and the resulting JSON returned.
 * 
 * @type Module activerules-read-files-promise|Module activerules-read-files-promise
 */

// Used to load the multiple files
const read = require('activerules-read-files-promise');

// Used to do the merging
const merge = require('lodash.merge');

// Provides great promises
var Promise = require("bluebird");

// Create the return object
var AR = function () {};

/**
 * Read and merge the files.
 * 
 * @param array filePaths
 * @returns {nm$_index.Promise}
 */
AR.prototype.files = function (filePaths) {
    
    // Initialize the object we'll be adding layers to
    const merged = {};
  
    return new Promise(
        function (resolve, reject) {
            try {
                read(filePaths)
                .then(function(files){
                  var parsedFiles = [];
                  files.forEach(function(buffer){
                    if(typeof buffer !== 'undefined') {
                      merge(merged, JSON.parse(buffer));
                    }
                  });
                  // Resolve with the merged results
                  resolve(merged);
                });
            } 
            catch(err) {
              return reject(err);
            }
      }
    );
};

// Export a new instance of the object/function
module.exports = exports = new AR();



