#!/bin/bash
# parse-config.sh - Extract stage inputs from YAML config
#
# Usage: parse-config.sh <config-file> <query> [--validate]
#
# Examples:
#   parse-config.sh config.yaml frame           # Get entire frame section
#   parse-config.sh config.yaml frame.problem   # Get specific field
#   parse-config.sh config.yaml organize.stages # Get stages array
#   parse-config.sh config.yaml --validate      # Validate config structure

set -e

CONFIG_FILE="$1"
QUERY="$2"

# Handle --validate flag
if [ "$CONFIG_FILE" = "--validate" ] || [ "$QUERY" = "--validate" ]; then
    if [ "$CONFIG_FILE" = "--validate" ]; then
        CONFIG_FILE="$QUERY"
        QUERY=""
    fi
    VALIDATE_MODE=true
else
    VALIDATE_MODE=false
fi

if [ -z "$CONFIG_FILE" ]; then
    echo "Usage: parse-config.sh <config-file> <query> [--validate]" >&2
    exit 1
fi

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: Config file not found: $CONFIG_FILE" >&2
    exit 1
fi

# Validation function
validate_config() {
    local config_file="$1"
    local errors=0

    # Check required fields
    local name problem domain users
    name=$(parse_yaml "$config_file" "name" 2>/dev/null)
    problem=$(parse_yaml "$config_file" "frame.problem" 2>/dev/null)
    domain=$(parse_yaml "$config_file" "frame.domain" 2>/dev/null)
    users=$(parse_yaml "$config_file" "frame.users" 2>/dev/null)

    if [ -z "$name" ] || [ "$name" = "null" ]; then
        echo "ERROR: Missing required field: name" >&2
        errors=$((errors + 1))
    fi

    if [ -z "$problem" ] || [ "$problem" = "null" ]; then
        echo "ERROR: Missing required field: frame.problem" >&2
        errors=$((errors + 1))
    fi

    if [ -z "$domain" ] || [ "$domain" = "null" ]; then
        echo "ERROR: Missing required field: frame.domain" >&2
        errors=$((errors + 1))
    fi

    if [ -z "$users" ] || [ "$users" = "null" ] || [ "$users" = "[]" ]; then
        echo "ERROR: Missing required field: frame.users (must be non-empty array)" >&2
        errors=$((errors + 1))
    fi

    if [ $errors -eq 0 ]; then
        echo "OK: Config validation passed"
        return 0
    else
        echo "FAILED: $errors validation error(s)" >&2
        return 1
    fi
}

# Parse YAML using available tools
parse_yaml() {
    local file="$1"
    local query="$2"

    # Check for yq first (preferred)
    if command -v yq &> /dev/null; then
        yq ".$query" "$file" 2>/dev/null
        return $?
    fi

    # Fall back to Python with pyyaml check
    if command -v python3 &> /dev/null; then
        python3 << PYTHON_EOF
import sys
try:
    import yaml
except ImportError:
    print("Error: Python yaml module not installed. Run: pip install pyyaml", file=sys.stderr)
    sys.exit(2)

import json

try:
    with open('$file', 'r') as f:
        config = yaml.safe_load(f)
except Exception as e:
    print(f"Error: Failed to parse YAML: {e}", file=sys.stderr)
    sys.exit(1)

# Navigate the query path
query = '$query'
if not query:
    print(json.dumps(config, indent=2) if config else 'null')
    sys.exit(0)

parts = query.split('.')
result = config

for part in parts:
    if result is None:
        break
    if isinstance(result, dict):
        result = result.get(part)
    elif isinstance(result, list) and part.isdigit():
        idx = int(part)
        result = result[idx] if idx < len(result) else None
    else:
        result = None

if result is None:
    print('null')
elif isinstance(result, (dict, list)):
    print(json.dumps(result, indent=2))
else:
    print(result)
PYTHON_EOF
        return $?
    fi

    echo "Error: Neither yq nor python3 with pyyaml available" >&2
    echo "Install one of:" >&2
    echo "  - yq: https://github.com/mikefarah/yq" >&2
    echo "  - pyyaml: pip install pyyaml" >&2
    exit 1
}

# Main execution
if [ "$VALIDATE_MODE" = true ]; then
    validate_config "$CONFIG_FILE"
else
    if [ -z "$QUERY" ]; then
        # No query = dump entire config
        parse_yaml "$CONFIG_FILE" ""
    else
        parse_yaml "$CONFIG_FILE" "$QUERY"
    fi
fi
