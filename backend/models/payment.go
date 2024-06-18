package models

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	PaymentDate   time.Time `gorm:"not null"`
	PaymentAmount float64   `gorm:"not null"`
	PaymentType   string    `gorm:"not null"`
	PaymentStatus string    `gorm:"not null"`
	Description   string    `gorm:"not null"`
	LoanID        uint
	Loan          Loan
}

type PaymentResponse struct {
	ID            uint      `json:"id"`
	PaymentDate   time.Time `json:"paymentDate"`
	PaymentAmount float64   `json:"paymentAmount"`
	PaymentType   string    `json:"paymentType"`
	PaymentStatus string    `json:"paymentStatus"`
	Description   string    `json:"description"`
	Loan          struct {
		ID           uint      `json:"id"`
		LoanAmount   float64   `json:"loanAmount"`
		InterestRate float64   `json:"interestRate"`
		CreatedAt    time.Time `json:"createdAt"`
		UpdatedAt    time.Time `json:"updatedAt"`
	}
}

type PaymentRequest struct {
	PaymentDate   time.Time `json:"paymentDate"`
	PaymentAmount float64   `json:"paymentAmount" binding:"required"`
	PaymentType   string    `json:"paymentType"`
	PaymentStatus string    `json:"paymentStatus"`
	Description   string    `json:"description"`
	LoanID        uint      `json:"loanID"`
}

type PaymentPaging struct {
	Items  []PaymentResponse `json:"items"`
	Paging *PagingResult     `json:"paging"`
}
