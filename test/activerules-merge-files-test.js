// Use Chai expect to assert our tests
var expect    = require("chai").expect;

// Our module should be up one level from the test directory
var merge = require("../index.js");

// We need the full path to the current directory.
// We know where the relevant files are from there.
var thisDirectory = __dirname;

// Our test data is in a sub-directory of the test directory
var dataDir = thisDirectory + '/data/';

// Describe what we expect from the module
describe('Module - activerules-merge-files', function() {
  
  // When given 3 valid files?
  describe('Given 3 valid files', function() {
    it('provides data from all three, merged in order', function () {
      // We need create the correct filepaths without actually resolving them.
      // We want the module to determine if the path is or isn't valid.
      var file1 = dataDir + 'favorites.json';
      var file2 = dataDir + 'bad-taste.json';
      var file3 = dataDir + 'good-music.json';
      // Put the files in an array
      var filePaths = [file1, file2, file3];
      // Try merging
      merge.files(filePaths)
      .then(function(data) {
          // What did we expect to happen?
          expect(data.music).to.equal('The Cure');
                
      });
      
     
    });
  });
  
  // When given 2 valid and 1 invalid files?
  describe('Given 2 valid files and 1 non-existent file', function() {
    it('provides data from the two valid files, merged in order', function () {
      var file1 = dataDir + 'favorites.json';
      var file2 = dataDir + 'non-existent-file.json';
      var file3 = dataDir + 'good-music.json';
      // Put the files in an array
      var filePaths = [file1, file3, file2, file3];
      // Try merging
      merge.files(filePaths)
      .then(function(data) {
          // What did we expect to happen?
          expect(data.car).to.equal('Mustang');
          expect(data.music).to.equal('The Cure');
      });
    });
  });
  
});