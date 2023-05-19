PRS=$(gh pr list \
--json headRefName \
--jq 'map(select(.headRefName == "$BRANCH_NAME")) | length');

echo "$PRS"
if [ ! $PRS -eq 0 ]; then
  echo "CREATE_PR=yes"
fi