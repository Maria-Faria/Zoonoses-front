import React, { useEffect } from "react";
import "./style.css";

import { useState } from "react";
import Header from "../../components/Header/index.tsx";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";
import Select, { OptionInterface } from "../../components/Select/index.tsx";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ServiceTable from "../../components/ServiceTable/index.tsx";

import { useCookies } from "react-cookie";

import ErrorMessage from "../../components/ErrorMessage/index.tsx";
import SuccessMessage from "../../components/SuccessMessage/index.tsx";
import PageTitle from "../../components/PageTitle/index.tsx";

export interface ServiceInterface {
  name: string;
  qtd: number;
  price: number;
  total: number;
}

export interface ServiceOption {
  type: string;
  price: number;
}

function Record() {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const navigate = useNavigate();
  const [ screen, setScreen ] = useState<'tutor' | 'pet' | 'servico'>('tutor');

  const [ dogs, setDogs ] = useState<OptionInterface[]>([]);
  const [ cats, setCats ] = useState<OptionInterface[]>([]);

  const [ servicesOptions, setServicesOptions ] = useState<ServiceOption[]>([]);

  const [ tutorName, setTutorName ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ phone, setPhone ] = useState('');

  const [ inputType, setInputType ] = useState('entregue');
  const [ inputDate, setInputDate ] = useState<Date | null>(null);
  const [ inputSpecie, setInputSpecie ] = useState('canina');
  const [ inputBreed, setInputBreed ] = useState('SRD');
  const [ inputPlate, setInputPlate ] = useState('');
  const [ inputMicrochip, setInputMicrochip ] = useState('');
  const [ inputGender, setInputGender ] = useState('femea');
  const [ inputColor, setInputColor ] = useState('');
  const [ inputAge, setInputAge ] = useState('');
  const [ inputWeight, setInputWeight ] = useState('');
  const [ inputSize, setInputSize ] = useState('pequeno');

  const [ inputService, setInputService ] = useState('');
  const [ inputQtd, setInputQtd ] = useState('');

  const [ services, setServices ] = useState<ServiceInterface[]>([]);

  const [ totalPrice, setTotalPrice ] = useState(0);

  const [ messageError, setMessageError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState('');

  const removeItem = (indexToRemove: number) => {
    setServices(services.filter((_, index) => index !== indexToRemove));
    setTotalPrice(totalPrice - services[indexToRemove].total);
  }

  const getDogs = async () => {
    try {
      
      const response = await fetch('./caes.json', {
        headers: {
          Accept: 'application/json'
        }
      });
      const responseData = await response.json();
  
      setDogs(responseData.racas);
    } catch (error) {
      return error;
    }
  }

  const getCats = async () => {
    try {
      
      const response = await fetch('./gatos.json', {
        headers: {
          Accept: 'application/json'
        }
      });
      const responseData = await response.json();
  
      setCats(responseData.racas);
    } catch (error) {
      return error;
    }
  }

  const getServicesOptions = async() => {
    try {
      const response = await fetch('https://zoonoses.onrender.com/service', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

      setServicesOptions(responseData);
      setInputService(responseData[0].type);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {    
    getDogs();
    getCats();
    getServicesOptions();

  }, []);

  const cpfCheck = async (value: string) => {
    try {
      const response = await fetch(`https://zoonoses.onrender.com/tutor/check-cpf?cpf=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const responseData = await response.json();

      if(!responseData.error) {
        setTutorName(responseData.name);
        setCep(responseData.cep);
        setNumber(responseData.number);
        setPhone(responseData.phone);
      }
      
    } catch (error) {
      return error;
    }
  }

  const handleCpfChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 3) {
      value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    }

    if(value.length > 6) {
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    }

    if(value.length > 9) {
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    }

    if(value.length === 14) {
      cpfCheck(value);
    }

    setCpf(value);

  }

  const handleCepChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    setCep(value);
  }

  const handlePhoneChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    }

    if(value.length > 4) {
      value = value.replace(/^\((\d{2})\) (\d{4})(\d)/, "($1) $2-$3");
    }

    setPhone(value);
  }

  const handleCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const responseData = await response.json();

      return responseData;

    }catch(error) {
      setMessageError("Ocorreu um erro ao buscar o CEP!");
    }
  }

  const handleRecord = async(event: React.FormEvent) => {
    event.preventDefault();
    setMessageError('');
    setSuccess('');
    setLoading(true);

    const address = await handleCep();

    try {
      const response = await fetch('https://zoonoses.onrender.com/record/new-record', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          tutor: {
            name: tutorName,
            cpf,
            cep,
            state: address.uf,
            city: address.localidade,
            neighborhood: address.bairro,
            road: address.logradouro,
            number,
            phone
          },
          pet: {
            inputType,
            inputDate,
            specie: inputSpecie,
            breed: inputBreed,
            color: inputColor,
            plate: inputPlate,
            microchip: inputMicrochip,
            gender: inputGender,
            age: inputAge,
            size: inputSize,
            weight: inputWeight
          },
          service: {
            services
          },
          inputQtd,
          totalPrice
        })
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setMessageError(responseData.error);
      
      }else {
        setLoading(false);
        setSuccess(responseData.message);
      }

      setTimeout(() => {        
        navigate(`/ficha/${responseData.id}`);
      }, 2000);
      
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="record">
      <Header name={localStorage.getItem('name') as string}/>
      <PageTitle title="Cadastrar Nova Ficha" />

      {screen === 'tutor' && (
        <form className="form-record" onSubmit={() => setScreen('pet')}>

          <p className="record-title-p">Tutor</p>

          <Input 
            label="Digite o CPF do tutor:"
            type="text"
            placeholder="Ex: 000.000.000-00"
            name="cpf"
            value={cpf}
            onChange={(event) => handleCpfChange(event.target.value)}
            maxLength={14}
          />

          <Input 
            label="Digite o nome do tutor:"
            type="text"
            placeholder="Ex: João da Silva"
            name="name"
            value={tutorName}
            onChange={(event) => setTutorName(event.target.value)}
          />

          <Input 
            label="Digite o CEP do endereço do tutor:"
            type="text"
            placeholder="Ex: 11674-710"
            name="cep"
            value={cep}
            onChange={(event) => handleCepChange(event.target.value)}
            maxLength={9}
          />

          <Input 
            label="Digite o número do endereço do tutor:"
            type="text"
            placeholder="Ex: 123"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />

          <Input 
            label="Digite o telefone do tutor:"
            type="text"
            placeholder="Ex: (00) 0000-00000"
            name="phone"
            value={phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            maxLength={15}
          />

          <Button type="submit" text="Próximo"/>
        </form>
      )}

      {screen === 'pet' && (
        <form className="form-record" onSubmit={() => setScreen('servico')}>

          <p className="record-title-p">Animal</p>

          <div className="select-input">
            <Select 
              label="Tipo de entrada do animal: "
              name="type"
              options={[
                { value: 'entregue', text: 'Entregue' },
                { value: 'recolhido', text: 'Recolhido' },
                { value: 'abandonado', text: 'Abandonado' },
                { value: 'outro', text: 'Outro' }
              ]}
              value={inputType}
              onChange={(event) => setInputType(event.target.value)}
            />

            <div className="date-input">
              <label>Data de entrada:</label>
              <DatePicker className="date-picker" selected={inputDate} 
                onChange={(date) => setInputDate(date)}
                dateFormat='dd/MM/yyyy'
                required
              />
            </div>
          </div>

          <div className="select-input">
            <Select 
              label="Espécie do animal: "
              name="specie"
              options={[
                { value: 'canina', text: 'Canina' },
                { value: 'felina', text: 'Felina' },
              ]}
              value={inputSpecie}
              onChange={(event) => setInputSpecie(event.target.value)}
            />

            <Select 
              label="Raça: "
              name="breed"
              options={inputSpecie === 'canina' ? dogs : cats}
              value={inputBreed}
              onChange={(event) => setInputBreed(event.target.value)}
            />

            <Input 
              label="Cor:"
              type="text"
              placeholder="Ex: preta"
              name="color"
              value={inputColor}
              onChange={(event) => setInputColor(event.target.value)}
              width="100px"
              gap="8px"
              justifyContent="flex-start"
            />
          </div>

          <div className="select-input">
            <Input 
              label="Plaqueta:"
              type="text"
              placeholder="Ex: 1446"
              name="plate"
              value={inputPlate}
              onChange={(event) => setInputPlate(event.target.value)}
              width="100px"
              gap="8px"
              justifyContent="flex-start"
            />

            <Input 
              label="Microchip:"
              type="text"
              placeholder="Ex: 01234567891011"
              name="microchip"
              value={inputMicrochip}
              onChange={(event) => setInputMicrochip(event.target.value)}
              width="150px"
              gap="8px"
              justifyContent="flex-start"
            />

            <Select 
              label="Sexo: "
              name="gender"
              options={[
                { value: 'femea', text: 'Fêmea' },
                { value: 'macho', text: 'Macho' },
              ]}
              value={inputGender}
              onChange={(event) => setInputGender(event.target.value)}
              width="100px"
            />
          </div>

          <div className="select-input">
            <Input 
              label="Idade (em anos):"
              type="text"
              placeholder="Ex: 14"
              name="age"
              value={inputAge}
              onChange={(event) => setInputAge(event.target.value)}
              width="100px"
              gap="8px"
              justifyContent="flex-start"
            />

            <Select 
              label="Porte: "
              name="size"
              options={[
                { value: 'pequeno', text: 'Pequeno' },
                { value: 'medio', text: 'Médio' },
                { value: 'grande', text: 'Grande' },
              ]}
              value={inputSize}
              onChange={(event) => setInputSize(event.target.value)}
            />

            <Input 
              label="Peso (em kg):"
              type="text"
              placeholder="Ex: 10"
              name="weight"
              value={inputWeight}
              onChange={(event) => setInputWeight(event.target.value)}
              width="100px"
              gap="8px"
              justifyContent="flex-start"
            />
          </div>

        <div className="buttons">
          <Button text="Anterior" onClick={() => setScreen('tutor')}/>
          <Button text="Próximo" type="submit"/>
        </div>
      </form>
      )}

      {screen === 'servico' && (
        <form className="form-record" onSubmit={handleRecord}>

          <p className="record-title-p">Serviços</p>

          <div className="service-input">
            <Select 
              label="Tipo de serviço:"
              name="service"
              options={servicesOptions.map(option => ({value: option.type, text: option.type}))}
              value={inputService}
              onChange={(event) => {
                setInputService(event.target.value);
              }}
              width="300px"
            />

            <Input 
              label="Quantidade:"
              type="number"
              placeholder="Ex: 20"
              name="qtd"
              value={inputQtd}
              onChange={(event) => setInputQtd(event.target.value)}
              width="100px"
              gap="8px"
              justifyContent="flex-start"
            />

            <img 
              src="./check.svg"
              alt="check-icon"
              width={20}
              style={{cursor: 'pointer'}}
              onClick={() => {
                const service = servicesOptions.find(service => service.type === inputService);
                
                if(service) {
                  setServices([...services, {name: inputService, qtd: parseInt(inputQtd), price: service.price, total: service.price * parseInt(inputQtd)}]);
                  setTotalPrice(totalPrice + service.price * parseInt(inputQtd));
                }
              }}
            />

          </div>

          {services.length > 0 && (            
            <ServiceTable services={services} onRemove={removeItem} totalPrice={totalPrice}/>
          )}

        {loading && <img src="./loading.gif" alt="loading" width={50}/>}
        {messageError && <ErrorMessage messageError={messageError} />}

        {success && 
          <div style={{display: 'flex', justifyContent: 'center', width: '80%'}}>
            <SuccessMessage messageSuccess={success} />
          </div>
        }

        <div className="buttons">
          <Button text="Anterior" onClick={() => setScreen('pet')}/>
          <Button text="Finalizar"type="submit" color="green"/>
        </div>
      </form>
      )}
    </div>
  )
}

export default Record;