import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

interface SideBarInterface {
  isAdmin: boolean
  addHospitalRoute: string
  editHospitalRoute: string
  addRecordRoute: string
  searchRecordRoute: string
  addServiceRoute: string
  editServiceRoute: string
  myProfile: string
  addUserRoute: string
  editUserRoute: string
  logout: () => void
}

function SideBar({isAdmin, addHospitalRoute, editHospitalRoute, addRecordRoute, searchRecordRoute, addServiceRoute, editServiceRoute, myProfile, addUserRoute, editUserRoute, logout}: SideBarInterface) {
  const [expandUsers, setExpandUsers] = useState(false);
  const [expandHospitals, setExpandHospitals] = useState(false);
  const [expandServices, setExpandServices] = useState(false);
  const [expandRecords, setExpandRecords] = useState(false);

  return (
    <div className="side-bar">
      <img 
        src="/logo-header.svg"
        alt='logo'
        width={230}
        height={130}
        style={{marginTop: '20px', alignSelf: 'center'}}
      />

      <div className="side-bar-menu">
        <ul className="main-list">
          <li className="main-list-item">
            <img 
              src="/hospital/hospital.svg"
              alt="hospitals"
              width={30}
              height={30}
            />

            <p style={{display: "flex", alignItems: "center", gap: "10px", margin: '0', padding: '0'}}>Clínicas
            
              <img 
                src= {!expandHospitals ? "/plus_icon.svg" : "/minus_icon.svg"}
                alt="plus"
                width={20}
                height={20}
                style={{cursor: "pointer"}}
                onClick={() => setExpandHospitals(!expandHospitals)}
              />
            </p>
          </li>
          
          {expandHospitals && (
              <li className="sub-list">
                <ul>
                  <li>
                    <Link to={addHospitalRoute} className="sub-list-link">
                      <img 
                        src="/hospital/add.svg"
                        alt="hospital"
                        width={20}
                        height={20}
                      />
                      Adicionar clínica
                    </Link>
                  </li>

                  <li>
                    <Link to={editHospitalRoute} className="sub-list-link">
                      <img 
                        src="/hospital/edit.svg"
                        alt="hospital"
                        width={20}
                        height={20}
                      />
                      Editar clínica
                    </Link>
                  </li>
                </ul>
              </li>
            )
          }

          <li className="main-list-item">
            <img 
              src="/record/record.svg"
              alt="fichas"
              width={30}
              height={30}
            />

            <p style={{display: "flex", alignItems: "center", gap: "10px", margin: '0', padding: '0'}}>Fichas
            
              <img 
                src= {!expandRecords ? "/plus_icon.svg" : "/minus_icon.svg"}
                alt="plus"
                width={20}
                height={20}
                style={{cursor: "pointer"}}
                onClick={() => setExpandRecords(!expandRecords)}
              />
            </p>
          </li>

          {expandRecords && (
              <li className="sub-list">
                <ul>
                  <li>
                    <Link to={addRecordRoute} className="sub-list-link">
                      <img 
                        src="/record/new_record.svg"
                        alt="record"
                        width={20}
                        height={20}
                      />
                      Registrar nova ficha
                    </Link>
                  </li>

                  <li>
                    <Link to={searchRecordRoute} className="sub-list-link">
                      <img 
                        src="/record/search.svg"
                        alt="record"
                        width={25}
                        height={25}
                      />
                      Consultar fichas
                    </Link>
                  </li>
                </ul>
              </li>
            )
          }

          <li className="main-list-item">
            <img 
              src="/service/service-icon.svg"
              alt="services"
              width={30}
              height={30}
            />

            <p style={{display: "flex", alignItems: "center", gap: "10px", margin: '0', padding: '0'}}>Serviços
            
              <img 
                src= {!expandServices ? "/plus_icon.svg" : "/minus_icon.svg"}
                alt="plus"
                width={20}
                height={20}
                style={{cursor: "pointer"}}
                onClick={() => setExpandServices(!expandServices)}
              />
            </p>
          </li>
          
          {expandServices && (
            <li className="sub-list">
              <ul>
                <li>
                  <Link to={addServiceRoute} className="sub-list-link">
                    <img 
                      src="/service/add.svg"
                      alt="service"
                      width={25}
                      height={25}
                    />
                    Adicionar serviço
                  </Link>
                </li>

                <li>
                  <Link to={editServiceRoute} className="sub-list-link">
                    <img 
                      src="/service/edit.svg"
                      alt="service"
                      width={20}
                      height={20}
                    />
                    Editar serviço
                  </Link>
                </li>
              </ul>
            </li>
            )
          }

          <li className="main-list-item">
            <img 
              src="/users.svg"
              alt="users"
              width={30}
              height={30}
            />

            <p style={{display: "flex", alignItems: "center", gap: "10px", margin: '0', padding: '0'}}>Usuários
            
              <img 
                src= {!expandUsers ? "/plus_icon.svg" : "/minus_icon.svg"}
                alt="plus"
                width={20}
                height={20}
                style={{cursor: "pointer"}}
                onClick={() => setExpandUsers(!expandUsers)}
              />
            </p>
          </li>
          
          {expandUsers && (
              <li className="sub-list">
                <ul>
                  <li>
                    <Link to={myProfile} className="sub-list-link">
                      <img 
                        src="/user-icon.svg"
                        alt="user"
                        width={20}
                        height={20}
                      />
                      Meu perfil
                    </Link>
                  </li>

                  {isAdmin && (
                    <>
                      <li>
                        <Link to={addUserRoute} className="sub-list-link">
                          <img 
                            src="/add_user.svg"
                            alt="user"
                            width={20}
                            height={20}
                          />
                          Adicionar usuário
                        </Link>
                      </li>

                      <li>
                        <Link to={editUserRoute} className="sub-list-link">
                          <img 
                            src="/edit_user.svg"
                            alt="user"
                            width={20}
                            height={20}
                          />
                          Editar usuário
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            )
          }
        </ul>

        <div className="logout" style={{display: "flex", alignItems: "center", gap: "10px", marginLeft: "5%", marginTop: "auto"}} onClick={logout}>
          <img 
            src="/exit.svg"
            alt="exit"
            width={45}
            height={45}
            style={{cursor: "pointer"}}
          />

          <p style={{cursor: "pointer", color: "#F8F5F5", fontWeight: "600", fontSize: "20px"}}>Sair</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar;