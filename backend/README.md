# Backend Service

The backend service for the Task Tracker application is built using Flask and provides REST APIs for managing tasks.

The primary purpose of this service is to demonstrate:

* Building REST APIs using Flask
* Unit testing with Pytest
* Containerization using Docker
* CI/CD integration using Jenkins
* Backend deployment using Docker Compose



## Technology Stack

| Component   | Purpose                               |
| ----------- | ------------------------------------- |
| Python 3.11 | Programming language                  |
| Flask       | REST API framework                    |
| Flask-CORS  | Cross-Origin Resource Sharing support |
| Pytest      | Unit testing framework                |
| Docker      | Containerization                      |
| Jenkins     | CI/CD automation                      |



## Project Structure

```text
backend/
├── app.py
├── requirements.txt
├── tests/
│   └── test_app.py
├── Dockerfile
└── README.md
```

## Application Workflow

The backend follows a simple request-response lifecycle.

```text
Client --▶ Flask Route --▶ Business Logic --▶ Task Store --▶JSON Response
```

Example:

```text
POST /tasks --▶ Validate Request --▶ Create Task --▶ Store Task --▶ Return JSON Response 
```




## Dependencies

All backend dependencies are defined in:

```text
requirements.txt
```

Example:

```text
Flask==3.1.0
pytest==8.4.1
flask-cors==6.0.1
```



### Flask

Flask is a lightweight Python web framework used to expose REST APIs.

Responsibilities:

* HTTP request handling
* Routing
* JSON serialization
* Response generation

Example:

```python
@app.route("/health")
def health():
    return {"status": "healthy"}
```



### Flask-CORS

Allows frontend applications hosted on different origins to access backend APIs.

Without CORS:

```text
Browser
   │
   └── Request Blocked
```

With CORS:

```text
Browser
   │
   ▼
Backend API
```

Example:

```python
from flask_cors import CORS

CORS(app)
```



### Pytest

Pytest is used for automated testing.

Responsibilities:

* Test execution
* Assertions
* Failure reporting
* CI integration

Example:

```python
def test_health():
    response = client.get("/health")
    assert response.status_code == 200
```



## Running Locally

Create a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python app.py
```

Application:

```text
http://localhost:5000
```



## Running Tests

Execute:

```bash
pytest
```

Example output:

```text
==================
3 passed
==================
```



## Understanding the Tests

Tests are located under:

```text
tests/
```

Example:

```python
def test_health():
    response = client.get("/health")

    assert response.status_code == 200
```

The test:

1. Creates a request
2. Sends it to Flask
3. Receives a response
4. Validates the result



## Adding New Tests

Suppose a new endpoint is added:

```python
@app.route("/version")
def version():
    return {"version": "1.0"}
```

Create a corresponding test:

```python
def test_version():
    response = client.get("/version")

    assert response.status_code == 200
    assert response.json["version"] == "1.0"
```

Every new API endpoint should have at least:

* Success test
* Invalid request test
* Edge case test



## Recommended Testing Strategy

For each API endpoint:

### Positive Test

Verify expected behavior.

Example:

```python
response = client.get("/health")
assert response.status_code == 200
```



### Negative Test

Verify invalid requests are rejected.

Example:

```python
response = client.post("/tasks", json={})
assert response.status_code == 400
```



### Edge Case Test

Verify unusual inputs are handled correctly.

Example:

```python
response = client.post(
    "/tasks",
    json={"title": ""}
)
```



## Docker Support

Build image:

```bash
docker build -t task-tracker-backend .
```

Run container:

```bash
docker run -p 5000:5000 task-tracker-backend
```

Verify:

```bash
curl http://localhost:5000/health
```

Expected:

```json
{
  "status": "healthy"
}
```



## CI/CD Integration

The backend is automatically tested during the Jenkins pipeline.

Pipeline stage:

```bash
pip install -r requirements.txt
pytest
```

If any test fails:

```text
Pipeline Failed
```

If all tests pass:

```text
Pipeline Continues
```

This ensures that only validated code progresses to the Docker build and deployment stages.

