package controllers

type loanHandler interface {
	getTotalInterest(amount float64) float64
}

const year = 365
const useDate = 30

type interest struct {
	principle float64
	interest  float64
	date      int
}

func (i *interest) getTotalInterest() float64 {
	return (i.principle * i.interest * useDate) / year
}
