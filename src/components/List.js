import React, { useCallback, useState } from "react";

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
    };

    const handleClick = useCallback(
      (id) => {
        let newTodoData = todoData.filter((data) => data.id !== id);
        console.log("newTodoData", newTodoData);
        setTodoData(newTodoData);
      },
      [todoData]
    );

    if (isEditing) {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded`}
        >
          <div className="items-center">
            <form>
              <input
                value={editedTitle}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
            >
              x
            </button>
            <button className="px-4 py-2 float-right" type="submit">
              save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.droppableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          {/*...*/}
          <div className="items-center">
            <input
              type="checkbox"
              onChange={() => handleCompleteChange(id)}
              defaultChecked={completed}
            />{" "}
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div>
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(true)}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
