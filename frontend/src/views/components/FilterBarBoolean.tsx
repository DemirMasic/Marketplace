import { useEffect, useState } from "react";
import type { Attribute } from "../../types";
import { useFilters } from "../../hooks/useFilter";


export const FilterBarBoolean = ({attribute }: {attribute: Attribute}) => {
   const [selectedAttributeBoolean, setSelectedAttributeBoolean] = useState<boolean>(false)
   
    const { filters, setFilters } = useFilters();
    


    


     useEffect(() => {
    setFilters([...filters, selectedAttributeBoolean ? {"attributeId": String(attribute.id), "type": "exact", "value": "true"} : 
      {"attributeId": String(attribute.id), "type": "exact"}]);
  }, [selectedAttributeBoolean]);

  return (
    <div className="bg-white w-full mx-auto">
        <div className="space-y-2">
                <label
                  htmlFor="attribute"
                  className="block text-sm font-semibold text-slate-700"
                >
                  {attribute.name}
                </label>
                <input 
                type="checkbox"
                id="attribute"
                value={attribute.name}
                 onChange={(e) => setSelectedAttributeBoolean(e.target.checked)}>
                </input>

              </div>
    </div>
  );
};