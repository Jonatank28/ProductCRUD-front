import { useState } from "react";
import DefaultModal from "./DefaultModal";
import axios from "axios";

const AddProduct = ({ getData }: { getData: () => void }) => {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const onSubmit = async () => {
    if (!title || !description || price === 0) return alert("Preencha todos os campos");
    const data = {
      title,
      description,
      price
    }
    try {
      const res = await axios.post("http://localhost:3333/create", {
        data
      })
      if (res.status === 201) {
        setOpenModal(false);
        setTitle('');
        setDescription('');
        setPrice(0);
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          className="text-white p-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold"
          onClick={() => setOpenModal(true)}
        >
          Adicionar
        </button>
      </div>
      <DefaultModal
        open={openModal}
        title="Adicionar novo produto"
        onClose={() => setOpenModal(false)}
        onClick={onSubmit}
      >
        <form>
          <div className="flex flex-col gap-2">
            <input
              className="p-2 rounded border bg-slate-700 border-slate-700 text-white w-full" type="text" placeholder="Titulo"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <input
              className="p-2 rounded border bg-slate-700 border-slate-700 text-white w-full" type="text" placeholder="Descrição"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <input
              className="p-2 rounded border bg-slate-700 border-slate-700 text-white w-full" type="number" placeholder="Preço"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
          </div>
        </form>
      </DefaultModal>
    </>
  )
}

export default AddProduct