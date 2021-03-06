import { createSelector } from "@ngrx/store";
import { AppState } from "./reducers";
import { PersonState } from "./person.state";
import { calculateTaxes } from "../core/taxes/income.calculator";

export const selectPerson = (state: AppState) => {
    return state.person;
};

export const selectPersonGrossIncome = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.weeklyHours * state.hourlyRate * 52;
    }
);10

export const selectPersonNetIncome = createSelector(
    selectPersonGrossIncome,
    (_grossIncome: number) => {
        return calculateTaxes(_grossIncome);
    }
);

export const selectPersonHourlyRate = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.hourlyRate
    }
);

export const selectPersonWeeklyHours = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.weeklyHours
    }
);

export const selectPersonDailyCommute = createSelector(
    selectPerson,
    (state: PersonState) => {
        return state.dailyCommute || 0;
    }
)

export const selectPersonWeeklyCommute = createSelector(
    selectPersonDailyCommute,
    (dailyCommute: number) => {
        return dailyCommute * 5;
    }
);

export const selectPersonHourlyNetIncome = createSelector(
    selectPersonNetIncome,
    selectPersonWeeklyHours,
    selectPersonWeeklyCommute,
    (netIncome: number, weeklyHours: number, weeklyCommute: number) => {
        return netIncome / 52 / (weeklyHours + weeklyCommute);
    }
)


export const selectPersonMaxRRSP = createSelector(
    selectPersonGrossIncome,
    (_grossIncome: number) => {
        return _grossIncome / 100 * 18;
    }
);

export const personTaxReturnOnRRSP = createSelector(
    selectPersonGrossIncome,
    selectPersonNetIncome,
    (_grossIncome: number, _netIncome: number, props: any) => {
        const maxRRSP = _grossIncome / 100 * 18;
        const subtract = props.rrspInvestment >= maxRRSP ? maxRRSP : props.rrspInvestment;
        const trueIncome = calculateTaxes(_grossIncome - subtract);
        return Math.round((_netIncome - trueIncome) * 100) / 100;
    }
)
