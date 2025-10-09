import React from "react";

import InputDate from "@/components/input/InputDate/InputDate";
import { BaseComponent } from "@/types/root";
import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../FormField";

interface FormFieldDateRangeProps extends BaseComponent {
  startDate?: string;
  endDate?: string;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
};

export default React.memo(function FormFieldDateRange({ className, startDate, endDate, onChangeStartDate, onChangeEndDate }: FormFieldDateRangeProps) {
  return (
    <FormGroup className={className}>
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