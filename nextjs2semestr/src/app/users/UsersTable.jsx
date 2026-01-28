"use client";
import { Button, Descriptions, message, Modal, Table } from "antd";
import React, { useActionState, useState } from "react";
import { createUser, deleteUser, updateUser } from "../lib/serveractions";
import InputValidated from "../components/InputValidated";

// не работает с use client
export const metadata = {
  title: "Список пользователей",
  description: "...",
};

export default function UsersTable({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      render: (_, render) => (
        <div className="flex gap-x-5">
          {render.photos.map((img) => (
            <img key={img.id} className="w-16 h-16" src={img.url} alt="" />
          ))}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "UserName",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "actions",
      render: (_, render) => (
        <div className="flex gap-x-3">
          <Button onClick={() => editUser(render)} color="pink" variant="solid">
            Edit
          </Button>
          <Button
            onClick={() => deleteUser(render.id)}
            color="danger"
            variant="solid"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  function editUser(user) {
    setUserInfo(user);
    setIsModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateUser(userInfo);
    setIsModalOpen(false);
  }

  const initialState = "";

  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <div>
      <div>
        <form action={formAction} className="flex mb-10 gap-x-5">
          <InputValidated
            validation={state}
            name="email"
            type="email"
            placeholder="email"
          />
          <InputValidated
            validation={state}
            name="username"
            type="text"
            placeholder="username"
          />
          <InputValidated
            validation={state}
            name="age"
            type="number"
            placeholder="age"
          />
          <InputValidated
            validation={state}
            name="password"
            type="text"
            placeholder="password"
          />
          {/* <input required name="email" type="email" placeholder="email" />
          <input required name="username" type="text" placeholder="username" />
          <input required name="age" type="number" placeholder="age" />
          <input required name="password" type="text" placeholder="password" /> */}
          {/* <input name="image" type="file" multiple /> */}
          <Button
            htmlType="submit"
            color="pink"
            variant="solid"
            loading={pending}
          >
            Создать пользователя
          </Button>
          <p>{state?.message}</p>
        </form>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
      />

      <Modal
        title="Редактировать пользователя"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-5"
        >
          <input
            value={userInfo.email}
            onInput={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            name="email"
            type="text"
            placeholder="email"
          />
          <input
            value={userInfo.username}
            onInput={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            type="text"
            value={userInfo.age}
            onInput={(e) =>
              setUserInfo({ ...userInfo, age: Number(e.target.value) })
            }
            name="age"
            type="text"
            placeholder="age"
          />
          <input
            value={userInfo.password}
            onInput={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            name="password"
            type="text"
            placeholder="password"
          />
          <Button htmlType="submit" color="pink" variant="solid">
            Сохранить пользователя
          </Button>
        </form>
      </Modal>
    </div>
  );
}
