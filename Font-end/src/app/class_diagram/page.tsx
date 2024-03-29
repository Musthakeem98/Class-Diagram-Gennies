"use client";
import "@/styles/fact_checker.css";
import { useEffect, useState } from "react";
import DialogBox from "./componets/DialogBox";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function FactChecker() {
  const [newsText, setNewsText] = useState("");
  const [classDiagramTopic, setTopic] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [umlCode, setUmlCode] = useState("");

  const handleNewsTextChange = (event) => {
    setNewsText(event.target.value);
  };

  const handleClassDiagramTopicChange = (event) => {
    setTopic(event.target.value);
  };

  useEffect(() => {
    // This code will execute when 'umlCode' changes or when the component mounts
    setShowDialog(true);
  }, [umlCode]);

  const plantUMLSource = `
  @startuml

!define classColor #LightSkyBlue
!define interfaceColor #LightGreen
!define enumColor #LightYellow

class Shape {
    - id: int
    - color: string
    + draw(): void
}

class Circle {
    - radius: double
    + calculateArea(): double
}

class Rectangle {
    - width: double
    - height: double
    + calculateArea(): double
}

class Triangle {
    - side1: double
    - side2: double
    - side3: double
    + calculateArea(): double
}

abstract class Vehicle {
    - id: int
    - manufacturer: string
    + drive(): void
}

class Car {
    - model: string
}

class Truck {
    - cargoCapacity: double
}

interface Engine {
    + start(): void
    + stop(): void
}

class ElectricEngine {
    + chargeBattery(): void
}

class CombustionEngine {
    + refuel(): void
}

enum Gearbox {
    MANUAL
    AUTOMATIC
}

class Transmission {
    - type: Gearbox
}

Vehicle <|-- Car
Vehicle <|-- Truck
Engine <|.. ElectricEngine
Engine <|.. CombustionEngine
Vehicle *-- Engine
Vehicle o-- Transmission

@enduml


  
  `;
  const handleGenerate = () => {
    if (!newsText || !classDiagramTopic) {
      enqueueSnackbar(" Please fill in all fields.", {
        autoHideDuration: 2000,
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      const responce = sendPostReq();
    }
  };

  const sendPostReq = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3005/generate_class_diagram`,
        {
          case_study: newsText,
        }
      );
      console.log(
        "Data posted successfully:",
        response.data.plantuml_code.choices[0].message.content
      );
      setUmlCode(response.data.plantuml_code.choices[0].message.content);
      return response.data; // Optionally, return the data received from the server
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; // Optionally, rethrow the error to handle it outside
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <SnackbarProvider>
      <div>
        <div className="menubar">
          <div>
            <a href="/" className="logoLink">
              <img
                className="logoimage"
                src="/images/logoWhite.png"
                alt="logo"
              />
            </a>
            <a href="/login" className="logintext">
              Login
            </a>
          </div>
        </div>
        <div className="body">
          <p className="bodytext">
            Provide the topic and case study for generating
          </p>
          <p className="bodytext">a class diagram tailored to your needs.</p>
          <div className="inputContainer">
            <input
              className="inputbox"
              value={classDiagramTopic}
              onChange={handleClassDiagramTopicChange}
              placeholder="Enter your class diagram name here..."
            />
          </div>
          <div className="textAreaContainer">
            <textarea
              className="textarea"
              cols={30}
              rows={10}
              value={newsText}
              onChange={handleNewsTextChange}
              placeholder="Enter the news here"
            ></textarea>
          </div>
          <div className="buttoncontainer">
            <button className="generatebutton" onClick={handleGenerate}>
              Generate
            </button>
          </div>
        </div>
        {showDialog && (
          <DialogBox
            closeDialog={closeDialog}
            classDiagramTopic={classDiagramTopic}
            plantUmlSrc={umlCode}
          />
        )}
      </div>
    </SnackbarProvider>
  );
}
