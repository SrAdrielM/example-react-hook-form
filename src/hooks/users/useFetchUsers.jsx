import { useState, useEffect } from 'react';
import { url } from '../../utils/apiUrl';
import {toast} from 'react-hot-toast';
 
const useFetchUser =()=>{
//toda la logica a realizar
 
    const [dataUser, setDataUser] = useState([]);
 
    const getUsers = async () => {
        try {
           const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDataUser(data);
            toast.success("Usuarios obtenidos correctamente");
           
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Error al obtener los usuarios");
        }
    }
 
      //funcion para obtener un usuario por su id
  //se usa async/await para manejar la asincronía de la llamada a la API
 
  const getUserById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        console.log("Failed to fetch user");
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      console.log("Failed to fetch user");
      return null;
    }
  };
 
    //useEffect para llamar a la funcion getUsers al cargar el componente
    useEffect(() => {
        getUsers();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente
 
//retornar variables y funciones que se necesiten en el componente
    return {
        dataUser,
        setDataUser,
        getUsers,
        getUserById
    }
 
}
export default useFetchUser;