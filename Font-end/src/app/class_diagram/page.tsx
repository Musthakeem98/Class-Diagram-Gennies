"use client"
import "@/styles/fact_checker.css";
import { useState } from "react";
import DialogBox from "./componets/DialogBox";

export default function FactChecker() {
  const [newsText, setNewsText] = useState("");
  const [classDiagramTopic, setTopic] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [umlCode, setUmlCode] = useState("")

  const handleNewsTextChange = (event) => {
    setNewsText(event.target.value);
  };

  const handleClassDiagramTopicChange = (event) => {
    setTopic(event.target.value);
  };

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
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <div className="menubar">
        <div>
          <a href="/" className="logoLink">
            <img className="logoimage" src="/images/logoWhite.png" alt="logo" />
          </a>
          <a href="/login" className="logintext">
            Login
          </a>
          <a href="/credscore_calculator" className="headders">
            CredScore Calculator
          </a>
        </div>
      </div>
      <div className="body">
        <p className="bodytext">Provide the topic and case study for generating</p>
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
      {showDialog && <DialogBox closeDialog={closeDialog} classDiagramTopic={classDiagramTopic}  plantUmlSrc={plantUMLSource}/>}
    </div>
  );
}
