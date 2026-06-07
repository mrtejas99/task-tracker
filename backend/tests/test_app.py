from app import app


def test_get_tasks():

    client = app.test_client()

    response = client.get("/tasks")

    assert response.status_code == 200


def test_create_task():

    client = app.test_client()

    response = client.post(
        "/tasks",
        json={
            "title": "Learn Jenkins"
        }
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["title"] == "Learn Jenkins"
