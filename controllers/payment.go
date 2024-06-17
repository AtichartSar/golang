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
}
