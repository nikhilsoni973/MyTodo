import React, { useState, useEffect } from "react";
import "./style.css";
const getLocalStorage = () => {
  const list = localStorage.getItem("MyTodo");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorage());
  const [iseditItem, setIsEditItem] = useState("");
  const [toggleButton, settoggleButton] = useState(false);
  const addItem = () => {
    if (!inputdata) {
      alert("Pls fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === iseditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      settoggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    settoggleButton(true);
  };
  const deleteItem = (index) => {
    const updateItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updateItem);
  };
  const removeAll = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("MyTodo", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/notes.png" alt="todologo" />
            <figcaption>Add Your Task List Here🙌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Your Task"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus-circle add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElement.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElement.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span>CHECKLIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
