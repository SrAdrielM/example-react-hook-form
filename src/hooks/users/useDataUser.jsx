 import { useState, useEffect} from "react";
import { toast } from "react-hot-toast";
import { url } from "../../utils/apiUrl";
import useFetchUser from "./useFetchUsers";
import { useNavigate, useParams } from "react-router-dom";

const useDataUser = (methods) => {
 
  const { id } = useParams(); // Obtener el id del usuario desde los parámetros de la URL
  const navigate = useNavigate(); // Hook para navegar a otras rutas
 
  const { getUsers, getUserById } = useFetchUser(); // Import the getUsers function to refresh the user list
 
  //funcionalidad para guardar el usuaio
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
 
  const saveUserForm = async (dataForm) => {
    try{
         // enviar la solicitud POST a la API
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to add user");
        throw new Error("Failed to add user");
      }
      toast.success("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Error al guardar el usuario");
    }
    finally {
     getUsers(); // Refresh the user list after saving
      reset(); // Reset the form after submission
    }
  }
 
      const handleUserAction = (dataForm) => {
        if (id) {
      // Si hay un id, se trata de una edición
      editUser(dataForm);
    }else {
    // Si no hay id, se trata de una creación
      saveUserForm(dataForm);
    }
  };
 
    // Función para editar un usuario
  // Esta función se llama cuando se envía el formulario de edición
  // y envía una solicitud PUT a la API para actualizar los datos del usuario
 
  const editUser = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("Failed to update user");
        throw new Error("Failed to update user");
      }
      toast.success("User updated successfully");
      navigate("/home"); // Redirect to home after updating
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      reset(); // Reset the form after submission
      getUsers(); // Refresh the user list after updating
    }
  };
 
  // Cargar los datos del usuario por id
  // Esta función se llama para obtener los datos del usuario cuando el componente se monta o cuando cambia el id
  const loadUser = async () => {
    if (id) {
      const user = await getUserById(id);
      if (user) {
        reset({
          nombre: user?.nombre,
          apellido: user?.apellido,
          correo: user?.correo,
          especialidad: user?.especialidad,
        });
      }
    }
  };
 
    // useEffect para cargar los datos del usuario cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    loadUser();
  }, [id]); // Dependencia en id para recargar los datos si cambia
 
 
 
  return { saveUserForm, register,
    handleSubmit: handleSubmit(handleUserAction),
     errors, loadUser
    };
};


export default useDataUser