import React from "react";
import { useState } from "react";

const ListItem = ({ item, todoData, setTodoData }) => {
    // console.log("ListItem 렌더링", item);

    // 편집 상태 설정 state
    const [isEdit, setIsEdit] = useState(false);
    // 편집 상태 타이틀 설정 state
    const [editTitle, setEditTitle] = useState(item.title);
    const getStyle = _completed => {
        return {
            padding: "10px",
            textDecoration: _completed ? "line-through" : "none",
        };
    };
    // 이벤트 핸들러
    const handleDeleteClick = _id => {
        // 전달된 ID를 검색해서 목록에서 제거
        // 1. 전달된 id로 해당하는 목록 찾기 제외
        // 2. 새로운 목록으로 갱신해서 화면 리랜더링
        // 3. 배열의 고차함수 중 filter 를 사용
        const newTodoData = todoData.filter(item => item.id !== _id);
        setTodoData(newTodoData);
    };
    const handleEditClick = () => {
        setIsEdit(true);
    };
    const handleEditChange = e => {
        setEditTitle(e.target.value);
    };
    const handleCancleClick = () => {
        setIsEdit(false);
    };
    const handleSaveClick = _id => {
        let newTodoData = todoData.map(item => {
            if (item.id === _id) {
                item.title = editTitle;
            }
            return item;
        });
        setTodoData(newTodoData);
        setIsEdit(false);
    };
    const handleCompletChange = _id => {
        // 중요한 것은 id에 해당하는 것만 수정하면 되는게 아니다.
        // state 는 항상 새롭게 만든 내용 즉, 배열로 업데이트 해야한다 !!
        // 새로운 배열 생성 후 set
        let newTodoData = todoData.map(item => {
            if (item.id === _id) {
                item.completed = !item.completed;
            }
            return item;
        });
        setTodoData(newTodoData);
    };
    if (isEdit) {
        // 편집중
        return (
            <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
                <div className="items-center w-3/5 px-6">
                    <input
                        className="w-full px-3 py-2 mr-3 text-gray-500 rounded"
                        type="text"
                        value={editTitle}
                        onChange={handleEditChange}
                    />
                </div>
                <div className="flex items-center">
                    <button
                        className="px-4 py-2 float-right"
                        onClick={() => {
                            handleSaveClick(item.id);
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 float-right"
                        onClick={handleCancleClick}
                    >
                        Cancle
                    </button>
                </div>
            </div>
        );
    } else {
        // 일반상태
        return (
            <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
                <div className="items-center flex" style={getStyle(item.completed)}>
                    {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
                    <input
                        type="checkbox"
                        defaultChecked={item.completed}
                        onChange={() => handleCompletChange(item.id)}
                    ></input>
                    <span className="ml-3">{item.title}</span>
                </div>
                <div className="flex items-center">
                    <button
                        className="px-4 py-2 float-right"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 float-right"
                        onClick={() => {
                            handleDeleteClick(item.id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
};
export default ListItem;