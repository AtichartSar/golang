package controllers

import (
	"loan-service/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

// Loans represents a controller for managing loans.
type Loans struct {
	DB *gorm.DB
}

// FindAll retrieves all loans.
func (l *Loans) FindAll(ctx *gin.Context) {
	var loans []models.Loan
	var query *gorm.DB
	role, _ := ctx.Get("role")

	if(role=="admin") {
    	query = l.DB.Preload("Customer").Preload("Payments")
	} else {
		customerID, _ := ctx.Get("customerId")
    	query = l.DB.Preload("Customer").Preload("Payments").Where("customer_id = ?", customerID)
	}

	pagination := pagination{
		ctx:     ctx,
		query:   query,
		records: &loans,
	}
	paging := pagination.paginate()
	var serializedLoan []models.LoanResponse
	copier.Copy(&serializedLoan, &loans)
	ctx.JSON(http.StatusOK, gin.H{"data": models.LoanPaging{
		Items:  serializedLoan,
		Paging: paging,
	}})

}

func (l *Loans) findLoanByID(ctx *gin.Context) (*models.Loan, error) {
	var loan models.Loan
	id := ctx.Param("id")

	if err := l.DB.Preload("Customer").Preload("Payments").First(&loan, id).Error; err != nil {
		return nil, err
	}

	return &loan, nil
}

// FindOne retrieves a single loan.
func (l *Loans) FindOne(ctx *gin.Context) {
	loan, err := l.findLoanByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	serializedLoan := models.LoanResponse{}
	copier.Copy(&serializedLoan, &loan)
	ctx.JSON(http.StatusOK, gin.H{"data": serializedLoan})
}

// Create creates a new loan.
func (l *Loans) Create(ctx *gin.Context) {

	var loanForm models.LoanRequest
	customerId, _ := ctx.Get("customerId")

	if err := ctx.ShouldBind(&loanForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	var loan models.Loan
	copier.Copy(&loan, &loanForm)
	loan.CustomerID = uint(customerId.(float64))

	if err := l.DB.Create(&loan).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Cant find Customer ID"})
		return
	}
	var serializedLoan models.LoanCreated
	copier.Copy(&serializedLoan, &loan)
	ctx.JSON(http.StatusCreated, gin.H{"data": serializedLoan})
}

// Update updates a loan.
func (l *Loans) Update(ctx *gin.Context) {
	var loanForm models.LoanUpdate
	if err := ctx.ShouldBind(&loanForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	loan, err := l.findLoanByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	if err := l.DB.Model(&loan).Updates(&loanForm).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	var serializedLoan models.LoanResponse
	copier.Copy(&serializedLoan, &loan)
	ctx.JSON(http.StatusOK, gin.H{"data": serializedLoan})

}

// Delete deletes a loan.
func (l *Loans) Delete(ctx *gin.Context) {
	loan, err := l.findLoanByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	if er := l.DB.Delete(&loan).Error; er != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": er.Error()})
		return
	}
	ctx.JSON(http.StatusNoContent, nil)
}
