#!/bin/bash
# pre-stage.sh - Validate prerequisites before running a stage
#
# Usage: pre-stage.sh <stage> <framework-name> [config-file]
#
# Checks:
#   1. Required previous stage outputs exist
#   2. Config provides inputs for this stage (if config given)
#
# Returns:
#   0 - OK to proceed
#   1 - Missing prerequisites (blocks stage)

set -e

STAGE="$1"
FRAMEWORK="$2"
CONFIG="$3"

PLUGIN_ROOT="${CLAUDE_PLUGIN_ROOT:-$(dirname "$(dirname "$0")")}"
PARSE_SCRIPT="$PLUGIN_ROOT/scripts/parse-config.sh"

# Find output directory (handles date-based paths)
find_output_dir() {
    local stage_num="$1"
    local stage_name="$2"
    find output -path "*/$FRAMEWORK/$stage_num-$stage_name" -type d 2>/dev/null | head -1
}

# Check if config has data for a stage
config_has_stage() {
    local stage="$1"
    if [ -n "$CONFIG" ] && [ -f "$CONFIG" ]; then
        local result
        result=$("$PARSE_SCRIPT" "$CONFIG" "$stage" 2>/dev/null)
        [ -n "$result" ] && [ "$result" != "null" ] && [ "$result" != "{}" ]
    else
        return 1
    fi
}

# Validate stage prerequisites
case "$STAGE" in
    frame)
        # Frame has no prerequisites
        echo "OK: Frame stage ready"
        ;;

    organize)
        # Requires frame output
        FRAME_DIR=$(find_output_dir "1" "frame")
        if [ -z "$FRAME_DIR" ] || [ ! -f "$FRAME_DIR/charter.md" ]; then
            echo "ERROR: Frame stage not complete. Run /frame $FRAMEWORK first." >&2
            exit 1
        fi
        echo "OK: Found charter at $FRAME_DIR/charter.md"
        ;;

    refine)
        # Requires organize output
        ORG_DIR=$(find_output_dir "2" "organize")
        if [ -z "$ORG_DIR" ] || [ ! -f "$ORG_DIR/stage-map.md" ]; then
            echo "ERROR: Organize stage not complete. Run /organize $FRAMEWORK first." >&2
            exit 1
        fi
        echo "OK: Found stage-map at $ORG_DIR/stage-map.md"
        ;;

    generate)
        # Requires refine output
        REFINE_DIR=$(find_output_dir "3" "refine")
        if [ -z "$REFINE_DIR" ]; then
            echo "ERROR: Refine stage not complete. Run /refine $FRAMEWORK first." >&2
            exit 1
        fi
        # Check for at least one stage spec
        SPEC_COUNT=$(find "$REFINE_DIR" -name "*-spec.md" 2>/dev/null | wc -l)
        if [ "$SPEC_COUNT" -eq 0 ]; then
            echo "ERROR: No stage specifications found in $REFINE_DIR" >&2
            exit 1
        fi
        echo "OK: Found $SPEC_COUNT stage specification(s)"
        ;;

    evaluate)
        # Requires generate output
        GEN_DIR=$(find_output_dir "4" "generate")
        if [ -z "$GEN_DIR" ]; then
            echo "ERROR: Generate stage not complete. Run /generate $FRAMEWORK first." >&2
            exit 1
        fi
        # Check for README and skills
        if [ ! -f "$GEN_DIR/README.md" ]; then
            echo "ERROR: No README.md found in $GEN_DIR" >&2
            exit 1
        fi
        echo "OK: Found generated framework at $GEN_DIR"
        ;;

    *)
        echo "WARN: Unknown stage '$STAGE' - skipping validation"
        ;;
esac

# Report config status
if [ -n "$CONFIG" ]; then
    if config_has_stage "$STAGE"; then
        echo "CONFIG: Using inputs from $CONFIG for $STAGE stage"
    else
        echo "CONFIG: No $STAGE config - will prompt interactively"
    fi
fi

exit 0
