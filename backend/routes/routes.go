package routes

import (
	"loan-service/config"
	"loan-service/controllers"

	"github.com/gin-gonic/gin"
)

func Serve(r *gin.Engine) {
	db := config.DB

	r.GET("", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Welcome to Loan Service",
		})
	})

	customerGroup := r.Group("/api/v1/customers")
	customerController := controllers.Customers{
		DB: db,
	}
	{
		customerGroup.GET("", customerController.FindAll)
		customerGroup.GET("/:id", customerController.FindOne)
		customerGroup.POST("", customerController.Create)
		customerGroup.PATCH("/:id", customerController.Update)
		customerGroup.DELETE("/:id", customerController.Delete)
	}

	loanGroup := r.Group("/api/v1/loans")
	loanController := controllers.Loans{
		DB: db,
	}
	{
		loanGroup.GET("/:id", loanController.FindOne)
		loanGroup.GET("", loanController.FindAll)
		loanGroup.POST("", loanController.Create)
		loanGroup.PATCH("/:id", loanController.Update)
		loanGroup.DELETE("/:id", loanController.Delete)
	}
	paymentGroup := r.Group("/api/v1/payments")
	paymentController := controllers.Payment{
		DB: db,
	}
	{
		paymentGroup.GET("", paymentController.FindAll)
		paymentGroup.GET("/:id", paymentController.FindOne)
		paymentGroup.POST("", paymentController.Create)
	}

}
