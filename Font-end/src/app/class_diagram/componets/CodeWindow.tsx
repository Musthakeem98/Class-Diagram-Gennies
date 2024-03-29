// pages/index.js (or any other Next.js page)

import React, { useState } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MarkdownEditor = () => {
  const [value, setValue] = useState(
    '# Car and Engine Class Implementation\n ## Introduction\n\nThis Java program implements the classes `Car` and `Engine` based on the given class diagram. The `Car` class represents a car object with attributes `make` and `model`, and methods `startEngine()` and `stopEngine()`. The `Engine` class represents an engine object with attributes `cylinders` and `horsepower`, and methods `start()` and `stop()`.\n\n## Folder Structure\n```\nsrc\n|__ main\n    |__ java\n        |__ Car.java\n        |__ Engine.java\n```\n\n## Car.java\n```java\npublic class Car {\n    private String make;\n    private String model;\n\n    public Car(String make, String model) {\n        this.make = make;\n        this.model = model;\n    }\n\n    public void startEngine() {\n        System.out.println("Engine started");\n    }\n\n    public void stopEngine() {\n        System.out.println("Engine stopped");\n    }\n}\n```\n\n### Explanation\n- The `Car` class has two private attributes `make` and `model` of type `String`.\n- The constructor initializes the `make` and `model` attributes of the car object.\n- The `startEngine()` method prints a message indicating that the engine has started.\n- The `stopEngine()` method prints a message indicating that the engine has stopped.\n\n## Engine.java\n```java\npublic class Engine {\n    private int cylinders;\n    private int horsepower;\n\n    public Engine(int cylinders, int horsepower) {\n        this.cylinders = cylinders;\n        this.horsepower = horsepower;\n    }\n\n    public void start() {\n        System.out.println("Engine started");\n    }\n\n    public void stop() {\n        System.out.println("Engine stopped");\n    }\n}\n```\n\n### Explanation\n- The `Engine` class has two private attributes `cylinders` and `horsepower` of type `int`.\n- The constructor initializes the `cylinders` and `horsepower` attributes of the engine object.\n- The `start()` method prints a message indicating that the engine has started.\n- The `stop()` method prints a message indicating that the engine has stopped.\n\nThis implementation provides a basic representation of a car and engine in Java based on the given class diagram.'
  );

  return (
    <div className="dialog-overlay">
      <div>
        <h1>Markdown Editor</h1>
        <MDEditor value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
