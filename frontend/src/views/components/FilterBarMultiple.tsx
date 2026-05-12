import { useEffect, useState } from "react";
import type { Attribute, AttributeData } from "../../types";
import { useFilters } from "../../hooks/useFilter";

export const FilterBarMultiple = ({
  attribute,
  attributeData,
}: {
  attribute: Attribute;
  attributeData: AttributeData[];
}) => {
  const [selectedAttributeMultiple, setSelectedAttributeMultiple] = useState<
    string[]
  >([]);

  const { filters, setFilters } = useFilters();

  const filteredOptions = attributeData.filter(
    (ad) => ad.attribute_id === attribute.id,
  );

  useEffect(() => {
    const value = selectedAttributeMultiple.join(",");

    setFilters([
      ...filters.filter(
        (f) => !(f.type === "exact" && f.attributeId === String(attribute.id)),
      ),
      ...(selectedAttributeMultiple.length > 0
        ? [
            {
              attributeId: String(attribute.id),
              type: "exact" as const,
              value,
            },
          ]
        : []),
    ]);
  }, [selectedAttributeMultiple]);

  return (
    <div className="bg-white w-full mx-auto">
      <div className="space-y-2">
        {filteredOptions.map((ac) => (
  <div key={ac.id}>
    <label
      htmlFor={ac.name}
      className="block text-sm font-semibold text-slate-700"
    >
      {ac.name}
    </label>

    <input
      type="checkbox"
      id={ac.name}
      value={ac.name}
      checked={selectedAttributeMultiple.includes(ac.name)}
      onChange={(e) => {
        const value = e.target.value;

        setSelectedAttributeMultiple((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
      }}
    />
  </div>
))}
      </div>
    </div>
  );
};
