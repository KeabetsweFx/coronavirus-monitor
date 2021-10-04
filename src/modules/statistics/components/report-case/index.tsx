import React, { useCallback } from 'react';

import { Formik, FormikHelpers } from 'formik';
import { Notifier } from 'react-native-notifier';
import { useSetRecoilState } from 'recoil';
import * as Yup from 'yup';

import { FormValues } from 'modules/statistics/types/form';
import { ReportedCasesState, CaseRecords } from 'state/reported-cases';
import { SuccessOptions } from 'theme/notifiers';
import { ReportCaseForm } from './form';

const VALIDATION_SCHEMA = Yup.object().shape({
  cases: Yup.string().required('The number of cases field is required.'),
  country: Yup.string().required('The country field is required.'),
  type: Yup.string().required('The type of case field is required.'),
});

const INITIAL_VALUES: FormValues = {
  cases: '',
  country: '',
  type: '',
};
const DEFAULT_RECORD_DATA = {
  active: 0,
  recovery: 0,
  deaths: 0,
};

/**
 * Renders the report case component
 */
export function ReportCaseComponent() {
  const setReportedCases = useSetRecoilState(ReportedCasesState);

  const submit = useCallback(
    (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      const { resetForm } = helpers;

      setReportedCases(records => updateRecords(records, values));
      resetForm();
    },
    [setReportedCases]
  );

  const handleOnReset = () => {
    Notifier.showNotification({
      ...SuccessOptions,
      title: 'Success!',
      description: 'Your report has been recorded successfully.',
    });
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={submit}
      validateOnChange={false}
      onReset={handleOnReset}
      validateOnBlur={false}>
      {ReportCaseForm}
    </Formik>
  );
}

/**
 * Updates the current records
 *
 * @param records - A record of reported cases
 * @param data - new data
 */
function updateRecords(records: CaseRecords[], data: FormValues) {
  const { country, type, cases } = data;
  const index = records.findIndex(item => item.country === country);

  if (index >= 0) {
    const record = {
      ...records[index],
      [type]: Number(records[index][type]) + Number(cases),
    };

    return replaceItemAtIndex(records, index, record);
  } else {
    const record = {
      ...DEFAULT_RECORD_DATA,
      [type]: cases,
      country,
    };

    return [...records, record];
  }
}

/**
 * Replaces an array item and stated index
 *
 * @param arr - A list of items
 * @param index - Index of the item to be replaced
 * @param newValue - New value to update the old one
 */
function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
