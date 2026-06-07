#!/bin/bash

set -euo pipefail

curl -fsS \
  http://localhost:5000/tasks \
  > /dev/null

echo "Smoke test passed"
