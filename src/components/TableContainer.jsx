import { useState, useEffect, useMemo } from "react";
// import data from "./../MOCK_DATA.json";
import Table from "./Table";
import { getUsers } from "./../axiosApiHandler";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import EditModal from "./EditModal";
import toast, { Toaster } from "react-hot-toast";

const TableContainer = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [form, setForm] = useState({ gender: "female", nat: "us" });
  const [showEditModal, setShowEditModal] = useState(false);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        header: "Nombre",
        accessorKey: "name",
      },
      {
        header: "Género",
        accessorKey: "gender",
      },
      {
        header: "Correo electrónico",
        accessorKey: "email",
      },
      {
        header: "Celular",
        accessorKey: "cell",
      },
      {
        header: "Nacionalidad",
        accessorKey: "nat",
      },
    ],
    []
  );

  const toogleShowModal = () => {
    setShowEditModal(!showEditModal);
  };

  const formatRowTable = (data) => {
    const formatedData = data.map((row) => {
      return {
        id: row.email,
        name: `${row.name.first} ${row.name.last}`,
        gender: row.gender,
        email: row.email,
        cell: row.cell,
        nat: row.nat,
      };
    });
    setDataTable(formatedData);
  };

  const handleChange = (e) => {
    setForm((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSearch = () => {
    getUsers(form).then(function (response) {
      formatRowTable(response.data.results);
    });
  };

  const deleteUser = () => {
    const filterData = dataTable.filter((row) => {
      return !selectedUsers.some((user) => {
        return row.id === user.id;
      });
    });

    setDataTable(filterData);
    return toast.success("Usuarios eliminados correctamente");
  };

  const editUser = (user) => {
    const editData = dataTable.map((row) => {
      if (row.id === user.id) return user;
      else return row;
    });
    toogleShowModal();
    setDataTable(editData);
    return toast.success("Usuario editado correctamente");
  };

  const verifiedOpenEditUser = () => {
    if (selectedUsers.length === 0) return toast.error("Seleccione un usuario");
    if (selectedUsers.length > 1)
      return toast.error("Solo puede seleccionar un usuario");
    toogleShowModal();
  };

  useEffect(() => {
    getUsers().then(function (response) {
      formatRowTable(response.data.results);
    });
  }, []);
  return (
    <div className="container  pt-5">
      <Toaster />
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="dt-title ">
            <h2>Mi tabla</h2>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 ">
          <div className="d-flex justify-content-end align-items-center">
            <button
              className="btn btn-sm btn-outline-primary px-4 me-2"
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="bi bi-sliders"></i> Filtros
            </button>
            <button
              className="btn btn-sm btn-outline-primary px-4 me-2"
              onClick={verifiedOpenEditUser}
            >
              <i className="bi bi-pencil"></i> Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger px-4 me-2"
              onClick={deleteUser}
            >
              <i className="bi bi-trash3"></i> Eliminar
            </button>
          </div>
        </div>
        {showSearch ? (
          <div className="col-sm-12 mt-4 filtros-content">
            <div className="card border-0 shadow-sm">
              <div className="card-body ">
                <div className="row py-3">
                  <div className="form-group  col-sm-12 col-lg-4 ">
                    <div className="input-group ">
                      <select
                        className="form-select form-select-sm single-select select-bs"
                        name="gender"
                        onChange={(e) => handleChange(e)}
                      >
                        <optgroup label="GENERO">
                          <option value="female">FEMALE</option>
                          <option value="male">MALE</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div className="form-group  col-sm-12 col-lg-4 ">
                    <div className="input-group ">
                      <select
                        className="form-select form-select-sm single-select select-bs"
                        name="nat"
                        onChange={(e) => handleChange(e)}
                      >
                        <optgroup label="NACIONALIDAD">
                          <option value="us">US</option>
                          <option value="au">AU</option>
                          <option value="br">BR</option>
                          <option value="ch">CH</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-4">
                    <button
                      className="btn btn-sm btn-primary px-4 rounded-3 btn-search"
                      onClick={handleSearch}
                    >
                      <i className="bi bi-search me-2"></i> Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="col-sm-12 pt-1">
          <Table
            data={dataTable}
            columns={columns}
            setSelectedUsers={setSelectedUsers}
            setDataTable={setDataTable}
          />
        </div>
      </div>
      {selectedUsers.length > 0 ? (
        <EditModal
          showEditModal={showEditModal}
          toogleShowModal={toogleShowModal}
          selectedUsers={selectedUsers}
          editUser={editUser}
        />
      ) : null}
    </div>
  );
};

export default TableContainer;
