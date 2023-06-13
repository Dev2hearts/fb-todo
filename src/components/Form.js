import { useState } from "react";

const Form = ({ todoData, setTodoData }) => {
    // 새로운 할일 state 변수
    const [value, setValue] = useState("");
    // input type="text" 의 value 변경 화면 리랜더링
    const handleChange = e => {
        setValue(e.target.value);
    };
    // form submit 실행시 체크
    const handleSubmit = e => {
        // 웹 브라우저로 url 주소표시창으로 전송을 막아야함.
        // 마치 a 태그의 href를 막아주듯이.
        e.preventDefault();
        // 형식 즉, 키명의 구조를 지켜야한다.
        // 새로운 todo 객체를 만들어 준다.
        const newTodo = { id: Date.now(), title: value, completed: false };
        // state에 저장하고 화면을 리랜더링 된다.
        // todoData 에 추가.
        setTodoData([...todoData, newTodo]);
        // 입력창 초기화
        setValue("");
    };
    return (
        // 할일 추가
        <div>
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="value"
                    style={{ flex: "10", padding: "5px" }}
                    placeholder="입력해 주세요."
                    value={value}
                    onChange={handleChange}
                />
                <input type="submit" style={{ flex: "1" }} value="입력" />
            </form>
        </div>
    );
};
export default Form;
