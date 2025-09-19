interface Pie {
  labels: string[];
  values: number[];
}

interface BarValue {
  label: string;
  data: number[];
}

interface Bar {
  labels: string[];
  values: BarValue[];
}

interface Perfomance {
  pie: Pie;
  bar: Bar;
}

export { Perfomance };
