from flask import Flask, request, jsonify
from database import init_db, get_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

init_db()


@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = get_connection()

    tasks = conn.execute(
        "SELECT * FROM tasks"
    ).fetchall()

    conn.close()

    return jsonify([
        dict(task) for task in tasks
    ])


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    title = data.get("title")

    if not title:
        return jsonify(
            {"error": "Title required"}
        ), 400

    conn = get_connection()

    cursor = conn.execute(
        "INSERT INTO tasks(title) VALUES(?)",
        (title,)
    )

    conn.commit()

    task_id = cursor.lastrowid

    conn.close()

    return jsonify({
        "id": task_id,
        "title": title,
        "completed": 0
    }), 201


@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):

    conn = get_connection()

    conn.execute(
        """
        UPDATE tasks
        SET completed = 1
        WHERE id = ?
        """,
        (task_id,)
    )

    conn.commit()
    conn.close()

    return jsonify(
        {"message": "updated"}
    )


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):

    conn = get_connection()

    conn.execute(
        "DELETE FROM tasks WHERE id=?",
        (task_id,)
    )

    conn.commit()
    conn.close()

    return jsonify(
        {"message": "deleted"}
    )


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
