import Layout from "components/Layout";
import React, {useContext,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import authContext from "context/auth/authContext";
import Alerta from "components/Alerta";

const CrearCuenta = () => {

    //acceder al state

    const AuthContext = useContext(authContext)
    const {registrarUsuario, mensaje} = AuthContext



  //formulario y validacion con formik y yup

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("Es obligatorio"),

      password: Yup.string()

        .required("El password no puede ir vacio")
        .min(6, "El password debe contener al menos 6 caracteres"),
    }),
    onSubmit: (valores) => {
      registrarUsuario(valores)
    },
  });
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-10">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Crear Cuenta
        </h2>

        {mensaje &&  <Alerta /> }
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            action=""
          >
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-black text-sm mb-2 font-bold"
              >
                Nombre
              </label>
              <input
                type="text"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="nombre"
                placeholder="Nombre de usuario"
                className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />

              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-black text-sm mb-2 font-bold"
              >
                Email
              </label>
              <input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                placeholder="Email de usuario"
                className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-black text-sm mb-2 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                placeholder="Password de usuario"
                className="shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>

            <input
            value='Registrarse'

              type="submit"
              className="bg-red-500 w-full transition-all hover:bg-gray-900 p-2 text-white uppercase font-bold"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CrearCuenta;
