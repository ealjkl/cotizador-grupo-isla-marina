import type {
  DateRangePickerProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import {
  DateInput,
  DateRangePicker,
  DateSegment,
  FieldError,
  Group,
  Label,
  Text,
  Button,
  Heading,
  RangeCalendar,
  Popover,
  Dialog,
  CalendarGrid,
  CalendarCell,
} from "react-aria-components";

interface MyDateRangePickerProps<T extends DateValue>
  extends DateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function MyDateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: MyDateRangePickerProps<T>) {
  return (
    <DateRangePicker {...props}>
      <Label>{label}</Label>
      <Group>
        <DateInput slot="start">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <span aria-hidden="true">–</span>
        <DateInput slot="end">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>▼</Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <Dialog>
          <RangeCalendar>
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </RangeCalendar>
        </Dialog>
      </Popover>
    </DateRangePicker>
  );
}

<MyDateRangePicker />;
