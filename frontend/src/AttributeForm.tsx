import { useEffect, useState } from "react";
import { DataTypeEnum, type Attribute } from "./types";



function AttributeForm(setAttributes:React.Dispatch<React.SetStateAction<Attribute[]>>) {
  
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [dataType, setDataType] = useState(DataTypeEnum.TEXT);
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [userWritten, setUserWritten] = useState(false); 
    
    
    const addAttribute = async () => {
    
    
    
  };  
  

  return (
    <form onSubmit={addAttribute}>
      <div>
        <label htmlFor="name">Attribute name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dataType">Data type:</label>
        <select
          id="dataType"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          disabled={loading}
        >
          {Object.values(DataTypeEnum).map((enum) => (
            <option key={enum} value={enum}>
              {enum}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add Category</button>
    </form>
  );
}

export default AttributeForm;