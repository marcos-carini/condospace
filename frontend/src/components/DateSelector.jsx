
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const parseDateLocal = (dateString) => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const DateSelector = ({ value, onChange, reservas, espacoId }) => {
  const hoje = new Date();
  hoje.setHours(0,0,0,0);
  const dataMax = new Date();
  dataMax.setMonth(dataMax.getMonth() + 2);
  dataMax.setHours(23,59,59,999);

  const datasBloqueadas = reservas
    .filter(r => r.id_espaco === espacoId && r.status === "A")
    .map(r => r.data.split("T")[0]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(parseDateLocal(value), "dd/MM/yyyy") : "Escolher data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? parseDateLocal(value) : undefined}
          onSelect={(date) => {
            if (!date) {
              onChange("");
              return;
            }
            // envia no formato 'YYYY-MM-DD' sem timezone
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            onChange(`${y}-${m}-${d}`);
          }}
          disabled={(date) => {
            // zero hora para comparação local
            const dt = new Date(date);
            dt.setHours(0,0,0,0);
            return (
              dt < hoje ||
              dt > dataMax ||
              datasBloqueadas.includes(format(dt, "yyyy-MM-dd"))
            );
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelector;
