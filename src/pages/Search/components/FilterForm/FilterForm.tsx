import { ExchangeEnum, GetTickersParams } from "src/types";

interface FilterFormProps {
  onChangeParams: (params: GetTickersParams) => void;
  exchange: ExchangeEnum;
  
}

export const FilterForm: React.FC<FilterFormProps> = () => {
  return <div>filter</div>;
};
