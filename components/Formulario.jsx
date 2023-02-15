import React, { useState, useContext } from "react";
import appContext from "context/app/appContext";

const Formulario = () => {

  const AppContext = useContext(appContext);

  const { agregarPassword,agregarDescargas } = AppContext;

  const [tienePassword, setTienePassword] = useState(false);
  return (
    <div className="w-full mt-20">
      <div>
        <label htmlFor="" className="text-lg text-gray-800">
          Eliminar tras:
        </label>

        <select 
          onChange={e => agregarDescargas(parseInt(e.target.value))}
        className="appearance-none w-full mt-2 bg-white border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
          <option value="none" defaultValue={true}>
            --Selecciona--
          </option>
          <option value="1">1 descarga</option>
          <option value="5">5 descarga</option>
          <option value="10">10 descarga</option>
          <option value="20">20 descarga</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <label className="text-lg text-gray-800 mr-2">
            Proteger con Contraseña
          </label>
          <input onChange={() => setTienePassword(!tienePassword)} type="checkbox" />
        </div>
        {tienePassword ? (
          <input
              onChange={ e=> {agregarPassword(e.target.value)}}
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8  rounded leading-none focus:outline-none focus:border-gray-500"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Formulario;
