import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import useSearch from "../hook/useSearch";
import type { TermsType } from "../types/TermsType";
import { Loader } from "@mantine/core";

interface MedicationSelectProps {
  placeholder?: string;
  label: string;
  termsType: TermsType;
  value?: string;
  onChange?: (value: string) => void;
  onCodeChange?: (code: string) => void;
  error?: string;
}

export function MedicationSelect({
  label,
  termsType,
  value = "",
  onChange,
  onCodeChange,
  placeholder,
  error,
}: MedicationSelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchQuery, 300);

  // E aggiungi questo useEffect:
  useEffect(() => {
    if (value && value !== searchQuery) {
      setSearchQuery(value);
    }
  }, [value, searchQuery]);

  const {
    data: medications = [],
    error: searchError,
    isLoading,
  } = useSearch(debouncedSearchValue, termsType);

  const handleSelect = (selectedValue: string | null) => {
    if (!selectedValue) {
      // Se viene deselezionato/cancellato
      if (onChange) onChange("");
      if (onCodeChange) onCodeChange("");
      return;
    }

    // Trova il medication selezionato per ottenere il codice
    const selectedMedication = medications.find(
      (med) => (med.name || med.code) === selectedValue
    );

    if (selectedMedication) {
      // Aggiorna il valore visualizzato
      if (onChange) {
        onChange(selectedValue);
      }

      // Aggiorna il codice
      if (onCodeChange && selectedMedication.code) {
        onCodeChange(selectedMedication.code);
      }
    }
  };

  return (
    <Select
      mt="md"
      label={label}
      clearable
      searchable
      placeholder={placeholder}
      data={medications
        .map((med) => ({
          value: med.name || med.code,
          label: med.name || med.code,
        }))
        //rimuove duplicati
        .filter(
          (item, index, array) =>
            array.findIndex((x) => x.value === item.value) === index
        )}
      value={value || null}
      onChange={handleSelect}
      onSearchChange={setSearchQuery}
      searchValue={searchQuery}
      error={error || searchError?.message}
      limit={10} // Mostra più opzioni nel dropdown
      maxDropdownHeight={200}
      nothingFoundMessage={isLoading ? <Loader /> : "Nothing found"}
      withAsterisk // se è required
    />
  );
}
