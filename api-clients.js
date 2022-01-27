const apiURL = 'http://localhost:3000/'

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postTodo(data) {
    fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders
      });
}

async function deleteTodo(id) {
        fetch(`${apiURL}${id}`, {
            method: "DELETE",
            headers: myHeaders,
            redirect: 'follow'
          });
}


async function getAllTodos() {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: myHeaders,
        })
        const data = await response.json()
        return data
    } catch (error) {console.log(error)}
}

async function todoIsDone(id, status) {
    fetch(`${apiURL}${id}`, {
        method: "PUT",
        body: JSON.stringify({"done": status}),
        headers: myHeaders,
        redirect: 'follow'
      });
}

async function changeTodo(id, content) {
    fetch(`${apiURL}${id}`, {
        method: "PUT",
        body: JSON.stringify({"description": content}),
        headers: myHeaders,
        redirect: 'follow'
      });
}
