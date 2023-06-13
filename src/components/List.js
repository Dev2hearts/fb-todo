import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
    return (
        <div>
            {/* 할일 목록 */}
            {todoData.map(item => (
                // key 는 반복문에서 반드시 unique 해야한다.
                <ListItem key={item.id} item={item} todoData={todoData} setTodoData={setTodoData}/>
            ))}
        </div>
    );
};
export default List;
