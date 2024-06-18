package controllers

import (
	"loan-service/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

type Payment struct {
	DB *gorm.DB
}

func (p *Payment) findPaymentByID(ctx *gin.Context) (*models.Payment, error) {
	var payment models.Payment
	id := ctx.Param("id")
	if err := p.DB.First(&payment, id).Error; err != nil {
		return nil, err

	}
	return &payment, nil
}

func (p *Payment) FindAll(ctx *gin.Context) {
	var payment models.Payment
	pagination := pagination{
		ctx:     ctx,
		query:   p.DB,
		records: &payment,
	}
	paging := pagination.paginate()
	var serializedPayment []models.PaymentResponse
	copier.Copy(&serializedPayment, &payment)
	ctx.JSON(http.StatusOK, gin.H{"data": models.PaymentPaging{
		Items:  serializedPayment,
		Paging: paging,
	}})

}

func (p *Payment) FindOne(ctx *gin.Context) {
	payment, err := p.findPaymentByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
	}
	serializedPayment := models.PaymentResponse{}
	copier.Copy(&serializedPayment, &payment)
	ctx.JSON(http.StatusOK, gin.H{"data": serializedPayment})
}

func (p *Payment) Create(ctx *gin.Context) {
	var paymentForm models.PaymentRequest
	if err := ctx.ShouldBind(&paymentForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	var payment models.Payment
	copier.Copy(&payment, &paymentForm)
	if err := p.DB.Create(&payment).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	var serializedPayment models.PaymentResponse
	copier.Copy(&serializedPayment, &payment)
	ctx.JSON(http.StatusCreated, gin.H{"data": serializedPayment})
}
