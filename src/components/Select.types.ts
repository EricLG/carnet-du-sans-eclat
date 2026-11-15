export type SelectProps = {
  label: string;
  choices: Record<string, string>;
  selected: string;
  onChange: (value: string) => void;
};
