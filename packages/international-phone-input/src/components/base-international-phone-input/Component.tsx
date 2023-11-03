import React, { ChangeEvent, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { maskitoTransform } from '@maskito/core';
import { useMaskito } from '@maskito/react';

import type { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import { BaseOption } from '@alfalab/core-components-select/shared';
import type { BaseSelectChangePayload } from '@alfalab/core-components-select/typings';

import type { BaseInternationalPhoneInputProps, Country } from '../../types';
import {
    createMaskOptions,
    filterPhones,
    findCountry,
    getClear,
    getPhoneData,
    initCountries,
} from '../../utils';
import { CountrySelect } from '../country-select';

import styles from './index.module.css';

export const BaseInternationalPhoneInput = forwardRef<
    HTMLInputElement,
    BaseInternationalPhoneInputProps
>(
    (
        {
            clearableCountryCode,
            value,
            country: countryProp,
            filterFn,
            onChange,
            onCountryChange,
            countrySelectProps,
            countries,
            defaultIso2,
            disabled,
            options,
            size = 'm',
            Input,
            InputAutocomplete,
            SelectComponent,
            view,
            clear: clearProp,
            ...restProps
        },
        ref,
    ) => {
        const countriesData = useMemo(() => initCountries(countries), [countries]);
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);

        const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(() =>
            findCountry(countriesData, value, defaultIso2, countryProp),
        );
        const filteredOptions = filterPhones(value, options, filterFn);
        const country = countryProp ?? selectedCountry;

        const handleCountryChange = (nextCountry?: Country) => {
            if (countryProp === undefined) setSelectedCountry(nextCountry);
            onCountryChange?.(nextCountry);
        };

        const maskOptions = useMemo(
            () => createMaskOptions(country, clearableCountryCode),
            [country, clearableCountryCode],
        );

        const maskRef = useMaskito({ options: maskOptions });

        const changeNumber = (e: ChangeEvent<HTMLInputElement> | null, phone: string) => {
            onChange?.(e, { value: phone });
        };

        const updatePhoneData = (phone: string, e: ChangeEvent<HTMLInputElement> | null) => {
            const { nextCountry, nextPhone } = getPhoneData(phone, countriesData, defaultIso2);

            if (nextCountry !== country) {
                handleCountryChange?.(nextCountry);
            }
            changeNumber(e, nextPhone);
        };

        const handleSelectCountry = ({ selected }: BaseSelectChangePayload) => {
            const nextCountry = selected?.value as Country;

            handleCountryChange?.(nextCountry);

            if (nextCountry) {
                changeNumber(null, `+${nextCountry.dialCode}`);
            }

            requestAnimationFrame(() => inputRef.current?.focus());
        };

        const handleOptionSelect = (payload: BaseSelectChangePayload | string) => {
            updatePhoneData(
                maskitoTransform(
                    typeof payload === 'string' ? payload : payload.selected?.key || '',
                    maskOptions,
                ),
                null,
            );
        };

        const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
            updatePhoneData(e.target.value, e);
        };

        const handleClear = () => {
            if (clearableCountryCode) {
                changeNumber(null, '');
            } else {
                changeNumber(null, `+${country?.countryCode}` || '');
            }
        };

        useEffect(() => {
            if (value) {
                const newValue = maskitoTransform(value, maskOptions);

                if (value !== newValue) {
                    updatePhoneData(newValue, null);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, maskOptions]);

        const renderCountrySelect = (compact = false) => (
            <CountrySelect
                {...countrySelectProps}
                view={view}
                SelectComponent={SelectComponent}
                disabled={disabled || countrySelectProps?.disabled}
                onChange={handleSelectCountry}
                country={country}
                countries={compact ? [] : countriesData}
                fieldWidth={inputWrapperRef.current?.getBoundingClientRect().width}
            />
        );

        const inputProps = {
            className: styles.component,
            ref: mergeRefs([maskRef, ref, inputRef]),
            wrapperRef: inputWrapperRef,
            addonsClassName: styles.addons,
            type: 'tel',
            clear: getClear(clearProp, clearableCountryCode, value, country?.countryCode),
        } as const;

        return Array.isArray(options) ? (
            <InputAutocomplete
                closeOnSelect={true}
                Option={BaseOption}
                size={size}
                {...(restProps as InputAutocompleteProps)}
                disabled={disabled}
                options={filteredOptions}
                value={value}
                onChange={handleOptionSelect}
                onInput={(event, { value: phone }) => updatePhoneData(phone, event)}
                inputProps={{
                    ...inputProps,
                    onClear: handleClear,
                    onInput: handleInput,
                    leftAddons: renderCountrySelect(view === 'mobile'),
                }}
                fieldProps={{
                    className: inputProps.className,
                    addonsClassName: inputProps.addonsClassName,
                    ...(view === 'mobile' ? { leftAddons: renderCountrySelect() } : null),
                }}
            />
        ) : (
            <Input
                {...restProps}
                {...inputProps}
                onClear={inputProps.clear ? handleClear : undefined}
                leftAddons={renderCountrySelect()}
                size={size}
                onInput={handleInput}
                value={value}
                disabled={disabled}
            />
        );
    },
);
