package controllers

import "errors"

const year = 365
const useDate = 30

type Interest struct {
	LoanAmount    float64
	Interest      float64
	PaymentAmount float64
}

func (i *Interest) getLoanInterestBalance() (float64, error) {
	if i.LoanAmount <= 0 || i.Interest <= 0 {
		return 0, errors.New("Invalid input: values cannot be negative")
	}
	result := (i.LoanAmount * getPercents(i.Interest) * useDate) / year
	return getTwoDecimals(result), nil
}

func (i *Interest) getLoanPrincipalBalance() (float64, error) {
	loanInterestBalance, err := i.getLoanInterestBalance()
	if err != nil {
		return 0, errors.New("Invalid input: values cannot be negative")
	}
	result := i.PaymentAmount - loanInterestBalance
	return getTwoDecimals(result), nil
}

func (i *Interest) getLoanAmount() (float64, error) {
	loanPrincipalBalance, err := i.getLoanPrincipalBalance()
	if err != nil {
		return 0, err
	}
	result := i.LoanAmount - loanPrincipalBalance
	return getTwoDecimals(result), nil
}

func getPercents(Interest float64) float64 {
	return Interest / 100
}

func getTwoDecimals(number float64) float64 {
	return float64(int(number*100)) / 100
}
