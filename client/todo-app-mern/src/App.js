import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, List, Typography, Space, Row, Col, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const API_URL = "http://localhost:5500/api/items";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editInput2, setEditInput2] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Todos from Backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      message.error("Failed to fetch todos!");
      console.error(error);
    }
  };

  // Add Todo
  const handleAddTodo = async () => {
    if (!input.trim() || !input2.trim()) {
      message.warning("Both fields are required!");
      return;
    }

    try {
      await axios.post(API_URL, { item: input, price: input2 });
      message.success("Todo added successfully!");
      setInput("");
      setInput2("");
      fetchTodos();
    } catch (error) {
      message.error("Failed to add todo!");
      console.error(error);
    }
  };

  // Open Edit Modal
  const handleEdit = (id, item, price) => {
    setEditId(id);
    setEditInput(item);
    setEditInput2(price);
    setIsModalOpen(true);
  };

  // Update Todo
  const handleUpdateTodo = async () => {
    if (!editInput.trim() || !editInput2.trim()) {
      message.warning("Both fields are required!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${editId}`, { item: editInput, price: editInput2 });
      message.success("Todo updated successfully!");
      setIsModalOpen(false);
      fetchTodos();
    } catch (error) {
      message.error("Failed to update todo!");
      console.error(error);
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Todo deleted!");
      fetchTodos();
    } catch (error) {
      message.error("Failed to delete todo!");
      console.error(error);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: 50, padding: "0 10px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Title level={3} style={{ textAlign: "center", textTransform: "uppercase" }}>Todo App</Title>

        <Space style={{ width: "100%", marginBottom: 16, display: "flex" }}>
          <Input
            placeholder="Add a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1 }}
          />
          <Input
            placeholder="Add price"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button type="primary" onClick={handleAddTodo} icon={<PlusOutlined />}>
            Add
          </Button>
        </Space>

        <List
          bordered
          dataSource={todos}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(todo._id, todo.item, todo.price)} />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(todo._id)} style={{ color: "red" }} />,
              ]}
            >
              <span>{todo.item} - ${todo.price}</span>
            </List.Item>
          )}
        />
      </Col>

      <Modal
        title="Edit Todo"
        open={isModalOpen}
        onOk={handleUpdateTodo}
        onCancel={() => setIsModalOpen(false)}
        okText="Update"
      >
        <Input
          placeholder="Edit task"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Edit price"
          value={editInput2}
          onChange={(e) => setEditInput2(e.target.value)}
        />
      </Modal>
    </Row>
  );
};

export default App;
