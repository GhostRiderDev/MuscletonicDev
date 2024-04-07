export interface IRoutine {
  description: string;
  gif: string;
  id_part: number;
  id_routine: string;
  name: string;
  steps: [
    {
      id_step: string;
      name: string;
      content: string;
      order: number;
    }
  ];
}
