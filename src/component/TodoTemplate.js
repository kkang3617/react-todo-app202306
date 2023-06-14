import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';

import './scss/TodoTemplate.scss';

const TodoTemplate = () => {

  // 서버에 할일 목록(json)을 요청(fetch)해서 받아와야 함.
  

  //todos 배열을 상태 관리
  const [todos, setTodos] = useState([
    {
      id : 1,
      title: '아침 산책하기' ,
      done: false
    },
    {
      id : 2,
      title: '오늘 주간 신문 읽기' ,
      done: true
    },
    {
      id : 3,
      title: '빵 묵기' ,
      done: false
    },
    {
      id : 4,
      title: '운동하기' ,
      done: false
    },
  ])

// id 값 시퀀스 생성함수 
const makeNewId= () => {
  if(todos.length === 0)return 1;
  return todos[todos.length - 1 ].id + 1;
}


  // todoInput에게 todoText를 받아오는 함수
  // 자식 컴포넌트가 부모 컴포넌트에게 데이터를 전달할 때는
  // props 사용이 불가능
  // 부모 컴포넌트에서 함수를 선언(매개변수 꼭 선언!) -> props로 함수를 전달.
  // 자식 컴포넌트에서 전달받은 함수를 호출하면서 매개값으로 데이터를 전달.
  const addTodo = todoText => {
    // console.log('할 일 정보: ', todoText);

    const newTodo = {
      id : makeNewId(),
      title : todoText,
      done : false
    };

    // todos.push(newTodo); (x) -> useState를 사용해서 안됨!!!

    //리액트의 상태변수는 무조건 setter를 통해서만
    //상태값을 변경해야 랜더링에 적용된다.
    //다만, 상태변수가 불변성(immutable)을 가지기 때문에
    //기존 상태에서 변경은 불가능하고,
    //새로운 상태를 만들어서 변경해야 한다.
    // const copyTodos = todos.slice();
    // copyTodos.push(newTodo);
    // setTodos(todos.concat([newTodo])); //두 배열을 합침

    setTodos([...todos, newTodo]);
  }

  // 할 일 삭제 처리 함수
  const removeTodo = id => {
    // console.log(`삭제대상 id: ${id}`);
    
    // 주어진 배열의 값들을 순회하여 조건에 맞는 요소들만 모아서
    // 새로운 배열로 리턴해 주는 함수.
    setTodos(todos.filter(todo => todo.id !== id));
    // id= 1 , 2, 3, 4 가 있고 
    // 삭제 항목은 id=3이라 가정할때 id=1,2,4 (true) 가 새 배열로 리턴.
  };

  // 할 일 체크 처리 함수
  const checkTodo = id => {
    // console.log(`체크한 Todo id: ${id}`);
    
    // const copyTodos = [...todos];
    // for(let cTodo of copyTodos) {
    //   if(cTodo.id === id) {
    //     cTodo.done = !cTodo.done;
    //   }
    // }
    
    // setTodos(copyTodos);

    setTodos(todos.map(todo => todo.id === id ? {...todo, 'done': !todo.done} : todo)); //삼항연산식

  }

  //체크가 안 된 할 일의 개수 카운트 하기
  const countRestTodo = () => {
    return todos.filter(todo => !todo.done).length; 
  }
  // 새로운 배열을 받음 !todo.done 의미 할일 체크 x
    


  //랜더링
  useEffect(() => {
    console.log(todos);
  }, [todos]); //todos라는 배열에 변화가 있을 때~

  return (
    <div className='TodoTemplate'>
        <TodoHeader count={countRestTodo}/> {/* 자식 컴포넌트들*/}
        <TodoMain todoList={todos} remove={removeTodo} check={checkTodo}/>
        <TodoInput addTodo={addTodo}/>
    </div>
  );
}

export default TodoTemplate;