#!/bin/bash
# parse-config.sh - Extract stage inputs from YAML config
#
# Usage: parse-config.sh <config-file> <stage> [field]
#
# Examples:
#   parse-config.sh config.yaml frame           # Get entire frame section
#   parse-config.sh config.yaml frame.problem   # Get specific field
#   parse-config.sh config.yaml organize.stages # Get stages array
#   parse-config.sh config.yaml options.approve_all # Get option

set -e

CONFIG_FILE="$1"
QUERY="$2"

if [ -z "$CONFIG_FILE" ] || [ -z "$QUERY" ]; then
    echo "Usage: parse-config.sh <config-file> <query>" >&2
    exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: Config file not found: $CONFIG_FILE" >&2
    exit 1
fi

# Check for yq or fall back to python
if command -v yq &> /dev/null; then
    # Use yq (mikefarah/yq)
    yq ".$QUERY" "$CONFIG_FILE"
elif command -v python3 &> /dev/null; then
    # Fall back to Python
    python3 << EOF
import yaml
import sys
import json

with open('$CONFIG_FILE', 'r') as f:
    config = yaml.safe_load(f)

# Navigate the query path
query = '$QUERY'
parts = query.split('.')
result = config

for part in parts:
    if result is None:
        break
    if isinstance(result, dict):
        result = result.get(part)
    elif isinstance(result, list) and part.isdigit():
        result = result[int(part)]
    else:
        result = None

if result is None:
    print('null')
elif isinstance(result, (dict, list)):
    print(json.dumps(result, indent=2))
else:
    print(result)
EOF
else
    echo "Error: Neither yq nor python3 available" >&2
    exit 1
fi
