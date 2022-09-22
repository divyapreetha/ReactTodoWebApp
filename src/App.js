import "./App.css";
import React from "react";
import Title from "./components/Title";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  const moveUpward = async (id) => {
    const tempTodos = [...todos];
    for (let i = 1; i < tempTodos.length; i++) {
      if (tempTodos[i].id === id) {
        let temp = tempTodos[i];
        tempTodos[i] = tempTodos[i - 1];
        await updateDoc(doc(db, "todos", id), {
          title: tempTodos[i - 1].title
        });
        let newId = tempTodos[i - 1].id;
        let newTitle = temp.title;
        tempTodos[i - 1] = temp;
        changeNext(newId, newTitle);
      }
    }
    setTodos(tempTodos);
  };

  const changeNext = async (id, title) => {
    await updateDoc(doc(db, "todos", id), { title: title });
  };

  const moveDownward = async (id) => {
    const tempyTodos = [...todos];
    for (let j = 0; j < tempyTodos.length - 1; j++) {
      if (tempyTodos[j].id === id) {
        let tempy = tempyTodos[j];
        tempyTodos[j] = tempyTodos[j + 1];
        await updateDoc(doc(db, "todos", id), {
          title: tempyTodos[j + 1].title
        });
        let newIdd = tempyTodos[j + 1].id;
        let newTitlee = tempy.title;
        tempyTodos[j + 1] = tempy;
        changeNext(newIdd, newTitlee);
      }
    }
    setTodos(tempyTodos);
  };
  return (
    <div className="App">
      <div>
        <Title />
      </div>

      <div className="todo_container">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            moveUpward={moveUpward}
            moveDownward={moveDownward}
          />
        ))}
      </div>
      <div>
        <AddTodo />
      </div>
    </div>
  );
}
export default App;
