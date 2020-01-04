pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                dir("/var/jenkins_home/workspace/edudoor_frontend") {
                    sh 'npm install' 
                }
            }
        }
    }
}

