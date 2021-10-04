import { atom } from 'recoil';

export const ReportedCasesState = atom<CaseRecords[]>({
  key: 'reportedCasesState',
  default: [],
});

export interface CaseRecords extends Record<string, unknown> {
  active: number;
  deaths: number;
  recovery: number;
  country: string;
}
