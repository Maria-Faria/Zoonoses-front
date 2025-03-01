import React, { useEffect } from "react";
import "./style.css";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "../../components/Header/index";
import ErrorMessage from "../../components/ErrorMessage/index";
import SuccessMessage from "../../components/SuccessMessage/index";
import Button from "../../components/Button/index";
import Input from "../../components/Input/index";
import Select, { OptionInterface } from "../../components/Select/index";
import DatePicker from "react-datepicker";
import { ServiceInterface, ServiceOption } from "../Record/index";
import ServiceTable from "../../components/ServiceTable/index";
import PageTitle from "../../components/PageTitle/index";

function RecordView() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);

  const [ loading, setLoading ] = useState(false);
  const [ initialLoading, setInitialLoading ] = useState(true);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');


  const [ dogs, setDogs ] = useState<OptionInterface[]>([]);
  const [ cats, setCats ] = useState<OptionInterface[]>([]);

  const [ tutorName, setTutorName ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ phone, setPhone ] = useState('');

  const [ petInputType, setPetInputType ] = useState('entregue');
  const [ petInputDate, setPetInputDate ] = useState<Date | null>(null);
  const [ petSpecie, setPetSpecie ] = useState('canina');
  const [ petBreed, setPetBreed ] = useState('SRD');
  const [ petPlate, setPetPlate ] = useState('');
  const [ petMicrochip, setPetMicrochip ] = useState('');
  const [ petGender, setPetGender ] = useState('femea');
  const [ petColor, setPetColor ] = useState('');
  const [ petAge, setPetAge ] = useState('');
  const [ petWeight, setPetWeight ] = useState('');
  const [ petSize, setPetSize ] = useState('pequeno');

  const [ services, setServices ] = useState<ServiceInterface[]>([]);
  const [ totalPrice, setTotalPrice ] = useState(0);

  const getDogs = async () => {
    try {
      
      const response = await fetch('/caes.json', {
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
      
      const response = await fetch('/gatos.json', {
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

    setCpf(value);
  }

  const handleCepChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    setCep(value);
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const address = await handleCep();

    try {
      const response = await fetch(`https://zoonoses.onrender.com/record/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${cookies.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tutor: {
            name: tutorName,
            cep,
            state: address.uf,
            city: address.localidade,
            neighborhood: address.bairro,
            road: address.logradouro,
            number,
            phone
          },
          pet: {
            inputType: petInputType,
            inputDate: petInputDate,
            specie: petSpecie,
            breed: petBreed,
            color: petColor,
            gender: petGender,
            age: petAge,
            size: petSize,
            weight: petWeight
          }
        })
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);
      
      }else {
        setLoading(false);
        setSuccess('Ficha atualizada com sucesso!');
      }
      
    } catch (error) {
      setError('Ocorreu um erro ao enviar o formulário');
    }
  }

  const getRecordInfo = async () => {
    try {
      const response = await fetch(`https://zoonoses.onrender.com/record/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${cookies.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

      if(responseData.error) {
        setError(responseData.error);
      
      }else {
        setTutorName(responseData.tutor.name);
        setCpf(responseData.tutor.cpf);
        setCep(responseData.tutor.cep);
        setNumber(responseData.tutor.number);
        setPhone(responseData.tutor.phone);

        setPetAge(responseData.pet.age);
        setPetBreed(responseData.pet.breed);
        setPetColor(responseData.pet.color);
        setPetGender(responseData.pet.gender);
        setPetInputDate(new Date(responseData.pet.inputDate + "T00:00:00"));
        setPetInputType(responseData.pet.inputType);
        setPetMicrochip(responseData.pet.microchip);
        setPetPlate(responseData.pet.plate);
        setPetSize(responseData.pet.size);
        setPetSpecie(responseData.pet.specie);
        setPetWeight(responseData.pet.weight);

        setServices(responseData.services);
        setTotalPrice(responseData.totalPrice);

        setInitialLoading(false);
      }

    } catch (error) {
      setError('Ocorreu um erro ao buscar as informações da ficha');
    }
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
      return error;
    }
  }

  useEffect(() => {
    getRecordInfo();
    getCats();
    getDogs();

  }, []);

  return (
    <div className="record-view">
      <Header name={localStorage.getItem('name') as string} />

      <PageTitle title={`Ficha ${id}`} widthTitle="30%"/>

      {!initialLoading && 

        <form method="post" onSubmit={handleSubmit} className="record-save">
          <p className="record-title-p">Tutor</p>

          <Input 
            label="CPF do tutor:"
            placeholder="Ex: 000.000.000-00"
            type="text"
            name="cpf"
            value={cpf}
            onChange={(event) => handleCpfChange(event.target.value)}
            maxLength={14}
            readonly={true}
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
              value={petInputType}
              onChange={(event) => setPetInputType(event.target.value)}
            />

            <div className="date-input">
              <label>Data de entrada:</label>
              <DatePicker className="date-picker" selected={petInputDate} 
                onChange={(date) => setPetInputDate(date)}
                dateFormat="dd/MM/yyyy"
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
              value={petSpecie}
              onChange={(event) => setPetSpecie(event.target.value)}
            />

            <Select 
              label="Raça: "
              name="breed"
              options={petSpecie === 'canina' ? dogs : cats}
              value={petBreed}
              onChange={(event) => setPetBreed(event.target.value)}
            />

            <Input 
              label="Cor:"
              type="text"
              placeholder="Ex: preta"
              name="color"
              value={petColor}
              onChange={(event) => setPetColor(event.target.value)}
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
                value={petPlate}
                onChange={(event) => setPetPlate(event.target.value)}
                width="100px"
                gap="8px"
                justifyContent="flex-start"
                readonly={true}
              />

              <Input 
                label="Microchip:"
                type="text"
                placeholder="Ex: 01234567891011"
                name="microchip"
                value={petMicrochip}
                onChange={(event) => setPetMicrochip(event.target.value)}
                width="150px"
                gap="8px"
                justifyContent="flex-start"
                readonly={true}
              />

              <Select 
                label="Sexo: "
                name="gender"
                options={[
                  { value: 'femea', text: 'Fêmea' },
                  { value: 'macho', text: 'Macho' },
                ]}
                value={petGender}
                onChange={(event) => setPetGender(event.target.value)}
                width="100px"
              />
            </div>

            <div className="select-input">
              <Input 
                label="Idade (em anos):"
                type="text"
                placeholder="Ex: 14"
                name="age"
                value={petAge}
                onChange={(event) => setPetAge(event.target.value)}
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
                value={petSize}
                onChange={(event) => setPetSize(event.target.value)}
              />

              <Input 
                label="Peso (em kg):"
                type="text"
                placeholder="Ex: 10"
                name="weight"
                value={petWeight}
                onChange={(event) => setPetWeight(event.target.value)}
                width="100px"
                gap="8px"
                justifyContent="flex-start"
              />
            </div>

          <p className="record-title-p">Serviços</p>

          {services.length > 0 && (            
            <ServiceTable services={services} totalPrice={totalPrice}/>
          )}

          {loading && <img src="/loading.gif" alt="loading" width={50}/>}
          {error && <ErrorMessage messageError={error} />}

          {success && 
            <div style={{display: 'flex', justifyContent: 'center', width: '80%'}}>
              <SuccessMessage messageSuccess={success} />
            </div>
          }

          <Button text="Salvar" type="submit"/>
        </form>
      }

      {initialLoading && <img src="/loading.gif" alt="loading" width={50} style={{marginTop: '70px'}}/>}

    </div>
  )
}

export default RecordView;