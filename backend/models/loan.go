package models

import (
	"time"

	"gorm.io/gorm"
)

// Loan represents a loan entity.
type Loan struct {
	gorm.Model
	LoanAmount   float64 `json:"loanAmount" gorm:"not null"`
	InterestRate float64 `json:"interestRate" gorm:"not null"`
	CustomerID   uint
	Customer     Customer
	Payments     []Payment
}

// LoanRequest represents a request for a loan.
type LoanRequest struct {
	LoanAmount   float64 `json:"loanAmount" binding:"required"`
	InterestRate float64 `json:"interestRate" binding:"required"`
}

// LoanResponse represents a response for a loan.
type LoanResponse struct {
	ID           uint      `json:"id"`
	LoanAmount   float64   `json:"loanAmount"`
	InterestRate float64   `json:"interestRate"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
	CustomerID   uint
	Customer     struct {
		Name     string `json:"name"`
		Address  string `json:"address" `
		District string `json:"district" `
		Postcode string `json:"postcode"`
		Phone    string `json:"phone"`
		Email    string `json:"email" `
	} `json:"customer"`
	Payment []struct {
		ID            uint      `json:"id"`
		PaymentDate   time.Time `json:"paymentDate"`
		PaymentAmount float64   `json:"paymentAmount"`
		PaymentType   string    `json:"paymentType"`
		PaymentStatus string    `json:"paymentStatus"`
		Description   string    `json:"description"`
	}
}

// LoanUpdate represents an update for a loan.
type LoanUpdate struct {
	LoanAmount   float64 `json:"loanAmount"`
	InterestRate float64 `json:"interestRate"`
}

// LoanPaging represents a paging result for loans.
type LoanPaging struct {
	Items  []LoanResponse `json:"items"`
	Paging *PagingResult  `json:"paging"`
}
