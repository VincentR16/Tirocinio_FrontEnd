import { Autocomplete } from "@mantine/core";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import useSearch from "../hook/useSearch";
import type { TermsType } from "../types/TermsType";

export function MedicationAutocomplete(
  onSelect: () => {},
  placeholder = "Cerca farmaci...",
  termsType: TermsType
) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 300);

  const {
    data: medications = [],
    isLoading,
    error,
  } = useSearch(debouncedSearchValue, termsType);

  return (
    <Autocomplete
      placeholder={placeholder}
      data={medications.map((med) => ({
        value: med.name || med.code, // Adatta ai tuoi campi
        label: med.name || med.code,
        ...med, // Mantieni tutti i dati originali
      }))}
      value={searchValue}
      onChange={setSearchValue}
      onItemSubmit={(item) => {
        onSelect(item);
        setSearchValue(item.label);
      }}
      loading={isLoading}
      error={error?.message}
      limit={10}
      dropdownPosition="bottom"
      withinPortal
    />
  );
}
