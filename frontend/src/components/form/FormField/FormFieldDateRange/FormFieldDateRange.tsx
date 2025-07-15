import React from "react";

import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import InputDate from "@/components/input/InputDate/InputDate";
import FormField from "../FormField";

interface FormFieldDateRangeProps {
  startDate?: string;
  endDate?: string;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
};

export default React.memo(function FormFieldDateRange({ startDate, endDate, onChangeStartDate, onChangeEndDate }: FormFieldDateRangeProps) {
  return (
    <FormGroup gridTemplateColumns="1fr 1fr">
      <FormGroupCell>
        <FormField label="Дата начала">
          <InputDate
            placeholder="Начало"
            value={startDate}
            onChange={onChangeStartDate}
          />
        </FormField>
      </FormGroupCell>

      <FormGroupCell>
        <FormField label="Дата конца">
          <InputDate
            placeholder="Конец"
            value={endDate}
            onChange={onChangeEndDate}
          />
        </FormField>
      </FormGroupCell>
    </FormGroup>
  );
})