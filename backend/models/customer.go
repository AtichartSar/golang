package models

import (
	"time"

	"gorm.io/gorm"
)

// Customer represents a customer.
type Customer struct {
	gorm.Model
	Name     string `json:"name" gorm:"not null"`
	Address  string `json:"address"  gorm:"not null"`
	District string `json:"District"  gorm:"not null"`
	Postcode string `json:"postcode" gorm:"not null"`
	Phone    string `json:"phone" gorm:"not null"`
	Email    string `json:"email" gorm:"not null"`
	Loans    []Loan
}

// CustomerResponse represents the response structure for a customer.
type CustomerResponse struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Address  string `json:"address"`
	District string `json:"district"`
	Postcode string `json:"postcode"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Loans    []struct {
		ID           uint      `json:"id"`
		LoanAmount   float64   `json:"loanAmount"`
		InterestRate float64   `json:"interestRate"`
		CreatedAt    time.Time `json:"createdAt"`
		UpdatedAt    time.Time `json:"updatedAt"`
		Payments     []struct {
			ID            uint      `json:"id"`
			PaymentDate   time.Time `json:"paymentDate"`
			PaymentAmount float64   `json:"paymentAmount"`
			PaymentType   string    `json:"paymentType"`
			PaymentStatus string    `json:"paymentStatus"`
			Description   string    `json:"description"`
		}
	} `json:"loans"`
}

// CustomerRequest represents the request structure for a customer.
type CustomerRequest struct {
	Name     string `json:"name" binding:"required"`
	Address  string `json:"address" binding:"required"`
	District string `json:"district" binding:"required"`
	Postcode string `json:"postcode" binding:"required"`
	Phone    string `json:"phone" binding:"required"`
	Email    string `json:"email" binding:"required"`
}

// CustomerPaging represents the paging structure for customers.
type CustomerPaging struct {
	Items  []CustomerResponse `json:"items"`
	Paging *PagingResult      `json:"paging"`
}

// CustomerUpdate represents the update structure for a customer.
type CustomerUpdate struct {
	Name     string `json:"name"`
	Address  string `json:"address"`
	District string `json:"district"`
	Postcode string `json:"postcode"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
}

type CustomerCreated struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Address  string `json:"address"`
	District string `json:"district"`
	Postcode string `json:"postcode"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
}
