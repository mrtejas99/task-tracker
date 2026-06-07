pipeline {

    agent none

    stages {

        stage('Tests') {

            parallel {

                stage('Backend') {

                    agent {
                        docker {
                            image 'python:3.11'
                        }
                    }

                    steps {
                        sh '''
                        cd backend
                        pip install -r requirements.txt
                        python -m pytest -v
                        '''
                    }
                }

                stage('Frontend') {

                    agent {
                        docker {
                            image 'node:22'
                        }
                    }

                    steps {
                        sh '''
                        cd frontend
                        npm ci
                        npm test
                        '''
                    }
                }
            }
        }

        stage('Build Images') {

            agent any

            steps {

                sh '''
                docker build \
                  -t task-backend:latest \
                  backend

                docker build \
                  -t task-frontend:latest \
                  frontend
                '''
            }
        }

        stage('Deploy') {

            agent any

            steps {

                sh '''
                docker-compose down || true

                docker-compose up -d --build
                '''
            }
        }

        stage('Smoke Test') {

            agent any

            steps {

                sh '''
                ./scripts/smoke_test.sh
                '''
            }
        }
    }
}
