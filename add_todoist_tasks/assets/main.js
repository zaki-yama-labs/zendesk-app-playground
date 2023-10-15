const client = ZAFClient.init();
client.invoke("resize", { height: "155px" });

document.getElementById("submitTask").addEventListener("click", (event) => {
  event.preventDefault();
  const task = {
    content: document.getElementById("task").value,
  };

  const options = {
    url: "https://api.todoist.com/rest/v1/tasks",
    type: "POST",
    headers: {
      Authorization: "Bearer {{setting.token}}",
    },
    contentType: "application/json",
    data: JSON.stringify(task),
    secure: true,
  };

  client.request(options).then(
    () => {
      document.getElementById("taskForm").reset();
      client.invoke("notify", "Task added to Todoist");
    },
    (error) => {
      var errorMsg = `Error ${error.status} ${error.statusText}`;
      client.invoke("notify", errorMsg, "error");
    }
  );
});
