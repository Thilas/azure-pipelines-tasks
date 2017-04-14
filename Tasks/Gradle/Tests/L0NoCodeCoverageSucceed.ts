import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'gradletask.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tr.setInput('wrapperScript', 'gradlew');
tr.setInput('javaHomeSelection', 'JDKVersion');
tr.setInput('jdkVersion', 'default');
tr.setInput('testResultsFiles', '**/build/test-results/TEST-*.xml');
tr.setInput('codeCoverageTool', 'jacoco');
tr.setInput('failIfCoverageEmpty', 'false');

tr.setInput('tasks', 'build');

// provide answers for task mock
let a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    'checkPath': {
        'gradlew': true,
        'gradlew.bat': true
    },
    'exec': {
        'gradlew.bat properties': {
            'code': 0,
            'stdout': 'More sample gradle output'
        },
        'gradlew.bat clean build jacocoTestReport': {
            'code': 0,
            'stdout': 'More sample gradle output'
        }
    }
};
tr.setAnswers(a);

tr.run();
