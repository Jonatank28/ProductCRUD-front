import { Product } from "@/app/page";
import { useState } from "react";
import DefaultModal from "./DefaultModal";
import axios from "axios";

interface Props {
  data: Product[];
  getData: () => void
}

const ListProduct = ({ data, getData }: Props) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  function formatToBRL(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3333/delete/${id}`);
      if (res.status === 201) {
        setOpenModalDelete(false);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = async () => {
    console.log("salvando dados:", id);
  }

  const getDataOne = async (id: number) => {
    console.log("peganbdo dados do id:", id);
  }

  return (
    <div className="overflow-x-auto pt-4">
      <table className="min-w-full bg-gray-900 border border-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">Titulo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">Preço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id} className="hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-gray-300">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-gray-300">{product.title}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-gray-300">{product.description}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700 text-gray-300">{formatToBRL(product.price)}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-700">
                <button
                  className="text-blue-400 hover:text-blue-500 font-semibold mr-2"
                  onClick={() => {
                    setOpenModalEdit(true)
                    getDataOne(product.id)
                  }}
                >
                  Editar
                </button>
                <button
                  className="text-red-400 hover:text-red-500 font-semibold"
                  onClick={() => {
                    setOpenModalDelete(true)
                    setId(product.id)
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pt-2 opacity-60 text-sm text-end">Total de produtos: {data.length}</p>

      {/* Modal de edição */}
      <DefaultModal
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        title="Editar produto"
        onClick={handleEdit}
      >
        <h1>Editar produto</h1>
      </DefaultModal>

      {/* Modal de exclusão */}
      <DefaultModal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        title="Excluir produto"
        onClick={handleDelete}
      >
        <p>Tem certeza que deseja excluir este produto?</p>
      </DefaultModal>
    </div>
  );
};

export default ListProduct;
