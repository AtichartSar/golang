package models

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	PaymentDate      time.Time `gorm:"type:datetime;not null;default:CURRENT_TIMESTAMP"`
	PaymentAmount    float64   `gorm:"not null"`
	Description      string    `gorm:"not null"`
	LoanAmount	     float64   `gorm:"not null"`
	InterestBalance  float64   `gorm:"not null"`
	PrincipalBalance float64   `gorm:"not null"`
	LoanID           uint      `gorm:"not null"`
	Loan             Loan
}

type PaymentResponse struct {
	ID               uint      `json:"id"`
	PaymentDate      time.Time `json:"paymentDate"`
	PaymentAmount    float64   `json:"paymentAmount"`
	Description      string    `json:"description"`
	LoanAmount	     float64   `json:"loanAmount"`
	PrincipalBalance float64   `json:"principalBalance"`
	InterestBalance  float64   `json:"interestBalance"`
	LoanID           uint
	Loan             struct {
		ID           uint      `json:"id"`
		LoanAmount   float64   `json:"loanAmount"`
		InterestRate float64   `json:"interestRate"`
		CreatedAt    time.Time `json:"createdAt"`
		UpdatedAt    time.Time `json:"updatedAt"`
		Customer     struct {
			Name     string `json:"name"`
			Address  string `json:"address" `
			District string `json:"district" `
			Postcode string `json:"postcode"`
			Phone    string `json:"phone"`
			Email    string `json:"email" `
		} `json:"customer"`
	} `json:"loan"`
}

type PaymentRequest struct {
	PaymentDate   time.Time `json:"paymentDate"`
	PaymentAmount float64   `json:"paymentAmount" binding:"required"`
	Description   string    `json:"description"`
	LoanID        uint      `json:"loanId" binding:"required"`
}

type PaymentPaging struct {
	Items  []PaymentResponse `json:"items"`
	Paging *PagingResult     `json:"paging"`
}

type PaymentCreated struct {
	ID               uint      `json:"id"`
	PaymentDate      time.Time `json:"paymentDate"`
	PaymentAmount    float64   `json:"paymentAmount"`
	Description      string    `json:"description"`
	PrincipalBalance float64   `json:"principalBalance"`
	InterestBalance  float64   `json:"interestBalance"`
	LoanID           uint      `json:"LoanId"`
}

type PaymentUpdate struct {
	Description string `json:"description"`
	InterestBalance float64 `json:"interestBalance"`
	PrincipalBalance float64 `json:"principalBalance"`
	PaymentAmount float64 `json:"paymentAmount"`
}