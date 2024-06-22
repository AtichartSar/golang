package controllers

import (
	"encoding/json"
	"loan-service/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type Payment struct {
	DB    *gorm.DB
	Loans *Loans
}

func (p *Payment) findPaymentByID(ctx *gin.Context) (*models.Payment, error) {
	var payment models.Payment
	id := ctx.Param("id")
	if err := p.DB.Preload("Loan").First(&payment, id).Error; err != nil {
		return nil, err

	}
	return &payment, nil
}

// FindAll retrieves all payments.
func (p *Payment) FindAll(ctx *gin.Context) {
	var payment []models.Payment
	pagination := pagination{
		ctx:     ctx,
		query:   p.DB,
		records: &payment,
	}
	paging := pagination.paginate()
	var serializedPayment []models.PaymentResponse
	b, _ := json.Marshal(payment)
	log.Printf("payment>>>>", string(b))
	copier.Copy(&serializedPayment, &payment)
	ctx.JSON(http.StatusOK, gin.H{"data": models.PaymentPaging{
		Items:  serializedPayment,
		Paging: paging,
	}})
}

// FindOne retrieves a single payment by ID.
func (p *Payment) FindOne(ctx *gin.Context) {
	payment, err := p.findPaymentByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	serializedPayment := models.PaymentResponse{}
	copier.Copy(&serializedPayment, &payment)
	ctx.JSON(http.StatusOK, gin.H{"data": serializedPayment})
}

// Create creates a new payment.
func (p *Payment) Create(ctx *gin.Context) {
	var paymentForm models.PaymentRequest
	if err := ctx.ShouldBind(&paymentForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error bind": err.Error()})
		return
	}

	var loan models.Loan
	if err := p.DB.First(&loan, paymentForm.LoanID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if paymentForm.PaymentAmount > loan.LoanAmount {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Payment amount is greater than loan amount"})
		return
	}

	interest := Interest{
		LoanAmount:    loan.LoanAmount,
		Interest:      loan.InterestRate,
		PaymentAmount: paymentForm.PaymentAmount,
	}

	loanInterestBalance, err := interest.getLoanInterestBalance()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}
	loanPrincipalBalance, err := interest.getLoanPrincipalBalance()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payment := models.Payment{
		InterestBalance:  loanInterestBalance,
		PrincipalBalance: loanPrincipalBalance,
	}
	copier.Copy(&payment, &paymentForm)
	if err := p.DB.Create(&payment).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	loanAmount, err := interest.getLoanAmount()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	loanForm := models.LoanUpdate{
		LoanAmount: loanAmount,
	}

	if err := p.DB.Model(&loan).Updates(&loanForm).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	var serializedPaymentCreated models.PaymentCreated
	copier.Copy(&serializedPaymentCreated, &payment)
	ctx.JSON(http.StatusCreated, gin.H{"data": serializedPaymentCreated})
}
