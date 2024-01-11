import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { getAllBed,deletePatientAssignDetails } from "../../slices/patientAssign/thunk";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  CardFooter,
  Badge,
  CardHeader
} from "reactstrap";



const PatientAssign: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { patientAssignData = [], loading } = useSelector(
    (state: any) => state.PatientAssign
  );
  const { organization } = useSelector((state: any) => state.Login);
  const { patientData } = useSelector((state: any) => state.Patient);
  const navigate = useNavigate();
  const selectedPatientId = patientData?.id;
 console.log(selectedPatientId);
 useEffect(() => {
    getAllBed(dispatch, organization);
  }, [dispatch, organization]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are You Sure Do You Want To Delete?");
    if (confirmDelete) {
      try {
        await dispatch(deletePatientAssignDetails(id, organization));
        alert("Bed Assigned Deleted Successfully");
      } catch {
        alert("Failed to Delete the Details");
      }
    }
  };

  return (
    <div className="table-container">
      <div className="heading1">
        <h2 className="mt-2" >All Bed Assigned List</h2>
        <hr></hr>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row xs="1" md="8" lg="6">
          {Array.isArray(patientAssignData) && patientAssignData.length > 0 ? (
            patientAssignData.map((patientassign: any, index: number) => (
              <Col>
                <div className="bed-assignment-box">
                  <Card className="mb-3" color="danger" outline>
                    <CardHeader>{}</CardHeader>
                    <CardBody>
                      <CardTitle tag="h6">Patient ID: {patientassign.pid}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        BedNo: {patientassign.bedId}
                      </CardSubtitle>
                    </CardBody>
                    
                      <CardFooter>
                        <Badge
                          color={patientassign.pid ? "danger" : "success"}
                          tag="h4"
                        >
                          {patientassign.pid ? "Not Available" : "Available"}
                        </Badge>
                        <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger" 
                    onClick={() => handleDelete(patientassign.id)}
                    style={{ cursor: "pointer",marginLeft:'40px' }}
                  />
                </CardFooter>
                      </Card>
                </div>
              </Col>
            ))
          ) : (
            <p>No bed assignments available.</p>
          )}
        </Row>
      )}
     
    </div>
  );
};

export default PatientAssign
