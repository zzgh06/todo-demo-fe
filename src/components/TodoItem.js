import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, toggleComplete, deleteTask}) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? 'item-complete' : ""}`}>
          <div className="todo-content">{item.task}</div>
          <div>by {item?.author?.name}</div>
          <div>
            <button className="button-delete" onClick={()=> deleteTask(item?._id)}>삭제</button>
            <button className="button-delete" onClick={() => toggleComplete(item?._id)}>{item.isComplete ? '끝남' : '안끝남'}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
