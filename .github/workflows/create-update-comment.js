const fs = require("fs");

module.exports = async function createorUpdateComment({ github, context }) {
  const { owner, repo } = context.repo;
  const comment_body = fs.readFileSync("./pr_comment", "utf-8");
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number: `${process.env.PR_NUMBER}`,
  });
  const match = comments.find(
    ({ user, body }) =>
      user.login === "github-actions[bot]" &&
      body.includes("<!-- check-changesets-action -->")
  );
  if (match && match.id) {
    github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: match.id.toString(),
      body: comment_body,
    });
  } else {
    github.rest.issues.createComment({
      owner,
      repo,
      issue_number: `${process.env.PR_NUMBER}`,
      body: comment_body,
    });
  }
};
