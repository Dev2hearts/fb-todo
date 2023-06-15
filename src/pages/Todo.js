import List from "../components/List";
import Form from "../components/Form";
import { useEffect, useState } from "react";

const Todo = () => {
    // 로컬 데이터
    const initTodoData = localStorage.getItem("fbTodoData")
        ? JSON.parse(localStorage.getItem("fbTodoData"))
        : [];
    // 초기데이터
    const [todoData, setTodoData] = useState(initTodoData);
    const handleRemoveClick = () => {
        setTodoData([]);
        // 로컬 스토리지 초기화
        localStorage.setItem("fbTodoData", JSON.stringify([]));
    };

    useEffect ( () => {
        // axios get 호출 fbtodolist 자료 받기
    },[])

    return (
        <div className="flex items-start mt-5 justify-center w-full">
            <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
                <div className="flex justify-between mb-3">
                    <h1 className="text-center w-3/4 text-2xl text-cyan-400">
                        FireBase Todo-List
                    </h1>
                    <button
                        className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
                        onClick={handleRemoveClick}
                    >
                        Delete All
                    </button>
                </div>
                {/* 할일 목록 */}
                <List todoData={todoData} setTodoData={setTodoData} />
                {/* 할일 추가 */}
                <Form todoData={todoData} setTodoData={setTodoData} />
            </div>
        </div>
    );
};
export default Todo;
