import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
    },
});
// Todo Get 기능
const getTodo = async (get, loading) => {
    try {
        const res = await axiosInstance.get("/todos");
        const result = res.data;
        // 문제 "true", "false" 문자열로 들어옴
        const todosArr = result.map(item => {
            if(item.completed === "true") {
                item.completed = true;
            }else {
                item.completed = false;
            }
            // item.completed = JSON.parse(item.completed);
            // item.id = JSON.parse(item.id);
            return item;
        });
        get(todosArr);
        loading(false);
    } catch {
        err => console.log(err);
    }
};
const saveTodo = async (_id,editTitle) => {
    try {
        const res = await axiosInstance.patch(`/todos/${_id}`, {
            title: editTitle,
            completed: false,
        });
        const result = res.data;
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

const completeChange = async (_id,item) => {
    try {
        const res = await axiosInstance.patch(`/todos/${_id}`, {
            completed: item.completed,
        });
        const result = res.data;
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

const deleteTodo = async _id => {
    try {
        const res = await axiosInstance.delete(`/todos/${_id}`);
        const data = res.data;
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
const deleteAll = async () => {
    try {
        const res = await axiosInstance.get("/todos");
        const result = res.data;
        result.forEach(item => {
            deleteTodo(item.id);
        });
    } catch {
        err => console.log(err);
    }
}
const postTodo = async newTodo => {
    try {
        const res = await axiosInstance.post("/todos", newTodo);
        const data = res.data;
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
export { axiosInstance,getTodo,saveTodo,completeChange,deleteTodo,postTodo,deleteAll };
