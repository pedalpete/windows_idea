basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'js/angular.js',
  'js/controllers.js',
  'tests/unit/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
