import React from 'react';

import { FormikProps } from 'formik';

import { Button } from 'components/button';
import { CountryPicker } from 'components/country-picker';
import { Country } from 'components/country-picker/types';
import { Select } from 'components/select';
import { TextField } from 'components/textfield';
import { FormValues } from 'modules/statistics/types/form';
import { useCountries } from 'modules/statistics/hooks/countries';
import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { SemiBold } from 'theme/typography';
import { ScrollView } from 'theme/layout';

import { ActionSection, Field, Form, Legend, Description } from './styles';

enum CaseType {
  Active = 'active',
  Recovery = 'recovery',
  Deaths = 'deaths',
}

const CASE_OPTIONS: CaseTypeOption[] = [
  { label: 'Active', value: CaseType.Active },
  { label: 'Recovery', value: CaseType.Recovery },
  { label: 'Deaths', value: CaseType.Deaths },
];

/**
 * Renders the report case form
 *
 * @param props - report case form props
 */
export function ReportCaseForm(props: FormikProps<FormValues>) {
  const { touched, handleSubmit, errors, setFieldValue, setFieldTouched, values } = props;
  const { data } = useCountries();
  const setCasesTouched = () => setFieldTouched('cases');
  const setCaseTypeTouched = () => setFieldTouched('type');
  const setCountryTouched = () => setFieldTouched('country');
  const countryOptions = sortCountries(data || []);

  return (
    <Form>
      <ScrollView flex={1}>
        <Legend>Report case</Legend>
        <Description>Report new covid related cases</Description>
        <Field>
          <TextField
            name="cases"
            placeholder="Number of cases"
            actions={{
              error: errors.cases,
              touched: touched.cases,
            }}
            value={values.cases}
            onValueChange={setFieldValue}
            onBlur={setCasesTouched}
            autoCorrect={false}
            keyboardType="numeric"
            returnKeyType="done"
            placeholderTextColor={Colors.dusty}
          />
        </Field>
        <Field>
          <Select
            name="type"
            onValueChange={setFieldValue}
            placeholder="Type of case"
            title="Select case type"
            onBlur={setCaseTypeTouched}
            options={CASE_OPTIONS}
            value={values.type}
            actions={{
              error: errors.type,
              touched: touched.type,
            }}
          />
        </Field>
        <Field>
          <CountryPicker
            name="country"
            onValueChange={setFieldValue}
            placeholder="Choose a country"
            onBlur={setCountryTouched}
            countries={countryOptions}
            value={values.country}
            actions={{
              error: errors.country,
              touched: touched.country,
            }}
          />
        </Field>
        <ActionSection>
          <Button rounded onPress={handleSubmit as never} backgroundColor={Colors['royal-blue']}>
            <SemiBold color={Colors.white} fontSize={FontSize.H4}>
              Report
            </SemiBold>
          </Button>
        </ActionSection>
      </ScrollView>
    </Form>
  );
}
/**
 * Sorts a list of country options
 *
 * @param list - A list of country options
 */
function sortCountries(list: Country[]) {
  return list.sort((a, b) => {
    if (a.Country < b.Country) {
      return -1;
    }
    if (a.Country > b.Country) {
      return 1;
    }
    return 0;
  });
}
/** Type defintions */
interface CaseTypeOption {
  label: string;
  value: CaseType;
}
