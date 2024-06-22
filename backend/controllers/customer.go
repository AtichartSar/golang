package controllers

import (
	"loan-service/models"
	ptoken "loan-service/utils/token"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Customers struct {
	DB *gorm.DB
}

func (a *Customers) FindAll(ctx *gin.Context) {
	var customers []models.Customer
	pagination := pagination{
		ctx:     ctx,
		query:   a.DB,
		records: &customers,
	}
	paging := pagination.paginate()
	var serializedCustomer []models.CustomerResponse
	copier.Copy(&serializedCustomer, &customers)
	ctx.JSON(http.StatusOK, gin.H{"data": models.CustomerPaging{
		Items:  serializedCustomer,
		Paging: paging,
	}})
}

func (a *Customers) FindOne(ctx *gin.Context) {
	customer, err := a.findCustomerByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	serializedCustomer := models.CustomerResponse{}
	copier.Copy(&serializedCustomer, &customer)
	ctx.JSON(http.StatusOK, gin.H{"data": serializedCustomer})
}

func (a *Customers) Create(ctx *gin.Context) {
	var customerForm models.CustomerRequest
	if err := ctx.ShouldBind(&customerForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	var customer models.Customer
	copier.Copy(&customer, &customerForm)
	if err := a.DB.Create(&customer).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	var serializedCustomer models.CustomerCreated
	copier.Copy(&serializedCustomer, &customer)
	ctx.JSON(http.StatusCreated, gin.H{"data": serializedCustomer})

}

func (c *Customers) Update(ctx *gin.Context) {
	var customerForm models.CustomerUpdate
	if err := ctx.ShouldBind(&customerForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
	}
	customer, err := c.findCustomerByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	if err := c.DB.Model(&customer).Updates(&customerForm).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	var serializedCustomer models.CustomerResponse

	copier.Copy(&serializedCustomer, &customer)
	ctx.JSON(http.StatusOK, gin.H{"data": serializedCustomer})
}

func (c *Customers) Delete(ctx *gin.Context) {
	customer, err := c.findCustomerByID(ctx)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	if err := c.DB.Delete(&customer).Error; err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusNoContent, nil)
}

func (c *Customers) Login(ctx *gin.Context) {
	var customerLoginReqForm models.CustomerLoginReq
	if err := ctx.ShouldBind(&customerLoginReqForm); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
	}
	customer, err := c.findCustomerByEmail(&customerLoginReqForm.Email)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Customer: %v", customer)
	log.Printf("customerLoginReqForm: %v", customerLoginReqForm)
	if err := bcrypt.CompareHashAndPassword([]byte(customer.Password), []byte(customerLoginReqForm.Password)); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "invalid password"})
		return
	}

	tokenData := map[string]interface{}{
		"id":    customer.ID,
		"email": customer.Email,
	}

	accessToken := ptoken.GenerateAccessToken(tokenData)

	var customerLoginRes models.CustomerLoginRes
	customerLoginRes.AccessToken = accessToken
	ctx.JSON(http.StatusOK, gin.H{"data": customerLoginRes})

}

func (a *Customers) findCustomerByID(ctx *gin.Context) (*models.Customer, error) {
	var customer models.Customer
	id := ctx.Param("id")
	if err := a.DB.Preload("Loans").Preload("Loans.Payments").First(&customer, id).Error; err != nil {
		return nil, err
	}
	return &customer, nil
}

func (a *Customers) findCustomerByEmail(email *string) (*models.Customer, error) {
	var customer models.Customer
	if err := a.DB.Where("email = ?", email).First(&customer).Error; err != nil {
		return nil, err
	}
	return &customer, nil
}
