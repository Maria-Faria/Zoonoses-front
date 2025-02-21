import React from "react";
import "./style.css";
import { ServiceInterface } from "../../pages/Record/index.tsx";

interface ServiceTableInterface {
  services: ServiceInterface[];
  onRemove?: (index: number) => void;
  totalPrice: number
}

function ServiceTable({services, onRemove, totalPrice}: ServiceTableInterface) {
  console.log(services);
  return (
    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Quantidade</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service, index) => (
          <tr key={index}>
            <td>{service.name}</td>
            <td>R${service.price.toFixed(2)}</td>
            <td>{service.qtd}</td>
            <td>R${service.total.toFixed(2)}</td>
            {onRemove &&
              <td><img src="./remove.svg" alt="remove" width={20} style={{cursor: 'pointer'}} onClick={ () => onRemove(index)}/></td>
            }
          </tr>
        ))}
      </tbody>

      <p className="totalPrice">Valor total dos serviços: R${totalPrice.toFixed(2)}</p>
    </table>
  )

}

export default ServiceTable;